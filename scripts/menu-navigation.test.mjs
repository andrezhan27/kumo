import assert from "node:assert/strict";
import { test } from "node:test";
import { scrollToMenuTarget } from "../lib/menu-navigation.ts";

function navigationFixture(t, { reducedMotion = false, hash = "" } = {}) {
  const events = [];
  const routerState = { __NA: true, tree: ["menu"] };
  let currentHash = hash;
  const location = {};
  Object.defineProperty(location, "hash", {
    get: () => currentHash,
    set: () => assert.fail("Assigning location.hash would cause an initial anchor jump"),
  });
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  t.after(() => {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else Reflect.deleteProperty(globalThis, "window");
  });
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    location,
    history: {
      state: routerState,
      pushState(state, title, fragment) {
        assert.equal(state, routerState, "Preserve Next.js history state");
        assert.equal(title, "");
        currentHash = fragment;
        events.push({ type: "fragment", fragment });
      },
    },
    matchMedia(query) {
      assert.equal(query, "(prefers-reduced-motion: reduce)");
      return { matches: reducedMotion };
    },
  } });
  const target = id => ({ id, scrollIntoView: options => events.push({ type: "scroll", id, ...options }) });
  return { events, target, hash: () => currentHash };
}

test("category selection updates its fragment and smooth-scrolls without an anchor jump", t => {
  const { events, target, hash } = navigationFixture(t);
  scrollToMenuTarget(target("sashimi"));
  assert.equal(hash(), "#sashimi");
  assert.deepEqual(events, [
    { type: "fragment", fragment: "#sashimi" },
    { type: "scroll", id: "sashimi", behavior: "smooth", block: "start" },
  ]);
});

test("reduced-motion selection immediately reaches the same destination", t => {
  const { events, target, hash } = navigationFixture(t, { reducedMotion: true });
  scrollToMenuTarget(target("rice"));
  assert.equal(hash(), "#rice");
  assert.deepEqual(events.at(-1), { type: "scroll", id: "rice", behavior: "instant", block: "start" });
});

test("return navigation permits selecting the same category again", t => {
  const { events, target, hash } = navigationFixture(t);
  scrollToMenuTarget(target("sashimi"));
  scrollToMenuTarget(target("menu-categories"));
  scrollToMenuTarget(target("sashimi"));
  assert.equal(hash(), "#sashimi");
  assert.equal(events.filter(event => event.type === "scroll" && event.id === "sashimi").length, 2);
});

test("reselecting the current fragment still scrolls without duplicating browser history", t => {
  const { events, target } = navigationFixture(t, { hash: "#sashimi" });
  scrollToMenuTarget(target("sashimi"));
  assert.deepEqual(events, [{ type: "scroll", id: "sashimi", behavior: "smooth", block: "start" }]);
});
