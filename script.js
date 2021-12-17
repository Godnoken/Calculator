let firstOperand = "";
let secondOperand = "";
let operationChosen = null;

let displayInput = document.querySelector("#displayInput");
let displayResult = document.querySelector("#displayResult");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operation, number1, number2) {
    number1 = Number(number1);
    number2 = Number(number2);
    
    switch (operation) {
        case "+":
            operation = add;
            break;
        case "-":
            operation = subtract;
            break;
        case "*":
            operation = multiply;
            break;
        case "/":
            operation = divide;
            break;
    }

    return Math.round(operation(number1, number2) * 1000) / 1000;
}

document.querySelectorAll(".number").forEach((number) => {
    number.addEventListener("click", () => handleNumbers(number.textContent))
})

function handleNumbers(number) {

    if (displayInput.textContent === "0") {
        displayInput.textContent = "";
    }

    if (displayInput.textContent.length >= 20) {
        return;
    }
    
    if (operationChosen !== null) {
        secondOperand += number;
    } else {
        firstOperand += number;
    }

    displayInput.textContent += number.toString();
}

document.querySelectorAll(".operator").forEach((operator) => {
    operator.addEventListener("click", () => handleOperators(operator.textContent))
})

function handleOperators(operator) {
    console.log(firstOperand)
    if (operationChosen !== null) {

        if (operationChosen == "/", secondOperand === "0") {
            handleInvalidMath();
            return;
        }

        if (secondOperand === "") {
            operationChosen = operator;
            displayInput.textContent = firstOperand + operator;
            return;
        }

        calculatedNumber = operate(operationChosen, firstOperand, secondOperand);
        displayResult.textContent = calculatedNumber;
        displayInput.textContent = calculatedNumber + operator;
        firstOperand = calculatedNumber;
        secondOperand = "";
        operationChosen = operator;
    }
    else {
        operationChosen = operator;
        displayInput.textContent += operator;
    }
}

document.querySelector("#equals").addEventListener("click", handleEquals);

function handleEquals() {

    if (operationChosen !== null && secondOperand !== "") {

        if (operationChosen == "/", secondOperand === "0") {
            handleInvalidMath();
            return;
        }

        calculatedNumber = operate(operationChosen, firstOperand, secondOperand);
        displayResult.textContent = calculatedNumber;
        displayInput.textContent = calculatedNumber;
        firstOperand = calculatedNumber;
        secondOperand = "";
        operationChosen = null;
    }
}

document.querySelector("#decimal").addEventListener("click", handleDecimal);

function handleDecimal() {

    if (secondOperand === "" && !firstOperand.includes(".")) {
        firstOperand = firstOperand + ".";
        displayInput.textContent += ".";
    }
    else if (secondOperand !== "" && !secondOperand.includes(".")) {
        secondOperand = secondOperand + ".";
        displayInput.textContent += ".";
    }

}

document.querySelector("#clear").addEventListener("click", handleClear);

function handleClear() {
    firstOperand = "";
    secondOperand = "";
    operationChosen = null;
    displayInput.textContent = "0";
    displayResult.textContent = "";
}

document.querySelector("#undo").addEventListener("click", handleUndo);

function handleUndo() {

    if (operationChosen === null) {
        firstOperand = firstOperand.toString().slice(0, -1);
    }
    else if (displayInput.textContent.indexOf(operationChosen) === displayInput.textContent.length - 1) {
        operationChosen = null;
    }
    else {
        secondOperand = secondOperand.slice(0, -1);
    }

    displayInput.textContent = displayInput.textContent.slice(0, -1);
}

function handleInvalidMath()  {
        displayResult.textContent ="MATH";
        displayInput.textContent = "ERROR";
        setTimeout(() => {
            handleClear();
        }, 2000)
}

document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.remove("active");
        button.offsetWidth;
        button.classList.add("active");
    })
})

window.addEventListener("keydown", handleKeyboard);

function handleKeyboard(event) {
    console.log(event.key)
    if (event.key >= 0 && event.key <= 9) handleNumbers(event.key)
    if (event.key === ".") handleDecimal();
    if (event.key === "Escape") handleClear();
    if (event.key === "Backspace") handleUndo();
    if (event.key === "Enter") handleEquals();
    if (
        event.key === "/"
        ||
        event.key === "+"
        ||
        event.key === "-"
        ||
        event.key === "*"
        ) handleOperators(event.key);
}