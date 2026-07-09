import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <defs>
          <linearGradient id="bilvora-mark" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4d7dff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path d="M13 0L26 13L13 26L0 13L13 0Z" fill="url(#bilvora-mark)" />
        <path d="M13 7L19 13L13 19L7 13L13 7Z" fill="#030304" />
      </svg>
      <span className="font-medium tracking-[-0.01em] text-ink">Bilvora</span>
    </span>
  );
}
