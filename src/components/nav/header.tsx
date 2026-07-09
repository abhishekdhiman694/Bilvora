"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/nav/logo";
import { PremiumButton } from "@/components/ui/premium-button";
import { easeButton, easeSection } from "@/lib/motion";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Technology", href: "#technology" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.15, ease: easeSection }}
    >
      <div className="glass-header">
        <Container className="flex h-18 items-center justify-between py-3.5">
          <a href="#top" className="shrink-0" data-cursor="link">
            <Logo />
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-9 lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="link"
                onMouseEnter={() => setHovered(link.href)}
                className="relative py-2 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
                {hovered === link.href ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-electric-soft shadow-[0_0_8px_1px_rgba(143,176,255,0.6)]"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                ) : null}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <PremiumButton href="#contact" size="default">
              Start a project
            </PremiumButton>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            data-cursor="link"
            className="relative flex size-10 items-center justify-center rounded-full text-ink lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3, ease: easeButton }}
                className="absolute"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </Container>
      </div>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn("glass-header overflow-hidden lg:hidden", open ? "max-h-96" : "max-h-0 border-t-0")}
        style={{ transition: "max-height 400ms cubic-bezier(0.65,0,0.35,1)" }}
      >
        <nav aria-label="Mobile">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <PremiumButton href="#contact" className="mt-3 w-full" onClick={() => setOpen(false)}>
              Start a project
            </PremiumButton>
          </Container>
        </nav>
      </div>
    </motion.header>
  );
}
