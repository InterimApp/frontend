import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSAF6BaCGy5jHnDR62orhLFGrWzOArScI",
  authDomain: "manpower-f9e5d.firebaseapp.com",
  projectId: "manpower-f9e5d",
  storageBucket: "manpower-f9e5d.firebasestorage.app",
  messagingSenderId: "320747857767",
  appId: "1:320747857767:web:b089afa0230162b648f1c2",
  measurementId: "G-9KE8F7TB3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, analytics };