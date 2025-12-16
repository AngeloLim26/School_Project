let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;
let errorState = false;

// Append number to display
function appendNumber(num) {
    // If in error state, clear and start fresh
    if (errorState) {
        clearDisplay();
    }
    
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Prevent multiple decimal points
    if (num === '.' && currentInput.includes('.')) {
        return;
    }
    
    currentInput += num;
    updateDisplay();
}

// Handle operator button clicks
function handleOperator(op) {
    // Prevent operator if in error state
    if (errorState) {
        return;
    }
    
    if (currentInput === '') {
        return;
    }
    
    if (previousInput !== '') {
        calculate();
    }
    
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    shouldResetDisplay = true;
}

// Clear display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    errorState = false;
    updateDisplay();
}

// Toggle positive and negative
function toggleSign() {
    // Prevent toggling if in error state
    if (errorState) {
        return;
    }
    
    if (currentInput === '') {
        return;
    }
    
    const num = parseFloat(currentInput);
    currentInput = (num * -1).toString();
    updateDisplay();
}

// Calculate modulus
function modulus() {
    // Prevent modulus if in error state
    if (errorState) {
        return;
    }
    
    if (currentInput === '') {
        return;
    }
    
    if (previousInput !== '') {
        calculate();
    }
    
    operation = '%';
    previousInput = currentInput;
    currentInput = '';
    shouldResetDisplay = true;
}

// Validate calculation for NaN
function isValidNumber(num) {
    return !isNaN(num) && isFinite(num);
}

// Calculate result
function calculate() {
    if (operation === null || previousInput === '' || currentInput === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    // Check for invalid inputs
    if (!isValidNumber(prev) || !isValidNumber(current)) {
        errorState = true;
        updateDisplay();
        return;
    }
    
    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                errorState = true;
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
        case '%':
            if (current === 0) {
                errorState = true;
                updateDisplay();
                return;
            }
            result = prev % current;
            break;
        default:
            return;
    }
    
    // Check if result is NaN or Infinity
    if (!isValidNumber(result)) {
        errorState = true;
        updateDisplay();
        return;
    }
    
    currentInput = result.toString();
    previousInput = '';
    operation = null;
    shouldResetDisplay = true;
    errorState = false;
    updateDisplay();
}

// Update display
function updateDisplay() {
    if (errorState) {
        display.value = 'Error';
    } else if (currentInput === '') {
        display.value = '';
    } else if (currentInput === 'NaN') {
        display.value = 'NaN';
    } else {
        display.value = currentInput;
    }
}

// Initialize display
updateDisplay();
