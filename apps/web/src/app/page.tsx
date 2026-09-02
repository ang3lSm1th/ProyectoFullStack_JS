import { fetchLandingData } from '@/models/landingApi';
import { HomeView } from '@/views/HomeView';

export const revalidate = 300;

export default async function HomePage() {
  const { services, projects } = await fetchLandingData();

  return <HomeView services={services} projects={projects} />;
}
