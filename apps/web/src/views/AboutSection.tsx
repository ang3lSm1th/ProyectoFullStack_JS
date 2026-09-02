import { ABOUT } from '@/shared/aboutContent';

import { BrandBadge } from '@/components/BrandBadge';

import { InterestBadge } from '@/components/InterestBadge';



export function AboutSection() {

  return (

    <section id="sobre-mi" className="scroll-mt-20 bg-surface-container py-20 md:py-[var(--spacing-section)]">

      <div className="mx-auto w-full max-w-[var(--max-width-container)] space-y-16 px-6 sm:px-10">

        <header className="max-w-3xl">

          <p className="label-caps text-primary">{ABOUT.eyebrow}</p>

          <h2 className="font-display mt-4 text-[2rem] leading-[1.15] font-semibold tracking-tight text-foreground sm:text-4xl">

            {ABOUT.title}

          </h2>

          <p className="mt-4 text-left text-base leading-7 text-foreground sm:text-lg">

            {ABOUT.introLead}

          </p>

          <p className="mt-3 max-w-2xl text-base leading-7 text-on-surface-variant sm:text-lg">

            {ABOUT.introRest}

          </p>

        </header>



        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">

          <div className="space-y-0 divide-y divide-outline-variant border-y border-outline-variant">

            {ABOUT.blocks.map((block) => (

              <article

                key={block.id}

                className="grid gap-4 py-8 sm:grid-cols-[4.5rem_1fr] sm:gap-6"

              >

                <p className="label-caps text-primary/80">{block.id}</p>

                <div>

                  <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight text-foreground">

                    {block.title}

                  </h3>

                  <p className="mt-3 max-w-xl text-[0.98rem] leading-7 text-on-surface-variant">

                    {block.body}

                  </p>

                </div>

              </article>

            ))}

          </div>



          <aside>

            <div className="lg:sticky lg:top-24">

              <p className="label-caps text-on-surface-variant">Intereses</p>

              <ul className="mt-5 grid gap-3">

                {ABOUT.interests.map((item) => (

                  <InterestBadge

                    key={item.name}

                    name={item.name}

                    detail={item.detail}

                    icon={item.icon}

                  />

                ))}

              </ul>

            </div>

          </aside>

        </div>



        <div className="space-y-12 border-t border-outline-variant pt-14">

          <div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="label-caps text-on-surface-variant">Stack técnico</p>

                <p className="font-display mt-2 text-xl font-semibold text-foreground">

                  Tecnologías con las que construyo

                </p>

              </div>

              <div className="h-1 w-16 bg-primary-container" aria-hidden />

            </div>

            <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">

              {ABOUT.stack.map((item) => (

                <BrandBadge key={item.name} item={item} />

              ))}

            </ul>

          </div>



          <div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="label-caps text-on-surface-variant">Herramientas de IA</p>

                <p className="font-display mt-2 text-xl font-semibold text-foreground">

                  Mi flujo con agentes y copilots

                </p>

              </div>

              <div className="h-1 w-16 bg-primary-container" aria-hidden />

            </div>

            <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-6">

              {ABOUT.aiTools.map((item) => (

                <BrandBadge key={item.name} item={item} accent />

              ))}

            </ul>

          </div>

        </div>

      </div>

    </section>

  );

}


