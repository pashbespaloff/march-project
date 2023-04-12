// getting events from buttons
// function "push new symbol to input"
// function "push math signs to input with spaces"
// function "delete symbol from the end of the row"
// function "calculate and change input value to result (if there's no errors)"

const calcField = document.querySelector(".calc-field"),
      btnDelete = document.querySelector(".btn-delete"),
      btnResult = document.querySelector(".btn-result"),
      btnNumbers = document.querySelectorAll(".btn-number"),
      btnOperators = document.querySelectorAll(".btn-operator");

let resultState = false;

btnDelete.addEventListener("click", deleteSymbol);
btnDelete.addEventListener("dblclick", deleteAllSymbols);
btnResult.addEventListener("click", getResult);

// going through arrays to add correct digit or operator
btnNumbers.forEach(item => item.addEventListener("click", writeToInput));
btnOperators.forEach(item => item.addEventListener("click", writeToInput));
document.addEventListener("keydown", writeKeysToInput);

function writeToInput(event) {
  let input = calcField.value;
  const symbol = event.target.textContent,
        lastSymbol = input[input.length - 1],
        isOperator = event.target.classList.contains("btn-operator"),
        isNewValue = input.length === 0,
        isLastOperator = lastSymbol === " ",
        isZero = symbol === "0";
  
  if (isOperator) {
    if (isNewValue || isLastOperator) {
      console.log("enter correct value");
    } else {
      if (resultState) {
        resultState = false;
      };
      input += ` ${symbol} `;
    };
  } else {
    if ((isNewValue || isLastOperator) && isZero) {
      console.log("enter correct value");
    } else {
      if (resultState) {
        resultState = false;
        input = "";
      };
      input += symbol;
    };
  };

  calcField.value = input;
};

function deleteSymbol() {
  let input = calcField.value;
  const lastSymbol = input[input.length - 1];
  (lastSymbol === " ")
    ? input = input.slice(0, -3)
    : input = input.slice(0, -1);
  calcField.value = input;
};

function deleteAllSymbols() {calcField.value = ""};

function getResult() {
  let input = calcField.value;
  const lastSymbol = input[input.length - 1],
        isNewValue = input.length === 0,
        isLastOperator = lastSymbol === " ";
  
  if (isLastOperator || isNewValue) {
    console.log("enter correct value");
  } else {
    let expression = input.split(" ").join(""),
        result = eval(expression);

    input = result;
    calcField.value = input;
    resultState = true;
  }
};

function writeKeysToInput(event) {
  let input = calcField.value;
  const key = event.key,
        lastSymbol = input[input.length - 1],
        isOperator = key === "+" || key === "-" || key === "*" || key === "/",
        isNumber = key >= 0 && key <= 9,
        isNewValue = input.length === 0,
        isLastOperator = lastSymbol === " ",
        isZero = key === "0";

  if (isOperator) {
    if (isNewValue || isLastOperator) {
      console.log("enter correct value");
    } else {
    input += ` ${key} `;
    };
    
  } else if (isNumber) {
    if ((isNewValue || isLastOperator) && isZero) {
      console.log("enter correct value");
    } else {
    input += key;
    };
  };

  calcField.value = input;

  if (key === "Backspace") deleteSymbol();

  if (key === "c") deleteAllSymbols();

  if (key === "=" || key === "Enter") getResult();
};