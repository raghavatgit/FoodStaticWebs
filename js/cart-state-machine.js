// Cart Action State Machine with Undo-Redo History
// Manages shopping cart updates through deterministic immutable action dispatches.

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export class CartManager {
    private items: Map<string, CartItem> = new Map();
    private undoStack: Array<Map<string, CartItem>> = [];
    private redoStack: Array<Map<string, CartItem>> = [];

    private saveSnapshot(): void {
        this.undoStack.push(new Map(this.items));
        this.redoStack = [];
    }

    public addItem(item: CartItem): void {
        this.saveSnapshot();
        const existing = this.items.get(item.id);
        if (existing) {
            existing.quantity += item.quantity;
        } else {
            this.items.set(item.id, { ...item });
        }
    }

    public undo(): boolean {
        if (this.undoStack.length === 0) return false;
        this.redoStack.push(new Map(this.items));
        this.items = this.undoStack.pop()!;
        return true;
    }

    public redo(): boolean {
        if (this.redoStack.length === 0) return false;
        this.undoStack.push(new Map(this.items));
        this.items = this.redoStack.pop()!;
        return true;
    }

    public getTotal(): number {
        let sum = 0;
        this.items.forEach(item => { sum += item.price * item.quantity; });
        return sum;
    }
}
