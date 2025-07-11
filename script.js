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

function playFlipSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 400;
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

function playSuccessSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 600;
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);
}

// Kartı güncelle
function updateCard() {
    const currentWord = words[currentWordIndex];
    germanWord.textContent = currentWord.german;
    turkishWord.textContent = currentWord.turkish;
    currentCardSpan.textContent = currentWordIndex + 1;
    totalCardsSpan.textContent = words.length;
    knownCountSpan.textContent = knownWordsCount;
    unknownCountSpan.textContent = unknownWordsCount;

    // Progress bar güncelle
    const progress = ((currentWordIndex + 1) / words.length) * 100;
    progressFill.style.width = progress + "%";

    // Buton durumlarını güncelle - Butonları her zaman aktif tutuyoruz
    shuffleBtn.disabled = false;
    knownBtn.disabled = false;
    unknownBtn.disabled = false;

    // Kartı ön yüze çevir
    flashcard.classList.remove("flipped");
    isFlipped = false;
}

// Kartı çevir
function flipCard() {
    flashcard.classList.toggle("flipped");
    isFlipped = !isFlipped;
    playFlipSound();
    
    if (isFlipped) {
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
        showConfetti();
        playSuccessSound();
        setTimeout(() => {
            alert("Tebrikler! Tüm kelimeleri tamamladınız!");
            shuffleCards(); // Oyunu yeniden başlat
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
    knownWordsCount = 0;
    unknownWordsCount = 0;
    updateCard();
    showConfetti();
    playSuccessSound();
}

// Kelimeyi biliyorum
function markAsKnown() {
    if (!words[currentWordIndex].known) {
        words[currentWordIndex].known = true;
        knownWordsCount++;
    }
    setTimeout(() => {
        nextCard();
    }, 300);
}

// Kelimeyi bilmiyorum
function markAsUnknown() {
    if (!words[currentWordIndex].unknown) {
        words[currentWordIndex].unknown = true;
        unknownWordsCount++;
    }
    setTimeout(() => {
        nextCard();
    }, 300);
}

// Konfeti animasyonu
function showConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDelay = Math.random() * 3 + "s";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
        
        // Konfetileri temizle
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Yıldız animasyonu
function showStars() {
    for (let i = 0; i < 10; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        star.style.animationDelay = Math.random() * 2 + "s";
        starsContainer.appendChild(star);
        
        // Yıldızları temizle
        setTimeout(() => {
            star.remove();
        }, 2000);
    }
}

// Event listeners
flashcard.addEventListener("click", flipCard);
shuffleBtn.addEventListener("click", shuffleCards);
knownBtn.addEventListener("click", markAsKnown);
unknownBtn.addEventListener("click", markAsUnknown);

// Klavye kontrolleri
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case " ":
        case "Enter":
            e.preventDefault();
            flipCard();
            break;
        case "s":
        case "S":
            shuffleCards();
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

// Touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

flashcard.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

flashcard.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextCard();
        }
    }
}

// İlk kartı yükle
updateCard();

// Hoş geldin animasyonu
setTimeout(() => {
    showStars();
}, 1000);