// script.js
// Kelime listesi
const words = [
    /* ... kelime dizisi aynı ... */
];

// Oyun durumu
let currentWordIndex = 0;
let isFlipped = false;
let knownWordsCount = 0;
let unknownWordsCount = 0;

// DOM elementleri
const flashcard = document.getElementById("flashcard");
const germanWord = document.getElementById("german-word");
const turkishWord = document.getElementById("turkish-word");
const currentCardSpan = document.getElementById("current-card");
const totalCardsSpan = document.getElementById("total-cards");
const knownBtn = document.getElementById("known-btn");
const unknownBtn = document.getElementById("unknown-btn");
const knownCountSpan = document.getElementById("known-count");
const unknownCountSpan = document.getElementById("unknown-count");
const progressFill = document.getElementById("progress-fill");
const confettiContainer = document.getElementById("confetti-container");
const starsContainer = document.getElementById("stars-container");

// Ses efektleri
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playFlipSound() { /* aynı */ }
function playSuccessSound() { /* aynı */ }

// Kartı güncelle
function updateCard() {
    const currentWord = words[currentWordIndex];
    germanWord.textContent = currentWord.german;
    turkishWord.textContent = currentWord.turkish;
    currentCardSpan.textContent = currentWordIndex + 1;
    totalCardsSpan.textContent = words.length;
    knownCountSpan.textContent = knownWordsCount;
    unknownCountSpan.textContent = unknownWordsCount;

    // Progress bar
    const progress = ((currentWordIndex + 1) / words.length) * 100;
    progressFill.style.width = progress + "%";

    // Buton durumları
    knownBtn.disabled = true;
    unknownBtn.disabled = true;

    // Kartı ön yüze çevir
    flashcard.classList.remove("flipped");
    isFlipped = false;
}

// Kartı çevir
function flipCard() {
    if (!isFlipped) {
        flashcard.classList.add("flipped");
        isFlipped = true;
        playFlipSound();
        knownBtn.disabled = false;
        unknownBtn.disabled = false;
        setTimeout(() => {
            showStars();
            if (Math.random() < 0.3) {
                showConfetti();
                playSuccessSound();
            }
        }, 400);
    }
}

// Sonraki kart
function nextCard() {
    if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        updateCard();
    } else {
        alert("Tebrikler! Tüm kelimeleri tamamladınız!");
    }
}

// Kelimeyi biliyorum
function markAsKnown() {
    if (isFlipped) {
        if (!words[currentWordIndex].known) {
            words[currentWordIndex].known = true;
            knownWordsCount++;
        }
        updateCard();
        nextCard();
    }
}

// Kelimeyi bilmiyorum
function markAsUnknown() {
    if (isFlipped) {
        if (!words[currentWordIndex].unknown) {
            words[currentWordIndex].unknown = true;
            unknownWordsCount++;
        }
        updateCard();
        nextCard();
    }
}

// Animasyonlar
function showConfetti() { /* aynı */ }
function showStars() { /* aynı */ }

// Event listener’lar
flashcard.addEventListener("click", flipCard);
knownBtn.addEventListener("click", markAsKnown);
unknownBtn.addEventListener("click", markAsUnknown);

document.addEventListener("keydown", (e) => {
    switch(e.key) {
        case " ":
        case "Enter":
            e.preventDefault(); flipCard();
            break;
        case "k":
        case "K":
            markAsKnown();
            break;
        case "u":
        case "U":
            markAsUnknown();
            break;
    }
});

// Dokunmatik kontroller (değişmedi)
let touchStartX = 0;
let touchEndX = 0;
flashcard.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].screenX; });
flashcard.addEventListener("touchend", (e) => { touchEndX = e.changedTouches[0].screenX; handleSwipe(); });
function handleSwipe() { /* aynı, sonraki/önceki kart yok */ }

// İlk kartı yükle
updateCard();
// Hoş geldin animasyonu
setTimeout(() => { showStars(); }, 1000);
