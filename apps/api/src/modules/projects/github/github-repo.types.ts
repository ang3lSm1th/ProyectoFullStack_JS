export type GitHubRepoJson = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string | null;
  stargazers_count: number;
};

export type GitHubProject = {
  id: string;
  title: string;
  summary: string;
  techStack: string[];
  imageUrl: null;
  repoUrl: string;
  liveUrl: string | null;
  featured: boolean;
  pushedAt: string | null;
};
