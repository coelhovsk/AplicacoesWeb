document.getElementById('addTaskBtn').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const newTask = document.createElement('li');
        newTask.className = 'list-group-item d-flex justify-content-between align-items-center';

        newTask.innerHTML = `
                    ${taskText}
                    <button class="btn btn-sm btn-danger">Remover</button>
                `;

        taskList.appendChild(newTask);
        taskInput.value = '';

        newTask.querySelector('button').addEventListener('click', function () {
            newTask.remove();
        });
    }
});

document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('addTaskBtn').click();
    }
});