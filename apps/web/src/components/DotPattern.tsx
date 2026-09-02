type Props = {
  className?: string;
};

export function DotPattern({ className = '' }: Props) {
  return (
    <div
      aria-hidden
      className={`bg-dot-pattern pointer-events-none absolute inset-0 opacity-30 ${className}`}
    />
  );
}
