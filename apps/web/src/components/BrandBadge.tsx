'use client';

import { useEffect, useRef, useState } from 'react';
import type { BrandItem } from '@/shared/aboutContent';

type Props = {
  item: BrandItem;
  accent?: boolean;
};

function monogram(name: string) {
  return name
    .split(/[\s/]+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function BrandBadge({ item, accent = false }: Props) {
  const rootRef = useRef<HTMLLIElement>(null);
  const [shouldLoadIcon, setShouldLoadIcon] = useState(Boolean(item.iconUrl));
  const color = item.color ?? '06b6d4';
  const src =
    item.iconUrl ??
    (item.slug && shouldLoadIcon
      ? `https://cdn.simpleicons.org/${item.slug}/${color}`
      : null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (shouldLoadIcon || item.iconUrl) return;

    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadIcon(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [item.iconUrl, shouldLoadIcon]);

  return (
    <li
      ref={rootRef}
      className={`card-surface flex flex-col items-center gap-3 px-3 py-4 text-center ${
        accent ? 'hover:border-primary-container' : ''
      }`}
    >
      <span className="flex h-10 w-10 items-center justify-center">
        {src && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center border border-primary/50 font-mono text-xs font-semibold tracking-wide text-primary">
            {monogram(item.name)}
          </span>
        )}
      </span>
      <span className="font-mono text-[0.65rem] leading-tight tracking-wide text-on-surface-variant uppercase">
        {item.name}
      </span>
    </li>
  );
}
