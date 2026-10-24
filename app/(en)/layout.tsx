import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return children;
}
