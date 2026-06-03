import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";

// if already logged in → go dashboard
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "/dashboard.html";
  }
});
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

const email = document.getElementById("email");
const password = document.getElementById("password");
const status = document.getElementById("status");

document.getElementById("signupBtn").addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    status.textContent = "Account created successfully!";
  } catch (err) {
    status.textContent = err.message;
  }
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    status.textContent = "Login successful!";
  } catch (err) {
    status.textContent = err.message;
  }
});