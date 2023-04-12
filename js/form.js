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
      
      birthdateGroup = document.querySelector(".birthdate-group"),
      month = document.querySelector(".birth-month"),
      day = document.querySelector(".birth-day"),
      
      passwordGroup = document.querySelector(".password-group"),
      password = document.querySelector(".password"),
      copyPassword = document.querySelector(".repeat-password"),
      passwordEyes = document.querySelectorAll(".eye"),

      notificationGroup = document.querySelector(".notification-group"),
      personalData = document.querySelector(".personal-data"),
      notification = document.querySelector(".notification"),
      notificationArray = [personalData, notification],

      modalWindow = document.querySelector(".form-submit"),
      modalBody = document.querySelector(".modal-body"),
      closeWindow = document.querySelector(".close-window"),

      user = {
        firstName : null,
        lastName : null,
        birthDate : null,
        phone : null,
        email : null,
      };

form.addEventListener("submit", submitHandler);
contactGroup.addEventListener("click", () => showField(contactAddress, contactPost));
passwordEyes.forEach(eye => eye.addEventListener("click", showPassword));
closeWindow.addEventListener("click", showModalWindow);



function submitHandler(event) {
  event.preventDefault();

  const isValid = isNotEmptyText(firstName) && isNotEmptyText(lastName) 
  && areDigitsCorrect(age) && areDigitsCorrect(phone) && isEmailValid(email)
  && isChecked(contactArray, contactGroup) && isChecked(notificationArray, notificationGroup)
  && checkPassword(password, copyPassword);

  if (isValid) {
    user.firstName = firstName.value;
    user.lastName = lastName.value;
    user.birthDate = getBirthDate(age, month, day);
    user.phone = phone.value;
    user.email = email.value;

    showModalWindow();
  }
};

/* validation functions */
function isNotEmptyText(inputText) {
  const length = inputText.value.length,
        isNotEmpty = length !== 0;
  
  let isNotOnlySpace = false;

  for (let i = 0; i < length; i++) {
    if (inputText.value[i] !== " ") isNotOnlySpace = true;
  };

  const isValid = isNotEmpty && isNotOnlySpace;
  toggleValid(inputText, isValid);

  return isValid;
};

function areDigitsCorrect(numberInput) { 
  const input = numberInput.value.split(" ").join(""),
        isNumber = Number(input) == input,
        isCorrectLength = (numberInput === phone) ? input.length > 5 : input.length > 0,
        isUserAdult = (numberInput === age) ? input > 17 : true,
        isNotZero = input != 0,
        isValid = isNumber && isCorrectLength && isUserAdult && isNotZero;
  
  toggleValid(numberInput, isValid);

  return isValid;
};

function getBirthDate(age, month, day) {
  const userAge = age.value,
        birthMonth = month.value,
        birthDay = day.value,
        now = new Date(),
        noValues = birthMonth == "" || birthDay == "",
        yearWithBirthdayComing = now.getFullYear() - userAge;
        yearWithBirthdayPassed = now.getFullYear() - userAge - 1;

  let birthYear;

  if (noValues) {
    birthdateGroup.classList.add("not-valid");
    return false;
  } else {
    birthdateGroup.classList.remove("not-valid");
  };

  if (userAge < 18) return false;

  if (birthMonth < now.getMonth()) {
    birthYear = yearWithBirthdayComing;

  } else if (birthMonth > now.getMonth()) {
    birthYear = yearWithBirthdayPassed;

  } else if (birthMonth == now.getMonth()) {
    (birthDay < now.getDate())
      ? birthYear = yearWithBirthdayComing
      : birthYear = yearWithBirthdayPassed;
  };

  // let birthDate = new Date();
  // birthDate.setFullYear(year, birthMonth, birthDay);
  // Выдаёт длинную дату с часовым поясом и другими ненужными значениями

  let actualBirthMonth = +birthMonth + 1,
      actualBirthDay = +birthDay;

  if (actualBirthMonth < 10) actualBirthMonth = `0${actualBirthMonth}`;
  if (actualBirthDay < 10) actualBirthDay = `0${actualBirthDay}`;

  const birthDate = `${birthYear}.${actualBirthMonth}.${actualBirthDay}`;

  return birthDate;
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

function isChecked(booleanInputs, inputsGroup) {
  let isOn = false;

  for (let i = 0; i < booleanInputs.length; i++) {
    const input = booleanInputs[i];

    if (input.type == "radio") {
      if (input.checked == true) isOn = true;

    } else if (input.type == "checkbox") {
      (input.checked == true) ? isOn = true : isOn = false;
    };
  };

  if (isOn == false) inputsGroup.classList.add("not-valid")
  else inputsGroup.classList.remove("not-valid");

  return isOn;
};

function checkPassword(inputPassword, copyInputPassword) {
  const validLength = inputPassword.value.length > 7,
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

function showPassword() {
  passwordEyes.forEach(eye => eye.classList.toggle("fa-eye-slash"));
  
  const pass1 = password.getAttribute("type") === "password" ? "text" : "password",
        pass2 = copyPassword.getAttribute("type") === "password" ? "text" : "password";
  
  password.setAttribute("type", pass1);
  copyPassword.setAttribute("type", pass2);
};

function showModalWindow() {
  modalBody.innerHTML += `welcome, <b>${user.firstName} ${user.lastName}</b><br/><br/>`;
  modalBody.innerHTML += `your birthdate: <b>${user.birthDate}</b><br/>`;
  modalBody.innerHTML += `your email: <b>${user.email}</b><br/>`;
  modalBody.innerHTML += `your phone: <b>${user.phone}</b>`;

  if (modalWindow.classList.contains("d-none")) {
    modalWindow.classList.remove("d-none");
    modalWindow.classList.add("show-window");

  } else if (modalWindow.classList.contains("show-window")) {
    modalWindow.classList.add("d-none");
    modalWindow.classList.remove("show-window");
    location.reload();
  };
};