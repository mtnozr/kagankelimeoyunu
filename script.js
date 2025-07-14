// script.js

// Oyun durumu
let currentWordIndex = 0;
let isFlipped = false;
let knownWordsCount = 0;
let unknownWordsCount = 0;

// Kelime listesi
const words = [
    { german: "Hallo", turkish: "Merhaba" },
    { german: "Guten Morgen", turkish: "Günaydın" },
    { german: "Guten Tag", turkish: "İyi günler" },
    { german: "Guten Abend", turkish: "İyi akşamlar" },
    { german: "Gute Nacht", turkish: "İyi geceler" },
    { german: "Auf Wiedersehen", turkish: "Hoşça kalın" },
    { german: "Ja", turkish: "Evet" },
    { german: "Nein", turkish: "Hayır" },
    { german: "Danke", turkish: "Teşekkür ederim" },
    { german: "Bitte", turkish: "Rica ederim" },
    { german: "eins", turkish: "bir" },
    { german: "zwei", turkish: "iki" }
];

// DOM elementleri
const flashcard = document.getElementById("flashcard");
const germanWord = document.getElementById("german-word");
const turkishWord = document.getElementById("turkish-word");
const currentCardSpan = document.getElementById("current-card");
const totalCardsSpan = document.getElementById("total-cards");
const shuffleBtn = document.getElementById("shuffle-btn");
const knownBtn = document.getElementById("known-btn");
const unknownBtn = document.getElementById("unknown-btn");
const knownCountSpan = document.getElementById("known-count");
const unknownCountSpan = document.getElementById("unknown-count");
const progressFill = document.getElementById("progress-fill");
const confettiContainer = document.getElementById("confetti-container");
const starsContainer = document.getElementById("stars-container");

// Ses efektleri
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Kartı güncelleyen fonksiyon
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

    // Buton durumları (shuffle varsa, devre dışı bırakma hatası olmasın)
    if (shuffleBtn) shuffleBtn.disabled = false;
    knownBtn.disabled = false;
    unknownBtn.disabled = false;

    // Kartı ön yüze getir
    flashcard.classList.remove("flipped");
    isFlipped = false;
}

// Kart çevirme
function flipCard() {
    flashcard.classList.toggle("flipped");
    isFlipped = !isFlipped;
    playFlipSound();
}

// Sonraki karta geç
function nextCard() {
    if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        updateCard();
    } else {
        showConfetti();
        playSuccessSound();
        setTimeout(() => {
            alert("Tebrikler! Tüm kelimeleri tamamladınız!");
            if (shuffleBtn) shuffleCards();
        }, 500);
    }
}

// Kartları karıştır
function shuffleCards() {
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    currentWordIndex = 0;
    updateCard();
}

// Bildiğimizi işaretle
function markAsKnown() {
    knownWordsCount++;
    knownCountSpan.textContent = knownWordsCount;
    playSuccessSound();
    setTimeout(nextCard, 300);
}

// Bilmediğimizi işaretle
function markAsUnknown() {
    unknownWordsCount++;
    unknownCountSpan.textContent = unknownWordsCount;
    playErrorSound();
    setTimeout(nextCard, 300);
}

// Ses oynatma
function playFlipSound() {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.type = 'sine';
    osc.frequency.value = 300;
    gain.gain.value = 0.1;
    osc.start();
    osc.stop(audioContext.currentTime + 0.1);
}
function playSuccessSound() {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.type = 'square';
    osc.frequency.value = 600;
    gain.gain.value = 0.1;
    osc.start();
    osc.stop(audioContext.currentTime + 0.1);
}
function playErrorSound() {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.type = 'sawtooth';
    osc.frequency.value = 200;
    gain.gain.value = 0.1;
    osc.start();
    osc.stop(audioContext.currentTime + 0.1);
}

// Animasyonlar
function showConfetti() {
    // Mevcut konfeti kodunuz
}
function showStars() {
    // Mevcut yıldız animasyonu
}

// Event listeners
flashcard.addEventListener("click", flipCard);
if (shuffleBtn) shuffleBtn.addEventListener("click", shuffleCards);
knownBtn.addEventListener("click", markAsKnown);
unknownBtn.addEventListener("click", markAsUnknown);

// Klavye
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextCard();
    if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        flipCard();
    }
});

// Dokunmatik kaydırma
let touchStartX = 0;
const swipeThreshold = 50;
flashcard.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
});
flashcard.addEventListener("touchmove", e => e.preventDefault());
flashcard.addEventListener("touchend", e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (diff > swipeThreshold) nextCard();
});

// İlk yükleme
updateCard();
setTimeout(showStars, 1000);
