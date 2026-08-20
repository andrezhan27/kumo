import { FooterClient } from "@/components/FooterClient";
import { getRestaurantLegalLinks } from "@/lib/legal-links";

export async function Footer() {
  const legalLinks = await getRestaurantLegalLinks();

  return <FooterClient legalLinks={legalLinks} />;
}
