// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
const formElement = document.getElementById('form');
const tasksElement = document.getElementById('tasks');
const filtersElement = document.getElementById('filter');
const filters = {
  all: 0,
  uncomplete: 1,
  complete: 2
};
let allTasks = [];

const saveTask = task => {
  allTasks.push(task);
};
const listTasks = task => {
  const newTask = {
    id: Date.now(),
    task,
    task: task,
    completed: false
  };
  saveTask(newTask);
  appearTasks(allTasks);
};
const deleteTask = id => {
  //Array original
  // Si clico la X, me dará un id que coincidirá con el id de la tarea. Si estas ids no coinciden se meterán en un array nuevo que se volverá a pintar más tarde eliminado esta tarea.
  //Por eso luego digo que allTasks es igual al nuevo array (newTasks).
  const newTasks = [];
  for (const task of allTasks) {
    if (task.id !== id) {
      newTasks.push(task);
    }
  }
  allTasks = newTasks;

  //allTasks = allTasks.filter(task => task.id !== id); Este proceso es más rápido que lo de arriba, usando filter me busca la condición que le pongo a continuación (Lo mismo explicado arriba).

  appearTasks(allTasks);
  console.log(id);
  console.log(allTasks);
  // Array pero sin una tarea
};
const taskElement = task => {
  tasksElement.textContent = '';
  const newDiv = document.createElement('div');
  newDiv.classList.add('task');

  const newInput = document.createElement('input');
  newInput.type = 'checkbox';
  newInput.checked = task.completed;
  newDiv.append(newInput);

  const newText = document.createElement('p');
  newText.textContent = task.task;
  newDiv.append(newText);

  const newButton = document.createElement('button');
  newButton.textContent = 'X';
  newDiv.append(newButton);

  newButton.addEventListener('click', () => deleteTask(task.id));
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
const filterTasks = filter => {
  for (const filter of allTasks) {
    if (checkbox === true) {
      console.log(filters);
    }
  }
};
formElement.addEventListener('submit', event => {
  event.preventDefault();
  if (event.target.task.value === '') return; //Para que no envies solo un tarea vacia
  listTasks(event.target.task.value);
  formElement.reset();
});
filtersElement.addEventListener('click', event => {
  if (event.target.tagName !== 'BUTTON') return;
  filterTasks(event.target.dataset.filter);
});
