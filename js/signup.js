const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const pass = document.getElementById("password").value;
var myAlert = document.querySelector(".text-danger");
function signUp() {
  //   console.log("testing");

  //validate
  if (!username) {
    myAlert.innerHTML = "Username feild name can't be empty";
    myAlert.style.display = "block";
    username.style.borderColor = "#ff000d";
  } else if (!email) {
    myAlert.innerHTML = "Email feild name can't be empty";
    myAlert.style.display = "block";
  } else if (!email.includes("@")) {
    myAlert.innerHTML = "Email should have an @";
    myAlert.style.display = "block";
  } else if (!pass) {
    myAlert.innerHTML = "Password feild name can't be empty";
    myAlert.style.display = "block";
  } else if (pass !== cPass) {
    myAlert.innerHTML = "Password not matched";
    myAlert.style.display = "block";
  } else {
    myAlert.innerHTML = "Success";
    myAlert.style.display = "block";
    username = "";
    email = "";
    pass = "";
    cPass = "";
  }
}

const change = document.getElementById("change");
const showSingUp = document.getElementById("singUp-container");

change.addEventListener("click", () => {
  showSingUp.style.display = "none";
});
