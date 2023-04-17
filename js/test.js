/** Напишите следующий небольшой тест
	Он выглядит как один блок с вопросом и тремя вариантами ответа

	варианты ответа реализованы через радио-кнопку (выбрать можно только один)
	radioButton.checked может быть true или false

	После выбора становится доступна кнопка "проверить" (до этого она disabled)

	После нажатия на кнопку вы скрываете предыдущий вопрос и показываете следующий.

	В конце после последнего вопроса вы должны отобразить текст, который сообщит 
	на сколько вопросов пользователь ответил правильно.

	Это ознает, что вы должны собирать ответы пользователя, например в массив, и затем
	сравнить его с правильными ответами и показать сколько правильно, сколько нет.

	JavaScript это Java?
		Нет.
		Да.
		Возможно.

	проверить

	Сколько параментров можно передать в фукнцию?
		Сколько указано при ее создании.
		Минимум один.
		Сколько угодно.

	проверить

	Массивы это объекты?
		Не совсем.
		Нет.
		Да, это спископодобные объекты.

	проверить
 */

const initialData = [
	{
		id: 1,
		question: "javascript is java?",
		answers: [
			{text: "no", isCorrect: true},
			{text: "yes", isCorrect: false},
			{text: "maybe", isCorrect: false},
		]
	},
	{
		id: 2,
		question: `how many parameters can be sent to\xa0a\xa0function?`,
		answers: [
			{text: "as much as specified at its creation", isCorrect: true},
			{text: "at least one", isCorrect: false},
			{text: "as much as you want", isCorrect: false},
		]
	},
	{
		id: 3,
		question: "arrays are objects?",
		answers: [
			{text: "not exactly", isCorrect: false},
			{text: "not at all", isCorrect: false},
			{text: "yes, they are list-like objects", isCorrect: true},
		]
	}
];

const box = document.querySelector(".box"),
			question = box.querySelector(".question"),
			inputs = box.querySelectorAll(".radio"),
			responseOptions = box.querySelectorAll(".response-option"),
			checkBtn = box.querySelector(".test-btn"),
			testResult = document.querySelector(".test-result"),
			reloadBtn = document.querySelector(".btn-repeat-test"),

			correctAnswers = [],
			userAnswers = [],
			results = {
				0: "you answered all the questions wrong 😔",
				1: "you gave only 1 correct answer 🤔",
				2: "you gave 2 correct answers 😏",
				3: "all your answers are correct 😎",
			};

let checkBtnDisabled = true;

/* building correctAnswers array from initialData */
for (const question of initialData) {
	const answers = question.answers;
	answers.forEach((answer, i) => {
		if (answer.isCorrect == true) {
			correctAnswers.push(i+1);
		};
	});
};

/* entering the first question */
fillData(initialData[0]);

/* check button will be enabled when any radio button is checked */
box.addEventListener("change", () => toggleDisabled(inputs, checkBtn));

checkBtn.addEventListener("click", () => getAnswer(inputs));
reloadBtn.addEventListener("click", () => location.reload());

function fillData(data) {
	question.textContent = data.question;
	question.dataset.question = data.id;
	responseOptions.forEach((option, index) => {option.textContent = data.answers[index].text});
};

function toggleDisabled(inputs, button) {
	if (event.target.classList.contains("radio")) {
		button.setAttribute("disabled", true);

		for (const input of inputs) {
			if (input.checked) {
				button.removeAttribute("disabled");
				break;
			};
		};

		checkBtnDisabled = button.hasAttribute("disabled");
	};
};

function getAnswer(inputs) {
  let userAnswer

  for (let i = 0; i < inputs.length; i++) {
		const isAnswer = inputs[i].checked && checkBtnDisabled == false
    if (isAnswer) userAnswer = inputs[i].value;
  };

  userAnswers.push(Number(userAnswer));
	showNextQuestion(initialData);
};

function showNextQuestion(questionnaire) {
	for (let i = 1; i <= questionnaire.length; i++) {
		const nextQuestion = questionnaire[i],
					isQuestion = i == question.dataset.question,
					isLastQuestion = i == questionnaire.length;

		if (isQuestion && !isLastQuestion) {
			fillData(nextQuestion);
			inputs.forEach(input => input.checked = false);
			checkBtn.setAttribute("disabled", true);
			break;

		} else if (isLastQuestion) {
			getResults();
			break;
		};
	};
};

function getResults() {
  let howMuchCorrectAnswers = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] == correctAnswers[i])
			howMuchCorrectAnswers += 1;
  };

	box.classList.add("d-none");

  testResult.textContent += results[howMuchCorrectAnswers];
	testResult.closest("DIV").classList.remove("d-none");
};





/** original version

let howMuchCorrectAnswers = 0;
fillData(initialData[0]);
inputs.forEach(input => {input.addEventListener("click", () => toggleDisabled(inputs, checkBtn))});
checkBtn.addEventListener("click", () => getAnswer(inputs));

function fillData(data) {
	question.textContent = data.question;
	question.dataset.question = data.id;

	responseOptions.forEach((option, index) => {option.textContent = data.answers[index].text});
	inputs.forEach((input, index) => {input.value = data.answers[index].isCorrect});
};

function toggleDisabled(inputs, target) {
	target.setAttribute("disabled", true);

	for (const input of inputs) {
		if (input.checked) {
			target.removeAttribute("disabled");
			break;
		};
	};

	checkBtnDisabled = target.hasAttribute("disabled");
};

function getAnswer(inputs) {
  let userAnswer

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked && checkBtnDisabled == false)
      userAnswer = inputs[i].value;
  };

  userAnswers.push(userAnswer);
	if (userAnswer == "true") howMuchCorrectAnswers += 1;

	showNextQuestion(initialData);
};

function showNextQuestion(questionnaire) {
	for (let i = 1; i <= questionnaire.length; i++) {
		const nextQuestion = questionnaire[i],
					isNextQuestion = i == question.dataset.question,
					islastQuestion = i == questionnaire.length;

		if (isNextQuestion && !islastQuestion) {
			inputs.forEach(input => input.checked = false);
			fillData(nextQuestion);
			toggleDisabled(inputs, checkBtn);
			break;

		} else if (islastQuestion) {
			getResults();
			break;
		};
	};
};

function getResults() {
	box.classList.add("d-none");

  testResult.textContent = resultsObj[howMuchCorrectAnswers];
	testResult.closest("DIV").classList.remove("d-none");
};
*/

/** Нужен обработчик клика на box — смотрим, на что кликнули.
 * Если один из инпутов checked — убираем с button disabled.
 * Если event.target == button (по классу проверить?) && button == disabled,
 * 	если box.dataset.id < initialData.id 
 * 		1) userAnswers.push (активный инпут dataset.correct)
 * 		2) fillData(initialData[box.dataset.id])
 * 		3) заблокировать кнопку
 * 	иначе выводим итог в surveyResult, проходя по массиву ответов даем кол-во true
 * */