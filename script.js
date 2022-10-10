const display = document.querySelector(".display");
const options = document.querySelectorAll(".options");
let result = null;
let number = 0;
let operator = "+";
let firstTouch = true;
start();

function start() {
    clear();

    options.forEach((option) => option.onclick = (e) => {
        // console.log(e.srcElement.innerHTML);
        if(result === null) {
            display.textContent = "";
            result = 0;
        }
        if(e.srcElement.innerHTML === "C") {
            clear();
        } else if (e.srcElement.innerHTML === "CE") {
            clearEntry();
        } else if (isOperator(e.srcElement.innerHTML)) {
            if(operator !== "=") {
                number = Number(display.textContent);
            }            
            if(e.srcElement.innerHTML !== "=") {
                operator = e.srcElement.innerHTML;
            }
            if(firstTouch) {
                result = number;
            } else {
                result = operate(result,operator,number);
            }
            display.textContent = result;
            if(e.srcElement.innerHTML === "=") {
                operator = e.srcElement.innerHTML;
                number = 0;
            }
            if(operator !== "=") {
                display.textContent = "";  
            firstTouch = false;
            }
        } else {
            display.textContent += e.srcElement.innerHTML;
        }
    });
}

function operate(NumberOne, operand, NumberTwo) {
    switch (true) {
        case operand === "+":
            return add(NumberOne,NumberTwo);
        case operand === "-":
            return subtract(NumberOne,NumberTwo);
        case operand === "*":
            return multiply(NumberOne,NumberTwo);
        case operand === "/":
            return divide(NumberOne,NumberTwo);
        default:
            return null;
    }
}

function add(numbers) {
    let sum = 0;
    for (let index = 0; index < arguments.length; index++) {
        if(typeof arguments[index] !== "number") {
            return null;
        }
        sum += arguments[index];
    }
    return sum;
}

function subtract(numbers) {
    if(typeof arguments[0] !== "number") {
        return null;
    }
    let sub = arguments[0];
    for (let index = 1; index < arguments.length; index++) {
            if(typeof arguments[index] !== "number") {
                return null;
            }
            sub -= arguments[index];
        }
    return sub;
}

function multiply(numbers) {
    let mult = 1;
    for (let index = 0; index < arguments.length; index++) {
        if(typeof arguments[index] !== "number") {
            return null;
        }
        mult *= arguments[index];
    }
    return mult;
}

function divide(numbers) {
    if(typeof arguments[0] !== "number") {
        return null;
    }
    let div = arguments[0];
    for (let index = 1; index < arguments.length; index++) {
        if(typeof arguments[index] !== "number") {
            return null;
        }
        div /= arguments[index];
        }
    return div;
}

function clear() {
    display.textContent = "";
    result = null;
    number = 0;
    operator = "+";
    firstTouch = true;
}

function clearEntry() {
    let text = display.textContent.split("");
    if(text[text.length-1] === " ") {
        text.pop();
    }
    text.pop();
    if(text[text.length-1] === " " && !isOperator(text[text.length-2])) {
        text.pop();
    }
    display.textContent = text.join("");
}

function isOperator(symbol) {
   return symbol === "+" || symbol === "-" 
    || symbol === "*" || symbol === "/" || symbol === "="
}