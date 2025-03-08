(async function () {
    const images = document.querySelectorAll("img");

    for (let img of images) {
        try {
            const response = await fetch("http://localhost:5000/analyze-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl: img.src }),
            });

            const data = await response.json();
            if (data.isObscene) {
                img.src = "https://via.placeholder.com/150?text=Blocked"; // Replace with a blocked image
            }
        } catch (error) {
            console.error("Error analyzing image:", error);
        }
    }
})();
