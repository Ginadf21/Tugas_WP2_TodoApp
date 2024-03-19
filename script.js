const btnadd = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taksContainer = document.querySelector("#taks");
const error = document.getElementById("error");
const countTask = document.querySelector(".count-task");
let taskCount = 0;

const displayCount = (taskCount) => {
  countTask.innerText = taskCount;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = `<div class="task">
  <input type="checkBox" class="task-check">
  <span class="taskname">${taskName}</span>
  <button class="edit">
  Edit
  </button>
  <button class="delete">
  Delete
  </button>
  </div>`;

  taksContainer.insertAdjacentHTML("beforeend", task);

  const deletebtn = document.querySelectorAll(".delete");
  deletebtn.forEach((button) => {
    button.onclick = () => {
      button.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });

  const editbtn = document.querySelectorAll(".edit");
  editbtn.forEach((btn) => {
    btn.onclick = (e) => {
      let targetElemet = e.target;
      if (!(e.target.className == "edit")) {
        targetElemet = e.target.parentElement;
      }
      newTaskInput.value = targetElemet.previousElementSibling?.innerText;
      targetElemet.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });

  const taskCheck = document.querySelectorAll(".task-check");
  taskCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      checkBox.nextElementSibling.classList.toggle("completed");
      if (checkBox.checked) {
        taskCount -= 1;
      } else {
        taskCount += 1;
      }
      displayCount(taskCount);
    };
  });
  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = "";
};

btnadd.addEventListener("click", addTask);

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
};
