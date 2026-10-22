import type { ComponentProps } from "react";

export function MagneticButton({ children, className = "", size = "default", ...props }: ComponentProps<"a"> & { size?: "default" | "compact" }) {
  return (
    <a className={`border-beam label-caps inline-flex items-center justify-center rounded-lg bg-ink text-background transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${size === "compact" ? "h-10 px-5" : "min-h-12 px-7 py-4"} ${className}`} {...props}>
      {children}
    </a>
  );
}
