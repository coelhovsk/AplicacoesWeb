document.addEventListener('DOMContentLoaded', function() { // local storage carrefado
    loadTasks();
});

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        addTaskToDOM(taskText);
        saveTasks();
        taskInput.value = '';
    }
}); 

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('addTaskBtn').click();
    }
});

function addTaskToDOM(taskText) {
    const taskList = document.getElementById('taskList');
    const newTask = document.createElement('li');
    newTask.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    newTask.innerHTML = `
        ${taskText}
        <button class="btn btn-sm btn-danger">Remover</button>
    `;
    
    taskList.appendChild(newTask);
    
    newTask.querySelector('button').addEventListener('click', function() {
        newTask.remove();
        saveTasks();
    });
}

// salvar
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(taskItem => {
        tasks.push(taskItem.textContent.trim().replace('Remover', ''));
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// carregar
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(taskText => {
            addTaskToDOM(taskText);
        });
    }
}