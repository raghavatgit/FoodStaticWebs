// Zero-Jank Sticky Header Observer
// Uses a sentinel element with IntersectionObserver to avoid scroll event listening.

export function initStickyHeader(headerSelector = '.site-header', sentinelSelector = '#header-sentinel'): void {
    const header = document.querySelector(headerSelector);
    let sentinel = document.querySelector(sentinelSelector);

    if (!header) return;

    if (!sentinel) {
        sentinel = document.createElement('div');
        sentinel.id = 'header-sentinel';
        sentinel.style.height = '1px';
        document.body.prepend(sentinel);
    }

    const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
            header.classList.add('header-stuck');
        } else {
            header.classList.remove('header-stuck');
        }
    }, { threshold: 0 });

    observer.observe(sentinel);
}
