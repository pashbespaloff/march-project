const counterBox = document.querySelector(".counter-box"),
      counter = counterBox.querySelector(".counter"),
      minus = counterBox.querySelector(".counter-btn-minus"),
      plus = counterBox.querySelector(".counter-btn-plus");

let counterState = {
  number : 0,
  color : "white",
};

const setCounterState = (nextCounterState) => {
  renderCounter(nextCounterState);
  counterState = nextCounterState;
};

const setNumber = (number) => {
  setCounterState({...counterState, number});
};

const renderCounter = (stateComponent) => {
  if (stateComponent.number !== counterState.number)
    counter.value = stateComponent.number;

  if (stateComponent.color !== counterState.color)
    counter.color = stateComponent.color;
};

const changeValue = (e) => {
  if (e.target === minus) setNumber(Number(counter.value) - 1);
  else if (e.target === plus) setNumber(Number(counter.value) + 1);
};

const clearInput = () => {
  const value = counter.value;
  let clearValue = "";

  for (let i = 0; i < value.length; i++) {
    const symbol = value[i];
    if (!isNaN(Number(symbol))) clearValue += symbol;
  };

  counter.value = clearValue;
  return clearValue;
};

const counterHandler = () => {
  setNumber(clearInput());
};

counter.addEventListener("input", counterHandler);
counterBox.addEventListener("click", changeValue);