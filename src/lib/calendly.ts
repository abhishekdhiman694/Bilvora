const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const STYLE_HREF = "https://assets.calendly.com/assets/external/widget.css";

export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/beastg565/discovery-call-with-bilvora";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
      }) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

export function loadCalendlyAssets(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${STYLE_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = STYLE_HREF;
      document.head.appendChild(link);
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (existing) {
      if (window.Calendly) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Calendly widget")),
      );
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Calendly widget"));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export async function openCalendlyPopup(url: string = CALENDLY_URL) {
  try {
    await loadCalendlyAssets();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
      return;
    }
    throw new Error("Calendly failed to initialize");
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function isCalendlyEvent(e: MessageEvent): e is MessageEvent<{ event: string }> {
  return (
    e.origin === "https://calendly.com" &&
    typeof e.data === "object" &&
    e.data !== null &&
    typeof (e.data as { event?: unknown }).event === "string" &&
    (e.data as { event: string }).event.indexOf("calendly.") === 0
  );
}

export function onCalendlyEventScheduled(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  function handler(e: MessageEvent) {
    if (isCalendlyEvent(e) && e.data.event === "calendly.event_scheduled") {
      callback();
    }
  }

  window.addEventListener("message", handler);
  return () => window.removeEventListener("message", handler);
}
