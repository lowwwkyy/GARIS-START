// Keep expensive content alive briefly during scrolling, but release it immediately
// in a hidden tab. No scroll polling or permanent timers are needed.
export function observeActivity(element, onChange, { rootMargin = '0px', releaseDelay = 0 } = {}) {
  const doc = element.ownerDocument;
  const view = doc.defaultView;
  let intersects = !view.IntersectionObserver;
  let active = false;
  let timer;
  let disposed = false;

  const publish = (next) => {
    if (!disposed && active !== next) {
      active = next;
      onChange(next);
    }
  };

  const update = () => {
    view.clearTimeout(timer);
    if (doc.hidden) {
      publish(false);
    } else if (intersects) {
      publish(true);
    } else if (active && releaseDelay > 0) {
      timer = view.setTimeout(() => publish(false), releaseDelay);
    } else {
      publish(false);
    }
  };

  const observer = view.IntersectionObserver
    ? new view.IntersectionObserver(([entry]) => {
      if (disposed) return;
      intersects = entry.isIntersecting;
      update();
    }, { rootMargin })
    : null;

  doc.addEventListener('visibilitychange', update);
  observer?.observe(element);
  update();

  return () => {
    disposed = true;
    observer?.disconnect();
    doc.removeEventListener('visibilitychange', update);
    view.clearTimeout(timer);
  };
}
