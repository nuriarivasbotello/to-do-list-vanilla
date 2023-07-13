// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
const formElement = document.getElementById('form');
const tasksElement = document.getElementById('tasks');
const buttonsElement = document.getElementById('buttons');

let allTasks = [];

const deleteTask = () => {};

const listTasks = task => {
  const newTask = {
    id: Date.now(),
    task,

    completed: false
  };
  allTasks.push(newTask);
  appearTasks(allTasks);
};

const updateTask = id => {};
const taskElement = task => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('task');

  const newInput = document.createElement('input');
  newInput.type = 'checkbox';
  newDiv.append(newInput);

  const newText = document.createElement('p');
  newText.textContent = task.task;
  newDiv.append(newText);

  const newButton = document.createElement('button');
  newButton.textContent = 'X';
  newDiv.append(newButton);
  newButton.addEventListener('click', deleteTask);
  tasksElement.append(newDiv);
  return newDiv;
};
const appearTasks = tasks => {
  const fragment = document.createDocumentFragment();
  tasks.forEach(task => {
    const newTask = taskElement(task);
    fragment.append(newTask);
  });
  tasksElement.append(fragment);
};

formElement.addEventListener('submit', event => {
  event.preventDefault();
  listTasks(event.target.task.value);
  formElement.reset();
});
