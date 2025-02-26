// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGHMSrQ-SgXaPrfgN7mcbjRo6TbRiNF90",
  authDomain: "interim-f57fc.firebaseapp.com",
  projectId: "interim-f57fc",
  storageBucket: "interim-f57fc.firebasestorage.app",
  messagingSenderId: "917112334782",
  appId: "1:917112334782:web:038f54ec6040c9bbd531ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { auth, db, app,storage}