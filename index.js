let displayCalculator = document.querySelector(".display-calculator");
let operator = "";
let number1 = "",
    number2 = "";

document.addEventListener("click", (event) => {
    let element = event.target;

    if (element.dataset.clear === "c") {
        displayCalculator.innerHTML = "";
        number1 = "";
        number2 = "";
        operator = "";
    }

    if (element.dataset.operator) {
        operator = element.dataset.operator;
        console.log(operator);
    }

    if (element.dataset.number) {
        if (!operator) {
            number1 += element.dataset.number;
            console.log(number1);
        } else {
            number2 += element.dataset.number;
            console.log(number2);
        }
    }

    let result = calculate(Number(number1), operator, Number(number2));
    console.log(result);

    if (element.dataset.equal) {
        displayCalculator.innerHTML = result;
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
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            result = firstNumber / secondNumber;
            break;
        case "%":
            result = (firstNumber * secondNumber) / 100;
            break;
    }
    return result;
}
