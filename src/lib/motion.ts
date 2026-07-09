import type { Easing } from "motion/react";

// Shared choreography constants — distinct curves per motion category
// so nothing on the page eases identically.

export const easeText: Easing = [0.16, 1, 0.3, 1]; // crisp expo-out, for type reveals
export const easeCard: Easing = [0.22, 1, 0.36, 1]; // soft-out, for cards/panels
export const easeButton: Easing = [0.34, 1.56, 0.64, 1]; // slight overshoot, for buttons/micro
export const easeSection: Easing = [0.65, 0, 0.35, 1]; // in-out, for section-level transforms
export const easeImage: Easing = [0.19, 1, 0.22, 1]; // long expo-out, for image/mask reveals

export const viewportOnce = { once: true, amount: 0.3 } as const;
export const viewportEarly = { once: true, amount: 0.15 } as const;
export const viewportTight = { once: true, amount: 0.55 } as const;
