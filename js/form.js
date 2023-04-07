/** task description
форма с валидацией
Создаем аккаунт
1. inputs

- поля для first и last name (обезятельно для заполнения)
- age (обезятельно для заполнения, только цифры, старше > 17)
- поле для номера телефона (только цифры)
- поле для email (есть @, есть . и минимум 8 символов)

radio button - предпочтительный способ контакта
1 - телефон
2 - email
3 - обычной почтой (при выборе появляется обязательное поле адрес)

поле адреса (не пустое, если отжат radio button)

select и options для выбора даты рождения
день / месяц; год рассчитать в зависимости от age

const now = new Date();
console.log(now.getFullYear() - age)
const dateOfBirth = new Date(year, mouth, day);

ИЛИ
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match( //возвращает получившиеся совпадения при сопоставлении строки с регулярным выражением
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

- поле для пароля (минимум шесть символов)
- два чекбокса 
		1 - согласие на обработку данных (отжат)
		2 - получить уведомление о создании аккаунта (нажат)

submit button 

после submit отобразить блок с данными пользователя ниже формы
если была отжата кнопка уведомление вызвать alert('Name surname, thanks for creating an account')
*/

const form = document.querySelector(".form"),
      input = document.querySelectorAll("input");
      
      firstName = document.querySelector(".first-name"),
      lastName = document.querySelector(".last-name"),
      age = document.querySelector(".age"),
      phone = document.querySelector(".phone"),
      email = document.querySelector(".email"),
      
      contactGroup = document.querySelector(".contact-group"),
      contactPhone = contactGroup.querySelector(".contact-phone"),
      contactEmail = contactGroup.querySelector(".contact-email"),
      contactPost = contactGroup.querySelector(".contact-post"),
      contactArray = [contactPhone, contactEmail, contactPost],
      contactAddress = document.querySelector(".contact-address"),
      
      day = document.querySelector(".birth-day"),
      month = document.querySelector(".birth-month"),
      year = document.querySelector(".birth-year"),
      
      password = document.querySelector(".password"),
      copyPassword = document.querySelector(".repeat-password"),
      personalData = document.querySelector(".personal-data"),
      notification = document.querySelector(".notification");

form.addEventListener("submit", submitHandler);
contactGroup.addEventListener("click", () => showField(contactAddress, contactPost));

function submitHandler(event) {
  event.preventDefault();

  isNotEmptyText(firstName);
  isNotEmptyText(lastName);
  isEmailValid(email);
  isRadioOn(contactArray);
  checkPassword(password, copyPassword);
};

/* validation functions */
function isNotEmptyText(inputText) {
  const length = inputText.value.length,
        isNotEmpty = length !== 0,
        isNotOnlySpace = false;

  for (let i = 0; i < length; i++) {
    if (inputText.value[i] !== " ") isNotOnlySpace = true;
  };

  const isValid = isNotEmpty && isNotOnlySpace;
  toggleValid(inputText, isValid);

  return isValid;
};

function isRadioOn(radioInputs) {
  let radioOn = false;

  radioInputs.forEach(radioInput => {
    if (radioInput.checked == true) radioOn = true;
  });

  if (radioOn == false) contactGroup.classList.add("not-valid")
  else contactGroup.classList.remove("not-valid");

  return radioOn;
};

function isEmailValid(inputEmail) {
  const isDog = inputEmail.value.includes("@"),
        isDogNotFirst = inputEmail.value[0] !== "@",
        isDot = inputEmail.value.includes("."),
        isCorrectLength = inputEmail.value.length > 7,
        isValid = isDog && isDogNotFirst && isDot && isCorrectLength;

  toggleValid(inputEmail, isValid);

  return isValid;
};

function checkPassword(inputPassword, copyInputPassword) {
  const validLength = inputPassword.value.length > 5,
        passwordsAreEqual = inputPassword.value === copyInputPassword.value,
        isValid = validLength && passwordsAreEqual;

  toggleValid(inputPassword, isValid);
  toggleValid(copyInputPassword, isValid);
  
  return isValid;
};

/* visual functions */
function toggleValid(input, valid) {
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");

  if (valid) input.classList.add("is-valid");
  else input.classList.add("is-invalid");
};

function showField(field, trigger) {
  const div = field.closest("div");
  (trigger.checked == true) 
    ? div.classList.remove("d-none")
    : div.classList.add("d-none");
};