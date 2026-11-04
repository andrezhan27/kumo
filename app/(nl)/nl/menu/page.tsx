import { MenuPageContent } from "@/components/MenuPageContent";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("nl", "/menu");
export default function MenuPage() { return <MenuPageContent />; }
