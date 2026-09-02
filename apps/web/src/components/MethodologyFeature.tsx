import { METHODOLOGY_INTRO, METHODOLOGY_STEPS } from '@/shared/servicesContent';

type Props = {
  title: string;
  description: string;
};

export function MethodologyFeature({ title, description }: Props) {
  return (
    <div className="border-t border-outline-variant pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant md:text-base">
          {description || METHODOLOGY_INTRO}
        </p>
      </div>
      <ol className="relative mt-12 grid gap-6 md:grid-cols-4">
        <div
          aria-hidden
          className="absolute top-1/2 right-0 left-0 hidden h-px -translate-y-1/2 bg-outline-variant md:block"
        />
        {METHODOLOGY_STEPS.map((item) => (
          <li
            key={item.step}
            className="card-surface ambient-shadow relative z-10 flex flex-col items-center p-6 text-center"
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background font-display text-xl font-bold text-primary">
              {item.step}
            </span>
            <h4 className="font-display font-bold text-foreground">{item.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
