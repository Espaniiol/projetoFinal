document.addEventListener('DOMContentLoaded', function() {
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const todoList = document.getElementById('todoList');
    const messageDiv = document.getElementById('message');

    function addTask() {
        const taskText = newTaskInput.value.trim();

        if (taskText === '') {
            displayMessage('Por favor, digite uma tarefa.', 'error');
            return;
        }

        clearMessage();

        const listItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.classList.add('task-text');
        listItem.appendChild(taskSpan);

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        actionsDiv.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        actionsDiv.appendChild(deleteBtn);

        listItem.appendChild(actionsDiv);
        todoList.appendChild(listItem);

        newTaskInput.value = '';

        taskSpan.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            if (listItem.classList.contains('completed')) {
                displayMessage('Tarefa marcada como concluída!', 'success');
            } else {
                displayMessage('Tarefa desmarcada.', 'info');
            }
        });

        completeBtn.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            if (listItem.classList.contains('completed')) {
                displayMessage('Tarefa marcada como concluída!', 'success');
            } else {
                displayMessage('Tarefa desmarcada.', 'info');
            }
        });

        deleteBtn.addEventListener('click', function() {
            todoList.removeChild(listItem);
            displayMessage('Tarefa removida com sucesso!', 'info');
        });
    }

    addTaskBtn.addEventListener('click', addTask);

    newTaskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function displayMessage(msg, type = 'info') {
        messageDiv.textContent = msg;
        messageDiv.className = 'message ' + type;
        setTimeout(() => {
            clearMessage();
        }, 3000);
    }

    function clearMessage() {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }
});