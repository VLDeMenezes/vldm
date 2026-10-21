const QUEUE_LIMIT = 25;
let queue = [];

/**
 * Sends a custom Umami event. Events fired before the script is ready are
 * queued and flushed by the analytics component on load.
 */
export function track(name, data) {
  if (typeof window === "undefined" || !name) return;

  const payload = data ?? undefined;

  if (typeof window.umami?.track === "function") {
    window.umami.track(name, payload);
    return;
  }

  if (queue.length < QUEUE_LIMIT) {
    queue.push([name, payload]);
  }
}

export function flushAnalyticsQueue() {
  if (
    typeof window === "undefined" ||
    typeof window.umami?.track !== "function"
  ) {
    return;
  }

  const pending = queue;
  queue = [];

  pending.forEach(([name, data]) => {
    window.umami.track(name, data);
  });
}
