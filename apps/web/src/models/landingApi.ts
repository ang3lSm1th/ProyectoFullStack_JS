import { unstable_cache } from 'next/cache';
import { API_URL } from './httpClient';
import type { ProjectDto, ServiceDto } from './types';

export const LANDING_REVALIDATE_SECONDS = 300;

async function fetchLandingFromApi(): Promise<{
  services: ServiceDto[];
  projects: ProjectDto[];
}> {
  try {
    const [servicesRes, projectsRes] = await Promise.all([
      fetch(`${API_URL}/services`, {
        next: { revalidate: LANDING_REVALIDATE_SECONDS, tags: ['services'] },
      }),
      fetch(`${API_URL}/projects`, {
        next: { revalidate: LANDING_REVALIDATE_SECONDS, tags: ['projects'] },
      }),
    ]);

    const services: ServiceDto[] = servicesRes.ok
      ? await servicesRes.json()
      : [];
    const projects: ProjectDto[] = projectsRes.ok
      ? await projectsRes.json()
      : [];

    return { services, projects };
  } catch {
    return { services: [], projects: [] };
  }
}

export const fetchLandingData = unstable_cache(
  fetchLandingFromApi,
  ['portfolio-landing-data-v3'],
  {
    revalidate: LANDING_REVALIDATE_SECONDS,
    tags: ['landing', 'services', 'projects'],
  },
);
