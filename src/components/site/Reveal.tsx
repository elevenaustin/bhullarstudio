import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const v: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: 8 },
  show: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
  },
};

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <span className="h-px w-10 bg-gold" />
      <span className="text-xs tracking-[0.45em] uppercase text-gold">{children}</span>
      <span className="h-px w-10 bg-gold" />
    </div>
  );
}
