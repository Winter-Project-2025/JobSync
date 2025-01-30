const local = localStorage.getItem("user");

if (local === "true") {
  chrome.storage.local.set({ user: true });
} else {
  chrome.storage.local.set({ user: false });
}
