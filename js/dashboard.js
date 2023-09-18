let userData = JSON.parse(localStorage.getItem("userData")) || [];
const toDoData = JSON.parse(localStorage.getItem("toDoData")) || [];
let currentUser = localStorage.getItem("currentUser");
const todoItem = document.getElementById("todo-item");
user = JSON.parse(currentUser);

// Display the welcome message with the username
document.getElementById("welcome").textContent += user.username;

function addToDo(event) {
  event.preventDefault();
  var toDo = document.getElementById("todo");

  // Hide all error messages
  var errorMessages = document.querySelectorAll(".text-danger");
  errorMessages.forEach(function (error) {
    error.style.display = "none";
  });

  toDo.style.borderColor = "#000";

  // Validate toDo
  if (!toDo.value) {
    var toDoError = document.getElementById(toDo.getAttribute("data-error"));
    toDoError.style.display = "block";
    toDoError.textContent = "Please type a ToDo";
    toDo.style.borderColor = "#ff0000";
  } else {
    let userId = user.userId;
    const toDoItem = {
      userId: userId,
      toDo: toDo.value,
    };

    toDoData.push(toDoItem);
    localStorage.setItem("toDoData", JSON.stringify(toDoData));
    toDo.value = "";
  }
  displayTodo();
}

function displayTodo() {
  var todoList = toDoData.filter((data) => data.userId === user.userId);
  
  if (todoList) {
    console.log(todoList);
    todoItem.textContent += `<li>
                              ${JSON.parse(todoList)}
                              <img src="img/delete.png" alt="image" />
                            </li>`;
  }
}
