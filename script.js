const affirmations = [
    "You are stronger than you think.",
    "Progress is progress, no matter how small.",
    "You deserve kindness and patience.",
    "Your feelings are valid.",
    "Every day is a fresh start.",
    "You have overcome challenges before."
];

const randomAffirmation =
affirmations[Math.floor(Math.random() * affirmations.length)];

document.getElementById("affirmationText")
.textContent = randomAffirmation;

function saveMood(mood){
    localStorage.setItem("mood", mood);

    document.getElementById("selectedMood")
    .textContent = `Today's Mood: ${mood}`;
}

function saveJournal(){

    const entry =
    document.getElementById("journalEntry").value;

    if(entry === "") return;

    const entries =
    JSON.parse(localStorage.getItem("journalEntries")) || [];

    entries.push(entry);

    localStorage.setItem(
        "journalEntries",
        JSON.stringify(entries)
    );

    loadEntries();

    document.getElementById("journalEntry").value = "";
}

function loadEntries(){

    const entries =
    JSON.parse(localStorage.getItem("journalEntries")) || [];

    const list =
    document.getElementById("journalList");

    list.innerHTML = "";

    entries.forEach(item => {

        const p = document.createElement("p");
        p.textContent = item;

        list.appendChild(p);
    });
}

loadEntries();