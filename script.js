import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyC6QM2IiBXv5qsf-Xg-VUo2C76BME_ab0w",
  authDomain: "mindlift-13deb.firebaseapp.com",
  projectId: "mindlift-13deb",
  storageBucket: "mindlift-13deb.firebasestorage.app",
  messagingSenderId: "1012487995390",
  appId: "1:1012487995390:web:3d7da79d13a8435e524aaf",
  measurementId: "G-JZQRLWQ1HX"
};
const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
/* =========================
   MindLift - App Logic
========================= */

/* ---------- Dark Mode ---------- */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );
}

(function initDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }
})();

/* ---------- Mood System ---------- */

const affirmations = {
    happy: [
        "You are doing amazing. Keep going.",
        "Your joy is valid and powerful."
    ],
    neutral: [
        "Not every day has to be perfect.",
        "You are allowed to simply exist today."
    ],
    sad: [
        "This feeling will pass. You are not alone.",
        "Be gentle with yourself right now."
    ],
    angry: [
        "Pause. Breathe. You are in control.",
        "Your emotions are valid, but temporary."
    ],
    anxious: [
        "Breathe. You are safe in this moment.",
        "Let go of what you cannot control."
    ]
};

function saveMood(mood) {
    let data = JSON.parse(localStorage.getItem("moodData")) || [];

    data.push({
        mood,
        time: new Date().toLocaleString(),
        date: new Date().toDateString()
    });

    localStorage.setItem("moodData", JSON.stringify(data));

    document.getElementById("selectedMood").innerText =
        "Today's Mood: " + mood;

    showAffirmation(mood);

    updateAnalytics();
    updateStreak();
}

function showAffirmation(mood) {
    let type = "neutral";

    if (mood === "😊") type = "happy";
    if (mood === "😐") type = "neutral";
    if (mood === "😔") type = "sad";
    if (mood === "😡") type = "angry";
    if (mood === "😰") type = "anxious";

    const list = affirmations[type];
    const text = list[Math.floor(Math.random() * list.length)];

    document.getElementById("affirmationText").innerText = text;
}

/* ---------- Analytics ---------- */

function updateAnalytics() {
    let moods = JSON.parse(localStorage.getItem("moodData")) || [];

    document.getElementById("totalCheckins").innerText = moods.length;

    let counts = {};

    moods.forEach(m => {
        counts[m.mood] = (counts[m.mood] || 0) + 1;
    });

    let common = "-";
    let max = 0;

    for (let key in counts) {
        if (counts[key] > max) {
            max = counts[key];
            common = key;
        }
    }

    document.getElementById("commonMood").innerText = common;

    let history = document.getElementById("moodHistory");
    history.innerHTML = "";

    moods.slice(-10).reverse().forEach(m => {
        let p = document.createElement("p");
        p.innerText = `${m.time} - ${m.mood}`;
        history.appendChild(p);
    });
}

/* ---------- Streak System ---------- */

function updateStreak() {
    let today = new Date().toDateString();
    let lastVisit = localStorage.getItem("lastVisit");

    let streak = parseInt(localStorage.getItem("streak")) || 0;

    if (lastVisit !== today) {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastVisit === yesterday.toDateString()) {
            streak++;
        } else {
            streak = 1;
        }

        localStorage.setItem("streak", streak);
        localStorage.setItem("lastVisit", today);
    }

    document.getElementById("streakCount").innerText =
        streak + " Days";
}

/* ---------- Journal ---------- */

function saveJournal() {
    let entry = document.getElementById("journalEntry").value;
    if (!entry) return;

    let journals = JSON.parse(localStorage.getItem("journals")) || [];

    journals.push({
        text: entry,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("journals", JSON.stringify(journals));

    document.getElementById("journalEntry").value = "";

    loadJournals();
}

function loadJournals() {
    let journals = JSON.parse(localStorage.getItem("journals")) || [];

    let box = document.getElementById("journalList");
    box.innerHTML = "";

    journals.slice().reverse().forEach(j => {
        let div = document.createElement("div");
        div.className = "journal-card";

        div.innerHTML = `
            <small>${j.date}</small>
            <p>${j.text}</p>
        `;

        box.appendChild(div);
    });
}

/* ---------- Calm Mode ---------- */

function startBreathing() {
    const text = document.getElementById("breathingText");

    const steps = [
        "Breathe In (4)",
        "Hold (7)",
        "Breathe Out (8)"
    ];

    let i = 0;
    text.innerText = steps[i];

    let interval = setInterval(() => {
        i++;

        if (i >= steps.length) {
            clearInterval(interval);
            text.innerText = "Well done. You are calm.";
            return;
        }

        text.innerText = steps[i];
    }, 4000);
}

/* ---------- INIT ON LOAD ---------- */

(function initApp() {
    loadJournals();
    updateAnalytics();
    updateStreak();
})();