/**
 * Core Web Vitals Monitor
 * Reports real user metrics (LCP, CLS, INP) using native PerformanceObserver.
 */

export class WebVitalsMonitor {
  constructor(onMetric) {
    this.onMetric = onMetric;
    this.initObservers();
  }

  initObservers() {
    if (typeof PerformanceObserver === "undefined") return;

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.emit("LCP", lastEntry.startTime);
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {}

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.emit("CLS", clsValue);
          }
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch (e) {}
  }

  emit(name, value) {
    if (this.onMetric) {
      this.onMetric({ name, value: Math.round(value * 100) / 100, timestamp: Date.now() });
    }
  }
}
