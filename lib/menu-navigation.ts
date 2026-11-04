/** Update the shareable fragment without triggering the browser's anchor jump. */
export function scrollToMenuTarget(target: HTMLElement) {
  const fragment = `#${encodeURIComponent(target.id)}`;
  if (window.location.hash !== fragment) {
    window.history.pushState(window.history.state, "", fragment);
  }
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
}
