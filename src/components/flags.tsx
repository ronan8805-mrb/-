import type { ReactNode } from "react";

type FlagProps = { title: string };

function FlagFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 22 16" className="h-4 w-6 shrink-0 overflow-hidden rounded-sm" role="img" aria-label={title}>
      {children}
    </svg>
  );
}

export function FlagUS({ title }: FlagProps) {
  return (
    <FlagFrame title={title}>
      <rect width="22" height="16" fill="#b22234" />
      <path d="M0 2h22M0 6h22M0 10h22M0 14h22" stroke="#fff" strokeWidth="1.15" />
      <rect width="9" height="8.2" fill="#3c3b6e" />
    </FlagFrame>
  );
}

export function FlagIE({ title }: FlagProps) {
  return (
    <FlagFrame title={title}>
      <rect width="22" height="16" fill="#fff" />
      <rect width="7.4" height="16" fill="#169b62" />
      <rect x="14.6" width="7.4" height="16" fill="#ff883e" />
    </FlagFrame>
  );
}

export function FlagGB({ title }: FlagProps) {
  return (
    <FlagFrame title={title}>
      <rect width="22" height="16" fill="#012169" />
      <path d="M0 0l22 16M22 0L0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0l22 16M22 0L0 16" stroke="#c8102e" strokeWidth="1.4" />
      <path d="M11 0v16M0 8h22" stroke="#fff" strokeWidth="5" />
      <path d="M11 0v16M0 8h22" stroke="#c8102e" strokeWidth="2.4" />
    </FlagFrame>
  );
}

export function FlagDE({ title }: FlagProps) {
  return (
    <FlagFrame title={title}>
      <rect width="22" height="16" fill="#ffce00" />
      <rect width="22" height="5.34" fill="#000" />
      <rect y="5.34" width="22" height="5.33" fill="#dd0000" />
    </FlagFrame>
  );
}

export function FlagES({ title }: FlagProps) {
  return (
    <FlagFrame title={title}>
      <rect width="22" height="16" fill="#c60b1e" />
      <rect y="4" width="22" height="8" fill="#ffc400" />
    </FlagFrame>
  );
}

export function FlagTH({ title }: FlagProps) {
  return (
    <FlagFrame title={title}>
      <rect width="22" height="16" fill="#fff" />
      <rect width="22" height="2.7" fill="#a51931" />
      <rect y="13.3" width="22" height="2.7" fill="#a51931" />
      <rect y="5.2" width="22" height="5.6" fill="#2d2a4a" />
    </FlagFrame>
  );
}

export const ORIGINS = [
  { city: "Los Angeles", Flag: FlagUS },
  { city: "Dublin", Flag: FlagIE },
  { city: "Manchester", Flag: FlagGB },
  { city: "London", Flag: FlagGB },
  { city: "Berlin", Flag: FlagDE },
  { city: "Barcelona", Flag: FlagES },
] as const;
