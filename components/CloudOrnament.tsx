import Image from "next/image";

/** A decorative brand accent; never announced or interactive. */
export function CloudOrnament({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`cloud-ornament ${className}`}>
      <Image alt="" className="h-auto w-full" height={400} sizes="(min-width: 768px) 416px, 192px" src="/ornaments/kumo-cloud.webp" width={1200} />
    </div>
  );
}
