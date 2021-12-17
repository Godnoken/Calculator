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


    return operation(number1, number2);
}

document.querySelectorAll(".number").forEach((number) => {
    number.addEventListener("click", (event) => handleNumbers(event, number))
})

function handleNumbers(event, number) {

    if (displayInput.textContent === "0") {
        displayInput.textContent = "";
    }
    
    if (operationChosen !== null) {
        secondOperand += event.target.textContent;
    } else {
        firstOperand += event.target.textContent;
    }

    displayInput.textContent += number.textContent;
}

document.querySelectorAll(".operator").forEach((operator) => {
    operator.addEventListener("click", () => handleOperators(operator))
})

function handleOperators(operator) {
    
    if (operationChosen !== null) {
        if (operationChosen == "/", secondOperand === "0") {
            handleInvalidMath();
            return;
        }
        calculatedNumber = operate(operationChosen, firstOperand, secondOperand);
        displayResult.textContent = calculatedNumber;
        displayInput.textContent = calculatedNumber + operator.textContent;
        firstOperand = calculatedNumber;
        secondOperand = "";
        operationChosen = operator.textContent;
    } else {
        operationChosen = operator.textContent;
        displayInput.textContent += operator.textContent;
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
    } else if (displayInput.textContent.indexOf(operationChosen) === displayInput.textContent.length - 1) {
        operationChosen = null;
    } else {
        secondOperand = secondOperand.slice(0, -1);
    }

    displayInput.textContent = displayInput.textContent.slice(0, -1);
}

function handleInvalidMath()  {
        displayResult.textContent ="MATH";
        displayInput.textContent = "ERROR";
}