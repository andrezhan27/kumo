import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("fr");

export default function FrenchLayout({ children }: { children: ReactNode }) {
  return children;
}
