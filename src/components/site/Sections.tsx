import {
  Heart, Camera, Video, Cake, Baby, Flower2, Sparkles, Briefcase, Plane, BookOpen,
  Award, Truck, Palette, Aperture, Users, Gem, Sun, Infinity as InfinityIcon,
} from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { Tilt3D } from "./Tilt3D";



export function About() {
  return (
    <section id="about" className="py-28 md:py-36 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        <Reveal className="lg:col-span-5 relative">
          <div className="relative p-2 rounded-3xl border border-gold/20 bg-card/25 backdrop-blur-md shadow-2xl">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1200&q=80"
                alt="Photographer working with natural light"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
              />
            </div>
          </div>
          <div className="absolute bottom-4 right-4 sm:-bottom-8 sm:right-6 lg:-right-4 xl:-right-8 glass-card rounded-3xl px-8 py-6 shadow-2xl">
            <p className="text-display text-4xl text-gold">12+</p>
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mt-1">
              Years of craft
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <SectionLabel>The Studio</SectionLabel>
          <h2 className="text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            A quiet obsession with <em className="text-gold">light, love,</em> and the
            in-between moments.
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed max-w-2xl">
            Bhullar Photography began with a single camera and a deep belief that the most
            beautiful moments are the ones almost missed — a held breath before a vow, natural
            light on a wedding morning, or the raw emotion of a new legacy. For more than a
            decade, we've shaped that belief into a studio trusted by couples and brands nationwide.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
            Our promise is simple: a calm, unhurried experience, natural storytelling,
            and editorial-grade fine art albums designed to outlast every digital screen.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 md:gap-6">
            <span
              className="text-display italic text-2xl md:text-3xl text-gold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              — Harman Bhullar
            </span>
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Founder & Lead Photographer
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


const services = [
  { icon: Heart, title: "Wedding Photography", desc: "Cinematic coverage of every vow, every glance, every quiet ritual." },
  { icon: Sparkles, title: "Pre-Wedding Shoots", desc: "Story-driven sessions in destinations chosen for the two of you." },
  { icon: Video, title: "Cinematic Videography", desc: "Films cut like short stories, scored for the moments that matter." },
  { icon: Cake, title: "Birthday Events", desc: "Candid, joyful coverage that captures the room and the people in it." },
  { icon: Baby, title: "Baby Shoot", desc: "Calm, gentle sessions designed around your little one's rhythm." },
  { icon: Camera, title: "Fashion Photography", desc: "Editorial sessions for brands, designers, and creative directors." },
  { icon: Briefcase, title: "Commercial Photography", desc: "Product, lifestyle and brand imagery built for modern storefronts." },
  { icon: Plane, title: "Drone Coverage", desc: "Aerial cinematography for venues, processions and destination weddings." },
  { icon: BookOpen, title: "Album Design", desc: "Hand-curated, archival fine-art albums printed in Italy." },
];

export function Services() {
  return (
    <section id="services" className="py-32 bg-card/30 border-y border-border/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center max-w-3xl mx-auto">
          <SectionLabel>What we create</SectionLabel>
          <h2 className="text-display text-4xl md:text-6xl leading-tight">
            A complete studio for the moments
            <br />
            you'll want to keep <em className="text-gold">forever.</em>
          </h2>
        </Reveal>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <Tilt3D maxRotate={5} scale={1.02} className="h-full">
                <div className="group relative h-full bg-white border border-border/60 rounded-3xl p-10 transition-all duration-700 hover:border-gold/40 hover:shadow-[0_30px_60px_-20px_rgba(197,168,128,0.12)] gold-glow flex flex-col justify-between overflow-hidden preserve-3d">
                  {/* Fine-art Curator Numbering */}
                  <span className="absolute top-8 right-8 text-[9px] font-sans tracking-[0.25em] text-muted-foreground/40 group-hover:text-gold transition-colors duration-500">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  
                  <div>
                    {/* Minimalist Icon wrapper */}
                    <div className="size-12 rounded-2xl bg-gold/5 flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-white group-hover:scale-105 transition-all duration-500 translate-z-20">
                      <s.icon className="size-5 stroke-[1.5]" />
                    </div>
                    <h3 className="text-display text-2xl leading-snug text-foreground group-hover:text-gold transition-colors duration-300 translate-z-20">
                      {s.title}
                    </h3>
                    <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed translate-z-10">
                      {s.desc}
                    </p>
                  </div>

                  {/* Interactive footer line */}
                  <div className="mt-8 pt-5 border-t border-border/40 flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-gold transition-colors duration-500">
                      Inquire Session
                    </span>
                    <span className="text-gold text-xs transition-transform duration-500 group-hover:translate-x-1.5">
                      →
                    </span>
                  </div>
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: Palette, title: "Premium Editing", desc: "Hand-graded by lead retouchers — never automated, never templated." },
  { icon: Truck, title: "Fast Delivery", desc: "Previews within 72 hours. Full galleries inside three weeks." },
  { icon: Sparkles, title: "Creative Direction", desc: "Concept, location, wardrobe and lighting designed end-to-end." },
  { icon: Aperture, title: "Professional Equipment", desc: "Dual Sony Alpha bodies, prime glass, cinema gimbals and drones." },
  { icon: Users, title: "Experienced Team", desc: "Lead photographer, second shooter and dedicated client manager." },
  { icon: Gem, title: "Affordable Luxury", desc: "Tiered packages crafted to fit real budgets without trimming craft." },
  { icon: Sun, title: "Natural Colours", desc: "Skin-true tones and editorial film grading — no Instagram filters." },
  { icon: InfinityIcon, title: "Lifetime Memories", desc: "Cloud archive and physical album that outlast every hard drive." },
];

export function WhyChooseUs() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-4">
          <SectionLabel>Why choose us</SectionLabel>
          <h2 className="text-display text-4xl md:text-5xl leading-tight">
            Eight reasons couples and brands stay with Bhullar for years.
          </h2>
          <p className="mt-6 text-muted-foreground">
            We're not the loudest studio in the room. We're the one your friends
            quietly recommend after they've seen the final album.
          </p>
        </Reveal>

        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <Tilt3D maxRotate={8} scale={1.02} className="h-full">
                <div className="flex h-full gap-5 p-6 rounded-3xl glass-card hover:border-gold/30 hover:shadow-[0_15px_40px_-15px_rgba(212,175,55,0.1)] transition-all duration-300 preserve-3d">
                  <div className="shrink-0 size-12 rounded-full border border-gold/40 flex items-center justify-center text-gold translate-z-20">
                    <f.icon className="size-5" />
                  </div>
                  <div className="translate-z-10">
                    <h3 className="text-display text-xl">{f.title}</h3>
                    <Award className="hidden" />
                    <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const gallery = [
  { src: "1519741497674-611481863552", cat: "Wedding", h: 600 },
  { src: "1606800052052-a08af7148866", cat: "Wedding", h: 800 },
  { src: "1583939003579-730e3918a45a", cat: "Couple", h: 500 },
  { src: "1511285560929-80b456fea0bc", cat: "Portrait", h: 700 },
  { src: "1529636798458-92182e662485", cat: "Wedding", h: 600 },
  { src: "1525258946800-98cfd641d0de", cat: "Events", h: 750 },
  { src: "1469371670807-013ccf25f16a", cat: "Couple", h: 600 },
  { src: "1469594292607-7bd90f8d3ba4", cat: "Fashion", h: 800 },
  { src: "1515934751635-c81c6bc9a2d8", cat: "Wedding", h: 550 },
  { src: "1502635385003-ee1e6a1a742d", cat: "Commercial", h: 700 },
  { src: "1492684223066-81342ee5ff30", cat: "Events", h: 650 },
  { src: "1494774157365-9e04c6720e47", cat: "Portrait", h: 800 },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-32 bg-card/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center max-w-3xl mx-auto">
          <SectionLabel>Selected work</SectionLabel>
          <h2 className="text-display text-4xl md:text-6xl">
            A portfolio shaped by <em className="text-gold">light</em> and devotion.
          </h2>
        </Reveal>

        <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-8 md:gap-10 [column-fill:_balance]">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={i * 0.03} className="break-inside-avoid block mb-8 md:mb-10">
              <Tilt3D maxRotate={6} scale={1.015} className="overflow-hidden rounded-3xl">
                <figure className="group relative w-full h-full border border-border rounded-3xl overflow-hidden preserve-3d">
                  <img
                    src={`https://images.unsplash.com/photo-${g.src}?auto=format&fit=crop&w=900&q=80`}
                    alt={`${g.cat} photography ${i + 1}`}
                    loading="lazy"
                    style={{ height: g.h / 1.4 + 80 }}
                    className="w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 preserve-3d">
                    <div className="translate-z-20">
                      <span className="text-xs tracking-[0.3em] uppercase text-gold-soft">
                        {g.cat}
                      </span>
                      <p className="text-display text-2xl text-white mt-1">Frame {i + 1}</p>
                    </div>
                  </figcaption>
                </figure>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", t: "Consultation", d: "We meet, talk, and listen to your story." },
  { n: "02", t: "Planning", d: "Locations, wardrobe, mood and a full timeline." },
  { n: "03", t: "Photoshoot", d: "The day itself — calm, directed, beautifully lit." },
  { n: "04", t: "Editing", d: "Hand-graded frames and a cinematic colour pass." },
  { n: "05", t: "Delivery", d: "Online gallery, USB and your fine-art album." },
];

export function Process() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center max-w-3xl mx-auto">
          <SectionLabel>How we work</SectionLabel>
          <h2 className="text-display text-4xl md:text-6xl">
            A calm, considered <em className="text-gold">process</em> from first call to final album.
          </h2>
        </Reveal>

        <div className="mt-20 relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="grid lg:grid-cols-5 gap-10">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1} className="text-center">
                <div className="mx-auto size-16 rounded-full bg-background border border-gold flex items-center justify-center text-display text-gold text-lg relative z-10">
                  {s.n}
                </div>
                <h3 className="text-display text-2xl mt-6">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
