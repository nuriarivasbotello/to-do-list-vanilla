// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
const formElement = document.getElementById('form');
const tasksElement = document.getElementById('tasks');
const buttonsElement = document.getElementById('buttons');

let allTasks = [];

const listTasks = task => {
  const newTask = {
    id: Date.now(),
    task,
    completed: false
  };
  allTasks.push(newTask);
};
listTasks();
console.log(allTasks);
const deleteTask = () => {};
const taskElement = task => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('task');

  const newInput = document.createElement('input');
  newInput.type = 'checkbox';
  newDiv.append(newInput);

  const newText = document.createElement('p');
  newText.textContent = task;
  newDiv.append(newText);

  const newButton = document.createElement('button');
  newButton.textContent = 'X';
  newDiv.append(newButton);
  newButton.addEventListener('click', deleteTask);
  tasksElement.append(newDiv);
};
const appearTasks = tasks => {
  tasks.forEach(task => {
    const newTask = taskElement(task);
    fragment.append(newTask);
  });
  tasksElement.append(fragment);
};
formElement.addEventListener('submit', event => {
  event.preventDefault();
  taskElement(event.target.task.value);
});
