export type ProjectDto = {
  id: string;
  title: string;
  summary: string;
  techStack: string[];
  imageUrl: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
};

export type ServiceDto = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
};

export type CreateLeadInput = {
  name: string;
  email: string;
  message: string;
};

export type CreateLeadResponse = {
  ok: true;
  id: string;
  createdAt: string;
};
