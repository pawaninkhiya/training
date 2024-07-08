import { v4 as uuidV4 } from 'uuid';

type TaskType = {
  id: string;
  title: string;
  isCompleted: boolean;
  createDate: Date;
};

const list = document.querySelector<HTMLUListElement>('#list');
let form = document.querySelector('#new-task-form') as HTMLFormElement | null;
let input = document.querySelector<HTMLInputElement>('#new-task-title');

let tasks: TaskType[] = loadTask();
tasks.forEach(addTask);
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input?.value == '' || input?.value == null) return;
  let newTask: TaskType = {
    id: uuidV4(),
    title: input.value,
    isCompleted: true,
    createDate: new Date(),
  };
  tasks.push(newTask);
  saveTask();
  addTask(newTask);
});

function addTask(task: TaskType) {
  let item = document.createElement('li');
  let label = document.createElement('label');
  let checkBox = document.createElement('input');
  checkBox.addEventListener('change', () => {
    task.isCompleted = checkBox.checked;
    saveTask();
  });
  checkBox.type = 'checkbox';
  checkBox.checked = task.isCompleted;
  item.append(checkBox, task.title);
  label.append(item);
  list?.append(label);
}

function saveTask() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTask(): TaskType[] {
  let tasksJson = localStorage.getItem('TASKS');
  if (tasksJson == null) return [];
  return JSON.parse(tasksJson);
}
// let tasks: TaskType[] = loadTask();
// tasks.forEach(addNewTask);
// form?.addEventListener('submit', (e) => {
//   e.preventDefault();
//   if (input?.value == '' || input?.value == null) return;
//   let newTask: TaskType = {
//     id: uuidV4(),
//     title: input.value,
//     isCompleted: true,
//     createDate: new Date(),
//   };

//   addNewTask(newTask);
//   input.value = '';
// });

// function addNewTask(task: TaskType) {
//   let li = document.createElement('li');
//   let checkBox = document.createElement('input');
//   checkBox.type = 'checkbox';
//   checkBox.addEventListener('change', () => {
//     task.isCompleted = checkBox.checked;
//     saveTask();
//   });
//   let label = document.createElement('label');

//   label.append(checkBox, task.title);
//   li?.append(label);
//   list?.append(li);
// }

// function saveTask() {
//   localStorage.setItem('Tasks', JSON.stringify(tasks));
// }

// function loadTask(): TaskType[] {
//   let taskJson = localStorage.getItem('Tasks');
//   if (taskJson == null) return [];
//   return JSON.parse(taskJson);
// }
// import confetti from 'canvas-confetti';

// confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
//   resize: true,
//   useWorker: true,
// })({ particleCount: 200, spread: 200 });

// console.log("hello");
