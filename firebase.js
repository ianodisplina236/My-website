
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6QM2IiBXv5qsf-Xg-VUo2C76BME_ab0w",
  authDomain: "mindlift-13deb.firebaseapp.com",
  projectId: "mindlift-13deb",
  storageBucket: "mindlift-13deb.firebasestorage.app",
  messagingSenderId: "1012487995390",
  appId: "1:1012487995390:web:3d7da79d13a8435e524aaf",
  measurementId: "G-JZQRLWQ1HX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);