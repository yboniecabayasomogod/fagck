// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6N474bcNkthjiW1gXKft_x-qtS7ESKc8",
  authDomain: "fagck-a61e9.firebaseapp.com",
  projectId: "fagck-a61e9",
  storageBucket: "fagck-a61e9.firebasestorage.app",
  messagingSenderId: "86844924100",
  appId: "1:86844924100:web:eca49e0a0bd05419f16991"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);