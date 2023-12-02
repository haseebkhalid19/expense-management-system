// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
const database = getDatabase(app);
const auth = getAuth();