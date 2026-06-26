"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MagneticButton } from "@/components/MagneticButton";
import { useLanguage } from "@/components/LanguageProvider";
import { brandName } from "@/lib/content";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const isHomePage = pathname === "/";
  const homeHref = isHomePage ? "#home" : "/";
  const contactHref = isHomePage ? "#contact" : "/#contact";
  const bookingSectionHref = isHomePage ? "#booking" : "/#booking";
  const takeawayHref = isHomePage ? "#takeaway" : "/#takeaway";

  const links = [
    { label: t.nav.home, href: homeHref },
    { label: t.nav.menu, href: "/menu" },
    { label: t.nav.contact, href: contactHref, mobileHref: bookingSectionHref },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-background/10 bg-background/82 backdrop-blur-xl">
      <nav className="section-shell flex h-20 items-center justify-between gap-4">
        <Link
          aria-label={`${brandName} home`}
          className="display-serif flex shrink-0 items-center gap-2 text-2xl tracking-[0.08em] text-ink md:text-3xl"
          href={homeHref}
        >
          <Image alt="" aria-hidden src="/sushi-king-logo.png" width={32} height={32} className="h-8 w-8" />
          {brandName}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              className="label-caps text-ink-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <MagneticButton className="w-44" href={takeawayHref}>
            {t.nav.takeaway}
          </MagneticButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="grid h-10 w-10 place-items-center rounded-full border border-line/70 bg-surface text-ink transition-colors hover:border-ink"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate="open"
            className="md:hidden"
            exit="closed"
            initial="closed"
            variants={{
              open: { opacity: 1, height: "auto" },
              closed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-ink/8 bg-background/97 backdrop-blur-xl">
              <div className="section-shell pb-8 pt-2">
                <nav>
                  {links.map((link, i) => {
                    const href = link.mobileHref ?? link.href;
                    const sharedClass =
                      "group flex items-center justify-between border-b border-line/30 py-5 last:border-b-0 focus-visible:outline-none";
                    const inner = (
                      <>
                        <span className="display-serif text-2xl tracking-wide text-ink transition-colors duration-200 group-hover:text-gold-deep">
                          {link.label}
                        </span>
                        <span className="translate-x-0 text-gold-deep opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                          →
                        </span>
                      </>
                    );
                    return (
                      <motion.div
                        key={href}
                        custom={i}
                        variants={{
                          open: (idx: number) => ({
                            opacity: 1,
                            y: 0,
                            transition: { delay: idx * 0.06 + 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                          }),
                          closed: { opacity: 0, y: -8 },
                        }}
                      >
                        {href.startsWith("#") ? (
                          <a className={sharedClass} href={href} onClick={() => setOpen(false)}>
                            {inner}
                          </a>
                        ) : (
                          <Link className={sharedClass} href={href} onClick={() => setOpen(false)}>
                            {inner}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </nav>

                <motion.a
                  custom={links.length}
                  variants={{
                    open: (idx: number) => ({
                      opacity: 1,
                      y: 0,
                      transition: { delay: idx * 0.06 + 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                    }),
                    closed: { opacity: 0, y: -8 },
                  }}
                  className="label-caps mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-ink py-4 text-background transition-opacity hover:opacity-80"
                  href={takeawayHref}
                  onClick={() => setOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  {t.nav.takeaway}
                </motion.a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
