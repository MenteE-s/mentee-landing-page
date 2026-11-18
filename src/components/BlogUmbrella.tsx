export function BlogUmbrella({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 640"
      fill="none"
      aria-hidden
      className={className}
      role="img"
    >
      {/* pole (upper segment, behind canopy edge) */}
      <path
        d="M300 258 V 405"
        stroke="#171717"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* pole (lower segment, below the hand) */}
      <path
        d="M300 512 V 538"
        stroke="#171717"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* J-handle */}
      <path
        d="M300 538 a 42 42 0 0 0 42 42 h 26"
        stroke="#171717"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* canopy */}
      <path
        d="M300 42
           C 165 42, 62 152, 62 262
           Q 101 218, 140 262
           Q 180 218, 220 262
           Q 260 218, 300 262
           Q 340 218, 380 262
           Q 420 218, 460 262
           Q 499 218, 538 262
           C 538 152, 435 42, 300 42 Z"
        fill="#171717"
      />
      {/* panel ribs (cream cut-out lines) */}
      <path
        d="M300 46 L140 256 M300 46 L220 256 M300 46 L300 256 M300 46 L380 256 M300 46 L460 256"
        stroke="#F2EAD9"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* finial tip */}
      <path
        d="M300 42 V 18"
        stroke="#171717"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* hand: palm block */}
      <rect x="255" y="400" width="92" height="115" rx="26" fill="#171717" />
      {/* finger cut lines */}
      <path
        d="M256 436 H 344 M256 464 H 344 M256 492 H 344"
        stroke="#F2EAD9"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* thumb */}
      <ellipse
        cx="351"
        cy="428"
        rx="14"
        ry="27"
        transform="rotate(-24 351 428)"
        fill="#171717"
        stroke="#F2EAD9"
        strokeWidth="4"
      />
    </svg>
  );
}
