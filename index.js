let displayCalculator = document.querySelector(".display-calculator");
let operator = "",
    imgOperator,
    firstNumber = "",
    secondNumber = "",
    result = 0,
    hasResult = false;

document
    .querySelector(".functionalities-calculator")
    .addEventListener("click", (event) => runCalculator(event.target.dataset));

document.addEventListener("keydown", (event) => {
    let keyPress = {};
    if (parseFloat(event.key) || event.key === ",") {
        keyPress = { number: event.key };
    } else if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/" ||
        event.key === "%"
    ) {
        keyPress = { operator: event.key };
    } else if (event.key === "Escape") {
        clearCalculatorWithButton("c");
        return;
    } else if (event.key === "Delete") {
        clearCalculatorWithButton("ce");
        return;
    } else if (event.key === "Enter" || event.key === "=") {
        keyPress = { equal: "=" };
    } else if (event.key === "Backspace") {
        keyPress = { clear: "delete" };
    }

    runCalculator(keyPress);
});

function runCalculator(element) {
    if (element.clear) clearCalculatorWithButton(element.clear);

    if (element.clear === "delete") {
        if (firstNumber && !operator) {
            firstNumber = removeLastDigitOfCalculator(firstNumber);
        } else if (secondNumber && operator) {
            secondNumber = removeLastDigitOfCalculator(secondNumber);
        } else if (operator && !secondNumber) {
            operator = removeLastDigitOfCalculator(operator);
        }
    }

    // Pega o operador
    if (element.operator) operator = element.operator;

    if (element.number) {
        if (!operator) {
            firstNumber = getNumberOfCalculation(element.number, firstNumber);
        } else {
            secondNumber = getNumberOfCalculation(element.number, secondNumber);
        }
    }

    // Adiciona o zero antes da vírgula se ele não foi digitado
    firstNumber = firstNumber === "," ? "0" + firstNumber : firstNumber;
    secondNumber = secondNumber === "," ? "0" + secondNumber : secondNumber;

    // Troca o sinal do número
    if (element.sign) swapNumberSign(element.sign);

    // Permite mais cálculos de uma vez
    let hasMoreCalculation = element.operator && secondNumber;
    if (hasMoreCalculation) {
        firstNumber = result;
        operator = operatorClicked;
        clearOfCalculator("secondNumber");
    }

    result = calculate(
        parseFloat(firstNumber.replace(",", ".")),
        operator,
        parseFloat(secondNumber.replace(",", "."))
    );

    // Impede que o operador seja impresso na tela sem números
    if (operator && !firstNumber && !secondNumber)
        clearOfCalculator("operator");

    let expression = `${firstNumber.replace(".", ",")} 
                      ${imgOperator} 
                      ${secondNumber.replace(".", ",")}`;
    showOnCalculatorScreen(element.equal, expression);
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
            imgOperator = "<img src='assets/Plus.svg' alt='Plus'/>";
            break;
        case "-":
            result = num1 - num2;
            imgOperator = "<img src='assets/Minus.svg' alt='Minus'/>";
            break;
        case "*":
            result = num1 * num2;
            imgOperator = "<img src='assets/X.svg' alt='X'/>";
            break;
        case "/":
            result = num1 / num2;
            imgOperator = "<img src='assets/Divide.svg' alt='Divide'/>";
            break;
        case "%":
            result = (num1 * num2) / 100;
            imgOperator = "<img src='assets/Percent.svg' alt='Percent'/>";
            break;
        default:
            result = num1 ? num1 : num2;
            imgOperator = "";
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
            firstNumber = "";
            clearOfCalculator("operator");
        } else {
            secondNumber = "";
        }
    }
}

function swapNumberSign(sign) {
    if (!secondNumber) firstNumber *= -1;
    else secondNumber *= -1;
}

function removeLastDigitOfCalculator(string) {
    let stringSplit = string.split("");
    stringSplit.pop();
    return stringSplit.join("");
}
