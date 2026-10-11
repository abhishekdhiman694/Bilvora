import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("group inline-flex items-center gap-3 select-none", className)}>
      <div className="relative flex items-center justify-center">
        {/* Subtle ambient bloom on hover */}
        <div className="absolute inset-0 rounded-full bg-electric/25 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="relative shrink-0 transition-transform duration-500 ease-out group-hover:scale-105"
        >
          <defs>
            {/* Top Facet: Shimmering Ice to Electric Blue */}
            <linearGradient id="bv-facet-top" x1="16" y1="3" x2="16" y2="15" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="50%" stopColor="#4d7dff" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            {/* Left Facet: Deep Electric Cobalt to Navy */}
            <linearGradient id="bv-facet-left" x1="5" y1="10" x2="15" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="55%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>

            {/* Right Facet: Radiant Electric Violet to Deep Indigo */}
            <linearGradient id="bv-facet-right" x1="17" y1="12" x2="27" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="55%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>

            {/* Core Glow Apex */}
            <radialGradient id="bv-core-glow" cx="16" cy="16" r="6" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#8fb0ff" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Subtle ambient back-glow behind the prism */}
          <circle cx="16" cy="16" r="9" fill="url(#bv-core-glow)" opacity="0.35" />

          {/* Top Facet: Isometric Upper Roof */}
          <path
            d="M16 3.6L25.8 9.2L16 14.8L6.2 9.2L16 3.6Z"
            fill="url(#bv-facet-top)"
          />
          {/* Top specular highlight rim */}
          <path
            d="M6.6 9.2L16 3.9L25.4 9.2"
            stroke="#ffffff"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeOpacity="0.65"
          />

          {/* Left Facet: Isometric Left Drop Wall */}
          <path
            d="M5.4 10.8L15.2 16.4V27.6L5.4 22V10.8Z"
            fill="url(#bv-facet-left)"
          />
          {/* Left edge specular accent */}
          <path
            d="M5.4 11.2V21.8"
            stroke="#60a5fa"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />

          {/* Right Facet: Isometric Right Drop Wall */}
          <path
            d="M16.8 16.4L26.6 10.8V22L16.8 27.6V16.4Z"
            fill="url(#bv-facet-right)"
          />
          {/* Right edge specular accent */}
          <path
            d="M26.6 11.2V21.8"
            stroke="#d8b4fe"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />

          {/* Central Quantum Core: Floating faceted inner shard */}
          <path
            d="M16 13L18.6 16L16 19L13.4 16L16 13Z"
            fill="#ffffff"
            opacity="0.95"
          />
          <circle cx="16" cy="16" r="1.2" fill="#ffffff" />
        </svg>
      </div>

      <span className="font-heading text-[1.05rem] font-semibold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-white">
        Bilvora
      </span>
    </span>
  );
}
