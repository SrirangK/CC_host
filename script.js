let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const filter = document.getElementById("filter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  taskList.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "completed" && !task.completed) return false;
      if (filter === "incomplete" && task.completed) return false;
      if (!task.text.toLowerCase().includes(search)) return false;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      const span = document.createElement("span");
      span.textContent = task.text;
      span.onclick = () => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
      };

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "actions";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        const newText = prompt("Edit task:", task.text);
        if (newText !== null && newText.trim() !== "") {
          tasks[index].text = newText.trim();
          renderTasks();
        }
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => {
        tasks.splice(index, 1);
        renderTasks();
      };

      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(actionsDiv);

      taskList.appendChild(li);
    });
}

function filterTasks() {
  renderTasks();
}
