import { useEffect, useState } from "react";
import { Menu, X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Reviews", href: "#testimonials" },
];

export function Navbar({ onBookClick }: { onBookClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle transparent to floating background transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy implementation for active section indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200; // offset for nav height + padding
      
      // Edge case: if we are at the very bottom of the page, set active to contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection("contact");
        return;
      }

      for (const link of links) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled
          ? "py-3 md:py-4 bg-transparent"
          : "py-6 bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-700 ${
          scrolled
            ? "glass-nav rounded-full px-6 md:px-8 py-3 mx-4 md:mx-10 lg:mx-auto max-w-5xl shadow-xl"
            : "max-w-7xl px-6 lg:px-10 py-2 border-b border-transparent"
        } h-16 flex items-center justify-between`}
      >
        <a href="#home" className="flex items-center gap-3 group">
          <div className={`size-9 rounded-full border flex items-center justify-center transition-all duration-500 ${
            scrolled ? "border-gold text-gold bg-gold/5" : "border-white/30 text-white hover:border-white"
          }`}>
            <Camera className="size-4.5" />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={`text-2xl transition-all duration-500 leading-none ${
                scrolled ? "text-foreground" : "text-white"
              } group-hover:text-gold`}
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              Bhullar
            </span>
            <span
              className={`text-[8px] tracking-[0.35em] uppercase transition-colors duration-500 ${
                scrolled ? "text-muted-foreground" : "text-white/70"
              }`}
            >
              Photography
            </span>
          </div>
        </a>

        {/* Desktop Menu Links */}
        <ul className="hidden lg:flex items-center gap-3">
          {links.map((l) => {
            const isActive = activeSection === l.href.substring(1);
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className={`relative text-[11px] tracking-[0.25em] uppercase transition-colors px-4 py-2 block font-medium ${
                    isActive
                      ? "text-gold font-bold"
                      : scrolled
                      ? "text-foreground/90 hover:text-gold"
                      : "text-white/85 hover:text-gold"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Highlighted Right-sided CTA Button */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              if (onBookClick) {
                e.preventDefault();
                onBookClick();
              }
            }}
            className={`hidden md:inline-flex items-center px-6 py-2.5 rounded-full text-[10px] tracking-[0.2em] font-semibold uppercase transition-all duration-300 ${
              scrolled
                ? "bg-foreground text-background hover:bg-foreground/90 border border-foreground/10"
                : "bg-white text-foreground hover:bg-white/90 border border-white/10"
            }`}
          >
            Book Slot
          </a>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full transition-colors ${
              scrolled
                ? "text-foreground hover:bg-foreground/5"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background/96 backdrop-blur-2xl flex flex-col justify-between"
          >
            <div className="flex justify-between items-center h-20 px-6 border-b border-border/30">
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
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-foreground/5 text-foreground transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            
            <ul className="flex flex-col items-center justify-center gap-6 py-10 grow perspective-1000">
              {links.map((l, i) => {
                const isActive = activeSection === l.href.substring(1);
                return (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 30, rotateX: 15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`text-display text-3xl transition-colors uppercase tracking-[0.1em] ${
                        isActive ? "text-gold font-medium" : "text-foreground/80 hover:text-gold"
                      }`}
                    >
                      {l.label}
                    </a>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: links.length * 0.04 + 0.05 }}
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    setOpen(false);
                    if (onBookClick) {
                      e.preventDefault();
                      onBookClick();
                    }
                  }}
                  className="mt-6 inline-flex items-center px-8 py-3.5 rounded-full bg-foreground text-background text-[11px] tracking-[0.2em] font-semibold uppercase hover:bg-foreground/90 transition-all duration-300 border border-foreground/10"
                >
                  Book Slot
                </a>
              </motion.li>
            </ul>
            <div className="py-6 border-t border-border/30 text-center text-[10px] text-muted-foreground tracking-[0.3em] uppercase">
              Bhullar Legacy Studio · Chandigarh
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
