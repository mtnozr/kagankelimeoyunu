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
    { german: "rot", turkish: "kırmızı" },
    { german: "grün", turkish: "yeşil" },
    { german: "blau", turkish: "mavi" },
    { german: "gelb", turkish: "sarı" },
    { german: "weiß", turkish: "beyaz" },
    { german: "schwarz", turkish: "siyah" },
    { german: "orange", turkish: "turuncu" },
    { german: "lila", turkish: "mor" },
    { german: "braun", turkish: "kahverengi" },
    { german: "grau", turkish: "gri" },
    { german: "der Hund", turkish: "köpek" },
    { german: "die Katze", turkish: "kedi" },
    { german: "der Vogel", turkish: "kuş" },
    { german: "der Fisch", turkish: "balık" },
    { german: "das Pferd", turkish: "at" },
    { german: "die Maus", turkish: "fare" },
    { german: "der Elefant", turkish: "fil" },
    { german: "der Löwe", turkish: "aslan" },
    { german: "der Tiger", turkish: "kaplan" },
    { german: "der Bär", turkish: "ayı" },
    { german: "das Essen", turkish: "yemek" },
    { german: "das Wasser", turkish: "su" },
    { german: "die Milch", turkish: "süt" },
    { german: "das Brot", turkish: "ekmek" },
    { german: "der Apfel", turkish: "elma" },
    { german: "die Banane", turkish: "muz" },
    { german: "die Orange", turkish: "portakal" },
    { german: "die Zitrone", turkish: "limon" },
    { german: "die Tomate", turkish: "domates" },
    { german: "die Kartoffel", turkish: "patates" },
    { german: "die Schule", turkish: "okul" },
    { german: "der Lehrer", turkish: "öğretmen" },
    { german: "die Lehrerin", turkish: "kadın öğretmen" },
    { german: "der Schüler", turkish: "erkek öğrenci" },
    { german: "die Schülerin", turkish: "kız öğrenci" },
    { german: "das Buch", turkish: "kitap" },
    { german: "der Stift", turkish: "kalem" },
    { german: "das Heft", turkish: "defter" },
    { german: "die Tasche", turkish: "çanta" },
    { german: "die Tafel", turkish: "tahta" },
    { german: "der Kopf", turkish: "kafa" },
    { german: "das Auge", turkish: "göz" },
    { german: "die Nase", turkish: "burun" },
    { german: "der Mund", turkish: "ağız" },
    { german: "das Ohr", turkish: "kulak" },
    { german: "die Hand", turkish: "el" },
    { german: "der Fuß", turkish: "ayak" },
    { german: "der Bauch", turkish: "karın" },
    { german: "der Rücken", turkish: "sırt" },
    { german: "das Bein", turkish: "bacak" },
    { german: "sehen", turkish: "görmek" },
    { german: "hören", turkish: "duymak" },
    { german: "sprechen", turkish: "konuşmak" },
    { german: "lesen", turkish: "okumak" },
    { german: "schreiben", turkish: "yazmak" },
    { german: "gehen", turkish: "gitmek" },
    { german: "kommen", turkish: "gelmek" },
    { german: "essen", turkish: "yemek" },
    { german: "trinken", turkish: "içmek" },
    { german: "schlafen", turkish: "uyumak" },
    { german: "groß", turkish: "büyük" },
    { german: "klein", turkish: "küçük" },
    { german: "gut", turkish: "iyi" },
    { german: "schlecht", turkish: "kötü" },
    { german: "schön", turkish: "güzel" },
    { german: "hässlich", turkish: "çirkin" },
    { german: "neu", turkish: "yeni" },
    { german: "alt", turkish: "eski" },
    { german: "richtig", turkish: "doğru" },
    { german: "falsch", turkish: "yanlış" },
    { german: "die Familie", turkish: "aile" },
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
let cardsLearned = 0;

// DOM elementleri
const flashcard = document.getElementById('flashcard');
const germanWord = document.getElementById('german-word');
const turkishWord = document.getElementById('turkish-word');
const currentCardSpan = document.getElementById('current-card');
const totalCardsSpan = document.getElementById('total-cards');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const progressFill = document.getElementById('progress-fill');
const confettiContainer = document.getElementById('confetti-container');
const starsContainer = document.getElementById('stars-container');

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
    
    // Progress bar güncelle
    const progress = ((currentWordIndex + 1) / words.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Buton durumlarını güncelle
    prevBtn.disabled = currentWordIndex === 0;
    nextBtn.disabled = currentWordIndex === words.length - 1;
    
    // Kartı ön yüze çevir
    if (isFlipped) {
        flashcard.classList.remove('flipped');
        isFlipped = false;
    }
}

// Kartı çevir
function flipCard() {
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
    playFlipSound();
    
    // Eğer kart çevrilmişse (Türkçe taraf görünüyorsa) başarı efektleri göster
    if (isFlipped) {
        setTimeout(() => {
            showStars();
            if (Math.random() < 0.3) { // %30 şansla konfeti göster
                showConfetti();
                playSuccessSound();
            }
        }, 400);
    }
}

// Önceki kart
function previousCard() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        updateCard();
    }
}

// Sonraki kart
function nextCard() {
    if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        updateCard();
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

// Konfeti animasyonu
function showConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48cae4', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// Yıldız animasyonu
function showStars() {
    const starEmojis = ['⭐', '🌟', '✨', '💫'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'star';
            star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            starsContainer.appendChild(star);
            
            setTimeout(() => {
                star.remove();
            }, 2000);
        }, i * 200);
    }
}

// Event listeners
flashcard.addEventListener('click', flipCard);
prevBtn.addEventListener('click', previousCard);
nextBtn.addEventListener('click', nextCard);
shuffleBtn.addEventListener('click', shuffleCards);

// Klavye kontrolleri
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            previousCard();
            break;
        case 'ArrowRight':
            nextCard();
            break;
        case ' ':
        case 'Enter':
            e.preventDefault();
            flipCard();
            break;
        case 's':
        case 'S':
            shuffleCards();
            break;
    }
});

// Touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

flashcard.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

flashcard.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Sola kaydırma - sonraki kart
            nextCard();
        } else {
            // Sağa kaydırma - önceki kart
            previousCard();
        }
    }
}

// İlk kartı yükle
updateCard();

// Hoş geldin animasyonu
setTimeout(() => {
    showStars();
}, 1000);

