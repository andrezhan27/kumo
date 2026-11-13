import Image, { type StaticImageData } from "next/image";
import defaultCloud from "@/public/ornaments/kumo-cloud-hero-detailed.webp";

/** A decorative background watermark; never announced or interactive. */
export function CloudOrnament({ className = "", image = defaultCloud }: {
  className?: string;
  image?: StaticImageData;
}) {
  return (
    <div aria-hidden="true" className={`cloud-ornament ${className}`}>
      <Image alt="" className="h-auto w-full" sizes="(min-width: 768px) min(72vw, 66rem), 150vw" src={image} />
    </div>
  );
}
