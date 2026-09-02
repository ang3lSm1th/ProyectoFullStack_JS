'use client';

import { NAV_LINKS, SITE_NAME } from '@/shared/constants';
import { useSiteHeaderVM } from '@/viewmodels/useSiteHeaderVM';

export function SiteHeader() {
  const {
    open,
    setOpen,
    scrolled,
    selectSection,
    navLinkClass,
    mobileNavLinkClass,
    isContactActive,
    isActive,
  } = useSiteHeaderVM();

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-outline-variant bg-background/95 backdrop-blur-md'
          : 'border-transparent bg-background'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[var(--max-width-container)] items-center justify-between px-6 sm:px-10">
        <a
          href="#inicio"
          className="font-display text-xl font-bold text-primary transition hover:text-primary-container sm:text-2xl"
          onClick={() => selectSection('#inicio')}
        >
          {SITE_NAME}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`font-display text-lg transition ${navLinkClass(link.href)}`}
              onClick={() => selectSection(link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            aria-current={isContactActive ? 'page' : undefined}
            className={`btn-primary px-6 py-2.5 text-sm ${isContactActive ? 'ring-2 ring-primary/40' : ''}`}
            onClick={() => selectSection('#contacto')}
          >
            Hablemos
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-outline-variant bg-background px-6 py-6 md:hidden"
          aria-label="Móvil"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`block font-display text-lg ${mobileNavLinkClass(link.href)}`}
                  onClick={() => selectSection(link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contacto"
                aria-current={isContactActive ? 'page' : undefined}
                className={`btn-primary mt-2 inline-flex text-sm ${isContactActive ? 'ring-2 ring-primary/40' : ''}`}
                onClick={() => selectSection('#contacto')}
              >
                Hablemos
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
