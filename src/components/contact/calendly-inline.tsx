"use client";

import { useEffect, useRef, useState } from "react";
import { loadCalendlyAssets, onCalendlyEventScheduled, CALENDLY_URL } from "@/lib/calendly";
import { cn } from "@/lib/utils";

const MIN_HEIGHT = 700;

export function CalendlyInline({
  className,
  onScheduled,
}: {
  className?: string;
  onScheduled?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [height, setHeight] = useState(MIN_HEIGHT);

  useEffect(() => {
    let cancelled = false;

    loadCalendlyAssets()
      .then(() => {
        if (cancelled || !ref.current || !window.Calendly) return;
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: ref.current,
        });
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!onScheduled) return;
    return onCalendlyEventScheduled(onScheduled);
  }, [onScheduled]);

  // Calendly's inline embed reports its real content height via postMessage
  // so the surrounding iframe can be resized to fit — without this the
  // calendar gets clipped inside a fixed-height box.
  useEffect(() => {
    function handler(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return;
      const data = e.data as { event?: string; payload?: { height?: number } };
      if (data?.event === "calendly.page_height" && data.payload?.height) {
        setHeight(Math.max(MIN_HEIGHT, Math.ceil(data.payload.height)));
      }
    }
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-hairline bg-charcoal-2",
        className,
      )}
      style={{ minHeight: MIN_HEIGHT }}
    >
      {!ready && !failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="size-6 animate-spin rounded-full border-2 border-white/15 border-t-electric-soft" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
            Loading booking calendar…
          </span>
        </div>
      ) : null}

      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <p className="text-sm text-ink-muted">
            The booking calendar couldn&apos;t load. You can open it directly instead.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-sm font-medium text-electric-soft underline underline-offset-4"
          >
            Open booking page in a new tab
          </a>
        </div>
      ) : null}

      <div ref={ref} className="w-full" style={{ height, minHeight: MIN_HEIGHT }} />
    </div>
  );
}
