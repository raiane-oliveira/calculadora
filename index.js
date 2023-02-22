let displayCalculator = document.querySelector(".display-calculator");
let operator = "",
    firstNumber = "",
    secondNumber = "",
    result = 0,
    hasResult = false;

document
    .querySelector(".functionalities-calculator")
    .addEventListener("click", (event) => runCalculator(event.target));

function runCalculator(element) {
    if (element.dataset.clear) clearCalculatorWithButton(element.dataset.clear);

    // Pega o sinal
    if (element.dataset.operator) operator = element.dataset.operator;

    if (element.dataset.number) {
        if (!operator) {
            firstNumber = getNumberOfCalculation(
                element.dataset.number,
                firstNumber
            );
        } else {
            secondNumber = getNumberOfCalculation(
                element.dataset.number,
                secondNumber
            );
        }
    }

    // Adiciona o zero antes da vírgula se ele não foi digitado
    firstNumber = firstNumber === "," ? "0" + firstNumber : firstNumber;
    secondNumber = secondNumber === "," ? "0" + secondNumber : secondNumber;

    // Troca o sinal do número
    if (element.dataset.sign) swapNumberSign(element.dataset.sign);

    // Permite mais cálculos de uma vez
    let hasMoreCalculation = element.dataset.operator && secondNumber;
    if (hasMoreCalculation) {
        firstNumber = result;
        operator = operatorClicked;
        clearOfCalculator("secondNumber");
    }

    result = calculate(
        formatNumbersIntoFloat(firstNumber),
        operator,
        formatNumbersIntoFloat(secondNumber)
    );

    // Impede que o operador seja impresso na tela sem números
    if (operator && !firstNumber && !secondNumber) {
        operator = "";
    }

    let expression = `${firstNumber} ${operator} ${secondNumber}`.replace(
        ".",
        ","
    );
    showOnCalculatorScreen(element.dataset.equal, expression);
}

function getNumberOfCalculation(numberClicked, num) {
    num = num == 0 || hasResult ? numberClicked : num + numberClicked;
    hasResult = false;
    return num;
}

function calculate(num1, operator, num2) {
    let result = 0;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "x":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        case "%":
            result = (num1 * num2) / 100;
            break;
        default:
            result = num1 ? num1 : num2;
    }
    return result;
}

function showOnCalculatorScreen(equalSign, expressionCalculation) {
    // Imprime na tela o cálculo que o user tá fazendo
    if (!equalSign) {
        displayCalculator.innerHTML = `<span>${expressionCalculation}</span>`;
        displayCalculator.classList.remove("on-result-calculator");
    }

    // Imprime na tela o resultado final
    else {
        displayCalculator.classList.add("on-result-calculator");
        displayCalculator.innerHTML = `
            <p class="oldExpression">${expressionCalculation}</p>
            <img class="equal-expression" src="assets/Equals.svg" alt="Equal">
            <span class="result">${result.toString().replace(".", ",")}</span>
        `;
        clearOfCalculator("firstNumber");
        clearOfCalculator("secondNumber");
        clearOfCalculator("operator");

        // Salva o resultado da conta
        firstNumber = result;
        hasResult = true;
    }
}

function clearOfCalculator(option) {
    switch (option) {
        case "display":
            displayCalculator.innerHTML = "";
            firstNumber = "";
            secondNumber = "";
            operator = "";
            break;
        case "firstNumber":
            firstNumber = "";
            break;
        case "secondNumber":
            secondNumber = "";
            break;
        case "operator":
            operator = "";
            break;
        default:
            throw new Error("Invalid option!");
    }
}

function clearCalculatorWithButton(btnClicked) {
    if (btnClicked === "c") {
        clearOfCalculator("display");
    } else if (btnClicked === "ce") {
        if (!secondNumber) {
            firstNumber = 0;
            clearOfCalculator("operator");
        } else {
            secondNumber = 0;
        }
    }
}

function formatNumbersIntoFloat(number) {
    if (typeof number === "string" && number.includes(",")) {
        number = number.replace(",", ".");
    }
    return Number(number);
}

function swapNumberSign(sign) {
    if (!secondNumber) firstNumber *= -1;
    else secondNumber *= -1;
}
