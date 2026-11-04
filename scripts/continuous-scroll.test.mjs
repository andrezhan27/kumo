import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(readFileSync(new URL("../components/useContinuousScroll.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function setup(reduce = false) {
  const events = () => {
    const listeners = new Map();
    return {
      addEventListener: (name, fn) => listeners.set(name, fn),
      removeEventListener: name => listeners.delete(name),
      emit: (name, event = {}) => listeners.get(name)?.(event),
    };
  };
  const track = { style: {} };
  let scroll = 0;
  let writes = 0;
  const viewport = {
    ...events(), dataset: {},
    querySelector: () => ({ offsetWidth: 1000, parentElement: track }),
    get scrollLeft() { return scroll; },
    set scrollLeft(value) { scroll = Math.round(value); writes++; },
  };
  const frames = new Map();
  const timers = new Map();
  let id = 0;
  let time = 1000;
  let intersect;
  let cleanup;
  const motion = { ...events(), matches: reduce };
  const document = { ...events(), hidden: false };
  const window = { ...events(), matchMedia: () => motion };
  const context = {
    exports: {},
    require: () => ({ useRef: () => ({ current: viewport }), useEffect: fn => { cleanup = fn(); } }),
    window, document, performance: { now: () => time },
    requestAnimationFrame: fn => { frames.set(++id, fn); return id; },
    cancelAnimationFrame: key => frames.delete(key),
    setTimeout: fn => { timers.set(++id, fn); return id; },
    clearTimeout: key => timers.delete(key),
    ResizeObserver: class { observe() {} disconnect() {} },
    IntersectionObserver: class { constructor(fn) { intersect = fn; } observe() {} disconnect() {} },
  };
  vm.runInNewContext(source, context);
  context.exports.useContinuousScroll();
  return {
    viewport, track, frames, document, motion, cleanup: () => cleanup(),
    visible: value => intersect([{ isIntersecting: value }]),
    writes: () => writes,
    tick: (ms = 16) => {
      time += ms;
      const pending = [...frames.values()];
      frames.clear();
      for (const fn of pending) fn(time);
    },
    nativeScroll: value => { scroll = value; viewport.emit("scroll"); },
    idle: () => { const pending = [...timers.values()]; timers.clear(); for (const fn of pending) fn(); },
  };
}

test("fractional autoplay batches native writes and pauses offscreen and in hidden tabs", () => {
  const s = setup();
  assert.equal(s.frames.size, 0);
  s.visible(true);
  const initialWrites = s.writes();
  for (let i = 0; i < 61; i++) s.tick();
  assert.equal(s.writes(), initialWrites, "One second of autoplay must not write native scroll");
  assert.ok(Math.abs(Number(s.track.style.transform.match(/\(([-\d.]+)/)[1]) + 28.8) < 0.001);
  for (let i = 0; i < 100; i++) s.tick();
  assert.equal(s.writes(), initialWrites + 1, "Native updates are batched every 64px");
  s.visible(false);
  assert.equal(s.frames.size, 0);
  s.visible(true);
  s.document.hidden = true;
  s.document.emit("visibilitychange");
  assert.equal(s.frames.size, 0);
  s.document.hidden = false;
  s.document.emit("visibilitychange");
  assert.equal(s.frames.size, 1);
  s.cleanup();
  assert.equal(s.frames.size, 0);
  assert.equal(s.track.style.transform, "");
});

test("Safari pointer cancellation and touch release leave native momentum uninterrupted", () => {
  const s = setup();
  s.visible(true);
  s.tick();
  s.tick();
  s.viewport.emit("pointerdown", { isPrimary: true, button: 0, pointerId: 1, pointerType: "touch" });
  s.viewport.emit("touchstart");
  s.nativeScroll(1040);
  const beforeIdle = s.writes();
  s.idle();
  assert.equal(s.writes(), beforeIdle, "An idle timer must not write while a finger is down");
  // Native swiping cancels the pointer before touchend.
  // The hook listens for cancellation on window, represented by lost capture here.
  s.viewport.emit("lostpointercapture", { pointerId: 1 });
  s.viewport.emit("touchend", { touches: [] });
  const beforeMomentum = s.writes();
  for (let i = 0; i < 20; i++) {
    s.tick();
    s.nativeScroll(1040 + i * 3);
    assert.equal(s.frames.size, 0);
    assert.equal(s.writes(), beforeMomentum, "Momentum must not receive programmatic scroll writes");
  }
  s.idle();
  assert.equal(s.frames.size, 1, "Autoplay resumes after momentum settles");
  s.cleanup();
});

test("reduced motion retains native scrolling without animation frames", () => {
  const s = setup(true);
  s.visible(true);
  assert.equal(s.frames.size, 0);
  s.nativeScroll(120);
  s.idle();
  assert.equal(s.viewport.scrollLeft, 120);
  assert.equal(s.frames.size, 0);
  s.cleanup();
});
