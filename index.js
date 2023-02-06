let displayCalculator = document.querySelector(".display-calculator");
let operator = "";
let number1 = "",
    number2 = "";

document.addEventListener("click", (event) => {
    let element = event.target;

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
                number1 == 0
                    ? element.dataset.number
                    : number1 + element.dataset.number;
        } else {
            number2 =
                number2 == 0
                    ? element.dataset.number
                    : number2 + element.dataset.number;
        }
    }

    // Limpa o último número digitado
    if (element.dataset.clear === "ce") {
        if (!number2) {
            number1 = 0;
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

    let result = calculate(Number(number1), operator, Number(number2));

    // Permite mais cálculos de uma vez
    if (operator && element.dataset.operator) {
        number1 = result;
        operator = element.dataset.operator;
        number2 = "";
    }

    let expression = `${number1} ${operator} ${number2}`;
    showOnScreen(`<span>${expression}</span>`);

    if (element.dataset.equal) {
        displayCalculator.classList.add("on-result-calculator");
        showOnScreen(`
                <p class="oldExpression">${expression}</p>
                <img class="equal-expression" src="assets/Equals.svg" alt="Equal">
                <span>${result}</span>`);

        clearCalculator();

        // Salva o resultado para poder fazer contas com ele
        if (element.dataset.operator) {
            number1 = result;
        }
    } else {
        displayCalculator.classList.remove("on-result-calculator");
    }
});

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
