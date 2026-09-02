import { CustomSoftwareFeature } from '@/components/CustomSoftwareFeature';
import { MethodologyFeature } from '@/components/MethodologyFeature';
import type { ServiceDto } from '@/models/types';

type Props = {
  services: ServiceDto[];
};

const SERVICE_ICONS: Record<string, string> = {
  web: 'language',
  fullstack: 'layers',
  data: 'monitoring',
};

const DEFAULT_ICONS = ['language', 'layers', 'monitoring'] as const;

const FEATURED_ICONS = new Set(['custom', 'methodology']);

function partitionServices(services: ServiceDto[]) {
  const standard = services.filter((s) => !FEATURED_ICONS.has(s.icon ?? ''));
  const custom = services.find((s) => s.icon === 'custom');
  const methodology = services.find((s) => s.icon === 'methodology');
  return { standard, custom, methodology };
}

export function ServicesSection({ services }: Props) {
  const { standard, custom, methodology } = partitionServices(services);

  return (
    <section id="servicios" className="scroll-mt-20 py-20 md:py-[var(--spacing-section)]">
      <div className="mx-auto w-full max-w-[var(--max-width-container)] space-y-16 px-6 sm:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="label-caps text-primary">Servicios</p>
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Cómo puedo ayudarte
          </h2>
          <div className="h-1 w-16 bg-primary-container" aria-hidden />
        </div>

        {standard.length > 0 ? (
          <div>
            <h3 className="font-display mb-8 text-xl font-bold text-foreground sm:text-2xl">
              Capacidades técnicas
            </h3>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {standard.map((service, index) => (
                <li key={service.id} className="card-surface flex flex-col gap-4 p-6">
                  <div className="mb-1 flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-[32px] text-primary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {SERVICE_ICONS[service.icon ?? ''] ??
                        DEFAULT_ICONS[index % DEFAULT_ICONS.length]}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {service.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {custom ? (
          <CustomSoftwareFeature
            title={custom.title}
            description={custom.description}
          />
        ) : null}

        {methodology ? (
          <MethodologyFeature
            title={methodology.title}
            description={methodology.description}
          />
        ) : null}
      </div>
    </section>
  );
}
