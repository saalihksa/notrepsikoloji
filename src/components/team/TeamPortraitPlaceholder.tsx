type TeamPortraitPlaceholderProps = {
  seed: number
}

function hueFromSeed(seed: number) {
  return 18 + (seed * 17) % 28
}

export function TeamPortraitPlaceholder({ seed }: TeamPortraitPlaceholderProps) {
  const hue = hueFromSeed(seed)
  const bg = `hsl(${hue} 18% 92%)`
  const figure = `hsl(${hue} 12% 72%)`
  const watermark = `hsl(${hue} 10% 55%)`

  return (
    <svg
      className="team-portrait__placeholder"
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="500" fill={bg} />
      <g opacity="0.22" fill={watermark} fontFamily="sans-serif" fontSize="28" fontWeight="600">
        <text x="40" y="120" transform="rotate(-24 40 120)">
          DEMO
        </text>
        <text x="180" y="260" transform="rotate(-24 180 260)">
          DEMO
        </text>
        <text x="60" y="400" transform="rotate(-24 60 400)">
          DEMO
        </text>
      </g>
      <ellipse cx="200" cy="128" rx="52" ry="58" fill={figure} />
      <path
        d="M118 210c18-34 52-52 82-52s64 18 82 52c14 26 20 58 20 92v118H98V302c0-34 6-66 20-92z"
        fill={figure}
      />
      <rect x="0" y="420" width="400" height="80" fill={bg} opacity="0.35" />
    </svg>
  )
}
