import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";

type MenuLayoutProps = {
  children: ReactNode;
};

export default function MenuLayout({ children }: MenuLayoutProps) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
