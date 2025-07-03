// Kartı tıklayınca çevirme (her noktadan)
document.querySelector(".card-container").addEventListener("click", () => {
  if (!isFlipped) {
    flipCard();
  }
});

knownBtn.addEventListener("click", () => {
  markAsKnown();
  nextCard();
});
unknownBtn.addEventListener("click", () => {
  markAsUnknown();
  nextCard();
});

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

function flipCard() {
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

function nextCard() {
  if (currentWordIndex < words.length - 1) {
    currentWordIndex++;
    updateCard();
  }
}

function markAsKnown() {
  if (isFlipped) {
    if (!words[currentWordIndex].known) {
      words[currentWordIndex].known = true;
      knownWordsCount++;
    }
    cardAnswered = true;
    updateCard();
  }
}

function markAsUnknown() {
  if (isFlipped) {
    if (!words[currentWordIndex].unknown) {
      words[currentWordIndex].unknown = true;
      unknownWordsCount++;
    }
    cardAnswered = true;
    updateCard();
  }
}
