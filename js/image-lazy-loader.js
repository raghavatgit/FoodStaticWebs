// Progressive Blur-Up Image Lazy Loader
// Uses IntersectionObserver with a 100px rootMargin to preload menu photography ahead of scrolling.

export function initLazyImages(): void {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                const src = img.dataset.src;
                if (src) {
                    img.src = src;
                    img.classList.remove('blur-placeholder');
                    img.classList.add('image-loaded');
                }
                obs.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px 0px',
        threshold: 0.01
    });

    document.querySelectorAll('img.lazy-load').forEach(el => observer.observe(el));
}
