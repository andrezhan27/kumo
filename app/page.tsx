import { BookTable } from "@/components/BookTable";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MenuCarousel } from "@/components/MenuCarousel";
import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/PricingSection";
import { SpaceCarousel } from "@/components/SpaceCarousel";
import { TakeawaySection } from "@/components/TakeawaySection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MenuCarousel />
        <PricingSection />
        <SpaceCarousel />
        <BookTable />
        <TakeawaySection />
      </main>
      <Footer />
    </>
  );
}
