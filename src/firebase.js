// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tumhara Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC73afo-i25Ag-61rB5jgCQxygO0LpIXc",
  authDomain: "hirehunar-82b04.firebaseapp.com",
  projectId: "hirehunar-82b04",
  storageBucket: "hirehunar-82b04.appspot.com",
  messagingSenderId: "119978623429",
  appId: "1:119978623429:web:a96b9186b5e0aad7bc8bac",
  measurementId: "G-N9YLFD6W5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database export kar do
export const db = getFirestore(app);
