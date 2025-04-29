// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCcfHY_ujeGffmXwGaPU8_58-nq57glhac",
    authDomain: "e-commerce-login-5b9b7.firebaseapp.com",
    projectId: "e-commerce-login-5b9b7",
    storageBucket: "e-commerce-login-5b9b7.firebasestorage.app",
    messagingSenderId: "134168112405",
    appId: "1:134168112405:web:c12eeab0d31faf9eff0d1c"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};