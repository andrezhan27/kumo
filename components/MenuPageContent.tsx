"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUp, ArrowUpRight, ChevronDown, Phone } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Footer } from "@/components/Footer";
import { CloudOrnament } from "@/components/CloudOrnament";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/components/LanguageProvider";
import { reservationHref, restaurantInfo } from "@/lib/content";
import { menuCategories, menuCopy } from "@/lib/menu";
import { scrollToMenuTarget } from "@/lib/menu-navigation";

export function MenuPageContent() {
  const { language, localizeHref } = useLanguage();
  const copy = menuCopy[language];
  const [selected, setSelected] = useState("");
  const selectRef = useRef<HTMLSelectElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const syncFragment = () => {
      const id = window.location.hash.slice(1);
      setSelected(menuCategories.some(category => category.id === id) ? id : "");
    };
    syncFragment();
    window.addEventListener("hashchange", syncFragment);
    window.addEventListener("popstate", syncFragment);
    return () => {
      window.removeEventListener("hashchange", syncFragment);
      window.removeEventListener("popstate", syncFragment);
    };
  }, []);

  function navigateTo(id: string, returnToCategories = false) {
    const target = document.getElementById(id);
    if (!target) return;
    setSelected(returnToCategories ? "" : id);
    scrollToMenuTarget(target);
    if (returnToCategories) {
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      (mobile ? selectRef.current : navigationRef.current)?.focus({ preventScroll: true });
    } else {
      target.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
    }
  }

  function followCategory(event: MouseEvent<HTMLAnchorElement>, id: string, returnToCategories = false) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigateTo(id, returnToCategories);
  }

  return (
    <>
      <Navbar />
      <main className="cloud-accent-section menu-page" id="main-content">
        <CloudOrnament className="cloud-ornament--menu-page" />
        <div className="menu-shell">
          <div className="menu-title-row">
            <h1 className="menu-heading menu-title">{copy.title}</h1>
            <Link className="menu-home-link" href={localizeHref("/")}>
              <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
              <span className="md:hidden">{copy.home}</span>
              <span className="hidden md:inline">{copy.back}</span>
            </Link>
          </div>

          <nav aria-label={copy.explore} className="menu-category-navigation" id="menu-categories" ref={navigationRef} tabIndex={-1}>
            <ul className="menu-category-links">
              {menuCategories.map(category => (
                <li key={category.id}>
                  <a aria-current={selected === category.id ? "location" : undefined} href={`#${category.id}`} onClick={event => followCategory(event, category.id)}>{category.title[language]}</a>
                </li>
              ))}
            </ul>
            <div className="menu-category-picker">
              <label className="label-caps" htmlFor="menu-category">{copy.explore}</label>
              <div className="menu-select-wrap">
                <select id="menu-category" onChange={event => { if (event.target.value) navigateTo(event.target.value); }} ref={selectRef} value={selected}>
                  <option value="">{copy.choose}</option>
                  {menuCategories.map(category => <option key={category.id} value={category.id}>{category.title[language]}</option>)}
                </select>
                <ChevronDown aria-hidden="true" size={18} strokeWidth={1.5} />
              </div>
            </div>
          </nav>

          <div className="menu-sections">
            {menuCategories.map((category, categoryIndex) => (
              <section aria-labelledby={`${category.id}-title`} className="menu-category-section" id={category.id} key={category.id}>
                <div className="menu-section-header">
                  <div className="min-w-0">
                    <p aria-hidden="true" className="label-caps menu-section-number">{String(categoryIndex + 1).padStart(2, "0")} / MENU</p>
                    <h2 className="menu-heading menu-category-title" id={`${category.id}-title`} tabIndex={-1}>{category.title[language]}</h2>
                    <p className="menu-category-description">{category.description[language]}</p>
                  </div>
                  <a className="menu-back-to-categories" href="#menu-categories" onClick={event => followCategory(event, "menu-categories", true)}>
                    {copy.categories}<ArrowUp aria-hidden="true" size={14} strokeWidth={1.5} />
                  </a>
                </div>
                <ul className="menu-dish-grid">
                  {category.dishes.map((dish, dishIndex) => (
                    <li key={dish.id}>
                      <figure className="menu-dish-card">
                        <Image alt={dish.name[language]} className="menu-dish-photo" fill loading={categoryIndex === 0 && dishIndex === 0 ? "eager" : "lazy"} sizes="(min-width: 1440px) 424px, (min-width: 1024px) calc((100vw - 112px) / 3), (min-width: 640px) calc((100vw - 88px) / 2), calc(100vw - 40px)" src={dish.image} />
                        {dish.isNew && <span className="menu-new-badge">{copy.new}</span>}
                        <figcaption className="menu-dish-caption">
                          <span className="menu-dish-category">{category.title[language]}</span>
                          <span className="menu-dish-name">{dish.name[language]}</span>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <aside aria-label={copy.book} className="menu-visit-note">
            <p>{copy.note}</p>
            <div className="menu-visit-links">
              <Link href={localizeHref(reservationHref)}>{copy.book}<ArrowUpRight aria-hidden="true" size={16} /></Link>
              <a aria-label={`${copy.phone} : ${restaurantInfo.phone}`} href={restaurantInfo.phoneHref}><Phone aria-hidden="true" size={15} />{restaurantInfo.phone}</a>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
