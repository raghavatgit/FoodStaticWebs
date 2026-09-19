/**
 * Culinary Palette Theme Switcher
 * Smoothly transitions CSS custom property theme tokens.
 */

export function initThemeToggle(buttonId = "theme-toggle-btn") {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  const getCurrentTheme = () => document.documentElement.getAttribute("data-theme") || "light";

  btn.addEventListener("click", () => {
    const current = getCurrentTheme();
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("food_theme", next);
    } catch (e) {}
  });
}
