const display = document.querySelector(".display");
const options = document.querySelectorAll(".options");
let result;
let number;
let operator;
let firstTouch;
let operatorPressed;
start();

function start() {
    clear();
    options.forEach((option) => option.onclick = (e) => evaluate(e));
    window.addEventListener("keydown", evaluate);
}

function evaluate(e) {
    let clickedSymbol = null;
    if(e.type === "click") {
        clickedSymbol = e.srcElement.innerHTML;      
    } else if (e.type === "keydown") {
        clickedSymbol = e.key;
    } else {
        // clickedSymbol = "CE";
    }
    if(result === null) {
        display.textContent = "";
        result = 0;
    }
    if(clickedSymbol.toLowerCase() === "c" || clickedSymbol == "Delete") {
            clear();
    } else if (clickedSymbol === "CE" || clickedSymbol == "Backspace") {
        clearEntry();
    } else if (isOperator(clickedSymbol)) {
        if(operator !== "=") {
            number = Number(display.textContent);
        }         
        if(operator !== "=") {
            if(firstTouch) {
                result = number;
            } else {
                result = operate(result,operator,number);
            }
        }
        if(clickedSymbol !== "=") {
            operator = clickedSymbol;
        }
        display.textContent = result;
        if(clickedSymbol === "=") {
            operator = clickedSymbol;
            number = 0;
        }
        firstTouch = false;
        operatorPressed = true;
    } else if (clickedSymbol === ".") {
        if(!display.textContent.includes(".")) {
            display.textContent += clickedSymbol;  
        }
    } else if (!isNaN(Number (clickedSymbol))) { 
        if(operatorPressed && operator !== "=") {
            display.textContent = "";
        }
        display.textContent += clickedSymbol;
        operatorPressed = false;
    }
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
    display.textContent = "0";
    result = null;
    number = 0;
    operator = "+";
    firstTouch = true;
    operatorPressed = true;
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
    // if(display.textContent === "") {
    //     display.textContent = 0;
    // }
}

function isOperator(symbol) {
   return symbol === "+" || symbol === "-" 
    || symbol === "*" || symbol === "/" || symbol === "="
}