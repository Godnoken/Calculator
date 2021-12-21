/** Global variables */

let firstOperand = "0";
let secondOperand = "";
let operationChosen = null;

const instructionsArrowElement = document.querySelector("#instructionsArrow");
const instructionsElement = document.querySelector("#instructionsContainer");
const buttonElements = document.querySelectorAll(".button");
const numberElements = document.querySelectorAll(".number");
const operatorElements = document.querySelectorAll(".operator");
const powerElement = document.querySelector("#power");
const factorialElement = document.querySelector("#factorial");
const decimalElement = document.querySelector("#decimal");
const equalElement = document.querySelector("#equals");
const clearElement = document.querySelector("#clear");
const undoElement = document.querySelector("#undo");
const displayInput = document.querySelector("#displayInput");
const displayResult = document.querySelector("#displayResult");




/** Math Functions */

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function power(base, exponent) {

    let powerSum = base;

    // Negative exponentiation
    if (secondOperand.includes("-")) {
        for (let i = 0; i > exponent + 1; i--) {
            powerSum = powerSum * base;
        }
        return powerSum = divide(1, powerSum);
    }

    // Positive exponentiation
    for (let i = 0; i < exponent - 1; i++) {
        powerSum = powerSum * base;
    }
    return powerSum;
}

function factorial(number) {
    let sum = number;

    if (number === 0) return 1;

    while (number > 1) {
        number--;
        sum = sum * number;
    }

    return sum;
}




/** Calculator functions */

// Reads which operation the user chose and calculates
function operate(operation, number1, number2) {

    // Convert operands from strings to numbers
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
            // If user input a negative exponent, don't limit decimal amount
            if (secondOperand.includes("-")) return operation(number1, number2);
            break;
        case "x!":
            operation = factorial;
            break;
    }

    // Limit decimal points to 3
    return Math.round(operation(number1, number2) * 1000) / 1000;
}


// Executes operate function and displays result
function handleOperation(possibleOperator = "", nullOrOperator = null) {
    const calculatedNumber = operate(operationChosen, firstOperand, secondOperand);
    displayResult.textContent = calculatedNumber;
    displayInput.textContent = calculatedNumber + possibleOperator;
    firstOperand = calculatedNumber;
    secondOperand = "";
    operationChosen = nullOrOperator;
}


// Number buttons logic
numberElements.forEach((number) => {number.addEventListener("click", () => handleNumbers(number.textContent))})

function handleNumbers(number) {

    // Prevents user from inputs longer than 20
    if (displayInput.textContent.length > 20) return;

    // Prevents user from inputting more than one 0 unless it's a decimal number
    if (firstOperand === "0") {
        displayInput.textContent = number;
        firstOperand = number;
        return;
    }

    if (secondOperand === "0") {
        displayInput.textContent = displayInput.textContent.slice(0, -1) + secondOperand;
        secondOperand = number;
        return;
    }

    // If operator exists, add number to second operand. If not, add number to first operand
    if (operationChosen !== null) {
        secondOperand += number;
    } else {
        firstOperand += number;
    }

    // If exponentiation chosen, change the way the second operand is displayed on calculator
    if (operationChosen === "xy") {
        displayInput.innerHTML += `<sup>${number}</sup`;
        return;
    }

    // Update display with number
    displayInput.textContent += number;
}


// Basic operators buttons logic
operatorElements.forEach((operator) => {operator.addEventListener("click", () => handleOperators(operator.textContent))})

function handleOperators(operator) {

    // Prevents user from inputs longer than 20
    if (displayInput.textContent.length > 20) return;

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

        handleOperation(operator, operator);
    }
    else {
        displayInput.textContent += operator;
        operationChosen = operator;
    }
}


// Factorial button logic
factorialElement.addEventListener("click", handleFactorial);

function handleFactorial() {

    const number = Number(firstOperand);

    // If user has input invalid math when clicking factorial, execute handleInvalidMath
    if (firstOperand < 0 || !Number.isInteger(number) || operationChosen !== null) return handleInvalidMath();

    return operationChosen = "x!", handleOperation();
}


// Power/Exponentiation button logic
powerElement.addEventListener("click", handlePower);

function handlePower() {

    if (operationChosen !== null || firstOperand === "0" || firstOperand === "") return;

    return operationChosen = "xy";
}


// Equal button logic
equalElement.addEventListener("click", handleEquals);

function handleEquals() {

    if (operationChosen == "/" && secondOperand === "0") return handleInvalidMath();

    if (operationChosen !== null && secondOperand !== "") return handleOperation();
}


// Decimal button logic
decimalElement.addEventListener("click", handleDecimal);

function handleDecimal() {

    // Disables decimals as exponents
    if (operationChosen === "xy") return;

    if (firstOperand !== "" && !firstOperand.includes(".") && operationChosen === null) {
        firstOperand = firstOperand + ".";
        displayInput.textContent += ".";
        return;
    }

    if (secondOperand !== "" && !secondOperand.includes(".")) {
        secondOperand = secondOperand + ".";
        displayInput.textContent += ".";
        return;
    }
    
}


// Clears input & output on calculator
clearElement.addEventListener("click", handleClear);

function handleClear() {
    firstOperand = "0";
    secondOperand = "";
    operationChosen = null;
    displayInput.textContent = "0";
    displayResult.textContent = "";
}


// Deletes last operand or operator on the calculator
undoElement.addEventListener("click", handleUndo);

function handleUndo() {

    if (operationChosen === null) {
        firstOperand = firstOperand.slice(0, -1);
    }
    else if (displayInput.textContent.indexOf(operationChosen) === displayInput.textContent.length - 1) {
        operationChosen = null;
    }
    else {
        secondOperand = secondOperand.slice(0, -1);
    }
    
    displayInput.textContent = displayInput.textContent.slice(0, -1);
}


// Returns error on screen and clears calculator after 2 seconds
function handleInvalidMath() {
    displayResult.textContent = "MATH";
    displayInput.textContent = "ERROR";
    setTimeout(() => {
        handleClear();
    }, 2000)
}




/** Keyboard support functions */

window.addEventListener("keydown", handleKeyboard);

// Keeps track of first button pressed on keyboard. I.e. enables the reading of two button inputs
let keysPressed = {}

function handleKeyboard(event) {

    // Reads & sets which button should be animated
    buttonElements.forEach((button) => { if (button.classList[0] == event.key.toString()) handlePulseAnimation(button) })

    // Tracks first button pressed
    keysPressed[event.key] = true;

    if (event.key >= 0 && event.key <= 9) handleNumbers(event.key);
    if (event.key === ".") handleDecimal();
    if (event.key === "Escape") handleClear();
    if (event.key === "Backspace") handleUndo();
    if (event.key === "Enter") handleEquals();
    if (keysPressed["Shift"] && event.key === "!") handleFactorial();
    if (keysPressed["Shift"] && event.key === "N") handlePower();
    if (event.key === "/" || event.key === "+" ||
        event.key === "-" || event.key === "*") handleOperators(event.key);
}

// Resets saved input
window.addEventListener("keyup", () => keysPressed["Shift"] = false);




/** Animation functions */

// Button pressed animation
buttonElements.forEach((button) => { button.addEventListener("click", () => handlePulseAnimation(button)) })

function handlePulseAnimation(button) {
    button.classList.remove("active");
    button.offsetWidth;
    button.classList.add("active");
}

// Instructions animation
instructionsArrowElement.addEventListener("click", handleInstructionsAnimation);

// Variable used to make sure arrow spins like a clock when clicked
let rotationDegrees = 180;

function handleInstructionsAnimation() {
    if (instructionsElement.className === "activeInstructions") {
        instructionsElement.classList.remove("activeInstructions");
        instructionsElement.classList.add("activeInstructionsReverse");
        instructionsArrowElement.style.transform = `rotate(${rotationDegrees}deg)`;
        rotationDegrees += 180;
    } else if (instructionsElement.className === "activeInstructionsReverse") {
        instructionsElement.classList.remove("activeInstructionsReverse");
        instructionsElement.classList.add("activeInstructions");
        instructionsArrowElement.style.transform = `rotate(${rotationDegrees}deg)`;
        rotationDegrees += 180;
    } else {
        instructionsElement.classList.add("activeInstructions");
        instructionsArrowElement.style.transform = `rotate(${rotationDegrees}deg)`;
        rotationDegrees += 180;
    }
}