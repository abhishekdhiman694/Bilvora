import { cn } from "@/lib/utils";

type Blob = {
  color: string;
  className: string;
};

const PRESETS: Record<string, Blob[]> = {
  hero: [
    { color: "rgba(77,125,255,0.30)", className: "-left-[10%] top-[-10%] h-[42rem] w-[42rem]" },
    { color: "rgba(139,92,246,0.28)", className: "right-[-15%] top-[8%] h-[38rem] w-[38rem]" },
    { color: "rgba(192,132,252,0.14)", className: "left-[20%] bottom-[-30%] h-[46rem] w-[46rem]" },
  ],
  corner: [
    { color: "rgba(77,125,255,0.22)", className: "-left-[10%] top-[-20%] h-[34rem] w-[34rem]" },
    { color: "rgba(139,92,246,0.18)", className: "right-[-10%] bottom-[-20%] h-[30rem] w-[30rem]" },
  ],
  center: [
    { color: "rgba(139,92,246,0.22)", className: "left-1/2 top-1/2 h-[40rem] w-[40rem] mt-[-20rem] ml-[-20rem]" },
    { color: "rgba(77,125,255,0.16)", className: "left-[10%] top-[10%] h-[22rem] w-[22rem]" },
  ],
  single: [
    { color: "rgba(77,125,255,0.20)", className: "left-1/2 top-0 h-[36rem] w-[60rem] ml-[-30rem]" },
  ],
};

const BREATHE_CLASSES = ["animate-breathe-a", "animate-breathe-b", "animate-breathe-c"];
const BREATHE_DELAYS = ["-2s", "-9s", "-15s"];

export function GradientMesh({
  variant = "hero",
  className,
  animated = true,
}: {
  variant?: keyof typeof PRESETS;
  className?: string;
  animated?: boolean;
}) {
  const blobs = PRESETS[variant];
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full blur-[110px]",
            blob.className,
            animated && BREATHE_CLASSES[i % BREATHE_CLASSES.length],
          )}
          style={{
            background: blob.color,
            animationDelay: animated ? BREATHE_DELAYS[i % BREATHE_DELAYS.length] : undefined,
          }}
        />
      ))}
    </div>
  );
}
