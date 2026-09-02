import { SITE_NAME } from '@/shared/constants';

const CODE_LINES: Array<{ parts: Array<{ t: string; k?: boolean; c?: boolean }> }> = [
  { parts: [{ t: 'import', k: true }, { t: ' { FullStackEngineer } ' }, { t: 'from', k: true }, { t: " '@portfolio/core';" }] },
  { parts: [] },
  { parts: [{ t: 'const', c: true }, { t: ' engineer = ' }, { t: 'new', k: true }, { t: ' FullStackEngineer({' }] },
  { parts: [{ t: '  name: ' }, { t: `'${SITE_NAME}'`, c: true }, { t: ',' }] },
  { parts: [{ t: '  stack: [' }, { t: "'Next.js'", c: true }, { t: ', ' }, { t: "'NestJS'", c: true }, { t: ', ' }, { t: "'PostgreSQL'", c: true }, { t: '],' }] },
  { parts: [{ t: '  focus: [' }, { t: "'Web'", c: true }, { t: ', ' }, { t: "'IA'", c: true }, { t: ', ' }, { t: "'Datos'", c: true }, { t: '],' }] },
  { parts: [{ t: '  status: ' }, { t: "'Disponible'", c: true }] },
  { parts: [{ t: '});' }] },
  { parts: [] },
  { parts: [{ t: 'engineer.' }, { t: 'buildProduct', k: true }, { t: '()' }] },
  { parts: [{ t: "  .then(() => 'Listo para consultoría.')" }] },
  { parts: [{ t: '  .catch(err => engineer.resolve(err));' }] },
];

export function HeroCodePanel() {
  return (
    <div className="relative overflow-hidden rounded-r border-l-2 border-primary-container bg-surface-container-lowest p-6 shadow-2xl">
      <div className="label-caps absolute top-3 right-3 text-[10px] text-outline">
        profile.ts
      </div>
      <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-on-surface-variant">
        <code>
          {CODE_LINES.map((line, index) => (
            <span key={index} className="block">
              {line.parts.map((part, partIndex) => (
                <span
                  key={partIndex}
                  className={
                    part.k
                      ? 'text-primary-container'
                      : part.c
                        ? 'text-[#a3defe]'
                        : undefined
                  }
                >
                  {part.t}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
