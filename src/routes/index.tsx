import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { BookingModal } from "@/components/site/BookingModal";
import { GoldParticles } from "@/components/site/GoldParticles";
import {
  About, Services, WhyChooseUs, Portfolio, Process,
} from "@/components/site/Sections";
import {
  Stats, Testimonials, FAQ, CTA, Contact, InstagramFeed, Footer,
} from "@/components/site/Footer";

const TITLE = "Bhullar Photography | Premium Wedding & Event Photographer";
const DESC =
  "Bhullar Photography captures weddings, portraits, pre-wedding shoots, events, commercial photography and timeless memories with cinematic excellence.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Bhullar Photography",
          image:
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
          description: DESC,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sector 8",
            addressLocality: "Chandigarh",
            addressCountry: "IN",
          },
          telephone: "+91 98765 43210",
          sameAs: [
            "https://instagram.com/bhullar.photography",
            "https://facebook.com/bhullarphotography",
            "https://youtube.com/@bhullarphotography",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const handleOpenBooking = () => setIsBookingOpen(true);

  return (
    <div className="relative bg-background text-foreground">
      <GoldParticles />
      <Navbar onBookClick={handleOpenBooking} />
      <main className="relative">
        <Hero onBookClick={handleOpenBooking} />
        <About />
        <Services />
        <WhyChooseUs />
        <Portfolio />
        <Process />
        <Stats />
        <Testimonials />
        <FAQ />
        <CTA onBookClick={handleOpenBooking} />
        <Contact onBookClick={handleOpenBooking} />
        <InstagramFeed />
      </main>
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <Toaster position="top-center" />
    </div>
  );
}

