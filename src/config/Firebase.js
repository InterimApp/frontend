<<<<<<< HEAD
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Add this line

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSAF6BaCGy5jHnDR62orhLFGrWzOArScI",
  authDomain: "manpower-f9e5d.firebaseapp.com",
  projectId: "manpower-f9e5d",
  storageBucket: "manpower-f9e5d.firebasestorage.app",
  messagingSenderId: "320747857767",
  appId: "1:320747857767:web:b089afa0230162b648f1c2",
  measurementId: "G-9KE8F7TB3Y",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export Firestore instanceimport React, { useState, useEffect } from 'react';
=======
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
>>>>>>> origin/iheb
