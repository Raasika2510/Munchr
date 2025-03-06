// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3GOEBFkknSJ_-KrTKTygwQf87vsctxoc",
  authDomain: "munchr-6100e.firebaseapp.com",
  projectId: "munchr-6100e",
  storageBucket: "munchr-6100e.firebasestorage.app",
  messagingSenderId: "675916206139",
  appId: "1:675916206139:web:efe1a97f8268de7b4dcc1e",
  measurementId: "G-QEQ50MG1VW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Fix: Get authentication instance

export { app, auth };