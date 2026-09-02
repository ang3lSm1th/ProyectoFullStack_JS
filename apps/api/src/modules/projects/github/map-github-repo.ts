import type { GitHubProject, GitHubRepoJson } from './github-repo.types';

function humanizeRepoName(name: string): string {
  return name.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeHomepage(homepage: string | null): string | null {
  const value = homepage?.trim();
  if (!value) return null;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return `https://${value}`;
}

export function mapGitHubRepoToProject(repo: GitHubRepoJson): GitHubProject {
  const topics = repo.topics ?? [];
  const techStack = [repo.language, ...topics].filter(
    (item): item is string => Boolean(item),
  );
  const uniqueStack = [...new Set(techStack)];
  const liveUrl = normalizeHomepage(repo.homepage);
  const summary =
    repo.description?.trim() || 'Repositorio en GitHub.';

  return {
    id: `gh-${repo.id}`,
    title: humanizeRepoName(repo.name),
    summary,
    techStack: uniqueStack,
    imageUrl: null,
    repoUrl: repo.html_url,
    liveUrl,
    featured: repo.stargazers_count > 0 || Boolean(liveUrl),
    pushedAt: repo.pushed_at,
  };
}

export function isPortfolioRepo(repo: GitHubRepoJson): boolean {
  return !repo.fork && !repo.archived;
}
