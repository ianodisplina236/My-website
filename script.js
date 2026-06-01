const affirmations = [
    "You are stronger than you think.",
    "Progress is progress, no matter how small.",
    "You deserve kindness and patience.",
    "Your feelings are valid.",
    "Every day is a fresh start.",
    "You are doing better than you think."
];

document.getElementById("affirmationText").textContent =
    affirmations[Math.floor(Math.random() * affirmations.length)];

function saveMood(mood) {
    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    moods.push({ mood, date: new Date().toLocaleDateString() });

    localStorage.setItem("moods", JSON.stringify(moods));

    document.getElementById("selectedMood").textContent =
        `Today's Mood: ${mood}`;
}

function saveJournal() {
    const entry = document.getElementById("journalEntry").value;
    if (!entry) return;

    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.push({ text: entry, date: new Date().toLocaleString() });

    localStorage.setItem("journalEntries", JSON.stringify(entries));

    loadEntries();

    document.getElementById("journalEntry").value = "";
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const list = document.getElementById("journalList");

    list.innerHTML = "";

    entries.slice().reverse().forEach(e => {
        const div = document.createElement("div");
        div.style.padding = "10px";
        div.style.margin = "10px 0";
        div.style.border = "1px solid #ddd";
        div.style.borderRadius = "10px";

        div.innerHTML = `<small>${e.date}</small><br>${e.text}`;
        list.appendChild(div);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

(function initDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }
})();

loadEntries();