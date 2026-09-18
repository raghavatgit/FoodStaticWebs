/**
 * Offline Toast Status Reporter
 * Informs users of connection loss and queues cart modifications.
 */

export function initOfflineBanner() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const banner = document.createElement("div");
  banner.id = "network-status-banner";
  banner.className = "network-banner hidden";
  banner.setAttribute("role", "alert");
  banner.textContent = "Offline Mode: Changes will sync once connection returns.";
  document.body.appendChild(banner);

  const updateStatus = () => {
    if (navigator.onLine) {
      banner.classList.add("hidden");
    } else {
      banner.classList.remove("hidden");
    }
  };

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);
  updateStatus();
}
