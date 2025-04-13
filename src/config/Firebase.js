import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGHMSrQ-SgXaPrfgN7mcbjRo6TbRiNF90",
  authDomain: "interim-f57fc.firebaseapp.com",
  projectId: "interim-f57fc",
  storageBucket: "interim-f57fc.appspot.com",
  messagingSenderId: "917112334782",
  appId: "1:917112334782:web:038f54ec6040c9bbd531ef",
  measurementId: "G-9KE8F7TB3Y"

};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, analytics };