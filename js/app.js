import {
  auth,
  doc,
  db,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setDoc,
} from "./firebase.js";

const provider = new GoogleAuthProvider();

var googelSignIn = document.getElementById("google-singIn");

googelSignIn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

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

var signup = document.getElementById("signup");

signup.addEventListener("click", (event) => {
  event.preventDefault();

  var username = document.getElementById("username");
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  // Hide all error messages
  var errorMessages = document.querySelectorAll(".text-danger");
  errorMessages.forEach(function (error) {
    error.style.display = "none";
  });

  username.style.borderColor = "#000";
  email.style.borderColor = "#000";
  password.style.borderColor = "#000";

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
  if (!password.value) {
    var registerPasswordError = document.getElementById(
      pass.getAttribute("data-error")
    );
    registerPasswordError.style.display = "block";
    registerPasswordError.textContent = "Please enter a password";
    pass.style.borderColor = "#ff0000";
  }

  //sign up
  if (username.value && email.value && password.value) {
    var userName = document.getElementById("username").value;
    var uEamil = document.getElementById("email").value;
    var userPassword = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, uEamil, userPassword)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        // Add a new document in collection "cities"
        await setDoc(doc(db, "users", user.uid), {
          username: userName,
          email: uEamil,
        });
        alert("User Created");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });

    // Redirect to dashboard with the username
    // window.location.href = "dashboard.html";
  }
});

var login = document.getElementById("login");

login.addEventListener("click", (event) => {
  event.preventDefault();

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
    var email = document.getElementById("useremail").value;
    var password = document.getElementById("user-password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }
});
