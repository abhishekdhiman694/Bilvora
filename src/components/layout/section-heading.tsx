import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/layout/eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "electric",
  size = "lg",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "electric" | "violet";
  size?: "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes: Record<string, string> = {
    md: "text-4xl md:text-5xl lg:text-6xl",
    lg: "text-4xl md:text-6xl lg:text-7xl",
    xl: "text-5xl md:text-7xl lg:text-8xl",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "text-balance font-medium leading-[1.05] tracking-[-0.03em] text-ink",
          sizes[size],
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-xl text-balance text-lg leading-relaxed text-ink-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
