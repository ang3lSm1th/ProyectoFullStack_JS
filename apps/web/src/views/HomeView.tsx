import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { AboutSection } from '@/views/AboutSection';
import { ContactSection } from '@/views/ContactSection';
import { HeroSection } from '@/views/HeroSection';
import { ProjectsSection } from '@/views/ProjectsSection';
import { ServicesSection } from '@/views/ServicesSection';
import type { ProjectDto, ServiceDto } from '@/models/types';

type Props = {
  services: ServiceDto[];
  projects: ProjectDto[];
};

export function HomeView({ services, projects }: Props) {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-full flex-1 flex-col">
        <HeroSection />
        <AboutSection />
        <ServicesSection services={services} />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
