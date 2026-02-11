interface JownaLogoIconProps {
  className?: string;
}

export function JownaLogoIcon({ className }: JownaLogoIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      role="img"
      aria-label="Jowna logo"
      focusable="false"
    >
      <path
        d="M 128.000 12.000 A 116 116 0 0 1 221.846 196.183 L 170.069 158.565 A 52 52 0 0 0 128.000 76.000 Z"
        fill="#d88c8c"
        stroke="#243f71"
        strokeWidth="8"
      />
      <path
        d="M 221.846 196.183 A 116 116 0 0 1 17.677 163.846 L 78.545 144.069 A 52 52 0 0 0 170.069 158.565 Z"
        fill="#d8b18c"
        stroke="#243f71"
        strokeWidth="8"
      />
      <path
        d="M 17.677 163.846 A 116 116 0 0 1 34.154 59.817 L 85.931 97.435 A 52 52 0 0 0 78.545 144.069 Z"
        fill="#c28cd8"
        stroke="#243f71"
        strokeWidth="8"
      />
      <path
        d="M 34.154 59.817 A 116 116 0 0 1 128.000 12.000 L 128.000 76.000 A 52 52 0 0 0 85.931 97.435 Z"
        fill="#d0d88c"
        stroke="#243f71"
        strokeWidth="8"
      />
      <circle cx="128" cy="128" r="116" fill="none" stroke="#243f71" strokeWidth="8" />
      <circle cx="128" cy="128" r="52" fill="#f6f8f7" stroke="#243f71" strokeWidth="8" />
    </svg>
  );
}
