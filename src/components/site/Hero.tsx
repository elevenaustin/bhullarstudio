import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ChevronDown, Star, Sparkles } from "lucide-react";

export function Hero({ onBookClick }: { onBookClick?: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  
  // Spring configurations for mouse horizontal shifts
  const sx = useSpring(mx, { stiffness: 45, damping: 20 });
  const sy = useSpring(my, { stiffness: 45, damping: 20 });
  
  // Parallax transform for horizontal mouse shift
  const tx = useTransform(sx, (v) => v * 15);
  
  // Scroll-bound parallax vertical translation for butter-smooth background scrolling
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 220]);
  const syBg = useSpring(yBg, { stiffness: 50, damping: 22 });
  
  // Stereoscopic parallax for the text content layer (shifts in the opposite direction on mouse)
  const txText = useTransform(sx, (v) => v * -18);
  const tyText = useTransform(sy, (v) => v * -18);
  
  // Subtle 3D rotation based on mouse position
  const rotX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-5, 5]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      // Get normalized cursor coordinate (-0.5 to 0.5)
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[115vh] min-h-[850px] w-full overflow-hidden perspective-1000"
      style={{ perspective: "1500px" }}
    >
      {/* Background Image layer with smooth scroll-parallax vertical translation */}
      <motion.img
        src="/hero-bg.jpg"
        alt="Timeless candid portrait of a bride"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] scale-120 origin-center animate-fade-in"
        style={{ x: tx, y: syBg, willChange: "transform", backfaceVisibility: "hidden" }}
      />
      {/* Dark overlay for a warm, moody luxury aesthetic */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[0.5px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-background" />

      {/* Content Layer with stereoscopic offset and 3D rotation */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center pt-24 sm:pt-28 lg:pt-32 px-6 text-center text-white preserve-3d">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl preserve-3d flex flex-col items-center justify-center"
          style={{ 
            x: txText, 
            y: tyText,
            rotateX: rotX,
            rotateY: rotY,
            transformStyle: "preserve-3d"
          }}
        >
          
          {/* Main Headline with high-fashion contrast */}
          <h1 className="text-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.8] translate-z-20 break-words text-white tracking-tight flex flex-col items-center select-none">
            <span className="font-serif font-light tracking-wide">Capturing</span>
            <span 
              className="text-gold text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal drop-shadow-[0_4px_25px_rgba(0,0,0,0.5)] lowercase py-3 md:py-4 scale-y-105"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              timeless memories
            </span>
          </h1>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.0 }}
            className="mt-10 translate-z-15"
          >
            <button
              onClick={onBookClick}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold text-white text-[11px] tracking-[0.25em] font-semibold uppercase hover:bg-white hover:text-foreground hover:scale-105 transition-all duration-500 border border-gold/10 shadow-[0_12px_40px_-8px_rgba(197,168,128,0.4)] cursor-pointer"
            >
              <Sparkles className="size-3.5 text-white/80 group-hover:text-gold transition-colors duration-500" />
              Book A Slot
            </button>
          </motion.div>

          {/* Social Proof Star Ratings */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.0 }}
            className="mt-12 flex flex-col items-center gap-2.5 translate-z-10"
          >
            <div className="flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="text-[10px] tracking-[0.35em] text-white/70 uppercase">
              500+ Happy Clients
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.6, y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 pointer-events-none"
      >
        <ChevronDown className="size-5" />
      </motion.div>
    </section>
  );
}
