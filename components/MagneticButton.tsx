"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type MagneticButtonProps = Omit<HTMLMotionProps<"a">, "children"> & {
  children: ReactNode;
  variant?: "dark" | "light";
};

export function MagneticButton({
  children,
  className = "",
  variant = "dark",
  ...props
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 170, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 170, damping: 18, mass: 0.35 });

  return (
    <motion.a
      className={`border-beam label-caps inline-flex items-center justify-center rounded-full px-7 py-4 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
        variant === "dark" ? "bg-ink text-background" : "bg-background text-ink"
      } ${className}`}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      style={{ x: springX, y: springY }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
