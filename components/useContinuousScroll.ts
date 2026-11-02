"use client";

import { useEffect, useRef } from "react";

// Keep native scrolling, dragging and touch gestures in sync with the automatic loop.
export function useContinuousScroll<T extends HTMLElement = HTMLDivElement>(speed = 24) {
  const viewportRef = useRef<T>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstSet = viewport?.querySelector<HTMLElement>("[data-marquee-set]");
    if (!viewport || !firstSet) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let setWidth = firstSet.offsetWidth;
    let position = 0;
    let expectedScroll = 0;
    let pointerId: number | null = null;
    let touching = false;
    let dragX: number | null = null;
    let dragStart = 0;
    let scrolling = false;
    let lastInput = 0;
    let previousTime = 0;
    let frame = 0;

    const writePosition = () => {
      viewport.scrollLeft = position;
      expectedScroll = viewport.scrollLeft;
    };
    const normalize = () => {
      if (setWidth && !reducedMotion.matches) {
        position = ((position % setWidth) + setWidth) % setWidth + setWidth;
      }
    };
    const resize = () => {
      setWidth = firstSet.offsetWidth;
      position = viewport.scrollLeft;
      normalize();
      writePosition();
    };
    const markInput = () => {
      scrolling = true;
      lastInput = performance.now();
    };
    const onScroll = () => {
      if (Math.abs(viewport.scrollLeft - expectedScroll) > 1) {
        position = viewport.scrollLeft;
        markInput();
      }
    };
    const onScrollEnd = () => { scrolling = false; };
    const onWheel = (event: WheelEvent) => {
      if (event.deltaX || event.shiftKey) markInput();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      pointerId = event.pointerId;
      position = viewport.scrollLeft;
      scrolling = false;
      if (event.pointerType === "mouse") {
        dragX = event.clientX;
        dragStart = position;
        viewport.setPointerCapture(event.pointerId);
        viewport.dataset.dragging = "true";
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId || dragX === null) return;
      position = dragStart + dragX - event.clientX;
      writePosition();
      position = viewport.scrollLeft;
    };
    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      dragX = null;
      delete viewport.dataset.dragging;
      // Resume on release; native touch momentum, if any, is handled by onScroll.
      scrolling = false;
      position = viewport.scrollLeft;
    };
    // Native swiping cancels pointer events before the finger leaves the screen.
    const onTouchStart = () => { touching = true; };
    const onTouchEnd = (event: TouchEvent) => {
      touching = event.touches.length > 0;
      if (!touching) {
        scrolling = false;
        position = viewport.scrollLeft;
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const distances: Record<string, number> = {
        ArrowLeft: -120, ArrowRight: 120,
        Home: -viewport.scrollLeft, End: viewport.scrollWidth - viewport.clientWidth - viewport.scrollLeft,
      };
      if (!(event.key in distances)) return;
      event.preventDefault();
      position = viewport.scrollLeft + distances[event.key];
      writePosition();
      position = viewport.scrollLeft;
      markInput();
    };
    const animate = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 0;
      previousTime = time;
      // scrollend resumes immediately; the short fallback supports older browsers.
      if (!reducedMotion.matches && !touching && pointerId === null && (!scrolling || time - lastInput >= 80)) {
        scrolling = false;
        position += speed * elapsed / 1_000;
        normalize();
        writePosition();
      }
      frame = requestAnimationFrame(animate);
    };
    const onMotionChange = () => {
      position = reducedMotion.matches ? 0 : viewport.scrollLeft;
      normalize();
      writePosition();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(firstSet);
    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("scrollend", onScrollEnd);
    viewport.addEventListener("wheel", onWheel, { passive: true });
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchend", onTouchEnd, { passive: true });
    viewport.addEventListener("touchcancel", onTouchEnd, { passive: true });
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("lostpointercapture", onPointerEnd);
    viewport.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("pointercancel", onPointerEnd);
    reducedMotion.addEventListener("change", onMotionChange);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("scrollend", onScrollEnd);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("touchcancel", onTouchEnd);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("lostpointercapture", onPointerEnd);
      viewport.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, [speed]);

  return viewportRef;
}
