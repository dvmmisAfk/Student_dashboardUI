export default function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F8EF7" />
          <stop offset="0.5" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
        <filter id="logo-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Hexagonal base */}
      <path
        d="M14 2L25.26 8.5V21.5L14 28L2.74 21.5V8.5L14 2Z"
        fill="url(#logo-grad)"
        opacity="0.15"
      />
      <path
        d="M14 2L25.26 8.5V21.5L14 28L2.74 21.5V8.5L14 2Z"
        stroke="url(#logo-grad)"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      {/* Neural node center */}
      <circle cx="14" cy="14" r="2.5" fill="url(#logo-grad)" filter="url(#logo-glow)" />
      {/* Connection lines */}
      <line x1="14" y1="11.5" x2="14" y2="5"  stroke="#acc7ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <line x1="14" y1="16.5" x2="14" y2="23" stroke="#22D3EE" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <line x1="11.8" y1="12.8" x2="6.5" y2="9.6" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="16.2" y1="15.2" x2="21.5" y2="18.4" stroke="#4F8EF7" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      {/* Satellite nodes */}
      <circle cx="14"   cy="4.5"  r="1.2" fill="#acc7ff" opacity="0.9" />
      <circle cx="14"   cy="23.5" r="1.2" fill="#22D3EE" opacity="0.9" />
      <circle cx="5.5"  cy="9"    r="1.2" fill="#8B5CF6" opacity="0.9" />
      <circle cx="22.5" cy="19"   r="1.2" fill="#4F8EF7" opacity="0.9" />
    </svg>
  );
}
