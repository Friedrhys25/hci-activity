// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyBiOsxXc7MEkJYddUj79EpVDZ9zkJEaCyk",
  authDomain: "edutoolbox-13332.firebaseapp.com",
  projectId: "edutoolbox-13332",
  storageBucket: "edutoolbox-13332.firebasestorage.app",
  messagingSenderId: "769968485995",
  appId: "1:769968485995:web:579b3a68f138f62d70632e",
  databaseURL: "https://edutoolbox-13332-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
