type TrackedWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
};

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;
  const w = window as TrackedWindow;
  w.gtag?.("event", action, params);
  w.clarity?.("event", action);
}
