import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { GitHubReposClient } from './github/github-repos.client';
import { isPortfolioRepo, mapGitHubRepoToProject } from './github/map-github-repo';
import type { GitHubProject } from './github/github-repo.types';

const prismaPublicSelect = {
  id: true,
  title: true,
  summary: true,
  techStack: true,
  imageUrl: true,
  repoUrl: true,
  liveUrl: true,
  featured: true,
} as const;

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly githubRepos: GitHubReposClient,
  ) {}

  async findPublic() {
    const githubProjects = await this.loadGitHubProjects();
    if (githubProjects.length === 0) {
      return this.prisma.project.findMany({
        orderBy: [
          { featured: 'desc' },
          { sortOrder: 'asc' },
          { createdAt: 'desc' },
        ],
        select: prismaPublicSelect,
      });
    }

    const curated = await this.prisma.project.findMany({
      where: { repoUrl: { not: null } },
      select: prismaPublicSelect,
    });

    return this.mergeCurated(githubProjects, curated);
  }

  private async loadGitHubProjects(): Promise<GitHubProject[]> {
    const repos = await this.githubRepos.listOwnerRepos();
    return repos
      .filter(isPortfolioRepo)
      .map(mapGitHubRepoToProject)
      .slice()
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return (b.pushedAt ?? '').localeCompare(a.pushedAt ?? '');
      });
  }

  private mergeCurated(
    githubProjects: GitHubProject[],
    curated: Array<{
      title: string;
      summary: string;
      techStack: string[];
      imageUrl: string | null;
      repoUrl: string | null;
      liveUrl: string | null;
      featured: boolean;
    }>,
  ) {
    const byRepoUrl = new Map(
      curated
        .filter((item) => item.repoUrl)
        .map((item) => [item.repoUrl as string, item]),
    );

    return githubProjects.map((project) => {
      const extra = byRepoUrl.get(project.repoUrl);
      const publicProject = {
        id: project.id,
        title: extra?.title || project.title,
        summary: extra?.summary || project.summary,
        techStack:
          extra && extra.techStack.length > 0
            ? extra.techStack
            : project.techStack,
        imageUrl: extra?.imageUrl ?? project.imageUrl,
        repoUrl: project.repoUrl,
        liveUrl: extra?.liveUrl ?? project.liveUrl,
        featured: extra?.featured || project.featured,
      };
      return publicProject;
    });
  }
}
