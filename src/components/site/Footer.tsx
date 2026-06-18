import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, MessageCircle, Calendar, Camera } from "lucide-react";
import { toast } from "sonner";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1800;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref} className="text-display text-6xl md:text-7xl text-gold">
      {v}
      {suffix}
    </span>
  );
}

export function Stats() {
  const stats = [
    { v: 12, s: "+", l: "Years Experience" },
    { v: 1000, s: "+", l: "Happy Clients" },
    { v: 500, s: "+", l: "Events Covered" },
    { v: 99, s: "%", l: "Returning Customers" },
  ];
  return (
    <section className="py-28 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {stats.map((s) => (
          <Reveal key={s.l}>
            <Counter to={s.v} suffix={s.s} />
            <p className="mt-3 text-xs tracking-[0.3em] uppercase text-background/60">
              {s.l}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Harpreet & Gurpreet",
    role: "Wedding · Sangrur",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    quote:
      "Harman and his team disappeared into our wedding like family — and brought back a film and album we will pass to our children. Worth every rupee, and then some.",
  },
  {
    name: "Manpreet Kaur",
    role: "Portrait · Patiala",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    quote:
      "I have never felt more beautiful or more myself in front of a camera. The photos are tender, honest and breathtaking. They captured a feeling, not a pose.",
  },
  {
    name: "Sukhwinder Singh",
    role: "Commercial · Ludhiana",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    quote:
      "Bhullar Photography redefined our brand visuals. Tight art direction, calm on set, and imagery that genuinely moved product. Our go-to studio from now on.",
  },
];

export function Testimonials() {
  const loop = [...testimonials, ...testimonials];
  return (
    <section id="testimonials" className="py-32 overflow-hidden">
      <Reveal className="text-center max-w-3xl mx-auto px-6">
        <SectionLabel>Kind words</SectionLabel>
        <h2 className="text-display text-4xl md:text-6xl">
          Stories from the people we <em className="text-gold">photographed.</em>
        </h2>
      </Reveal>

      <div className="mt-20 group relative">
        <div
          className="flex gap-8 animate-marquee w-max"
          style={{ animationPlayState: "running" }}
        >
          {loop.map((t, i) => (
            <article
              key={i}
              className="w-[420px] shrink-0 glass-card rounded-3xl p-10"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 text-foreground/85 italic leading-relaxed text-display text-xl">
                "{t.quote}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  className="size-12 rounded-full object-cover border border-gold/30"
                />
                <div>
                  <p className="text-display text-lg">{t.name}</p>
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
                    {t.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "How can I book a session?",
    a: "Send us a note through the contact form or WhatsApp. We'll set up a 30-minute consultation, share the right package, and confirm your date with a 25% retainer.",
  },
  {
    q: "How long does editing take?",
    a: "You'll receive a preview gallery within 72 hours. The full hand-edited gallery is delivered inside three weeks, and your fine-art album within eight to ten.",
  },
  {
    q: "Do you travel for shoots?",
    a: "Yes — destination weddings and editorials are a big part of what we do. Travel, stay and gear logistics are included from a custom quote per location.",
  },
  {
    q: "How many photos are delivered?",
    a: "It depends on the coverage. A full-day wedding typically delivers 600–900 hand-edited frames; portrait sessions deliver 60–120.",
  },
  {
    q: "Can we customise our package?",
    a: "Every package is a starting point. Hours, second shooter, drone, films and album tiers can all be adjusted to fit your day.",
  },
  {
    q: "Do you provide drone coverage?",
    a: "Yes. Licensed drone pilots are available for venues and cities that permit aerial photography, with cinematic cuts included in the final film.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-32 bg-card/10">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal className="text-center">
          <SectionLabel>Good to know</SectionLabel>
          <h2 className="text-display text-4xl md:text-6xl">
            Questions, <em className="text-gold">answered.</em>
          </h2>
        </Reveal>

        <Reveal className="mt-16">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-card rounded-2xl px-6"
              >
                <AccordionTrigger className="text-left text-display text-xl py-6 hover:no-underline hover:text-gold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

export function CTA({ onBookClick }: { onBookClick?: () => void }) {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold-soft/40 via-background to-gold/10" />
      <Reveal className="relative mx-auto max-w-4xl px-6 text-center">
        <SectionLabel>Let's begin</SectionLabel>
        <h2 className="text-display text-5xl md:text-7xl leading-tight">
          Let's create something
          <br />
          <em className="text-gold">beautiful</em> together.
        </h2>
        <p className="mt-8 text-muted-foreground max-w-xl mx-auto">
          Your moments deserve more than photographs. They deserve memories you'll
          cherish forever.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            onClick={(e) => {
              if (onBookClick) {
                e.preventDefault();
                onBookClick();
              }
            }}
            className="px-8 py-4 rounded-full bg-foreground text-background text-xs tracking-[0.25em] uppercase hover:bg-foreground/90 transition border border-foreground/10"
          >
            Book Now
          </a>
          <a
            href="tel:9814944201"
            className="px-8 py-4 rounded-full border border-foreground/20 text-foreground text-xs tracking-[0.25em] uppercase hover:bg-foreground hover:text-background transition"
          >
            Call Us
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function Contact({ onBookClick }: { onBookClick?: () => void }) {
  return (
    <section id="contact" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-24">
        <Reveal className="lg:col-span-7 flex flex-col justify-center">
          <SectionLabel>Say hello</SectionLabel>
          <h2 className="text-display text-4xl md:text-6xl leading-tight">
            Tell us about <br />
            your <em className="text-gold">special day.</em>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl text-base leading-relaxed">
            Every wedding, editorial, and commercial project we shoot is entirely bespoke. 
            Click the button below to reserve a slot, specify your date, select your venue, and check packages. 
            Let's create something timeless.
          </p>
          <div className="mt-8">
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background text-xs tracking-[0.25em] uppercase hover:bg-foreground/90 hover:scale-105 active:scale-95 transition-all duration-300 border border-foreground/10 cursor-pointer shadow-md"
            >
              <span>Book A Slot Now</span>
              <Calendar className="size-3.5 text-gold" />
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            <h3 className="text-display text-3xl">The Studio</h3>
            <div className="mt-8 space-y-6 text-sm">
              <div className="relative pb-2">
                <Info icon={Phone} label="Phone" value="+91 98149 44201" href="tel:9814944201" />
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="absolute left-14 bottom-[-14px] flex items-center gap-1 bg-gold text-white px-2.5 py-0.5 rounded-full text-[8px] tracking-widest uppercase font-semibold shadow-md pointer-events-none z-10"
                >
                  <span className="size-1 rounded-full bg-white animate-ping" />
                  Click to call
                </motion.div>
              </div>
              <Info 
                icon={MapPin} 
                label="Studio" 
                value="Bhullar Photography, Village Ladda, District Sangrur 148034" 
                href="https://maps.app.goo.gl/iwRhvS17thfGc5B6A" 
              />
              <Info icon={Clock} label="Hours" value="Mon – Sat · 10:00 – 19:00" />
            </div>

            <a 
              href="https://maps.app.goo.gl/iwRhvS17thfGc5B6A" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 block aspect-[16/9] rounded-2xl overflow-hidden border border-border group/map cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                alt="Bhullar Photography Map Sangrur"
                loading="lazy"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover/map:scale-105 group-hover/map:grayscale-0"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Info({ 
  icon: I, 
  label, 
  value, 
  href 
}: { 
  icon: any; 
  label: string; 
  value: string; 
  href?: string; 
}) {
  const content = (
    <div className="flex gap-4 group/info transition-transform duration-300 hover:translate-x-1">
      <div className="size-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 transition-colors group-hover/info:bg-gold group-hover/info:text-white">
        <I className="size-4" />
      </div>
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">{label}</p>
        <p className="mt-1 text-foreground transition-colors group-hover/info:text-gold">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target={href.startsWith("http") ? "_blank" : undefined} 
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined} 
        className="block cursor-pointer"
      >
        {content}
      </a>
    );
  }

  return content;
}

const insta = [
  "1519225421980-715cb0215aed",
  "1537907510278-10acdb198d0f",
  "1583939411023-14783179e581",
  "1519741497674-611481863552",
  "1511285560929-80b456fea0bc",
  "1469371670807-013ccf25f16a",
];

export function InstagramFeed() {
  return (
    <section className="py-32 bg-card/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <SectionLabel>@bhullar.photography</SectionLabel>
          <h2 className="text-display text-4xl md:text-5xl">
            From the <em className="text-gold">feed.</em>
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {insta.map((id, i) => (
            <a
              key={i}
              href="#"
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <img
                src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=500&q=80`}
                alt={`Instagram post ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/30 transition-colors flex items-center justify-center">
                <Instagram className="size-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-gold hover:text-gold transition text-xs tracking-[0.25em] uppercase"
          >
            <Instagram className="size-4" /> Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "Wedding", href: "#services" },
    { name: "Pre-Wedding", href: "#services" },
    { name: "Portrait", href: "#services" },
    { name: "Commercial", href: "#services" },
    { name: "Album Design", href: "#services" },
  ];

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full border border-gold text-gold bg-gold/5 flex items-center justify-center">
              <Camera className="size-4.5" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-2xl text-foreground font-semibold leading-none"
                style={{ fontFamily: "'Pinyon Script', cursive" }}
              >
                Bhullar
              </span>
              <span className="text-[8px] tracking-[0.35em] uppercase text-muted-foreground">
                Photography
              </span>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xs">
            A boutique studio for weddings, portraits and brand imagery — built on
            craft, calm and a quiet love of light.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-foreground">Quick Links</p>
          <ul className="mt-5 space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-muted-foreground hover:text-gold transition">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-foreground">Services</p>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-muted-foreground hover:text-gold transition">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-foreground">Social</p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Facebook, MessageCircle, Youtube].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="size-10 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:bg-gold hover:text-white hover:border-gold transition"
              >
                <I className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Bhullar Photography. All rights reserved.</p>
          <p>
            Designed with <span className="text-gold">❤</span> in Chandigarh
          </p>
        </div>
      </div>
    </footer>
  );
}

