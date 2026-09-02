import { CUSTOM_SOFTWARE_TAGS } from '@/shared/servicesContent';

type Props = {
  title: string;
  description: string;
};

export function CustomSoftwareFeature({ title, description }: Props) {
  return (
    <article className="card-surface ambient-shadow flex flex-col items-center gap-8 p-6 md:flex-row md:p-8">
      <div className="md:w-1/2">
        <span
          className="material-symbols-outlined mb-4 block text-[48px] text-primary"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          terminal
        </span>
        <h3 className="font-display text-2xl font-bold text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant md:text-base">
          {description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {CUSTOM_SOFTWARE_TAGS.map((tag, index) => (
            <li
              key={tag}
              className={index === 0 ? 'chip chip-accent' : 'chip'}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-1/2">
        <div className="overflow-x-auto rounded border-l-2 border-primary-container bg-[#020617] p-4 font-mono text-sm leading-relaxed">
          <pre className="text-on-surface-variant">
            <code>
              <span className="text-[#64748b]">{'// Arquitectura del producto\n'}</span>
              <span className="text-[#c678dd]">interface </span>
              <span className="text-[#e5c07b]">ProductStack </span>
              {'{\n  '}
              <span className="text-primary-container">web</span>
              {': '}
              <span className="text-[#c678dd]">NextJsApp</span>
              {';\n  '}
              <span className="text-primary-container">api</span>
              {': '}
              <span className="text-[#c678dd]">NestService</span>
              {';\n  '}
              <span className="text-primary-container">data</span>
              {': '}
              <span className="text-[#c678dd]">PostgreSQL</span>
              {';\n}\n\n'}
              <span className="text-[#c678dd]">class </span>
              <span className="text-[#e5c07b]">CustomSolution </span>
              <span className="text-[#c678dd]">implements </span>
              ProductStack {'{\n  '}
              <span className="text-[#c678dd]">async </span>
              <span className="text-primary-container">deliver</span>
              {'() {\n    '}
              <span className="text-[#64748b]">{'/* MVP → producción */'}</span>
              {'\n    '}
              <span className="text-[#c678dd]">return </span>
              <span className="text-[#c678dd]">await </span>
              pipeline.ship();
              {'\n  }\n}'}
            </code>
          </pre>
        </div>
      </div>
    </article>
  );
}
