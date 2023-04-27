const converterBox = document.querySelector(".converter-box"),
      
      currenciesInput = converterBox.querySelector(".input-currency"),
      inputCurrencies = converterBox.querySelector(".input-currencies"),
      
      currenciesOutput = converterBox.querySelector(".output-currency"),
      outputCurrencies = converterBox.querySelector(".output-currencies"),
      
      buttonConvert = converterBox.querySelector(".button-convert"),
      buttonReplaceCurrencies = converterBox.querySelector(".button-replace"),
      
      currenciesList = [
        {
          name : "🇨🇿 CZK",
          value : "czk"
        },
        {
          name : "🇪🇺 EUR",
          value : "eur"
        },
        {
          name : "🇷🇺 RUB",
          value : "rub"
        },
        {
          name : "🇬🇪 GEL",
          value : "gel"
        },
        {
          name : "🇺🇸 USD",
          value : "usd"
        },
      ];

const fillCurrenciesList = () => {
  for (let i = 0; i < currenciesList.length; i++) {
    const option = document.createElement("option"),
          currency = currenciesList[i];
    
    option.text = currency.name;
    option.value = currency.value;

    inputCurrencies.add(option);
  };

  outputCurrencies.innerHTML = inputCurrencies.innerHTML;
};

const clearCurrenciesInput = () => {
  const value = currenciesInput.value;
  let numbersValue = "";

  for (let i = 0; i < value.length; i++) {
    const symbol = value[i];
    if (value[0] === "0") numbersValue = numbersValue.substring(1);
    if (!isNaN(Number(symbol)) || symbol === ".") numbersValue += symbol;
  };

  currenciesInput.value = numbersValue;
  return numbersValue;
};

const convertHandler = () => {
  // get the input currency, output currency, input value
  const currenciesInputValue = inputCurrencies.value.toUpperCase(),
        currenciesOutputValue = outputCurrencies.value.toUpperCase(),
        inputValue = parseFloat(currenciesInput.value);

  // fetch exchange rates from api
  const url = `https://api.exchangerate-api.com/v4/latest/${currenciesInputValue}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // convert the currency
      const exchangeRates = data.rates,
            exchangeRate = exchangeRates[currenciesOutputValue],
            convertedValue = inputValue * exchangeRate;

      // update the output value
      currenciesOutput.value = convertedValue.toFixed(1);
    })
    
    .catch(error => {
      // if there was an error fetching the data, display an error message
      currenciesOutput.value = "error fetching data";
      console.error(error);
    });
};

const replaceCurrencies = () => {
  const replacedValue = inputCurrencies.value,
        replacedInput = currenciesInput.value;

  inputCurrencies.value = outputCurrencies.value;
  outputCurrencies.value = replacedValue;

  currenciesInput.value = currenciesOutput.value;
  currenciesOutput.value = replacedInput;
};

fillCurrenciesList();
currenciesInput.addEventListener("input", clearCurrenciesInput);
buttonConvert.addEventListener("click", convertHandler);
buttonReplaceCurrencies.addEventListener("click", replaceCurrencies);