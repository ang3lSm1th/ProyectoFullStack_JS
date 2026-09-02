import { apiGet } from './httpClient';
import type { ProjectDto } from './types';

export function fetchProjects() {
  return apiGet<ProjectDto[]>('/projects');
}
