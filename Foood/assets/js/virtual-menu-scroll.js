/**
 * High-Performance DOM Virtualization Window
 * Renders large culinary catalogues (10,000 items) by creating only
 * enough DOM elements to populate the visible viewport.
 */

export class VirtualMenuScroller {
  constructor(containerElement, items, itemHeight = 90, renderItemFn) {
    this.container = containerElement;
    this.items = items;
    this.itemHeight = itemHeight;
    this.renderItemFn = renderItemFn;

    this.totalHeight = items.length * itemHeight;
    this.visibleCount = 0;
    this.contentWrapper = document.createElement("div");

    this.init();
  }

  init() {
    this.container.style.overflowY = "auto";
    this.container.style.position = "relative";

    this.contentWrapper.style.height = `${this.totalHeight}px`;
    this.contentWrapper.style.position = "relative";
    this.container.appendChild(this.contentWrapper);

    this.container.addEventListener("scroll", () => this.render(), { passive: true });
    this.render();
  }

  render() {
    const scrollTop = this.container.scrollTop;
    const viewportHeight = this.container.clientHeight || 600;

    const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - 2);
    const endIndex = Math.min(this.items.length, Math.ceil((scrollTop + viewportHeight) / this.itemHeight) + 2);

    this.contentWrapper.innerHTML = "";

    for (let i = startIndex; i < endIndex; i++) {
      const node = this.renderItemFn(this.items[i], i);
      node.style.position = "absolute";
      node.style.top = `${i * this.itemHeight}px`;
      node.style.left = "0";
      node.style.right = "0";
      node.style.height = `${this.itemHeight}px`;
      this.contentWrapper.appendChild(node);
    }
  }
}
