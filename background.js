chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "analyzeImage") {
        fetch("http://localhost:5000/analyze-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl: message.imageUrl }),
        })
        .then(response => response.json())
        .then(data => sendResponse({ isObscene: data.isObscene }))
        .catch(error => console.error("Error:", error));
        return true; // Keeps the sendResponse function alive
    }
});
