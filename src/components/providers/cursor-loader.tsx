"use client";

import dynamic from "next/dynamic";

// Cursor is purely decorative and only activates on fine-pointer, motion-
// allowed devices — split it out of the initial bundle entirely.
const Cursor = dynamic(() => import("./cursor").then((mod) => mod.Cursor), {
  ssr: false,
});

export function CursorLoader() {
  return <Cursor />;
}
