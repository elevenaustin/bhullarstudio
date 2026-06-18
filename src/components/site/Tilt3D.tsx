import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxRotate?: number; // Maximum rotation angle in degrees
  perspective?: number; // Perspective distance in pixels
  scale?: number; // Hover scale multiplier
}

export function Tilt3D({
  children,
  className = "",
  maxRotate = 12,
  perspective = 1000,
  scale = 1.02,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for normalized cursor positions (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to avoid jittery movements
  const springConfig = { stiffness: 200, damping: 25, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Maps values to rotation degrees
  // Tilting up (negative Y) should rotate negatively on X-axis, etc.
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxRotate, -maxRotate]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxRotate, maxRotate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to element center, normalized to [-0.5, 0.5]
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    // Return to original flat position
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: `${perspective}px`,
      }}
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative select-none ${className}`}
    >
      {children}
    </motion.div>
  );
}
