import { Header } from "@/components/nav/header";
import { Footer } from "@/components/nav/footer";
import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Services } from "@/components/sections/services";
import { AIShowcase } from "@/components/sections/ai-showcase";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { WhyBilvora } from "@/components/sections/why-bilvora";
import { Process } from "@/components/sections/process";
import { Technologies } from "@/components/sections/technologies";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { ContactCTA } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd, servicesJsonLd } from "@/lib/seo";
import { faqs, services } from "@/lib/data";

export default function Home() {
  return (
    <>
      <JsonLd data={servicesJsonLd(services)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <TrustedBy />
        <Services />
        <AIShowcase />
        <FeaturedProjects />
        <WhyBilvora />
        <Process />
        <Technologies />
        <Testimonials />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
