// script.js
const display = document.getElementById("display");
let currentInput = "";
let operator = null;
let firstOperand = null;

// Handle number and operator buttons
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value === "+" || value === "-" || value === "*" || value === "/") {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else if (currentInput !== "") {
                firstOperand = operate(firstOperand, parseFloat(currentInput), operator);
            }
            operator = value;
            currentInput = "";
            updateDisplay(firstOperand);
        } else if (value === ".") {
            if (!currentInput.includes(".")) {
                currentInput += value;
                updateDisplay(currentInput);
            }
        } else if (value !== null) {
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

// Handle the equal button
document.getElementById("equal").addEventListener("click", () => {
    if (firstOperand !== null && currentInput !== "" && operator) {
        const result = operate(firstOperand, parseFloat(currentInput), operator);
        updateDisplay(result);
        firstOperand = result;
        currentInput = "";
        operator = null;
    }
});

// Handle the clear button
document.getElementById("clear").addEventListener("click", () => {
    currentInput = "";
    firstOperand = null;
    operator = null;
    updateDisplay(0);
});

// Update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Perform calculations
function operate(first, second, operator) {
    switch (operator) {
        case "+":
            return first + second;
        case "-":
            return first - second;
        case "*":
            return first * second;
        case "/":
            return second === 0 ? "Error" : first / second;
        default:
            return second;
    }
}
