let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let resetScreen = false;

// DOM Elements
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

// Update the display
function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    
    if (operation != null) {
        previousOperandElement.textContent = `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.textContent = previousOperand;
    }
}

// Append a number to the display
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (resetScreen) {
        currentOperand = '';
        resetScreen = false;
    }
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    updateDisplay();
}

// Handle operators
function appendOperator(operator) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

// Perform calculation
function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clearAll();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    resetScreen = true;
    updateDisplay();
}

// Clear all values
function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

// Delete the last digit
function deleteNumber() {
    if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

// Initialize display
updateDisplay();