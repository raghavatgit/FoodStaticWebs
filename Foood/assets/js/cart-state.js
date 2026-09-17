/**
 * Multi-Tab Reactive Shopping Cart State
 * Broadcasts order modifications across tabs using BroadcastChannel API.
 */

export class CartStateManager {
  constructor(channelName = "food_cart_channel") {
    this.channelName = channelName;
    this.items = [];
    this.channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(channelName) : null;
    this.listeners = new Set();

    if (this.channel) {
      this.channel.onmessage = (event) => {
        if (event.data && event.data.type === "SYNC_CART") {
          this.items = event.data.items || [];
          this.notify();
        }
      };
    }
  }

  addItem(item) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      this.items.push({ ...item, quantity: item.quantity || 1 });
    }
    this.sync();
  }

  removeItem(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
    this.sync();
  }

  sync() {
    if (this.channel) {
      this.channel.postMessage({ type: "SYNC_CART", items: this.items });
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.items);
    }
  }
}
