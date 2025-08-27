// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7d5Ma_X9hr9Bvf_vztnpD7NZ5zBrzUGY",
  authDomain: "biochallenge-database.firebaseapp.com",
  projectId: "biochallenge-database",
  storageBucket: "biochallenge-database.firebasestorage.app",
  messagingSenderId: "303945570078",
  appId: "1:303945570078:web:5fa350f7a7bf0545141b0f",
  measurementId: "G-ZB2XTM0QYE"
};

// evita inicializar duas vezes em hot-reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase
export const firebaseApp = app;
export default app;
