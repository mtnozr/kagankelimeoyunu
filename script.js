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
    { german: "zwei", turkish: "iki" },
    { german: "drei", turkish: "üç" },
    { german: "vier", turkish: "dört" },
    { german: "fünf", turkish: "beş" },
    { german: "sechs", turkish: "altı" },
    { german: "sieben", turkish: "yedi" },
    { german: "acht", turkish: "sekiz" },
    { german: "neun", turkish: "dokuz" },
    { german: "zehn", turkish: "on" },
    { german: "der Vater", turkish: "baba" },
    { german: "die Mutter", turkish: "anne" },
    { german: "der Sohn", turkish: "oğul" },
    { german: "die Tochter", turkish: "kız evlat" },
    { german: "der Bruder", turkish: "erkek kardeş" },
    { german: "die Schwester", turkish: "kız kardeş" },
    { german: "der Opa", turkish: "dede" },
    { german: "die Oma", turkish: "nine" },
    { german: "das Baby", turkish: "bebek" },
    { german: "das Haus", turkish: "ev" },
    { german: "das Auto", turkish: "araba" },
    { german: "der Bus", turkish: "otobüs" },
    { german: "der Zug", turkish: "tren" },
    { german: "das Flugzeug", turkish: "uçak" }
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
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function playSuccessSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
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
    
    // Buton durumlarını güncelle
    shuffleBtn.disabled = false; // Shuffle butonu her zaman aktif
    knownBtn.disabled = true; // Başlangıçta pasif
    unknownBtn.disabled = true; // Başlangıçta pasif

    // Kartı ön yüze çevir
    flashcard.classList.remove("flipped");
    isFlipped = false;
}

// Kartı çevir
function flipCard() {
    if (!isFlipped) { // Sadece ön yüzdeyken çevirmeye izin ver
        flashcard.classList.add("flipped");
        isFlipped = true;
        playFlipSound();
        knownBtn.disabled = false; // Kart çevrildiğinde aktif et
        unknownBtn.disabled = false; // Kart çevrildiğinde aktif et
        setTimeout(() => {
            showStars();
            if (Math.random() < 0.3) { // %30 şansla konfeti göster
                showConfetti();
                playSuccessSound();
            }
        }, 400);
    }
}

// Sonraki kart (sadece biliyorum/bilmiyorum butonları için)
function nextCard() {
    if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        updateCard();
    } else {
        alert("Tebrikler! Tüm kelimeleri tamamladınız!");
        // İsterseniz burada oyunu sıfırlayabilir veya başka bir işlem yapabilirsiniz.
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
    showConfetti();
    playSuccessSound();
}

// Kelimeyi biliyorum
function markAsKnown() {
    if (isFlipped) { // Sadece kart çevriliyse işaretlemeye izin ver
        if (!words[currentWordIndex].known) {
            words[currentWordIndex].known = true;
            knownWordsCount++;
        }
        nextCard(); // Sadece bunu çağır
    }
}

// Kelimeyi bilmiyorum
function markAsUnknown() {
    if (isFlipped) { // Sadece kart çevriliyse işaretlemeye izin ver
        if (!words[currentWordIndex].unknown) {
            words[currentWordIndex].unknown = true;
            unknownWordsCount++;
        }
        nextCard(); // Sadece bunu çağır
    }
}

// Konfeti animasyonu
function showConfetti() {
    const colors = ["#ff6b6b", "#feca57", "#48cae4", "#ff9ff3", "#54a0ff"];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement("div");
            confetti.className = "confetti";
            confetti.style.left = Math.random() * 100 + "%";
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + "s";
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// Yıldız animasyonu
function showStars() {
    const starEmojis = ["⭐", "🌟", "✨", "💫"];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const star = document.createElement("div");
            star.className = "star";
            star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            starsContainer.appendChild(star);
            
            setTimeout(() => {
                star.remove();
            }, 2000);
        }, i * 200);
    }
}

// Event listeners
flashcard.addEventListener("click", flipCard);
shuffleBtn.addEventListener("click", shuffleCards);
knownBtn.addEventListener("click", markAsKnown);
unknownBtn.addEventListener("click", markAsUnknown);

// Klavye kontrolleri
document.addEventListener("keydown", (e) => {
    switch(e.key) {
        case " ":
        case "Enter":
            e.preventDefault();
            flipCard();
            break;
        case "s":
        case "S":
            shuffleCards();
            break;
        case "k": // 'k' for known
        case "K":
            markAsKnown();
            break;
        case "u": // 'u' for unknown
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
            // Sola kaydırma - sonraki kart
            // nextCard(); // Artık otomatik geçiş var
        } else {
            // Sağa kaydırma - önceki kart
            // previousCard(); // Artık otomatik geçiş var
        }
    }
}

// İlk kartı yükle
updateCard();

// Hoş geldin animasyonu
setTimeout(() => {
    showStars();
}, 1000);