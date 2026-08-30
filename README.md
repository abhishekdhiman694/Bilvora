# Bilvora

Marketing site for a software studio that designs and builds web and mobile products for clients.

Built as a single high-polish landing experience — 3D hero, scroll-driven motion throughout, and the SEO and analytics groundwork a site that has to actually generate enquiries needs.

---

## What's on the page

The site is one long scroll, assembled from discrete sections:

| Section | Purpose |
|---|---|
| Hero | The opening statement, over a live 3D scene |
| Services | What the studio takes on |
| AI showcase | The AI work specifically |
| Featured projects | Selected client work |
| Process | How an engagement runs, start to finish |
| Technologies | The stack the studio builds on |
| Trusted by | Client logos |
| Testimonials | Client quotes |
| Why Bilvora | The argument for choosing them |
| FAQ | The questions that come up before someone books |
| Contact | Form plus inline Calendly booking |

---

## Notable pieces

**A real 3D hero.** An animated AI core rendered with Three.js through React Three Fiber and Drei, not a video loop or a static render.

**Motion as a system, not decoration.** Reusable primitives — `reveal`, `mask-reveal`, `split-text`, `count-up`, `tilt-card` — composed with GSAP and Motion, so every section animates from the same vocabulary instead of one-off effects. Lenis handles smooth scrolling underneath.

**SEO done properly.** Generated `sitemap.ts` and `robots.ts`, JSON-LD structured data, dynamic OpenGraph images rendered at the edge via `opengraph-image.tsx`, and a web app manifest.

**Analytics that measure attention.** Beyond page views, a scroll-depth tracker records how far down the page visitors actually get — which is the number that tells you whether the middle sections are working.

**Booking without a redirect.** Calendly embedded inline, so an interested visitor books in place rather than being handed off to another domain.

**Every state designed.** Dedicated `loading`, `error`, `global-error` and `not-found` routes, plus a custom cursor loader — the states most marketing sites leave at the framework default.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui + Base UI |
| 3D | Three.js · React Three Fiber · Drei |
| Motion | GSAP · Motion · Lenis |
| Icons | Lucide · React Icons |

---

## Running it locally

```bash
git clone https://github.com/abhishekdhiman694/Bilvora.git
cd Bilvora
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Then open http://localhost:3000.

---

## Project layout

```
src/
├── app/
│   ├── page.tsx              composes the sections
│   ├── layout.tsx            fonts, smooth scroll, analytics, JSON-LD
│   ├── opengraph-image.tsx   OG images generated per-request
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── manifest.ts
│   └── loading / error / global-error / not-found
├── components/
│   ├── sections/             hero, services, process, faq, ...
│   ├── three/                the 3D AI core scene
│   ├── motion/               reveal, split-text, count-up, tilt-card
│   ├── layout/               container, glass panel, gradient mesh, noise
│   ├── analytics/            page + scroll-depth tracking
│   ├── contact/              form and inline Calendly
│   └── seo/                  JSON-LD
└── lib/
    ├── seo.ts
    ├── analytics.ts
    ├── calendly.ts
    ├── motion.ts
    └── data.ts               section content
```

---

## Author

**Abhishek Dhiman** — Founder at [Leadvox AI](https://leadvoxai.com)
[GitHub](https://github.com/abhishekdhiman694) · [LinkedIn](https://www.linkedin.com/in/abhishek-dhiman-0a7276259)
