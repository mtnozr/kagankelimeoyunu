document.addEventListener("DOMContentLoaded", function () {
  // Kelime listesi (En yaygın ~100 Almanca kelime ve Türkçe karşılıkları)
  const words = [
    { german: "der", turkish: "belirli artikel (eril)" },
    { german: "die", turkish: "belirli artikel (dişil/çoğul)" },
    { german: "das", turkish: "belirli artikel (nötr)" },
    { german: "und", turkish: "ve" },
    { german: "sein", turkish: "olmak" },
    { german: "in", turkish: "içinde" },
    { german: "ein", turkish: "bir (belirsiz artikel)" },
    { german: "zu", turkish: "-e/-a; -e doğru" },
    { german: "haben", turkish: "sahip olmak" },
    { german: "ich", turkish: "ben" },
    { german: "werden", turkish: "olmak; haline gelmek" },
    { german: "sie", turkish: "o (kadın); onlar" },
    { german: "von", turkish: "-den/-dan" },
    { german: "nicht", turkish: "değil" },
    { german: "mit", turkish: "ile" },
    { german: "es", turkish: "o (cansız)" },
    { german: "sich", turkish: "kendi" },
    { german: "auch", turkish: "de/da; ayrıca" },
    { german: "auf", turkish: "üstünde; üzerine" },
    { german: "für", turkish: "için" },
    { german: "an", turkish: "-e/-a; -de/-da (temaslı)" },
    { german: "er", turkish: "o (erkek)" },
    { german: "so", turkish: "böyle; bu şekilde" },
    { german: "dass", turkish: "ki" },
    { german: "können", turkish: "-ebilmek" },
    { german: "als", turkish: "olarak; ...den daha" },
    { german: "nach", turkish: "sonra; -e doğru" },
    { german: "wie", turkish: "nasıl; gibi" },
    { german: "im", turkish: "içinde (in dem)" },
    { german: "aus", turkish: "-den/-dan; dışarı" },
    { german: "wenn", turkish: "eğer; ...dığında" },
    { german: "nur", turkish: "sadece" },
    { german: "war", turkish: "idi" },
    { german: "noch", turkish: "hâlâ; henüz" },
    { german: "bei", turkish: "yanında; -de/-da" },
    { german: "oder", turkish: "ya da" },
    { german: "wir", turkish: "biz" },
    { german: "was", turkish: "ne" },
    { german: "schon", turkish: "zaten; çoktan" },
    { german: "einen", turkish: "bir (Akkusativ eril)" },
    { german: "welche", turkish: "hangi; hangileri" },
    { german: "sind", turkish: "-dır/-dir (çoğul)" },
    { german: "zur", turkish: "-e (zu der)" },
    { german: "um", turkish: "için; etrafında; saat" },
    { german: "hat", turkish: "vardır; sahiptir" },
    { german: "mehr", turkish: "daha fazla" },
    { german: "machen", turkish: "yapmak" },
    { german: "ganz", turkish: "tamamen; tüm" },
    { german: "ja", turkish: "evet" },
    { german: "kommen", turkish: "gelmek" },
    { german: "gehen", turkish: "gitmek" },
    { german: "sehen", turkish: "görmek" },
    { german: "lassen", turkish: "bırakmak; izin vermek" },
    { german: "stehen", turkish: "ayakta durmak; bulunmak" },
    { german: "finden", turkish: "bulmak" },
    { german: "geben", turkish: "vermek" },
    { german: "nehmen", turkish: "almak" },
    { german: "sagen", turkish: "söylemek" },
    { german: "müssen", turkish: "zorunda olmak" },
    { german: "wollen", turkish: "istemek" },
    { german: "dürfen", turkish: "izinli olmak" },
    { german: "sollen", turkish: "meli/malı olmak" },
    { german: "bringen", turkish: "getirmek" },
    { german: "leben", turkish: "yaşamak" },
    { german: "arbeiten", turkish: "çalışmak" },
    { german: "Zeit", turkish: "zaman" },
    { german: "Jahr", turkish: "yıl" },
    { german: "Tag", turkish: "gün" },
    { german: "Mensch", turkish: "insan" },
    { german: "Kind", turkish: "çocuk" },
    { german: "Frau", turkish: "kadın" },
    { german: "Mann", turkish: "adam" },
    { german: "Haus", turkish: "ev" },
    { german: "Hand", turkish: "el" },
    { german: "Teil", turkish: "parça" },
    { german: "Welt", turkish: "dünya" },
    { german: "Stadt", turkish: "şehir" },
    { german: "Land", turkish: "ülke" },
    { german: "Leben", turkish: "hayat" },
    { german: "Arbeit", turkish: "iş" },
    { german: "Frage", turkish: "soru" },
    { german: "Antwort", turkish: "cevap" },
    { german: "Problem", turkish: "sorun" },
    { german: "Geld", turkish: "para" },
    { german: "Wasser", turkish: "su" },
    { german: "Essen", turkish: "yemek" },
    { german: "trinken", turkish: "içmek" },
    { german: "gut", turkish: "iyi" },
    { german: "schlecht", turkish: "kötü" },
    { german: "klein", turkish: "küçük" },
    { german: "groß", turkish: "büyük" },
    { german: "neu", turkish: "yeni" },
    { german: "alt", turkish: "eski" },
    { german: "lange", turkish: "uzun (süre)" },
    { german: "heute", turkish: "bugün" },
    { german: "gestern", turkish: "dün" },
    { german: "morgen", turkish: "yarın" },
    { german: "immer", turkish: "her zaman" },
    { german: "oft", turkish: "sık sık" },
    { german: "manchmal", turkish: "bazen" }
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
