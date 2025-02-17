const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a new task
addTaskButton.addEventListener("click", () => {
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    const taskId = new Date().getTime(); // Unique ID for each task
    addTaskToDOM(task, taskId);
    saveTaskToLocalStorage(task, taskId);

    taskInput.value = "";
});

function addTaskToDOM(task, id) {
    const li = document.createElement("li");
    li.setAttribute("data-id", id);

    const span = document.createElement("span");
    span.textContent = task;
    span.addEventListener("click", () =>
        toggleTaskCompletion(span)
    );

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener("click", () => removeTask(id));

    li.appendChild(span);
    li.appendChild(removeButton);
    taskList.appendChild(li);
}

function toggleTaskCompletion(span) {
    span.classList.toggle("completed");
}

function removeTask(id) {
    const taskItem = document.querySelector(`li[data-id='${id}']`);
    if (taskItem) {
        taskItem.remove();
    }
    removeTaskFromLocalStorage(id);
}

function saveTaskToLocalStorage(task, id) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ id, task });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskObj) =>
        addTaskToDOM(taskObj.task, taskObj.id)
    );
}

function removeTaskFromLocalStorage(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((taskObj) => taskObj.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}