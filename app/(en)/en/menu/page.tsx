import { MenuPageContent } from "@/components/MenuPageContent";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en", "/menu");
export default function MenuPage() { return <MenuPageContent />; }
