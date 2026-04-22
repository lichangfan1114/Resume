import type { AvatarShape } from "@/lib/schema";

interface Props {
  shape?: AvatarShape;
  className?: string;
}

export default function DefaultAvatar({ shape = "circle", className }: Props) {
  if (shape === "rectangle") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 90 120"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        aria-hidden
      >
        <defs>
          <linearGradient id="avatar-bg-rect" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4f4f5" />
            <stop offset="100%" stopColor="#d4d4d8" />
          </linearGradient>
        </defs>
        <rect width="90" height="120" fill="url(#avatar-bg-rect)" />
        <circle cx="45" cy="52" r="16" fill="#a1a1aa" />
        <path
          d="M14 118 C 20 96, 34 87, 45 87 C 56 87, 70 96, 76 118 Z"
          fill="#a1a1aa"
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="avatar-bg-circle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4f4f5" />
          <stop offset="100%" stopColor="#d4d4d8" />
        </linearGradient>
      </defs>
      <circle cx="48" cy="48" r="48" fill="url(#avatar-bg-circle)" />
      <circle cx="48" cy="40" r="13" fill="#a1a1aa" />
      <path
        d="M20 82 C 24 66, 38 60, 48 60 C 58 60, 72 66, 76 82 Z"
        fill="#a1a1aa"
      />
    </svg>
  );
}
