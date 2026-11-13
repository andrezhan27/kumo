import Image from "next/image";
import cloud from "@/public/ornaments/kumo-cloud-hero-detailed.webp";

/** A decorative background watermark; never announced or interactive. */
export function CloudOrnament({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`cloud-ornament ${className}`}>
      <Image alt="" className="h-auto w-full" sizes="(min-width: 768px) min(48vw, 44rem), 82vw" src={cloud} />
    </div>
  );
}
