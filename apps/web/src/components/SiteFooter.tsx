import { SITE_NAME } from '@/shared/constants';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-outline-variant bg-surface-container-lowest">
      <div className="mx-auto flex max-w-[var(--max-width-container)] flex-col items-center justify-between gap-6 px-6 py-12 sm:px-10 md:flex-row md:items-start">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="font-display text-2xl font-bold text-foreground">{SITE_NAME}</p>
          <p className="text-sm text-on-surface-variant">
            © {year} {SITE_NAME}. Fullstack · IA · Consultoría.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-on-surface-variant">
          <a href="#inicio" className="transition hover:text-primary">
            Inicio
          </a>
          <a href="#sobre-mi" className="transition hover:text-primary">
            Sobre mí
          </a>
          <a href="#contacto" className="transition hover:text-primary">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
