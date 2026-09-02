import type { ProjectDto } from '@/models/types';

type Props = {
  project: ProjectDto;
};

export function ProjectCard({ project }: Props) {
  return (
    <li className="card-surface flex flex-col gap-4 p-6 md:p-8">
      <div className="flex flex-wrap items-baseline gap-3">
        <h3 className="font-display text-2xl font-semibold text-foreground">
          {project.title}
        </h3>
        {project.featured ? (
          <span className="chip chip-accent">Destacado</span>
        ) : null}
      </div>
      <p className="max-w-2xl text-on-surface-variant">{project.summary}</p>
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            className="inline-flex items-center gap-1 text-primary transition hover:text-primary-container"
            target="_blank"
            rel="noreferrer"
          >
            Ver demo
            <span className="material-symbols-outlined text-base">open_in_new</span>
          </a>
        ) : null}
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            className="inline-flex items-center gap-1 text-primary transition hover:text-primary-container"
            target="_blank"
            rel="noreferrer"
          >
            Código
            <span className="material-symbols-outlined text-base">code</span>
          </a>
        ) : null}
      </div>
    </li>
  );
}
