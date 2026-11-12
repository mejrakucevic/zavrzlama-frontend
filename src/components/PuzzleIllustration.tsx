function PuzzleIllustration() {
  return (
    <svg
      className="puzzle-illustration"
      viewBox="0 0 360 360"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="180" cy="180" r="151" fill="none" stroke="currentColor" strokeOpacity="0.16" />
      <g transform="translate(64 60) rotate(-8 112 112)">
        <rect x="9" y="10" width="232" height="232" rx="13" fill="currentColor" />
        <rect width="232" height="232" rx="13" fill="var(--color-paper)" stroke="currentColor" strokeWidth="2" />

        <rect x="12" y="12" width="100" height="100" rx="6" fill="var(--color-mustard)" stroke="currentColor" strokeWidth="1.5" />
        <text x="62" y="85" textAnchor="middle" fill="currentColor" fontFamily="Georgia, serif" fontSize="70" fontWeight="bold">A</text>

        <rect x="120" y="12" width="100" height="100" rx="6" fill="var(--color-coral)" stroke="currentColor" strokeWidth="1.5" />
        <path d="M170 27 179 49 201 40 192 62 214 71 192 80 201 102 179 93 170 115 161 93 139 102 148 80 126 71 148 62 139 40 161 49Z" transform="translate(0 -9)" fill="var(--color-paper)" stroke="currentColor" strokeWidth="1.5" />

        <rect x="12" y="120" width="100" height="100" rx="6" fill="var(--color-cobalt)" stroke="currentColor" strokeWidth="1.5" />
        <g fill="var(--color-paper)">
          <rect x="31" y="139" width="18" height="18" />
          <rect x="53" y="139" width="18" height="18" />
          <rect x="75" y="139" width="18" height="18" />
          <rect x="53" y="161" width="18" height="18" />
          <rect x="31" y="183" width="18" height="18" />
          <rect x="53" y="183" width="18" height="18" />
          <rect x="75" y="183" width="18" height="18" />
        </g>

        <rect x="120" y="120" width="100" height="100" rx="6" fill="var(--color-sage)" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="170" cy="170" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="170" cy="170" rx="14" ry="30" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M140 170h60m-56-14h52m-52 28h52" fill="none" stroke="currentColor" strokeWidth="2" />
      </g>
    </svg>
  )
}

export default PuzzleIllustration
