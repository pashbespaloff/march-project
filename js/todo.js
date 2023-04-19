const toDoForm = document.querySelector(".to-do-form"),
      toDoInput = document.querySelector(".to-do-input"),
      toDoList = document.querySelector(".to-do-list"),
      editPen = "fa-pen",
      done = "done",
      deleteTrash = "fa-trash";

toDoForm.addEventListener("submit", formHandler);
toDoList.addEventListener("click", listHandler);

function formHandler(e) {
  e.preventDefault();

  if (toDoInput.value && !toDoInput.dataset.editId) addToDo(toDoInput.value);
  else if (toDoInput.dataset.editId !== "") submitEdit(toDoInput.value);
};

function listHandler(e) {
  // e.preventDefault();
  if (e.target.classList.contains(editPen)) editToDo(e.target);
  if (e.target.classList.contains(done)) crossToDo(e.target);
  if (e.target.classList.contains(deleteTrash)) deleteToDo(e.target);
}

function addToDo(value) {
  const li = document.createElement("li");
        label = document.createElement("label");

  li.classList.add("to-do-item");

  label.textContent = value;
  label.setAttribute("for", value);
  li.append(label);

  li.dataset.id = Date.now();
  addIcons(li, li.dataset.id);

  toDoList.append(li);
  toDoInput.value = "";
};

function addIcons(li, id) {
  const checkbox = document.createElement("input"),
        editIcon = document.createElement("i"),
        deleteIcon = document.createElement("i");

  checkbox.type = "checkbox";
  checkbox.name = li.textContent;
  checkbox.id = id;

  checkbox.classList.add("done");
  editIcon.classList.add("fa-solid", "fa-pen");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  
  li.prepend(checkbox);
  li.append(editIcon);
  li.append(deleteIcon);
};

function editToDo(target) {
  const id = target.closest("LI").dataset.id,
        li = toDoList.querySelector(`[data-id="${id}"]`),
        label = li.querySelector("label");

  toDoInput.value = label.textContent;
  toDoInput.dataset.editId = id;
};

function submitEdit(value) {
  const id = toDoInput.dataset.editId,
        li = toDoList.querySelector(`[data-id="${id}"]`),
        label = li.querySelector("label");

  (value) ? label.textContent = value : li.remove();

  toDoInput.value = "";
  toDoInput.dataset.editId = "";
};

function crossToDo(target) {
  const id = target.closest("LI").dataset.id,
        li = toDoList.querySelector(`[data-id="${id}"]`),
        label = li.querySelector("label");
  
  (target.checked)
    ? label.classList.add("line-through")
    : label.classList.remove("line-through");
};

function deleteToDo(target) {
  const id = target.closest("LI").dataset.id,
        li = toDoList.querySelector(`[data-id="${id}"]`);
  
  li.remove();
};

/*
задача 1
сделать чекбокс, при отметке которого элемент будет вычеркнут
listHandler проверяет, что клик пришелся по чекбоксу, если checked — зачеркиваем

задача 2*
иконка «редактировать». нажимаем — текст элемента появляется в инпуте,
инпут получает какой-то особый статус (чтобы проверить перед сабмитом и соответственно
изменить поведение), всё хранить в html.
*/