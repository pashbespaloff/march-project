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

btnDelete.addEventListener("click", deleteSymbol);
btnResult.addEventListener("click", getResult);

// going through arrays to add correct digit or operator
btnNumbers.forEach(item => item.addEventListener("click", writeToInput));
btnOperators.forEach(item => item.addEventListener("click", writeToInput));
document.addEventListener("keydown", writeKeysToInput);

/*
function writeToInput(event) {
  let symbol = event.target.textContent,
      input = calcField.value,
      lastSymbol = input[input.length - 1];
  if (event.target.classList.contains("btn-operator")) {
    if (lastSymbol !== " " && input.length) {
      input += ` ${symbol} `;
    } else {
      console.log("enter correct value");
    };
  } else {
    if ((!input.length && symbol === "0") || 
    (lastSymbol === " " && symbol === "0")) {
      console.log("enter correct value");
    } else {
    input += symbol;
    };
  };
  calcField.value = input;
};
*/

function writeToInput(event) {
  let input = calcField.value,
      symbol = event.target.textContent,
      lastSymbol = input[input.length - 1];
  const isOperator = event.target.classList.contains("btn-operator"),
        isNewValue = input.length === 0 || lastSymbol === " ";

  if (isOperator) {
    if (isNewValue) {
      console.log("enter correct value");
    } else {
    input += ` ${symbol} `;
    };
  } else {
    if (isNewValue && symbol === "0") {
      console.log("enter correct value");
    } else {
    input += symbol;
    };
  };

  calcField.value = input;
};

function deleteSymbol() {
  let input = calcField.value,
      lastSymbol = input[input.length - 1];
  if (lastSymbol === " ") {
    input = input.slice(0, -3);
  } else {
    input = input.slice(0, -1);
  };
  calcField.value = input;
};

/*
function getResult () {
  let input = calcField.value,
      arrayOfInput = input.split(" "),
      numbersArray = [],
      operatorsArray = [],
      result = 0;
  for (let i = 0; i < arrayOfInput.length; i++) {
    if (!Number(isNaN(arrayOfInput[i]))) {
      numbersArray.push(Number(arrayOfInput[i]));
    } else {
      operatorsArray.push(arrayOfInput[i]);
    };
  };
};
*/

function getResult () {
  let input = calcField.value,
      expression = input.split(" ").join(""),
      result = eval(expression);

  input = result;
  calcField.value = input;

  restartCalc();
};

function restartCalc () {
  btnNumbers.forEach(item => item.removeEventListener("click", writeToInput));
  btnOperators.forEach(item => item.removeEventListener("click", writeToInput));
  document.removeEventListener("keydown", writeKeysToInput);

  btnNumbers.forEach(item => item.addEventListener("click", cleanInput));
  btnOperators.forEach(item => item.addEventListener("click", cleanInput));
  document.addEventListener('keydown', cleanInput);

  function cleanInput() {
    input = "";
    calcField.value = input;
    btnNumbers.forEach(item => item.removeEventListener("click", cleanInput));
    btnOperators.forEach(item => item.removeEventListener("click", cleanInput));
    document.removeEventListener('keydown', cleanInput);
  };

  btnNumbers.forEach(item => item.addEventListener("click", writeToInput));
  btnOperators.forEach(item => item.addEventListener("click", writeToInput));
  document.addEventListener("keydown", writeKeysToInput);
};

function writeKeysToInput(event) {
  let input = calcField.value, 
      key = event.key;
      lastSymbol = input[input.length - 1];
  
  const isOperator = key === "+" || key === "-" || key === "*" || key === "/",
        isNumber = key >= 0 && key <= 9,
        isNewValue = input.length === 0 || lastSymbol === " ";

  if (isOperator) {
    if (isNewValue) {
      console.log("enter correct value");
    } else {
    input += ` ${key} `;
    };
    
  } else if (isNumber) {
    if (isNewValue && key === "0") {
      console.log("enter correct value");
    } else {
    input += key;
    };
  };

  calcField.value = input;

  if (key === "Backspace")
    deleteSymbol();

  if (key === "=")
    getResult();
};