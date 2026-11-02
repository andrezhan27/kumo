import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("nl");

export default function DutchLayout({ children }: { children: ReactNode }) {
  return children;
}
