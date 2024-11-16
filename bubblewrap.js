document.addEventListener("DOMContentLoaded", () => {
    const bubbleWrap = document.getElementById("bubble-wrap");
    const totalBubbles = 100;

    // Create bubbles
    for (let i = 0; i < totalBubbles; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        // Add click event to pop the bubble
        bubble.addEventListener("click", () => {
            bubble.classList.add("popped");
            // Optional: Add sound or visual effects here
        });

        bubbleWrap.appendChild(bubble);
    }
});