import type { ProjectDto } from '@/models/types';



type Props = {

  projects: ProjectDto[];

};



export function ProjectsSection({ projects }: Props) {

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

          {projects.map((project) => (

            <li

              key={project.id}

              className="card-surface flex flex-col gap-4 p-6 md:p-8"

            >

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

          ))}

        </ul>

      </div>

    </section>

  );

}


