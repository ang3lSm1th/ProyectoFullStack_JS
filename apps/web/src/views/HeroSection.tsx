import { DotPattern } from '@/components/DotPattern';
import { HeroCodePanel } from '@/components/HeroCodePanel';
import { HERO } from '@/shared/heroContent';

export function HeroSection() {
  const [headlineLead, ...headlineRest] = HERO.headline.split('.');
  const headlineTail = headlineRest.join('.').trim();

  return (
    <section
      id="inicio"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-[120px]"
    >
      <DotPattern />
      <div className="relative z-10 mx-auto flex max-w-[var(--max-width-container)] flex-col items-center gap-16 px-6 sm:px-10 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:w-3/5">
          <div className="flex items-center gap-3">
            <span
              className="material-symbols-outlined text-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              terminal
            </span>
            <span className="label-caps text-primary">{HERO.brand}</span>
          </div>
          <h1 className="font-display text-[2rem] leading-[1.15] font-semibold tracking-tight text-foreground md:text-[4rem] md:leading-[1.1]">
            {headlineLead.trim()}.
            {headlineTail ? (
              <>
                {' '}
                <span className="text-primary-container">{headlineTail}</span>
              </>
            ) : null}
          </h1>
          <p className="max-w-[600px] text-lg leading-relaxed text-on-surface-variant">
            {HERO.supporting}
          </p>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <a href="#contacto" className="btn-primary">
              {HERO.ctaLabel}
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </a>
            <a href="#proyectos" className="btn-secondary">
              Ver proyectos
              <span className="material-symbols-outlined text-[20px]">code</span>
            </a>
          </div>
        </div>
        <div className="w-full md:w-2/5">
          <HeroCodePanel />
        </div>
      </div>
    </section>
  );
}
