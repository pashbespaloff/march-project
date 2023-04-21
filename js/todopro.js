const taskForm = document.querySelector(".to-do-form"),
      taskInput = document.querySelector(".to-do-input"),
      taskList = document.querySelector(".to-do-list"),
      taskItem = "to-do-item",
      editPen = "fa-pen",
      copyTask = "fa-paste",
      done = "done",
      deleteTrash = "fa-trash";

const tasksObj = [
  // {
  //   id: null, 
  //   task: null, 
  //   isDone: false
  // }
];

taskForm.addEventListener("submit", formHandler);
taskList.addEventListener("click", listHandler);

function formHandler(e) {
  e.preventDefault();

  if (taskInput.value && !taskInput.dataset.editId) createTask(taskInput.value);
  // else if (taskInput.dataset.editId !== "") submitEdit(taskInput.value);
};

function listHandler(e) {
  if (e.target.classList.contains(editPen)) 
    editTask(e.target.closest("LI").dataset.id);
  // if (e.target.classList.contains(copyTask)) copyTask(e.target);
  // if (e.target.classList.contains(done)) crossTask(e.target);
  // if (e.target.classList.contains(deleteTrash)) deleteTask(e.target);
};

function editTask(id) {
  console.log(id);
  console.log(tasksObj);
}

function createTask(value) {
  const task = new Object();

  task.id = Date.now();
  task.task = value;
  task.isDone = false;

  tasksObj.push(task);

  taskInput.value = "";

  tasksObjHandler(task.id, true, false, false);
};

function tasksObjHandler(currentTaskId, isNew, isEdit, isRemoving, targetTask) {
  // tasksObj.forEach(task => {

    // ! creating obj from current task list in html func
    // comparing taskobj with current task list obj

    if (isNew) addTask(currentTaskId);
    // if (isEdit) editTask(currentTaskId, targetTask);
    // if (isRemoving) removeTask(currentTaskId, targetTask);



    // if new id => addTask + renderList()
    // if old id && task changed => editTask + renderList()
    // if old id && isDone changed => isDoneToggle + renderList()
    // if old id && isRemover => deleteTask + renderList()
    // if old id && nothing changed => false


  // })
};

function addTask(currentTaskId) {
  const thisTask = tasksObj.find(({id}) => id === currentTaskId),
        taskText = thisTask.task,
        li = document.createElement("li"),
        label = document.createElement("label");

  li.classList.add(taskItem);

  label.textContent = taskText;
  label.setAttribute("for", taskText);
  li.append(label);

  li.dataset.id = currentTaskId;
  addIcons(li, currentTaskId);

  taskList.append(li);
};

function addIcons(li, id) {
  const checkbox = document.createElement("input"),
        editIcon = document.createElement("i"),
        copyIcon = document.createElement("i"),
        deleteIcon = document.createElement("i");

  checkbox.type = "checkbox";
  checkbox.name = li.textContent;
  checkbox.id = id;

  checkbox.classList.add("done");
  editIcon.classList.add("fa-solid", "fa-pen");
  copyIcon.classList.add("fa-solid", "fa-paste");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  
  li.prepend(checkbox);
  li.append(editIcon);
  li.append(copyIcon);
  li.append(deleteIcon);
};