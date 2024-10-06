document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-task-form');
    const taskList = document.getElementById('tasks');
    const sortSelect = document.getElementById('sort-tasks');
    
    let tasks = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const taskDescription = document.getElementById('new-task-description').value;
        const taskPriority = document.getElementById('task-priority').value;
        const taskDueDate = document.getElementById('task-due-date').value;
        
        if (taskDescription.trim() !== '') {
            addTask(taskDescription, taskPriority, taskDueDate);
            form.reset();
        }
    });

    function addTask(description, priority, dueDate) {
        const task = { description, priority, dueDate };
        tasks.push(task);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span style="color: ${getPriorityColor(task.priority)}">
                    ${task.description} (Priority: ${task.priority}, Due: ${task.dueDate})
                </span>
                <div class="task-buttons">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            
            taskItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
            taskItem.querySelector('.edit-btn').addEventListener('click', () => editTask(index));
            
            taskList.appendChild(taskItem);
        });
    }

    function getPriorityColor(priority) {
        switch (priority) {
            case 'high': return 'red';
            case 'medium': return 'orange';
            case 'low': return 'green';
            default: return 'black';
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function editTask(index) {
        const task = tasks[index];
        const newDescription = prompt('Edit task description:', task.description);
        if (newDescription !== null) {
            task.description = newDescription;
            renderTasks();
        }
    }

    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;
        if (sortBy === 'priority-asc') {
            tasks.sort((a, b) => getPriorityValue(a.priority) - getPriorityValue(b.priority));
        } else if (sortBy === 'priority-desc') {
            tasks.sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
        }
        renderTasks();
    });

    function getPriorityValue(priority) {
        switch (priority) {
            case 'high': return 3;
            case 'medium': return 2;
            case 'low': return 1;
            default: return 0;
        }
    }
});