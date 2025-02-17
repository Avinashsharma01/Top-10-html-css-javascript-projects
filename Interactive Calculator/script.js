let currentValue = "";
let operator = null;
let previousValue = "";
let historyVisible = false;

function appendValue(value) {
    currentValue += value;
    updateDisplay(currentValue);
}

function setOperation(op) {
    if (currentValue === "" && previousValue === "") return;
    if (currentValue && previousValue && operator) {
        calculateResult();
    }
    operator = op;
    previousValue = currentValue;
    currentValue = "";
}

function calculateResult() {
    if (!operator || !previousValue || !currentValue) return;
    const result = eval(
        `${parseFloat(previousValue)} ${operator} ${parseFloat(
            currentValue
        )}`
    );
    updateHistory(
        `${previousValue} ${currentValue} = ${result}`
    );
    // updateHistory(
    //     `${previousValue} ${operator} ${currentValue} = ${result}`
    // );
    currentValue = result.toString();
    operator = null;
    previousValue = "";
    updateDisplay(currentValue);
}

function clearDisplay() {
    currentValue = "";
    operator = null;
    previousValue = "";
    updateDisplay("");
}

function updateDisplay(value) {
    const display = document.getElementById("display");
    display.value = value;
}

function updateHistory(entry) {
    const history = document.getElementById("history");
    const paragraph = document.createElement("p");
    paragraph.textContent = entry;
    history.appendChild(paragraph);
    history.scrollTop = history.scrollHeight;
}

function toggleHistory() {
    const history = document.getElementById("history");
    const toggleButton = document.querySelector(".toggle-history");
    historyVisible = !historyVisible;
    history.style.display = historyVisible ? "block" : "none";
    toggleButton.textContent = historyVisible
        ? "Hide History"
        : "Show History";
}