document.getElementById("toggle").addEventListener("click", () => {
    chrome.storage.local.get("enabled", data => {
        const enabled = !data.enabled;
        chrome.storage.local.set({ enabled }, () => {
            document.getElementById("toggle").textContent = enabled ? "Disable" : "Enable";
        });
    });
});

// Set initial button text
chrome.storage.local.get("enabled", data => {
    document.getElementById("toggle").textContent = data.enabled ? "Disable" : "Enable";
});
