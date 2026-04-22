interface IconProps {
  size?: number;
  className?: string;
}

export function GithubIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 .296a12 12 0 0 0-3.793 23.39c.6.111.82-.26.82-.577 0-.287-.011-1.24-.017-2.25-3.338.726-4.042-1.416-4.042-1.416-.547-1.39-1.336-1.758-1.336-1.758-1.091-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.494.998.108-.775.419-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.382 1.236-3.221-.124-.304-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23a11.47 11.47 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.839 1.235 1.911 1.235 3.221 0 4.61-2.805 5.624-5.478 5.92.43.37.814 1.102.814 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576A12.001 12.001 0 0 0 12 .296Z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.447 20.452H16.89v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.94v5.666H9.347V9h3.414v1.561h.05c.476-.9 1.635-1.852 3.363-1.852 3.6 0 4.268 2.37 4.268 5.455v6.288ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126ZM7.114 20.452H3.559V9h3.555v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

export function TwitterIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.215-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
