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
  appearTasks(allTasks);
};
const listTasks = task => {
  const newTask = {
    id: Date.now(),
    task,
    task: task,
    completed: false
  };
  saveTask(newTask);
};
//Array original
// Si clico la X, me dará un id que coincidirá con el id de la tarea. Si estas ids no coinciden se meterán en un array nuevo que se volverá a pintar más tarde eliminado esta tarea.
//Por eso luego digo que allTasks es igual al nuevo array (newTasks).
const deleteTask = id => {
  const newTasks = [];
  for (const task of allTasks) {
    if (task.id !== id) {
      newTasks.push(task);
    }
  }
  allTasks = newTasks;
  appearTasks(allTasks);
  console.log(id);
  console.log(allTasks);
  return deleteTask;
};
const completeTask = id => {
  allTasks = allTasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
};
//allTasks = allTasks.filter(task => task.id !== id); Este proceso es más rápido que lo de arriba, usando filter me busca la condición que le pongo a continuación (Lo mismo explicado arriba).

// Array pero sin una tarea
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
  newInput.addEventListener('change', () => completeTask(task.id));
  tasksElement.append(newDiv);
  return newDiv;
};
const appearTasks = tasks => {
  taskElement.textContent = '';
  const fragment = document.createDocumentFragment();
  tasks.forEach(task => {
    const newTask = taskElement(task);
    fragment.append(newTask);
  });
  tasksElement.append(fragment);
};

const filterTasks = filter => {
  const completedTask = [];
  const uncompletedTask = [];
  for (const task of allTasks) {
    if (task.completed === true) {
      completedTask.push(task);
    } else {
      uncompletedTask.push(task);
    }
  }
  //Para separar las compl de las uncom
  if (filter === 'all') {
    appearTasks(allTasks);
    console.log('Todas las tareas');
  } else if (filter === 'uncompleted') {
    appearTasks(uncompletedTask);
    console.log('Solo las incompletas');
  } else if (filter === 'completed') {
    appearTasks(completedTask);
    console.log(completedTask);
    console.log('Solo las completas');
  }
};

//Cada vez que hago click, el completed cambia a true o false
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
