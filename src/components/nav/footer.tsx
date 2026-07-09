"use client";

import { motion } from "motion/react";
import { FaLinkedinIn, FaXTwitter, FaGithub } from "react-icons/fa6";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/nav/logo";
import { Reveal } from "@/components/motion/reveal";

const columns = [
  {
    title: "Company",
    links: [
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Technology", href: "#technology" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "AI Voice Agents", href: "#services" },
      { label: "AI Chatbots", href: "#services" },
      { label: "SaaS Development", href: "#services" },
      { label: "Enterprise Software", href: "#services" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@bilvora.com", href: "mailto:hello@bilvora.com" },
      { label: "Book a call", href: "#contact" },
    ],
  },
];

const socials = [
  { icon: FaXTwitter, href: "#", label: "X" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-hairline">
      <Container className="py-20">
        <div className="grid gap-16 md:grid-cols-[1.2fr_2fr]">
          <Reveal variant="up" className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-xs text-balance leading-relaxed text-ink-muted">
              Premium AI &amp; software engineering studio building technology
              from the future.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((column, ci) => (
              <Reveal
                key={column.title}
                variant="up"
                delay={0.08 * ci}
                className="flex flex-col gap-4"
              >
                <span className="text-xs uppercase tracking-[0.22em] text-ink-faint">
                  {column.title}
                </span>
                <div className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      data-cursor="link"
                      className="text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-hairline pt-8 sm:flex-row">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} Bilvora Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                data-cursor="link"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex size-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors hover:text-ink hover:border-white/25"
              >
                <social.icon className="size-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
