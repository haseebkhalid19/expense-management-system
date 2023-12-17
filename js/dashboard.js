import {
  auth,
  serverTimestamp,
  deleteDoc,
  deleteField,
  query,
  where,
  orderBy,
  onAuthStateChanged,
  doc,
  getDoc,
  db,
  setDoc,
  signOut,
  addDoc,
  collection,
  getDocs,
} from "./firebase.js";

// const user = auth.currentUser;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    var displayName = document.querySelector("h1");

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    const todoArr = doc(db, "toDo", user.uid);
    var todoDoc = await getDoc(todoArr);
    // console.log(todoDoc.data());

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
      const toDoItem = {
        userId: user.uid,
        toDo: toDo.value,
        addedOn: serverTimestamp(),
      };
      await addDoc(collection(db, "toDo"), toDoItem);
      toDo.value = "";
    }
    setTimeout(function () {
      location.reload();
    }, 1000);
  });

  displayTodo();

  async function displayTodo() {
    // var todoList = [];
    // todoList.push(todoDoc.data());
    // console.log(todoList)

    todoItem.textContent = "";

    const q = query(collection(db, "toDo"), where("userId", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data().toDo);

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
      li.textContent = doc.data().toDo;

      const span = document.createElement("span");
      let date = new Date(doc.data().addedOn);
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

      if (todoItem) {
        const deleteAll = document.createElement("button");
        deleteAll.textContent = "Delete All";
        deleteAll.classList.add("btn-danger");
        todoItem.appendChild(deleteAll);
        deleteAll.addEventListener("click", () => {
          deleted();
        });
      }
    });
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
