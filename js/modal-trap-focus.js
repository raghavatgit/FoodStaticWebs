// WCAG 2.1 Keyboard Focus Trap
// Traps Tab / Shift+Tab within active modal dialog and closes on Escape keypress.

export class ModalFocusTrap {
    private modalElement: HTMLElement;
    private previousActiveElement: HTMLElement | null = null;

    constructor(modalElement: HTMLElement) {
        this.modalElement = modalElement;
    }

    public activate(): void {
        this.previousActiveElement = document.activeElement as HTMLElement;
        const focusable = this.modalElement.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length > 0) {
            focusable[0].focus();
        }

        this.modalElement.addEventListener('keydown', this.handleKeyDown);
    }

    private handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Tab') {
            const focusable = this.modalElement.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    };

    public deactivate(): void {
        this.modalElement.removeEventListener('keydown', this.handleKeyDown);
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }
    }
}
