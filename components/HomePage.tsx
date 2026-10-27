import { BookTable } from "@/components/BookTable";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MenuCarousel } from "@/components/MenuCarousel";
import { Navbar } from "@/components/Navbar";
import { SpaceCarousel } from "@/components/SpaceCarousel";
import { ReviewsSection } from "@/components/ReviewsSection";
import { HowItWorks } from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <MenuCarousel />
        <HowItWorks />
        <PricingSection />
        <SpaceCarousel />
        <BookTable />
        <ReviewsSection />
      </main>
      <Footer />
    </>
  );
}
