// ... (önceki tanımlar aynen kalıyor)

const prevBtn = null; // Artık kullanılmıyor
const nextBtn = null; // Artık kullanılmıyor

// updateCard içinde bu satırları SİLDİK:
// prevBtn.disabled = ...
// nextBtn.disabled = ...

// Kartı güncelle
function updateCard() {
    const currentWord = words[currentWordIndex];
    germanWord.textContent = currentWord.german;
    turkishWord.textContent = currentWord.turkish;
    currentCardSpan.textContent = currentWordIndex + 1;
    totalCardsSpan.textContent = words.length;
    knownCountSpan.textContent = knownWordsCount;
    unknownCountSpan.textContent = unknownWordsCount;

    progressFill.style.width = ((currentWordIndex + 1) / words.length) * 100 + "%";

    knownBtn.disabled = true;
    unknownBtn.disabled = true;

    if (isFlipped) {
        flashcard.classList.remove("flipped");
        isFlipped = false;
    }

    cardAnswered = false;
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

// Sonraki karta otomatik geçiş
function nextCard() {
    if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        updateCard();
    }
}

// Kelimeyi biliyorum
function markAsKnown() {
    if (isFlipped) {
        if (!words[currentWordIndex].known) {
            words[currentWordIndex].known = true;
            knownWordsCount++;
        }
        cardAnswered = true;
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
        cardAnswered = true;
        updateCard();
        nextCard();
    }
}

// Event listeners
flashcard.addEventListener("click", flipCard);
shuffleBtn.addEventListener("click", shuffleCards);
knownBtn.addEventListener("click", markAsKnown);
unknownBtn.addEventListener("click", markAsUnknown);

// Klavye kontrollerinden sağ-sol yönlerini istersen silebilirsin
