// Selecting necessary elements
const containerElement = document.querySelector(".container");
const taskInputElement = document.querySelector("#input");
const addTaskButtonElement = document.querySelector("#Add-Task");
const todoCardElement = document.querySelector(".todo-card");
const headerEmojisElement = document.querySelector(".imogies");
const taskCountElement = document.querySelector(".all-tasks-count");
const completedTaskCountElement = document.querySelector(".completed-tasks-count");
const remainingTaskCountElement = document.querySelector(".remaining-tasks-count");
const dateDisplayElement = document.querySelector("#date_show");
const historyButtonElement = document.querySelector('.history');

// Array to store task times
const taskTimesArray = [];

// Instantiate emojiModal and dateTimeModal
const emojiModalInstance = new emojiModal();
const dateTimeModalInstance = new dateTimeModal();

// Creating the Time Now function to get today's time
Date.prototype.timeNow = function () {
  return `${this.getHours().toString().padStart(2, '0')}:${this.getMinutes().toString().padStart(2, '0')}`;
};

// Emojis animation setup
let emojis = "🤬😊😔🤯😎";
let emojiIndex = 0;
let typewriterSpeed = 500;

function typewriter() {
  if (emojiIndex < emojis.length) {
    headerEmojisElement.innerText += emojis.charAt(emojiIndex);
    emojiIndex++;
    setTimeout(typewriter, typewriterSpeed);
  }
}

// Creating the todo list container
const todoListContainerElement = document.createElement("div");
todoListContainerElement.classList.add("todo-list-container");
todoCardElement.appendChild(todoListContainerElement);

// Initialize task counters
let totalTaskCount = 0;
let completedTaskCount = 0;
let remainingTaskCount = 0;

taskCountElement.textContent = totalTaskCount;
completedTaskCountElement.textContent = completedTaskCount;
remainingTaskCountElement.textContent = remainingTaskCount;

// Function to create list cards for tasks
function createTaskCard(taskTime) {
  const taskCardElement = document.createElement("div");
  taskCardElement.classList.add("list-cards");
  taskCardElement.dataset.time = taskTime;

  const checkBoxElement = document.createElement("h2");
  checkBoxElement.classList.add("uncheckeimage");

  const taskDescriptionElement = document.createElement("p");

  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.textContent = "Delete";
  deleteButtonElement.classList.add("delete");

  setInputValues(taskCardElement, checkBoxElement, taskDescriptionElement, deleteButtonElement);

  // Delete button functionality
  deleteButtonElement.addEventListener("click", () => {
    todoListContainerElement.removeChild(taskCardElement);
    totalTaskCount--;
    
    if (taskDescriptionElement.classList.contains("checked")) {
      completedTaskCount--;
      completedTaskCountElement.textContent = completedTaskCount;
    } else {
      remainingTaskCount--;
      remainingTaskCountElement.textContent = remainingTaskCount;
    }
    taskCountElement.textContent = totalTaskCount;
  });

  // Check box functionality to mark task as complete
  checkBoxElement.addEventListener("click", () => {
    completedTaskCount++;
    checkBoxElement.classList.toggle("uncheckeimage");
    checkBoxElement.classList.toggle("chekedimage");
    taskDescriptionElement.classList.toggle("checked");
    remainingTaskCount--;
    completedTaskCountElement.textContent = completedTaskCount;
    remainingTaskCountElement.textContent = remainingTaskCount;

    let currentTime = new Date().timeNow();
   
    if (totalTaskCount === completedTaskCount) {
      setTimeout(reloadPage, 6000);
    }

    setTimeout(() => {
      emojiModalInstance
        .open()
        .then(value => {
          const emojiCollectionElement = document.createElement("div");
          emojiCollectionElement.classList.add("emoji-collection");
          taskCardElement.appendChild(emojiCollectionElement);

          const emojiElement = document.createElement("p");
          emojiElement.textContent = value;
          
          emojiCollectionElement.appendChild(emojiElement);
        })
        .catch(alert);
    }, 600);
  });

  // Double click to edit task
  taskCardElement.addEventListener("dblclick", () => {
    const overlayElement = document.createElement("div");
    overlayElement.classList.add("edit-modal");

    setTimeout(() => {
      overlayElement.classList.toggle("open");
    }, 800);

    const editCardElement = document.createElement("div");
    editCardElement.classList.add("card");

    const editInputElement = document.createElement("input");
    editInputElement.classList.add("edit-input");

    const confirmButtonElement = document.createElement("button");
    confirmButtonElement.classList.add("confirm-task");

    containerElement.appendChild(overlayElement);
    overlayElement.appendChild(editCardElement);
    editCardElement.appendChild(editInputElement);
    editCardElement.appendChild(confirmButtonElement);

    editInputElement.value = taskDescriptionElement.textContent;
    confirmButtonElement.textContent = "confirm";

    confirmButtonElement.addEventListener("click", () => {
      taskDescriptionElement.textContent = editInputElement.value;
      setTimeout(() => {
        containerElement.removeChild(overlayElement);
      }, 800);
    });
  });
}

// Function to set input values to task
function setInputValues(taskCardElement, checkBoxElement, taskDescriptionElement, deleteButtonElement) {
  if (taskInputElement.value === "") {
    alert("Enter the task");
  } else {
    taskDescriptionElement.textContent = taskInputElement.value.trim();
    taskInputElement.value = "";
    totalTaskCount++;
    remainingTaskCount++;
    todoListContainerElement.appendChild(taskCardElement);
    taskCardElement.appendChild(checkBoxElement);
    taskCardElement.appendChild(taskDescriptionElement);
    taskCardElement.appendChild(deleteButtonElement);
    taskCountElement.textContent = totalTaskCount;
    remainingTaskCountElement.textContent = remainingTaskCount;
  }
}

// Function to reload the page and clear data only when all tasks are completed
function reloadPage() {
  if (totalTaskCount === completedTaskCount) {
    // Clear data
    todoListContainerElement.innerHTML = "";
    taskCountElement.textContent = 0;
    completedTaskCountElement.textContent = 0;
    remainingTaskCountElement.textContent = 0;

    // Reload the page
    window.location.reload();
  }
}

// Add task button functionality
addTaskButtonElement.addEventListener("click", () => {
  dateTimeModalInstance
    .openTime()
    .then(taskTime => {
      createTaskCard(taskTime);
    })
    .catch(console.log);
});

// Document loaded functionality
document.addEventListener("DOMContentLoaded", () => {
  dateTimeModalInstance
    .openDate()
    .then(value => {
      dateDisplayElement.innerText = value;
      typewriter();
    })
    .catch(typewriter);

  // Function to check for tasks matching the current time and push notifications
  function checkTaskTime() {
    const currentTime = new Date().timeNow(); // Get the current time
    const taskCards = document.querySelectorAll(".list-cards");

    taskCards.forEach(taskCard => {
      const taskTime = taskCard.dataset.time; // Get the task time
      if (taskTime === currentTime) {
        pushNotification(taskCard.querySelector("p").textContent); // Push notification with task name
      }
    });

    // Reload the page if necessary
    if (totalTaskCount !== 0 && totalTaskCount === completedTaskCount) {
      reloadPage();
    }
  }

  // Function to push notification
  function pushNotification(taskName) {
    Notification.requestPermission().then(result => {
      if (result === 'granted') { // Check if permission is granted
        new Notification('Mood To Do', {
          body: taskName
        });
      }
    });
  }

  // Set up a timer to periodically check for tasks matching the current time
  setInterval(checkTaskTime, 20000); // Check every 20 seconds

  // Add an event listener to the window to prevent default behavior when reloading manually
  window.addEventListener("beforeunload", event => {
    if (totalTaskCount !== completedTaskCount) {
      event.preventDefault(); // Prevent default behavior of clearing data
      event.returnValue = ''; // Required for some browsers
    }
  });
});
