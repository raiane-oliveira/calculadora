let displayCalculator = document.querySelector(".display-calculator");
let operator = "",
    number1 = "",
    number2 = "",
    result = 0,
    hasResult = false;

document.addEventListener("click", (event) => {
    let element = event.target;
    runCalculator(element);
});

function runCalculator(element) {
    if (element.dataset.clear === "c") {
        clearCalculator(displayCalculator);
    }

    // Pega o sinal
    if (element.dataset.operator) {
        operator = element.dataset.operator;
    }

    // Pega os números
    if (element.dataset.number) {
        if (!operator) {
            // Substitui 0 pelo número digitado
            number1 =
                number1 == 0 || hasResult
                    ? element.dataset.number
                    : number1 + element.dataset.number;
            hasResult = false;
        } else {
            number2 =
                number2 == 0
                    ? element.dataset.number
                    : number2 + element.dataset.number;
        }
    }

    // Formata números decimais para incluírem o zero
    number1 = number1 === "," ? "0" + number1 : number1;
    number2 = number2 === "," ? "0" + number2 : number2;

    // Limpa o último número digitado
    if (element.dataset.clear === "ce") {
        if (!number2) {
            number1 = 0;
            operator = "";
        } else {
            number2 = 0;
        }
    }

    // Troca o sinal do número
    if (element.dataset.sign) {
        if (!number2) {
            number1 *= -1;
        } else {
            number2 *= -1;
        }
    }

    // Permite mais cálculos de uma vez
    let hasMoreCalculation = element.dataset.operator && number2;
    calculateMoreCalculations(hasMoreCalculation, element.dataset.operator);

    result = calculate(
        formatNumbersIntoFloat(number1),
        operator,
        formatNumbersIntoFloat(number2)
    );
    let expression = `${number1} ${operator} ${number2}`.replace(".", ",");

    if (
        element.dataset.number ||
        element.dataset.operator ||
        element.dataset.clear ||
        element.dataset.sign
    ) {
        showOnScreen(`<span>${expression}</span>`);
        displayCalculator.classList.remove("on-result-calculator");
    }

    // Imprime no display da calculadora o resultado final
    if (element.dataset.equal) {
        displayCalculator.classList.add("on-result-calculator");
        showOnScreen(`
            <p class="oldExpression">${expression}</p>
            <img class="equal-expression" src="assets/Equals.svg" alt="Equal">
            <span class="result">${result.toString().replace(".", ",")}</span>
        `);
        clearCalculator();

        // Salva o resultado para poder fazer contas com ele
        number1 = result;
        hasResult = true;
    }
}

function calculate(firstNumber, operator, secondNumber) {
    let result = 0;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "x":
            result = firstNumber * secondNumber;
            break;
        case "/":
            result = firstNumber / secondNumber;
            break;
        case "%":
            result = (firstNumber * secondNumber) / 100;
            break;
        default:
            result = firstNumber ? firstNumber : secondNumber;
            break;
    }
    return result;
}

function showOnScreen(text) {
    displayCalculator.innerHTML = text;
}

function clearCalculator(display = "") {
    if (display) {
        displayCalculator.innerHTML = "";
    }
    number1 = "";
    number2 = "";
    operator = "";
}

function formatNumbersIntoFloat(number) {
    if (typeof number === "string" && number.includes(",")) {
        number = number.replace(",", ".");
    }
    return Number(number);
}

function calculateMoreCalculations(condicional, operatorClicked) {
    if (condicional) {
        number1 = result;
        operator = operatorClicked;
        number2 = "";
    }
}
