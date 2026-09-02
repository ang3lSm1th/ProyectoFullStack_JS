'use client';

import { ProjectCard } from '@/components/ProjectCard';
import type { ProjectDto } from '@/models/types';
import { useProjectsPreviewVM } from '@/viewmodels/useProjectsPreviewVM';

type Props = {
  projects: ProjectDto[];
};

export function ProjectsSection({ projects }: Props) {
  const { visibleProjects, canExpand, expanded, hiddenCount, showMore, showLess } =
    useProjectsPreviewVM(projects);

  return (
    <section
      id="proyectos"
      className="scroll-mt-20 border-t border-outline-variant bg-surface-container-low py-20 md:py-[var(--spacing-section)]"
    >
      <div className="mx-auto w-full max-w-[var(--max-width-container)] px-6 sm:px-10">
        <div className="flex flex-col gap-3">
          <p className="label-caps text-primary">Proyectos</p>
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Trabajo reciente
          </h2>
          <div className="h-1 w-16 bg-primary-container" aria-hidden />
        </div>

        <ul className="mt-12 space-y-6">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>

        {canExpand ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              className="btn-secondary"
              aria-expanded={expanded}
              onClick={expanded ? showLess : showMore}
            >
              {expanded ? 'Ver menos' : `Ver más (${hiddenCount})`}
              <span className="material-symbols-outlined text-xl" aria-hidden>
                {expanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
