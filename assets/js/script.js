const taskInput = document.querySelector('.tasksForm__newTask');
const tasksField = document.querySelector('.tasks');
const taskList = [];

document.querySelector('.tasksForm').addEventListener('submit', (e) => e.preventDefault());
document.addEventListener('click', (e) => {
  el = e.target;
  if (el.classList.contains('sendButton')) {
    if (taskInput.value) {
      createTask(taskInput.value);
      saveTask();
      clearInput(taskInput);
    } else {
      window.alert('Fill in the field correctly!');
    }
  };
  if (el.classList.contains('deleteButton')) {
    deleteTask(el);
  }
});

function addSavedTasks() {
  const myTasksString = localStorage.getItem('myTasks');
  const myTasks = JSON.parse(myTasksString);
  for (let task of myTasks) {
    createTask(task);
  }
}
addSavedTasks();

function createTask(task) {
  const li = createLi(task);
  tasksField.appendChild(li);
};

function saveTask() {
  const liTasks = tasksField.querySelectorAll('li');
  const taskList = [];
  for (let task of liTasks) {
    taskList.push(task.innerText.replace('\nDelete', ''));
  };
  const myTasksJSON = JSON.stringify(taskList);
  localStorage.setItem('myTasks', myTasksJSON);
};

function createLi(task) {
  const el = document.createElement('li');
  const text = document.createTextNode(task);
  el.appendChild(text);
  el.appendChild(createDeleteButton());
  return el;
};

function deleteTask(btn) {
  btn.parentElement.remove();
  saveTask();
};

function createDeleteButton() {
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete'
  deleteButton.setAttribute('class', 'deleteButton');
  return deleteButton;
};

function clearInput(el) {
  el.value = '';
  el.focus();
};
