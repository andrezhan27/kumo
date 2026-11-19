"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ChevronDown, Phone } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Footer } from "@/components/Footer";
import { CloudOrnament } from "@/components/CloudOrnament";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/components/LanguageProvider";
import { reservationHref, restaurantInfo } from "@/lib/content";
import { menuCategories, menuCategoryGroups, menuCopy, menuGroupFor } from "@/lib/menu";
import { scrollToMenuTarget } from "@/lib/menu-navigation";

export function MenuPageContent() {
  const { language, localizeHref } = useLanguage();
  const copy = menuCopy[language];
  const [selected, setSelected] = useState(menuCategories[0].id);
  const [expandedGroup, setExpandedGroup] = useState(menuCategoryGroups[0].id);
  const activeCategory = useRef(menuCategories[0].id);
  const navigating = useRef(false);
  const scrollSettled = useRef<number>(undefined);

  useEffect(() => {
    const sections = menuCategories
      .map(category => document.getElementById(category.id))
      .filter(section => section !== null);
    if (!sections.length) return;

    let frame = 0;
    const updateCategory = () => {
      frame = 0;
      if (navigating.current) return;

      const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const scrollMargin = parseFloat(getComputedStyle(sections[0]).scrollMarginTop) || 0;
      const activationLine = scrollPadding + scrollMargin + 1;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top > activationLine) break;
        current = section.id;
      }
      if (current === activeCategory.current) return;
      activeCategory.current = current;
      setSelected(current);
      setExpandedGroup(menuGroupFor(current) ?? "");
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateCategory);
    };
    const onScroll = () => {
      if (navigating.current) {
        window.clearTimeout(scrollSettled.current);
        scrollSettled.current = window.setTimeout(() => {
          navigating.current = false;
          scheduleUpdate();
        }, 180);
      }
      scheduleUpdate();
    };
    const onHistoryChange = () => {
      navigating.current = false;
      scheduleUpdate();
    };

    scheduleUpdate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", onHistoryChange);
    window.addEventListener("popstate", onHistoryChange);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(scrollSettled.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", onHistoryChange);
      window.removeEventListener("popstate", onHistoryChange);
    };
  }, []);

  function navigateTo(id: string, focusHeading = false) {
    const target = document.getElementById(id);
    if (!target) return;
    // Keep the chosen category visible while smooth scrolling past other sections.
    navigating.current = true;
    window.clearTimeout(scrollSettled.current);
    scrollSettled.current = window.setTimeout(() => { navigating.current = false; }, 180);
    activeCategory.current = id;
    setSelected(id);
    setExpandedGroup(menuGroupFor(id) ?? "");
    scrollToMenuTarget(target);
    if (focusHeading) {
      target.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
    }
  }

  function followCategory(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigateTo(id, true);
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

          <div className="menu-browser">
            <nav aria-label={copy.explore} className="menu-category-navigation" id="menu-categories">
              <div className="menu-sidebar">
                <p className="label-caps">{copy.explore}</p>
                {menuCategoryGroups.map(group => {
                  const expanded = expandedGroup === group.id;
                  const panelId = `menu-group-${group.id}`;
                  return (
                    <div className="menu-category-group" key={group.id}>
                      <button aria-controls={panelId} aria-expanded={expanded} className="menu-group-toggle" onClick={() => setExpandedGroup(expanded ? "" : group.id)} type="button">
                        {group.title[language]}
                        <ChevronDown aria-hidden="true" size={16} strokeWidth={1.5} />
                      </button>
                      <ul className="menu-category-links" hidden={!expanded} id={panelId}>
                        {group.categories.map(category => (
                          <li key={category.id}>
                            <a aria-current={selected === category.id ? "location" : undefined} href={`#${category.id}`} onClick={event => followCategory(event, category.id)}>{category.title[language]}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div className="menu-category-picker">
                <label className="sr-only" htmlFor="menu-category">{copy.explore}</label>
                <div className="menu-select-wrap">
                  <select id="menu-category" onChange={event => navigateTo(event.target.value)} value={selected}>
                    {menuCategoryGroups.map(group => (
                      <optgroup key={group.id} label={group.title[language]}>
                        {group.categories.map(category => <option key={category.id} value={category.id}>{category.title[language]}</option>)}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" size={18} strokeWidth={1.5} />
                </div>
              </div>
            </nav>

            <div className="menu-sections">
              {menuCategories.map((category, categoryIndex) => (
                <section aria-labelledby={`${category.id}-title`} className="menu-category-section" id={category.id} key={category.id}>
                  <div className="menu-section-header">
                    <p aria-hidden="true" className="label-caps menu-section-number">{String(categoryIndex + 1).padStart(2, "0")} / MENU</p>
                    <h2 className="menu-heading menu-category-title" id={`${category.id}-title`} tabIndex={-1}>{category.title[language]}</h2>
                    <p className="menu-category-description">{category.description[language]}</p>
                  </div>
                  <ul className="menu-dish-grid">
                    {category.dishes.map((dish, dishIndex) => (
                      <li key={dish.id}>
                        <figure className="menu-dish-card">
                          <Image alt={dish.name[language]} className="menu-dish-photo" fill loading={categoryIndex === 0 && dishIndex === 0 ? "eager" : "lazy"} sizes="(min-width: 1384px) 340px, (min-width: 1280px) calc((100vw - 364px) / 3), (min-width: 1024px) calc((100vw - 316px) / 2), (min-width: 640px) calc((100vw - 88px) / 2), calc(100vw - 40px)" src={dish.image} />
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
