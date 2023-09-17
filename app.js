const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = parseFloat(currentInput);
    currentInput = '';
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') return;
    let result;
    const curr = parseFloat(currentInput);
    switch (operator) {
        case '+':
            result = previousInput + curr;
            break;
        case '-':
            result = previousInput - curr;
            break;
        case '*':
            result = previousInput * curr;
            break;
        case '/':
            if (curr === 0) {
                alert('Tidak bisa membagi dengan 0!');
                clearAll();
                return;
            }
            result = previousInput / curr;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    display.value = currentInput;
    previousInput = '';
    operator = '';
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.value = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

// Event listeners for button clicks
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (/[0-9]/.test(value)) {
            appendNumber(value);
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else if (value === '=') {
            calculate();
        } else if (value === 'C') {
            clearAll();
        } else if (value === 'Delete') {
            deleteLast();
        }
    });
});
