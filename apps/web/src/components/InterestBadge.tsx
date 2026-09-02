type InterestIcon = 'travel' | 'paw' | 'car' | 'ball' | 'swim' | 'game' | 'ai';

type Props = {
  name: string;
  detail: string;
  icon: InterestIcon;
};

function InterestSvg({ icon }: { icon: InterestIcon }) {
  const props = {
    viewBox: '0 0 48 48',
    className: 'h-7 w-7',
    'aria-hidden': true as const,
  };

  switch (icon) {
    case 'travel':
      return (
        <svg {...props}>
          <path
            fill="currentColor"
            d="M10 34h28v3H10zm4.2-3 2.4-10.5A3 3 0 0 1 19.5 18h9a3 3 0 0 1 2.9 2.5L33.8 31H14.2zm7.3-16.5V12a2.5 2.5 0 0 1 2.5-2.5h0A2.5 2.5 0 0 1 26.5 12v2.5h-5z"
            opacity="0.95"
          />
          <path
            fill="currentColor"
            d="M16 34.5a2.8 2.8 0 1 0 0.1 0zm16 0a2.8 2.8 0 1 0 0.1 0z"
            opacity="0.55"
          />
        </svg>
      );
    case 'paw':
      return (
        <svg {...props}>
          <ellipse cx="16" cy="16" rx="4" ry="5" fill="currentColor" />
          <ellipse cx="32" cy="16" rx="4" ry="5" fill="currentColor" />
          <ellipse cx="12" cy="26" rx="3.5" ry="4.2" fill="currentColor" />
          <ellipse cx="36" cy="26" rx="3.5" ry="4.2" fill="currentColor" />
          <path
            fill="currentColor"
            d="M24 40c5.5 0 9-4.2 9-8.2 0-3.4-3.5-5.3-7.2-3.4L24 30l-1.8-1.6C18.5 26.5 15 28.4 15 31.8 15 35.8 18.5 40 24 40z"
          />
        </svg>
      );
    case 'car':
      return (
        <svg {...props}>
          <path
            fill="currentColor"
            d="M9 29h30l-2.2-9.2A4 4 0 0 0 32.9 17H15.1a4 4 0 0 0-3.9 2.8L9 29z"
          />
          <path
            fill="currentColor"
            d="M12 29v4h3v-4zm21 0v4h3v-4zM14 22.5h20"
            opacity="0.55"
          />
          <circle cx="15.5" cy="34.5" r="3" fill="currentColor" />
          <circle cx="32.5" cy="34.5" r="3" fill="currentColor" />
          <circle cx="15.5" cy="34.5" r="1.2" fill="#101415" />
          <circle cx="32.5" cy="34.5" r="1.2" fill="#101415" />
        </svg>
      );
    case 'ball':
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="14" fill="currentColor" opacity="0.2" />
          <circle
            cx="24"
            cy="24"
            r="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M24 10v28M11.5 18.5h25M11.5 29.5h25M16.5 12.5c3.5 4 3.5 19 0 23M31.5 12.5c-3.5 4-3.5 19 0 23"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case 'swim':
      return (
        <svg {...props}>
          <circle cx="33" cy="14" r="4" fill="currentColor" />
          <path
            d="M8 26c3-2.2 6-2.2 9 0s6 2.2 9 0 6-2.2 9 0 6 2.2 9 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M8 33c3-2.2 6-2.2 9 0s6 2.2 9 0 6-2.2 9 0 6 2.2 9 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      );
    case 'game':
      return (
        <svg {...props}>
          <rect x="6" y="16" width="36" height="18" rx="7" fill="currentColor" />
          <path
            d="M16 25h6M19 22v6"
            stroke="#101415"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="30.5" cy="23.5" r="1.6" fill="#101415" />
          <circle cx="34.5" cy="27" r="1.6" fill="#101415" />
        </svg>
      );
    case 'ai':
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="7" fill="currentColor" />
          <circle cx="24" cy="8" r="2.2" fill="currentColor" />
          <circle cx="24" cy="40" r="2.2" fill="currentColor" />
          <circle cx="8" cy="24" r="2.2" fill="currentColor" />
          <circle cx="40" cy="24" r="2.2" fill="currentColor" />
          <circle cx="12.5" cy="12.5" r="2" fill="currentColor" opacity="0.75" />
          <circle cx="35.5" cy="12.5" r="2" fill="currentColor" opacity="0.75" />
          <circle cx="12.5" cy="35.5" r="2" fill="currentColor" opacity="0.75" />
          <circle cx="35.5" cy="35.5" r="2" fill="currentColor" opacity="0.75" />
          <path
            d="M24 10v5M24 33v5M10 24h5M33 24h5M15 15l3.2 3.2M29.8 29.8 33 33M33 15l-3.2 3.2M15 33l3.2-3.2"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.45"
          />
        </svg>
      );
  }
}

export function InterestBadge({ name, detail, icon }: Props) {
  return (
    <li className="group card-surface flex items-start gap-4 px-4 py-4 hover:border-primary-container">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary-container/10 text-primary-container transition group-hover:bg-primary-container/20">
        <InterestSvg icon={icon} />
      </span>
      <span className="min-w-0 pt-0.5">
        <span className="block font-display text-base leading-tight font-semibold text-foreground">
          {name}
        </span>
        <span className="mt-1 block text-sm leading-snug text-on-surface-variant">
          {detail}
        </span>
      </span>
    </li>
  );
}
