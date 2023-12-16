// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcWHA0G_Xs6L-tmUyPtoEdPojzX61LA5E",
  authDomain: "todoapp-977fb.firebaseapp.com",
  projectId: "todoapp-977fb",
  storageBucket: "todoapp-977fb.appspot.com",
  messagingSenderId: "281864682046",
  appId: "1:281864682046:web:209cfb98985e64a7686f6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// const user = auth.currentUser;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    var displayName = document.querySelector("h1");

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    const todoArr = doc(db, "toDo", user.uid);
    var todoDoc = await getDoc(todoArr);

    // console.log("Document data:", docSnap.data());
    displayName.textContent += docSnap.data().username;
  } else {
    window.location.href = "index.html";
  }

  const todoItem = document.getElementById("todo-item");

  // Display the welcome message with the username
  // document.getElementById("welcome").textContent += user.username;

  //Add ToDo
  var addTodo = document.getElementById("addTodo");

  addTodo.addEventListener("click", async (event) => {
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
        userId: user.uid,
        toDo: toDo.value,
        addedOn: Timestamp.fromDate(new Date()),
      };
      await setDoc(doc(db, "toDo"), toDoItem);
      toDo.value = "";
    }
    setTimeout(function () {
      location.reload();
    }, 1000);
  });

  displayTodo();

  async function displayTodo() {
    var todoList = [];
    todoList.push(todoDoc.data());
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
          deleteToDo();
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

  function deleteToDo() {
    // const indexToDelete = toDoData.findIndex((item) => item === itemToDelete);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your todo has been deleted.", "success");
        await deleteDoc(doc(db, "toDo", user.uid));
        setTimeout(function () {
          location.reload();
        }, 1000);
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your todos has been deleted.", "success");
        await deleteDoc(doc(db, "toDo", user.uid));
        setTimeout(function () {
          location.reload();
        }, 1000);
      }
    });
  }
});

const logout = document.getElementById("log-out");
logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
