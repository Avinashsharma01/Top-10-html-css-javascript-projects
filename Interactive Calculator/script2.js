let currentValue = "";
let previousValue = "";
let operator = "";
let historyVisible = false;

function appendValue(value) {
    currentValue += value;
    updateDisplay(currentValue);
}

function setOperation(op) {
    if (currentValue === "") return; // Don't proceed if no number is entered
    if (previousValue !== "") {
        calculateResult(); // Calculate result before applying new operator
    }
    operator = op;
    previousValue = currentValue;
    currentValue = ""; // Clear current value for next number
}

function calculateResult() {
    if (previousValue === "" || currentValue === "" || operator === "") return;

    let result;
    switch (operator) {
        case "+":
            result = parseFloat(previousValue) + parseFloat(currentValue);
            break;
        case "-":
            result = parseFloat(previousValue) - parseFloat(currentValue);
            break;
        case "*":
            result = parseFloat(previousValue) * parseFloat(currentValue);
            break;
        case "/":
            result = parseFloat(previousValue) / parseFloat(currentValue);
            break;
    }

    currentValue = result.toString();
    operator = "";
    previousValue = "";
    updateDisplay(currentValue);
    updateHistory(`${previousValue} ${operator} ${currentValue} = ${currentValue}`);
}

function clearDisplay() {
    currentValue = "";
    previousValue = "";
    operator = "";
    updateDisplay("");
}

function updateDisplay(value) {
    document.getElementById("display").value = value;
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
    toggleButton.textContent = historyVisible ? "Hide History" : "Show History";
}
