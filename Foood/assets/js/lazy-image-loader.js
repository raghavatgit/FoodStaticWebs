/**
 * Responsive Image Lazy Loader
 * Uses native IntersectionObserver with fallback for progressive blur-up rendering.
 */

export function initLazyImages(selector = "img[data-src]", rootMargin = "50px") {
  const images = document.querySelectorAll(selector);
  if (images.length === 0) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const realSrc = img.getAttribute("data-src");
          if (realSrc) {
            img.src = realSrc;
            img.removeAttribute("data-src");
            img.classList.add("loaded");
          }
          obs.unobserve(img);
        }
      });
    }, { rootMargin });

    images.forEach(img => observer.observe(img));
  } else {
    // Fallback for legacy environments
    images.forEach(img => {
      const src = img.getAttribute("data-src");
      if (src) {
        img.src = src;
        img.classList.add("loaded");
      }
    });
  }
}
