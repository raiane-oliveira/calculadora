let displayCalculator = document.querySelector(".display-calculator");
let operator = "",
    firstNumber = "",
    secondNumber = "",
    result = 0,
    hasResult = false;

document
    .querySelector(".functionalities-calculator")
    .addEventListener("click", (event) => {
        runCalculator(event.target);
    });

function runCalculator(element) {
    if (element.dataset.clear === "c") {
        clearOfCalculator("display");
    }

    // Pega o sinal
    if (element.dataset.operator) {
        operator = element.dataset.operator;
    }

    // Pega os números
    if (element.dataset.number) {
        if (!operator) {
            // Substitui 0 pelo número digitado
            firstNumber =
                firstNumber == 0 || hasResult
                    ? element.dataset.number
                    : firstNumber + element.dataset.number;
            hasResult = false;
        } else {
            secondNumber =
                secondNumber == 0
                    ? element.dataset.number
                    : secondNumber + element.dataset.number;
        }
    }

    // Formata números decimais para incluírem o zero
    firstNumber = firstNumber === "," ? "0" + firstNumber : firstNumber;
    secondNumber = secondNumber === "," ? "0" + secondNumber : secondNumber;

    // Limpa o último número digitado
    if (element.dataset.clear === "ce") {
        if (!secondNumber) {
            firstNumber = 0;
            clearOfCalculator("operator");
        } else {
            secondNumber = 0;
        }
    }

    // Troca o sinal do número
    if (element.dataset.sign) {
        if (!secondNumber) {
            firstNumber *= -1;
        } else {
            secondNumber *= -1;
        }
    }

    // Permite mais cálculos de uma vez
    let hasMoreCalculation = element.dataset.operator && secondNumber;
    calculateMoreCalculations(hasMoreCalculation, element.dataset.operator);

    result = calculate(
        formatNumbersIntoFloat(firstNumber),
        operator,
        formatNumbersIntoFloat(secondNumber)
    );
    let expression = `${firstNumber} ${operator} ${secondNumber}`.replace(
        ".",
        ","
    );

    // Imprime na tela o cálculo que o user tá fazendo
    if (!element.dataset.equal) {
        showOnScreen(`<span>${expression}</span>`);
        displayCalculator.classList.remove("on-result-calculator");
    }

    // Imprime na tela o resultado final
    if (element.dataset.equal) {
        displayCalculator.classList.add("on-result-calculator");
        showOnScreen(`
            <p class="oldExpression">${expression}</p>
            <img class="equal-expression" src="assets/Equals.svg" alt="Equal">
            <span class="result">${result.toString().replace(".", ",")}</span>
        `);
        clearOfCalculator("firstNumber");
        clearOfCalculator("secondNumber");
        clearOfCalculator("operator");

        // Salva o resultado para poder fazer contas com ele
        firstNumber = result;
        hasResult = true;
    }
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

function showOnScreen(text) {
    displayCalculator.innerHTML = text;
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

function formatNumbersIntoFloat(number) {
    if (typeof number === "string" && number.includes(",")) {
        number = number.replace(",", ".");
    }
    return Number(number);
}

function calculateMoreCalculations(condicional, operatorClicked) {
    if (condicional) {
        firstNumber = result;
        operator = operatorClicked;
        clearOfCalculator("secondNumber");
    }
}
