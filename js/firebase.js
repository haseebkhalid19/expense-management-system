import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {
  getFirestore,
  where,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  setDoc,
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  where,
  signOut,
  deleteDoc,
  deleteField,  
  collection,
  serverTimestamp,
  getDocs,
  addDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  db,
  setDoc,
  doc,
  onAuthStateChanged,
  getDoc,
  query,
  orderBy,
};
