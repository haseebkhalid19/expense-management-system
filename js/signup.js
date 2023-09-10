let userData = [];

const change = document.getElementById("change");
const changeS = document.getElementById("change-s");
const showSingIn = document.getElementById("signIn-container");
const showSingUp = document.getElementById("singUp-container");

change.addEventListener("click", () => {
  showSingIn.classList.toggle("d-none");
  showSingUp.classList.toggle("d-none");
});

changeS.addEventListener("click", () => {
  showSingIn.classList.toggle("d-none");
  showSingUp.classList.toggle("d-none");
});

function signUp() {
  var username = document.getElementById("username");
  var email = document.getElementById("email");
  var pass = document.getElementById("password");

  // Hide all error messages
  var errorMessages = document.querySelectorAll(".text-danger");
  errorMessages.forEach(function (error) {
    error.style.display = "none";
  });

  username.style.borderColor = "#000";
  email.style.borderColor = "#000";
  pass.style.borderColor = "#000";

  // Validate username
  if (!username.value) {
    var registerUsernameError = document.getElementById(
      username.getAttribute("data-error")
    );
    registerUsernameError.style.display = "block";
    registerUsernameError.textContent = "Please enter a username";
    username.style.borderColor = "#ff0000";
  }

  // Validate email
  if (!email.value) {
    var registerEmailError = document.getElementById(
      email.getAttribute("data-error")
    );
    registerEmailError.style.display = "block";
    registerEmailError.textContent = "Please enter an email";
    email.style.borderColor = "#ff0000";
  } else if (!email.value.includes("@")) {
    var registerEmailError = document.getElementById(
      email.getAttribute("data-error")
    );
    registerEmailError.style.display = "block";
    registerEmailError.textContent = "Please include an @ in the email";
    email.style.borderColor = "#ff0000";
  }

  // Validate password
  if (!pass.value) {
    var registerPasswordError = document.getElementById(
      pass.getAttribute("data-error")
    );
    registerPasswordError.style.display = "block";
    registerPasswordError.textContent = "Please enter a password";
    pass.style.borderColor = "#ff0000";
  }
  if (username.value && email.value && pass.value) {
    const newUser = {
      username: username.value,
      email: email.value,
      password: pass.value,
    };

    userData.push(newUser);
    localStorage.setItem("userData", JSON.stringify(userData));

    username.value = "";
    email.value = "";
    pass.value = "";

    window.location.href = "dashboard.html";
  }
}

function signIn() {
  var userEmail = document.getElementById("useremail");
  var uPass = document.getElementById("user-password");

  // Hide all error messages
  var errorMessages = document.querySelectorAll(".text-danger");
  errorMessages.forEach(function (error) {
    error.style.display = "none";
  });

  userEmail.style.borderColor = "#000";
  uPass.style.borderColor = "#000";

  // Validate email
  if (!userEmail.value) {
    var emailError = document.getElementById(
      userEmail.getAttribute("data-error")
    );
    emailError.style.display = "block";
    emailError.textContent = "Please type your email";
    userEmail.style.borderColor = "#ff0000";
  } else if (!userEmail.value.includes("@")) {
    var emailError = document.getElementById(
      userEmail.getAttribute("data-error")
    );
    emailError.style.display = "block";
    emailError.textContent = "Please include an @ in the email";
    userEmail.style.borderColor = "#ff0000";
  }

  // Validate password
  if (!uPass.value) {
    var passwordError = document.getElementById(
      uPass.getAttribute("data-error")
    );
    passwordError.style.display = "block";
    passwordError.textContent = "Please enter your password";
    uPass.style.borderColor = "#ff0000";
  }
  if (userEmail.value && uPass.value && userEmail.value.includes("@")) {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userEmail = document.getElementById("useremail").value; // Get the email input value
      const uPass = document.getElementById("user-password").value; // Get the password input value

      // Check if the email and password match a user in the userData array
      const foundUser = userData.find(
        (user) => user.email === userEmail && user.password === uPass
      );

      if (foundUser) {
        // User with matching email and password found, you can now access foundUser
        console.log("User found:", foundUser);
        window.location.href = "dashboard.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "Wrong Credentials",
          showConfirmButton: true,
        });
      }
    }
  }
}
