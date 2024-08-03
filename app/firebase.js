// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs, addDoc, query$napshot, query, onSnapshot } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeoG4kWrasmwHjJCm8wq7pLmO9Kf_1128",
  authDomain: "expense-tracker-3abae.firebaseapp.com",
  projectId: "expense-tracker-3abae",
  storageBucket: "expense-tracker-3abae.appspot.com",
  messagingSenderId: "189711932653",
  appId: "1:189711932653:web:93056e499f76d5fd29c0e4",
  measurementId: "G-VR0PB0YRWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);



