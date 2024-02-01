export class ResizeObserverDebounced {
  constructor({ resizingCallback, resizedCallback }, delay = 500) {
    this.timeoutId = null;
    this.resizeObserver = new ResizeObserver((entries) => {
      this.timeoutId === null
        ? resizingCallback(entries)
        : clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        resizedCallback(entries);
        this.timeoutId = null;
      }, delay);
    });
  }

  observe(target) {
    this.resizeObserver.observe(target);
  }

  disconnect() {
    this.resizeObserver.disconnect();
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
