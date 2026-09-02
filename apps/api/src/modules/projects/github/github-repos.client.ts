import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { GitHubRepoJson } from './github-repo.types';

const GITHUB_API = 'https://api.github.com';
const CACHE_TTL_MS = 10 * 60 * 1000;

@Injectable()
export class GitHubReposClient {
  private readonly logger = new Logger(GitHubReposClient.name);
  private cache: { at: number; repos: GitHubRepoJson[] } | null = null;

  constructor(private readonly config: ConfigService) {}

  async listOwnerRepos(): Promise<GitHubRepoJson[]> {
    if (this.cache && Date.now() - this.cache.at < CACHE_TTL_MS) {
      return this.cache.repos;
    }

    const username = this.config.get<string>('GITHUB_USERNAME') ?? 'ang3lSm1th';
    const token = this.config.get<string>('GITHUB_TOKEN')?.trim();
    const url = token
      ? `${GITHUB_API}/user/repos?affiliation=owner&per_page=100&sort=updated`
      : `${GITHUB_API}/users/${encodeURIComponent(username)}/repos?type=owner&per_page=100&sort=updated`;

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'portfolio-api',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        this.logger.warn(`GitHub respondió ${response.status}`);
        return this.cache?.repos ?? [];
      }

      const repos = (await response.json()) as GitHubRepoJson[];
      this.cache = { at: Date.now(), repos };
      return repos;
    } catch {
      this.logger.warn('No se pudo leer GitHub; se usará el catálogo local si existe');
      return this.cache?.repos ?? [];
    }
  }
}
