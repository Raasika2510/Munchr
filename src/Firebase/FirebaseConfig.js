




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3GOEBFkknSJ_-KrTKTygwQf87vsctxoc",
  authDomain: "munchr-6100e.firebaseapp.com",
  projectId: "munchr-6100e",
  storageBucket: "munchr-6100e.appspot.com", // Fix typo in storageBucket
  messagingSenderId: "675916206139",
  appId: "1:675916206139:web:efe1a97f8268de7b4dcc1e",
  measurementId: "G-QEQ50MG1VW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { app, auth, db };
