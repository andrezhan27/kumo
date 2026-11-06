import Image from "next/image";

/** A decorative background watermark; never announced or interactive. */
export function CloudOrnament({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`cloud-ornament ${className}`}>
      <Image alt="" className="h-auto w-full" height={400} sizes="(min-width: 1477px) 1152px, (min-width: 768px) 78vw, 150vw" src="/ornaments/kumo-cloud.webp" width={1200} />
    </div>
  );
}
