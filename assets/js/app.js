/* ========================================================================
   BYTKOJN – DOČASNÁ ÚVODNÍ STRÁNKA
   Střídání výrazů v hlavním nadpisu.
   ======================================================================== */

const rotatingWords = [
  "technického strašení",
  "pozlátka",
  "mýtů",
  "humbuku",
  "zkratek",
  "slepé víry",
  "finančních guru",
  "cenových predikcí",
  "marketingu",
  "bankovní omáčky",
  "falešných slibů",
  "zbytečného chaosu"
];

const rotatingWord = document.querySelector("#rotatingWord");
const pageTitle = document.querySelector("#pageTitle");

let rotatingInterval = null;
let rotatingTimeout = null;

function shuffleArray(items) {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index]
    ];
  }

  return shuffledItems;
}

function startRotatingHeadline() {
  if (!rotatingWord || !pageTitle) {
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const words = shuffleArray(rotatingWords);
  let wordIndex = 0;

  rotatingWord.textContent = words[wordIndex];
  pageTitle.setAttribute("aria-label", `Bitcoin bez ${words[wordIndex]}`);

  if (reducedMotion) {
    return;
  }

  rotatingInterval = window.setInterval(() => {
    rotatingWord.classList.add("is-changing");

    rotatingTimeout = window.setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotatingWord.textContent = words[wordIndex];
      pageTitle.setAttribute("aria-label", `Bitcoin bez ${words[wordIndex]}`);
      rotatingWord.classList.remove("is-changing");
      rotatingTimeout = null;
    }, 220);
  }, 1800);
}

function stopHeadlineTimers() {
  if (rotatingInterval !== null) {
    window.clearInterval(rotatingInterval);
    rotatingInterval = null;
  }

  if (rotatingTimeout !== null) {
    window.clearTimeout(rotatingTimeout);
    rotatingTimeout = null;
  }
}

startRotatingHeadline();
window.addEventListener("pagehide", stopHeadlineTimers);
