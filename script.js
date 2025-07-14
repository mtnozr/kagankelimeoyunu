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
    // ... diğer kelimeler
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

// Ses efektleri (Web Audio API kullanarak)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Kartı güncelleyen fonksiyon
function updateCard() {
    const { german, turkish } = words[currentIndex];
    germanWord.textContent = german;
    turkishWord.textContent = turkish;
    currentCardSpan.textContent = currentIndex + 1;
    totalCardsSpan.textContent = words.length;
    progressFill.style.width = `${((currentIndex + 1) / words.length) * 100}%`;
    
    // Buton durumlarını güncelle - Butonları her zaman aktif tutuyoruz
    if (shuffleBtn) shuffleBtn.disabled = false;
    knownBtn.disabled = false;
    unknownBtn.disabled = false;

    // Kartı ön yüze çevir
    flashcard.classList.remove("flipped");
    isFlipped = false;
}

// Kartı çevirme fonksiyonu
function flipCard() {
    flashcard.classList.toggle("flipped");
    isFlipped = !isFlipped;
    playFlipSound();
}

// Sonraki karta geçiş
function nextCard() {
    currentIndex = (currentIndex + 1) % words.length;
    updateCard();
}

// Kartları karıştır
function shuffleCards() {
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    currentIndex = 0;
    updateCard();
}

// Bildiğimizi işaretle
function markAsKnown() {
    knownCount++;
    knownCountSpan.textContent = knownCount;
    playSuccessSound();
    setTimeout(nextCard, 300);
}

// Bilmediğimizi işaretle
function markAsUnknown() {
    unknownCount++;
    unknownCountSpan.textContent = unknownCount;
    playErrorSound();
    setTimeout(nextCard, 300);
}

// Ses oynatma fonksiyonları
function playFlipSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.type = 'sine';
    oscillator.frequency.value = 300;
    gainNode.gain.value = 0.1;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

function playSuccessSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.type = 'square';
    oscillator.frequency.value = 600;
    gainNode.gain.value = 0.1;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

function playErrorSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 200;
    gainNode.gain.value = 0.1;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Öğe dinleyicileri
flashcard.addEventListener("click", flipCard);

// shuffle-btn HTML’de yoksa atla
if (shuffleBtn) {
    shuffleBtn.addEventListener("click", shuffleCards);
}

knownBtn.addEventListener("click", markAsKnown);
unknownBtn.addEventListener("click", markAsUnknown);

// Klavye kontrolleri
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextCard();
    if (e.key === " ") flipCard();
});

// Dokunmatik kaydırma
let touchStartX = 0;
const swipeThreshold = 50;

flashcard.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

flashcard.addEventListener("touchmove", (e) => {
    e.preventDefault();
});

flashcard.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold && diff > 0) {
        nextCard();
    }
});

// İlk kartı yükle
updateCard();

// Hoş geldin animasyonu
setTimeout(() => {
    showStars();
}, 1000);

// Konfeti ve yıldız animasyonları (mevcut kodunuz)
function showStars() {
    // ... Mevcut animasyon kodu
}
