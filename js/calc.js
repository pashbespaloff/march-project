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

function writeToInput(event) {
  let symbol = event.target.textContent;
      input = calcField.value;
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