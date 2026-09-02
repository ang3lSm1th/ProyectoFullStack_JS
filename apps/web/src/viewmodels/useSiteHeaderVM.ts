'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '@/shared/constants';

const SECTION_HREFS = [...NAV_LINKS.map((link) => link.href), '#contacto'] as const;
const SCROLL_LOCK_MS = 800;

function resolveActiveSection(): string {
  const header = document.querySelector('header');
  const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 80;
  const probe = headerHeight + 88;
  let active: string = NAV_LINKS[0].href;

  for (const href of SECTION_HREFS) {
    const section = document.getElementById(href.slice(1));
    if (!section) continue;
    if (section.getBoundingClientRect().top <= probe) {
      active = href;
    }
  }

  return active;
}

export function useSiteHeaderVM() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(NAV_LINKS[0].href);
  const lockedHref = useRef<string | null>(null);
  const lockTimer = useRef<number | null>(null);

  const updateFromScroll = useCallback(() => {
    setScrolled(window.scrollY > 12);
    if (lockedHref.current) {
      setActiveHref(lockedHref.current);
      return;
    }
    setActiveHref(resolveActiveSection());
  }, []);

  useEffect(() => {
    updateFromScroll();
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll, { passive: true });
    window.addEventListener('hashchange', updateFromScroll);
    return () => {
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
      window.removeEventListener('hashchange', updateFromScroll);
      if (lockTimer.current !== null) window.clearTimeout(lockTimer.current);
    };
  }, [updateFromScroll]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const selectSection = (href: string) => {
    lockedHref.current = href;
    setActiveHref(href);
    setOpen(false);
    if (lockTimer.current !== null) window.clearTimeout(lockTimer.current);
    lockTimer.current = window.setTimeout(() => {
      lockedHref.current = null;
      setActiveHref(resolveActiveSection());
      setScrolled(window.scrollY > 12);
    }, SCROLL_LOCK_MS);
  };

  const navLinkClass = (href: string) =>
    href === activeHref
      ? 'border-b-2 border-primary pb-1 font-bold text-primary'
      : 'text-on-surface-variant hover:text-primary';

  const mobileNavLinkClass = (href: string) =>
    href === activeHref ? 'font-bold text-primary' : 'text-foreground';

  return {
    open,
    setOpen,
    scrolled,
    activeHref,
    closeMenu,
    selectSection,
    navLinkClass,
    mobileNavLinkClass,
    isContactActive: activeHref === '#contacto',
    isActive: (href: string) => href === activeHref,
  };
}
