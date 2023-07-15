let operator = '';
let previousValue = '';
let currentValue = '';

let previousScreen = document.querySelector('.previous');
let currentScreen = document.querySelector('.current');

document.addEventListener('DOMContentLoaded', function() {
    //Store all components on HTML in our JS 
    let clear = document.querySelector('#clear-btn');
    let equal = document.querySelector('.equal');
    let decimal = document.querySelector('.decimal');

    let numbers = document.querySelectorAll('.number');
    let operators = document.querySelectorAll('.operator');

    let previousScreen = document.querySelector('.previous');
    let currentScreen = document.querySelector('.current');

    numbers.forEach((number) => number.addEventListener('click', (e) => {
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue;
    }))

    operators.forEach((op) => op.addEventListener('click', (e) => {
        handleOperator(e.target.textContent)
        previousScreen.textContent = previousValue + ' ' + operator;
        currentScreen.textContent = currentValue;
    }))

    clear.addEventListener('click', () => {
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
    })

    equal.addEventListener('click', () => {
        if (currentValue != '' && previousValue != '') {
            calculate();
            previousScreen.textContent = '';
            if (previousValue.length <= 10) {
                currentScreen.textContent = previousValue;
            } else {
                currentScreen.textContent = previousValue.slice(0, 10) + '...';
            }
        }
    })

    decimal.addEventListener('click', () => {
        addDecimal();
    })
})

function handleNumber(num) {
    if (currentValue.length <= 10) {
        currentValue += num;
    }
}

function handleOperator(op) {
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function clearCal() {
    previousValue = '';
    currentValue = '';
    operator = '';
    previousScreen.textContent = previousValue;
    currentScreen.textContent = currentValue;
}


function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (operator === '+') {
        previousValue += currentValue;
    } else if (operator === '-') {
        previousValue -= currentValue;
    } else if (operator === 'X') {
        previousValue *= currentValue;
    } else if (operator === '/') {
        previousValue /= currentValue;
    }

    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}

function addDecimal() {
    if (!currentValue.includes('.')) {
        currentValue += '.';
    }
}

