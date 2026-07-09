import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  tone = "electric",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "electric" | "violet";
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.32em] text-ink-muted",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          tone === "electric"
            ? "bg-electric shadow-[0_0_12px_2px_rgba(77,125,255,0.7)]"
            : "bg-violet shadow-[0_0_12px_2px_rgba(139,92,246,0.7)]",
        )}
      />
      {children}
    </div>
  );
}
