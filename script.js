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
  const confettiContainer = document.getElementById("confetti-container");
  const starsContainer = document.getElementById("stars-container");

  // Arka plan yıldızları
  function spawnStars(count = 60) {
    starsContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 2.4;
      const size = Math.random() * 2 + 1;
      star.style.left = left + "%";
      star.style.top = top + "%";
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.animationDelay = delay + "s";
      starsContainer.appendChild(star);
    }
  }

  // Konfeti kutlaması
  function celebrate() {
    const colors = ["#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#00bcd4", "#4caf50", "#ff9800", "#ffc107"];
    const pieces = 140;
    for (let i = 0; i < pieces; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti";
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * 100; // vw
      const delay = Math.random() * 0.8;
      const rotate = Math.random() * 360;
      piece.style.left = x + "vw";
      piece.style.background = color;
      piece.style.transform = `translateY(-40px) rotate(${rotate}deg)`;
      piece.style.animationDelay = delay + "s";
      piece.style.opacity = "0";
      confettiContainer.appendChild(piece);
      // Temizlik
      setTimeout(() => {
        piece.remove();
      }, 3000);
    }
  }

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
      celebrate();
      index = 0;
      knownCount = 0;
      unknownCount = 0;
    }
    updateCard();
  }

  // Butonlar
  document.getElementById("known-btn").addEventListener("click", () => {
    knownCount++;
    nextCard();
  });

  document.getElementById("unknown-btn").addEventListener("click", () => {
    unknownCount++;
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
  spawnStars(80);
  updateCard();
});
