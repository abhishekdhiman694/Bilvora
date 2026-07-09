export const siteConfig = {
  name: "Bilvora Technologies",
  shortName: "Bilvora",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bilvoratechnologies.com").replace(/\/$/, ""),
  title: "Bilvora Technologies — AI & Software Engineering, From the Future",
  shortTitle: "Bilvora Technologies",
  description:
    "Bilvora Technologies is a premium AI and software engineering agency building AI voice agents, AI calling agents, AI chatbots, business automation, websites, SaaS platforms and mobile apps for companies that refuse to look ordinary.",
  keywords: [
    "AI agency",
    "AI automation agency",
    "AI calling agent",
    "voice AI",
    "AI development company",
    "website development",
    "web design agency",
    "mobile app development",
    "AI chatbot development",
    "CRM automation",
    "lead generation automation",
    "business automation software",
    "enterprise software development",
    "AI receptionist",
    "AI customer support",
  ],
  email: "hello@bilvora.com",
  locale: "en_US",
};

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: absoluteUrl("/icon"),
    image: absoluteUrl("/opengraph-image"),
    description: siteConfig.description,
    email: siteConfig.email,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: siteConfig.email,
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en-US",
  };
}

export function servicesJsonLd(
  services: readonly { title: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": absoluteUrl("/#organization") },
        areaServed: "Worldwide",
      },
    })),
  };
}

export function faqJsonLd(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
