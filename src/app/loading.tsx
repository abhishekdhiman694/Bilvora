export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-void">
      <div className="flex flex-col items-center gap-4">
        <span
          className="size-8 animate-spin rounded-full border-2 border-white/10 border-t-electric-soft"
          aria-hidden
        />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-faint">
          Loading
        </span>
      </div>
    </div>
  );
}
