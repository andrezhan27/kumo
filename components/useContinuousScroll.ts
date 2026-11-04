"use client";

import { useEffect, useRef } from "react";

// Keep native scrolling, dragging and touch gestures in sync with the automatic loop.
export function useContinuousScroll<T extends HTMLElement = HTMLDivElement>(speed = 30) {
  const viewportRef = useRef<T>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstSet = viewport?.querySelector<HTMLElement>("[data-marquee-set]");
    const track = firstSet?.parentElement;
    if (!viewport || !firstSet || !track) return;

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
    let visible = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    const writePosition = () => {
      viewport.scrollLeft = position;
      expectedScroll = viewport.scrollLeft;
      // Preserve fractional pixels even on browsers that round scrollLeft.
      track.style.transform = `translateX(${expectedScroll - position}px)`;
    };
    const normalize = () => {
      if (setWidth && !reducedMotion.matches && (position < setWidth || position >= setWidth * 2)) {
        position = ((position % setWidth) + setWidth) % setWidth + setWidth;
      }
    };
    const resize = () => {
      setWidth = firstSet.offsetWidth;
      position = viewport.scrollLeft;
      normalize();
      writePosition();
    };
    const stopAnimation = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };
    const startAnimation = () => {
      if (!frame && visible && !document.hidden && !reducedMotion.matches && !touching && pointerId === null && !scrolling) {
        frame = requestAnimationFrame(animate);
      }
    };
    const finishScroll = () => {
      clearTimeout(resumeTimer);
      if (touching || pointerId !== null) return;
      scrolling = false;
      position = viewport.scrollLeft;
      normalize();
      writePosition();
      startAnimation();
    };
    const markInput = () => {
      scrolling = true;
      lastInput = performance.now();
      stopAnimation();
      clearTimeout(resumeTimer);
      // Older Safari versions lack scrollend. Wait for momentum to settle.
      resumeTimer = setTimeout(finishScroll, 250);
    };
    const commitAnimation = () => {
      stopAnimation();
      writePosition();
      position = viewport.scrollLeft;
      track.style.transform = "";
    };
    const onScroll = () => {
      if (Math.abs(viewport.scrollLeft - expectedScroll) > 0.01) {
        track.style.transform = "";
        position = viewport.scrollLeft;
        markInput();
      }
    };
    const onScrollEnd = () => {
      if (scrolling && performance.now() - lastInput >= 100) finishScroll();
    };
    const onWheel = (event: WheelEvent) => {
      if (event.deltaX || event.shiftKey) {
        commitAnimation();
        markInput();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      commitAnimation();
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
      position = viewport.scrollLeft;
      markInput();
    };
    // Native swiping cancels pointer events before the finger leaves the screen.
    const onTouchStart = () => {
      commitAnimation();
      touching = true;
    };
    const onTouchEnd = (event: TouchEvent) => {
      touching = event.touches.length > 0;
      if (!touching) {
        position = viewport.scrollLeft;
        markInput();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const distances: Record<string, number> = {
        ArrowLeft: -120, ArrowRight: 120,
        Home: -viewport.scrollLeft, End: viewport.scrollWidth - viewport.clientWidth - viewport.scrollLeft,
      };
      if (!(event.key in distances)) return;
      event.preventDefault();
      commitAnimation();
      position = viewport.scrollLeft + distances[event.key];
      writePosition();
      position = viewport.scrollLeft;
      markInput();
    };
    const animate = (time: number) => {
      frame = 0;
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 0;
      previousTime = time;
      position += speed * elapsed / 1_000;
      const beforeWrap = position;
      normalize();
      // Animate fractional movement with a transform. Commit native scroll only
      // every 64px (or at the loop boundary), never during a swipe or momentum.
      if (Math.abs(position - expectedScroll) >= 64 || position !== beforeWrap) {
        writePosition();
      } else {
        track.style.transform = `translateX(${expectedScroll - position}px)`;
      }
      startAnimation();
    };
    const onMotionChange = () => {
      stopAnimation();
      position = reducedMotion.matches ? 0 : viewport.scrollLeft;
      normalize();
      writePosition();
      startAnimation();
    };
    const onVisibilityChange = () => {
      if (document.hidden) stopAnimation();
      else startAnimation();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(firstSet);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startAnimation();
      else stopAnimation();
    });
    intersectionObserver.observe(viewport);
    document.addEventListener("visibilitychange", onVisibilityChange);
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

    return () => {
      stopAnimation();
      clearTimeout(resumeTimer);
      track.style.transform = "";
      observer.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
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
