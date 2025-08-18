document.addEventListener("DOMContentLoaded", function () {
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

  let index = 0;
  let knownCount = 0;
  let unknownCount = 0;
  let flipped = false;

  // DOM referansları
  const flashcard = document.getElementById("flashcard");
  const germanWord = document.getElementById("german-word");
  const turkishWord = document.getElementById("turkish-word");
  const currentCard = document.getElementById("current-card");
  const totalCards = document.getElementById("total-cards");
  const knownSpan = document.getElementById("known-count");
  const unknownSpan = document.getElementById("unknown-count");
  const progressFill = document.getElementById("progress-fill");
  const progressKnown = document.getElementById("progress-known");
  const progressUnknown = document.getElementById("progress-unknown");
  const knownBadge = document.querySelector(".badge-known");
  const unknownBadge = document.querySelector(".badge-unknown");

  // Başlangıç güncelleme
  function updateCard() {
    const w = words[index];
    germanWord.textContent = w.german;
    turkishWord.textContent = w.turkish;
    currentCard.textContent = index + 1;
    totalCards.textContent = words.length;
    knownSpan.textContent = knownCount;
    unknownSpan.textContent = unknownCount;
    progressFill.style.width = ((index + 1) / words.length * 100) + "%";
    if (progressKnown && progressUnknown) {
      progressKnown.style.width = (knownCount / words.length * 100) + "%";
      progressUnknown.style.width = (unknownCount / words.length * 100) + "%";
    }
    if (flipped) {
      flashcard.classList.remove("flipped");
      flipped = false;
    }
  }

  // Kart çevir
  flashcard.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
    flipped = !flipped;
  });

  // Sonraki
  function nextCard() {
    index++;
    if (index >= words.length) {
      alert("Tebrikler! Bitti.");
      index = 0;
      knownCount = 0;
      unknownCount = 0;
    }
    updateCard();
  }

  // Butonlar
  document.getElementById("known-btn").addEventListener("click", () => {
    knownCount++;
    if (knownBadge) {
      knownBadge.classList.remove("bump");
      void knownBadge.offsetWidth;
      knownBadge.classList.add("bump");
    }
    nextCard();
  });

  document.getElementById("unknown-btn").addEventListener("click", () => {
    unknownCount++;
    if (unknownBadge) {
      unknownBadge.classList.remove("bump");
      void unknownBadge.offsetWidth;
      unknownBadge.classList.add("bump");
    }
    nextCard();
  });

  // Klavye: sağ ok = sonraki, boşluk = çevir
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextCard();
    }
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      flashcard.click();
    }
  });

  // İlk yükleme
  updateCard();
});
