let displayCalculator = document.querySelector(".display-calculator");
let operator = "";
let number1 = "",
    number2 = "";
let expression = "";

document.addEventListener("click", (event) => {
    let element = event.target;

    if (element.dataset.clear === "c") {
        displayCalculator.innerHTML = "";
        clearCalculator();
    }

    if (element.dataset.operator) {
        operator = element.dataset.operator;
    }

    if (element.dataset.number) {
        if (!operator) {
            // Substitui 0 pelo número digitado
            number1 =
                number1 == 0
                    ? element.dataset.number
                    : number1 + element.dataset.number;
            console.log(number1);
        } else {
            number2 =
                number2 == 0
                    ? element.dataset.number
                    : number2 + element.dataset.number;
            console.log(number2);
        }
    }

    // Troca o sinal do número
    if (element.dataset.sign) {
        if (!operator) {
            number1 *= -1;
        } else {
            number2 *= -1;
        }
    }

    let result = calculate(Number(number1), operator, Number(number2));
    expression = `${number1} ${operator} ${number2}`;
    console.log(expression);
    showOnScreen(expression);

    if (element.dataset.equal) {
        displayCalculator.innerHTML = `
        <p class="oldExpression">${expression}</p>
        <img class="equal-expression" src="assets/Equals.svg" alt="Equal">
        <span>${result}</span>`;

        // Limpa todos os campos
        clearCalculator();
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
    displayCalculator.innerHTML = `<span>${text}</span>`;
}

function clearCalculator() {
    number1 = "";
    number2 = "";
    operator = "";
}
