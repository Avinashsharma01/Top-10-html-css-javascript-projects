const ClockElement = document.getElementById("clock")
const colorPicker = document.getElementById("color")
const backgroundPicker = document.getElementById("backgroundColor")
const formatSelector = document.getElementById("format")



function updateClock() {
    const now = new Date();

    let hour = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    if (formatSelector.value === "12") {
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 // convert to 12-hour format
        ClockElement.textContent = `${hour}: ${minutes}: ${seconds} ${ampm}`
    }
    else {
        ClockElement.textContent = `${hour}:${minutes}:${seconds}`
    }
}


function applyCustomizations() {
    ClockElement.style.color = colorPicker.value;
    document.body.style.background = backgroundPicker.value
}

colorPicker.addEventListener("input", applyCustomizations)
backgroundPicker.addEventListener("input", applyCustomizations)
formatSelector.addEventListener("change", updateClock)

setInterval(updateClock, 1000)
updateClock()