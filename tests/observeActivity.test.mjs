import assert from 'node:assert/strict';
import test from 'node:test';
import { observeActivity } from '../src/lib/observeActivity.js';

function setup({ supported = true, hidden = false, ...options } = {}) {
  const changes = [];
  const listeners = new Map();
  const timers = new Map();
  let observer;
  let timerId = 0;
  const doc = {
    hidden,
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: (name, handler) => {
      if (listeners.get(name) === handler) listeners.delete(name);
    },
    defaultView: {
      setTimeout: (callback, delay) => {
        timers.set(++timerId, { callback, delay });
        return timerId;
      },
      clearTimeout: id => timers.delete(id),
    },
  };
  if (supported) {
    doc.defaultView.IntersectionObserver = class {
      constructor(callback, config) {
        this.callback = callback;
        this.config = config;
        this.disconnected = false;
        observer = this;
      }
      observe(element) { this.element = element; }
      disconnect() { this.disconnected = true; }
    };
  }
  const element = { ownerDocument: doc };
  const cleanup = observeActivity(element, value => changes.push(value), options);
  return {
    changes, timers, listeners, observer, element, cleanup,
    intersect: isIntersecting => observer.callback([{ isIntersecting }]),
    visibility: hidden => {
      doc.hidden = hidden;
      listeners.get('visibilitychange')?.();
    },
    flush: () => {
      const pending = [...timers.values()];
      timers.clear();
      pending.forEach(({ callback }) => callback());
    },
  };
}

test('does not activate offscreen content; observes with the requested preload margin', () => {
  const activity = setup({ rootMargin: '160px' });
  assert.deepEqual(activity.changes, []);
  assert.equal(activity.observer.element, activity.element);
  assert.equal(activity.observer.config.rootMargin, '160px');
  activity.intersect(false);
  assert.deepEqual(activity.changes, []);
  activity.intersect(true);
  activity.intersect(true);
  assert.deepEqual(activity.changes, [true]);
  activity.cleanup();
});

test('releases an offscreen preview after the grace period', () => {
  const activity = setup({ releaseDelay: 10000 });
  activity.intersect(true);
  activity.intersect(false);
  assert.deepEqual(activity.changes, [true]);
  assert.equal([...activity.timers.values()][0].delay, 10000);
  activity.flush();
  assert.deepEqual(activity.changes, [true, false]);
  activity.cleanup();
});

test('returning during the grace period avoids unloading and reloading', () => {
  const activity = setup({ releaseDelay: 10000 });
  activity.intersect(true);
  activity.intersect(false);
  activity.intersect(true);
  assert.equal(activity.timers.size, 0);
  activity.flush();
  assert.deepEqual(activity.changes, [true]);
  activity.cleanup();
});

test('hidden tabs release content immediately and only reactivate visible content', () => {
  const activity = setup({ releaseDelay: 10000 });
  activity.intersect(true);
  activity.visibility(true);
  assert.deepEqual(activity.changes, [true, false]);
  assert.equal(activity.timers.size, 0);
  activity.visibility(false);
  assert.deepEqual(activity.changes, [true, false, true]);
  activity.intersect(false);
  activity.visibility(true);
  assert.equal(activity.timers.size, 0);
  activity.visibility(false);
  assert.deepEqual(activity.changes, [true, false, true, false]);
  activity.cleanup();
});

test('a hidden tab never activates a newly intersecting preview', () => {
  const activity = setup({ hidden: true });
  activity.intersect(true);
  assert.deepEqual(activity.changes, []);
  activity.visibility(false);
  assert.deepEqual(activity.changes, [true]);
  activity.cleanup();
});

test('animations without a grace period pause as soon as they leave the viewport', () => {
  const activity = setup();
  activity.intersect(true);
  activity.intersect(false);
  assert.deepEqual(activity.changes, [true, false]);
  assert.equal(activity.timers.size, 0);
  activity.cleanup();
});

test('cleanup cancels delayed work, removes listeners, and ignores late observer events', () => {
  const activity = setup({ releaseDelay: 10000 });
  activity.intersect(true);
  activity.intersect(false);
  activity.cleanup();
  assert.equal(activity.observer.disconnected, true);
  assert.equal(activity.listeners.size, 0);
  assert.equal(activity.timers.size, 0);
  activity.intersect(true);
  activity.visibility(true);
  activity.flush();
  assert.deepEqual(activity.changes, [true]);
});

test('browsers without IntersectionObserver still show previews and respect tab visibility', () => {
  const activity = setup({ supported: false });
  assert.deepEqual(activity.changes, [true]);
  activity.visibility(true);
  activity.visibility(false);
  assert.deepEqual(activity.changes, [true, false, true]);
  activity.cleanup();
});
