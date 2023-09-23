const userData = JSON.parse(localStorage.getItem("userData")) || [];
const toDoData = JSON.parse(localStorage.getItem("toDoData")) || [];
const currentUser = localStorage.getItem("currentUser");
const todoItem = document.getElementById("todo-item");
const user = JSON.parse(currentUser);

if (!currentUser) {
  window.location.href = "index.html";
}

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
      addedOn: Date(Date.now()).toString(),
    };

    toDoData.push(toDoItem);
    localStorage.setItem("toDoData", JSON.stringify(toDoData));
    toDo.value = "";
  }
  displayTodo();
}

displayTodo();

function displayTodo() {
  var todoList = toDoData.filter((data) => data.userId === user.userId);
  todoItem.textContent = "";

  if (todoList.length > 0) {
    todoList.forEach((item) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("chekcbox");

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          li.classList.add("completed");
        } else {
          li.classList.remove("completed");
        }
      });

      todoItem.appendChild(checkbox);
      li.textContent = item.toDo;

      const span = document.createElement("span");
      let date = new Date(item.addedOn);
      span.classList.add("date");
      span.textContent = date.toLocaleString();

      const deleteImage = document.createElement("img");
      deleteImage.src = "img/delete.png";
      deleteImage.alt = "Delete";

      deleteImage.addEventListener("click", () => {
        deleteToDo(item);
      });

      li.appendChild(deleteImage);

      todoItem.appendChild(li);
      todoItem.appendChild(span);
    });
    if (todoItem) {
      const deleteAll = document.createElement("button");
      deleteAll.textContent = "Delete All";
      deleteAll.classList.add("btn-danger");
      todoItem.appendChild(deleteAll);
      deleteAll.addEventListener("click", () => {
        deleted();
      });
    }
  }
}

function deleteToDo(itemToDelete) {
  const indexToDelete = toDoData.findIndex((item) => item === itemToDelete);
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "No",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your todo has been deleted.", "success");
      if (indexToDelete !== -1) {
        toDoData.splice(indexToDelete, 1);

        localStorage.setItem("toDoData", JSON.stringify(toDoData));

        displayTodo();
      }
    }
  });
}

function deleted() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "No",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your todos has been deleted.", "success");
      var todoList = toDoData.filter((data) => data.userId !== user.userId);
      localStorage.setItem("toDoData", JSON.stringify(todoList));
      setTimeout(function () {
        location.reload()
    }, 1000);
    }
  });
}

function logOut() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
