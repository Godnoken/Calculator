let firstOperand = "0";
let secondOperand = "";
let operationChosen = null;

const instructionsArrow = document.querySelector("#instructionsArrow");
const instructions = document.querySelector("#instructionsContainer");
const buttons = document.querySelectorAll(".button");
const clear = document.querySelector("#clear");
const undo = document.querySelector("#undo");
const equals = document.querySelector("#equals");
const powerElement = document.querySelector("#power");
const factorialElement = document.querySelector("#factorial");
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

function power(base, exponent) {

    let powerSum = base;

    if (secondOperand.includes("-")) {

        for (let i = 0; i > exponent + 1; i--) {
            powerSum = powerSum * base;
        }

        return powerSum = divide(1, powerSum);
    }
  
    for (let i = 0; i < exponent - 1; i++) {
        powerSum = powerSum * base;
    }
  
    return powerSum;
}

function factorial(a) {
	let sum = a;

  if (a === 0) {
    return 1;
  }

  while (a > 1) {
    a--;
    sum = sum * a;
  }

  return sum;
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
        case "xy":
            operation = power;
            if (secondOperand.includes("-")) return operation(number1, number2);
            break;
        case "x!":
            return Math.round(factorial(number1) * 1000) / 1000;
    }

    return Math.round(operation(number1, number2) * 1000) / 1000;
}

document.querySelectorAll(".number").forEach((number) => {
    number.addEventListener("click", () => handleNumbers(number.textContent))
})

function handleNumbers(number) {

    if (displayInput.textContent === "0") {
        displayInput.textContent = number;
        firstOperand = number;
        return;
    }

    if (displayInput.textContent.length >= 20) {
        return;
    }

    if (secondOperand === "0" && number !== "0") {
        secondOperand = number;
        displayInput.textContent = displayInput.textContent.slice(0, -1) + secondOperand;
        return;
    }

    
    
    if (operationChosen !== null) {
        secondOperand += number;
        
    } else {
        firstOperand += number;
    }

    if (operationChosen === "xy") {
        displayInput.innerHTML += `<sup>${number}</sup`;
        return;
    }

    displayInput.textContent += number;
}

document.querySelectorAll(".operator").forEach((operator) => {
    operator.addEventListener("click", () => handleOperators(operator.textContent))
})

function handleOperators(operator) {

    if (operationChosen === "xy" && operator === "-") {
        if (secondOperand.includes("-") || secondOperand !== "") return;
        console.log(secondOperand)
        secondOperand += operator;
        displayInput.innerHTML += `<sup>${operator}</sup`;
        console.log(secondOperand)
        return;
    }
    
    if (firstOperand === "" && operator !== "-") return;
    if (firstOperand === "-" || firstOperand === "-" && operator !== "") return;
    if (secondOperand === "-" && operator !== "") return;
    
    if (operationChosen !== "-" && operationChosen !== null && operator === "-") {
        secondOperand = operator;
        displayInput.textContent = firstOperand + operationChosen + secondOperand;
        return;
    }

    if (firstOperand === "" && operator === "-" || firstOperand === "0" && operator === "-") {
        firstOperand = operator;
        displayInput.textContent = operator
        return;
    }

    if (firstOperand === "0") return;
    
    if (secondOperand === "" && operator !== "-") {
        operationChosen = operator;
        displayInput.textContent = firstOperand + operator;
        return;
    }
    
    if (secondOperand === "" && operationChosen === "-" && firstOperand !== "-") {
        secondOperand = operator;
        displayInput.textContent += operator;
        return;
    }

    if (operationChosen !== null) {

        if (operationChosen == "/" && secondOperand === "0") {
            handleInvalidMath();
            return;
        }

        if (secondOperand === "") {
            operationChosen = operator;
            displayInput.textContent = firstOperand + operator;
            return;
        }

        const calculatedNumber = operate(operationChosen, firstOperand, secondOperand);
        displayResult.textContent = calculatedNumber;
        displayInput.textContent = calculatedNumber + operator;
        firstOperand = calculatedNumber;
        secondOperand = "";
        operationChosen = operator;
    }
    else {
        displayInput.textContent += operator;
        operationChosen = operator;
    }
}

factorialElement.addEventListener("click", handleFactorial);

function handleFactorial() {

    const number = Number(firstOperand);

    if (firstOperand < 0 || !Number.isInteger(number)) return handleInvalidMath();

    if (operationChosen === null) {
        operationChosen = "x!";
        const calculatedNumber = operate(operationChosen, firstOperand);
        displayResult.textContent = calculatedNumber;
        displayInput.textContent = calculatedNumber;
        firstOperand = calculatedNumber;
        secondOperand = "";
        operationChosen = null;
    }
}

powerElement.addEventListener("click", handlePower);

function handlePower() {

    if (operationChosen !== null || firstOperand === "0") {
        return;
    }
    else if (firstOperand !== "") {
        operationChosen = powerElement.textContent;
    }
}

document.querySelector("#equals").addEventListener("click", handleEquals);

function handleEquals() {

    if (operationChosen !== null && secondOperand !== "") {

        if (operationChosen == "/" && secondOperand === "0") {
            handleInvalidMath();
            return;
        }

        const calculatedNumber = operate(operationChosen, firstOperand, secondOperand);
        displayResult.textContent = calculatedNumber;
        displayInput.textContent = calculatedNumber;
        firstOperand = calculatedNumber;
        secondOperand = "";
        operationChosen = null;
    }
}

document.querySelector("#decimal").addEventListener("click", handleDecimal);

function handleDecimal() {

    if (operationChosen === "xy") return;

    if (secondOperand !== "" && !secondOperand.includes(".")) {
        secondOperand = secondOperand + ".";
        displayInput.textContent += ".";
    }
    else if (firstOperand !== "" && !firstOperand.includes(".") && operationChosen === null) {
        firstOperand = firstOperand + ".";
        displayInput.textContent += ".";
    }
}

document.querySelector("#clear").addEventListener("click", handleClear);

function handleClear() {
    firstOperand = "0";
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

window.addEventListener("keydown", handleKeyboard);

let keysPressed = {}

function handleKeyboard(event) {

    let buttonToAnimate;

    buttons.forEach((button) => {
        if (button.textContent == event.key.toString()) {
            buttonToAnimate = button;
        }
    })

    keysPressed[event.key] = true;

    if (event.key >= 0 && event.key <= 9) handleNumbers(event.key), handlePulseAnimation(buttonToAnimate);
    if (event.key === ".") handleDecimal(), handlePulseAnimation(buttonToAnimate);
    if (event.key === "Escape") handleClear(), handlePulseAnimation(clear);
    if (event.key === "Backspace") handleUndo(), handlePulseAnimation(undo);
    if (event.key === "Enter") handleEquals(), handlePulseAnimation(equals);
    if (keysPressed["Shift"] && event.key === "!") handleFactorial(), handlePulseAnimation(factorialElement);
    if (keysPressed["Shift"] && event.key === "n" || event.key === "N") handlePower(), handlePulseAnimation(powerElement);
    if (
        event.key === "/"
        ||
        event.key === "+"
        ||
        event.key === "-"
        ||
        event.key === "*"
        ) handleOperators(event.key), handlePulseAnimation(buttonToAnimate);
}

window.addEventListener("keyup", () => keysPressed["Shift"] = false);

document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", () => handlePulseAnimation(button))
})

function handlePulseAnimation(button) {
    button.classList.remove("active");
    button.offsetWidth;
    button.classList.add("active");
}

instructionsArrow.addEventListener("click", handleInstructionsAnimation);

let rotationDegrees = 180;

function handleInstructionsAnimation() {

    if (instructions.className === "activeInstructions") {
        instructions.classList.remove("activeInstructions");
        instructions.classList.add("activeInstructionsReverse");
        instructionsArrow.style.transform = `rotate(${rotationDegrees}deg)`;
        rotationDegrees += 180;
    } else if (instructions.className === "activeInstructionsReverse") {
        instructions.classList.remove("activeInstructionsReverse");
        instructions.classList.add("activeInstructions");
        instructionsArrow.style.transform = `rotate(${rotationDegrees}deg)`;
        rotationDegrees += 180;
    } else {
        instructions.classList.add("activeInstructions");
        instructionsArrow.style.transform = `rotate(${rotationDegrees}deg)`;
        rotationDegrees += 180;
    }
}