function add(a, b) {
    return a + b;
}

console.log(add(2, 5));

function subtract(a, b) {
    return a - b;
}

console.log(subtract(5, 4));

function multiply(a, b) {
    return a * b;
}

console.log(multiply(5, 5));

function divide(a, b) {
    return a / b;
}

console.log(divide(40, 4));

function operate(operator, number1, number2) {
    return operator(number1, number2);
}

console.log(operate(add, 5, 9));