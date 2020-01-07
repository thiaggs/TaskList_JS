// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();
console.log('textow'.indexOf('text'));

function loadEventListeners(){
// DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
//Add task Event
    form.addEventListener('submit', addTask);
//Remove task event
    taskList.addEventListener('click', removeTask);
//Remove all task events
    clearBtn.addEventListener('click',removeAllTasks);
//Filter tasks
    filter.addEventListener('keyup', filterTasks);

};

function addTask(e){ 

    if(taskInput.value === ''){
        alert("Add a task");
    }else{

    //Create a li element
    const li = document.createElement('li');
    // Set a class
    li.className = 'collection-item';
    //Create a text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //add a class to link
    link.className = 'delete-item secondary-content';
    //add a icon to link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    
    //Apend li to ul

    taskList.append(li);

    // Save the taskInput in localStorage

    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';

    e.preventDefault();
    }
};	

function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Tem certeza?'))
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    };
    e.preventDefault();
};

function removeTaskFromLocalStorage(taskItem){  

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){

        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeAllTasks(e){

    if(confirm('Deseja limpar todas as tasks?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);

        }
        clearTasksFromLocalStorage();
        alert('The task list has been cleared');
    }
}

function clearTasksFromLocalStorage(){

    localStorage.clear();
    // let tasks;

    // if(localStorage.getItem('tasks') !== null){
    //     tasks = [];
    // }

    // localStorage.setItem('tasks', JSON.stringify(tasks));
}
function filterTasks(e){

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task){
        const item = task.firstChild.textContent;
       
        if(item.toLowerCase().indexOf(text) == -1){
            task.style.display = 'none';
        }else{
            task.style.display = 'block';
        }
    });

}

function storeTaskInLocalStorage(taskInput){

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{

        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(taskInput);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks(){

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task){

        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove">';

        li.appendChild(link);

        taskList.appendChild(li);
    })
}