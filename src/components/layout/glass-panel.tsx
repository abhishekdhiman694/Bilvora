import { cn } from "@/lib/utils";

export function GlassPanel({
  className,
  strong = false,
  children,
  ...props
}: React.ComponentProps<"div"> & { strong?: boolean }) {
  return (
    <div
      className={cn(
        "relative rounded-3xl",
        strong ? "glass-strong" : "glass",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
