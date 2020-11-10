// define our ui variables
const form=document.querySelector('#task-form');
const taskInput=document.querySelector('#task');
const filter=document.querySelector('#filter');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-task');

function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded',getTasks);
  // add task
  form.addEventListener('submit',addTask);
  // remove task
  taskList.addEventListener('click',removeTask);
  // clear task
  clearBtn.addEventListener('click',clearTask);
  // filter task
  filter.addEventListener('keyup',filterTask);
}
loadEventListeners()

function addTask(e){
  if (taskInput.value === '') {
    alert('add a task')
  } else {
    // create li element
    const li = document.createElement('li');
    // add class
    li.className='collection-item';
    // create text node and append li
    li.appendChild(document.createTextNode(taskInput.value));
    // create icon element
    const icon=document.createElement('a');
    // add class
    icon.className='delete-item secondary-content';
    // add icon html
    icon.innerHTML='<i class="fa fa-remove"></i>';
    // append icon to li
    li.appendChild(icon);
    // append li to ul
    taskList.appendChild(li);
    // add into localStorage
    addTaskInLocalStorage(taskInput.value);
  }
  e.preventDefault();
}

function addTaskInLocalStorage(newTask){
  let tasks;
  if (localStorage.getItem('tasks')===null) {
    tasks=[];
  } else {
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(newTask);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks')===null) {
    tasks=[];
  } else {
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li');
    // add class
    li.className='collection-item';
    // create text node and append li
    li.appendChild(document.createTextNode(task));
    // create icon element
    const icon=document.createElement('a');
    // add class
    icon.className='delete-item secondary-content';
    // add icon html
    icon.innerHTML='<i class="fa fa-remove"></i>';
    // append icon to li
    li.appendChild(icon);
    // append li to ul
    taskList.appendChild(li);
  })
}

function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('are you sure?')){
      e.target.parentElement.parentElement.remove();
      // remove from localStorage
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  e.preventDefault();
}

function removeFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks')===null) {
    tasks=[];
  } else {
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index){
    if(taskItem.textContent===task){
      tasks.splice(index,1);
    }
  })
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTask(){
  // taskList.innerHTML='';
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  // clear from localStorage
  clearFromLocalStorage();
}

function clearFromLocalStorage(){
  localStorage.clear();
}

function filterTask(e){
  const text=e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item=task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text)!=-1) {
      task.style.display='block';
    } else {
      task.style.display='none';
    }
  })
}