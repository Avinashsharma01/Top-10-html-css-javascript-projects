const clockElement = document.getElementById("clock");
const colorPicker = document.getElementById("color");
const backgroundPicker = document.getElementById("background");
const formatSelector = document.getElementById("format");

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (formatSelector.value === "12") {
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12; // Convert to 12-hour format
        clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    } else {
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

function applyCustomizations() {
    clockElement.style.color = colorPicker.value;
    document.body.style.background = backgroundPicker.value;
}

colorPicker.addEventListener("input", applyCustomizations);
backgroundPicker.addEventListener("input", applyCustomizations);
formatSelector.addEventListener("change", updateClock);

setInterval(updateClock, 1000);
updateClock(); // Initial call to display the clock immediately