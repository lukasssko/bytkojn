/* ========================================================================
   BYTKOJN – DOČASNÁ ÚVODNÍ STRÁNKA
   1) střídá výrazy v hlavním nadpisu,
   2) vytvoří kruhový indikátor z kladívek.
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
const hammerSpinner = document.querySelector("#hammerSpinner");

let rotatingInterval = null;
let rotatingTimeout = null;

/* Fisher–Yates: po každém načtení stránky vytvoří jiné pořadí výrazů. */
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

  if (reducedMotion) {
    rotatingWord.textContent = rotatingWords[0];
    pageTitle.setAttribute(
      "aria-label",
      `Bitcoin bez ${rotatingWords[0]}`
    );
    return;
  }

  const words = shuffleArray(rotatingWords);
  let wordIndex = 0;

  rotatingWord.textContent = words[wordIndex];
  pageTitle.setAttribute("aria-label", `Bitcoin bez ${words[wordIndex]}`);

  rotatingInterval = window.setInterval(() => {
    rotatingWord.classList.add("is-changing");

    rotatingTimeout = window.setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotatingWord.textContent = words[wordIndex];
      rotatingWord.classList.remove("is-changing");
      rotatingTimeout = null;
    }, 220);
  }, 1800);
}

/* Jednoduchá vlastní SVG ikona kladívka bez externích obrázků. */
function createHammerIcon() {
  return `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M14.8 2.8c1.4-.3 3.4.4 4.7 1.7l1.2 1.2-2.8 2.8-1.1-1.1c-.6-.6-1.4-.9-2.2-.8l-1 .1-2 2 1.5 1.5-2.1 2.1-1.5-1.5-6.3 6.3c-.8.8-.8 2.1 0 2.9l.8.8c.8.8 2.1.8 2.9 0l6.3-6.3 1.5 1.5 2.1-2.1-1.5-1.5 2-2 .1-1c.1-.8-.2-1.6-.8-2.2l-.3-.3-2.5 2.5-2.6-2.6 2.5-2.5.1-.5Z"/>
    </svg>
  `;
}

function buildHammerSpinner() {
  if (!hammerSpinner) {
    return;
  }

  const hammerCount = 12;
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < hammerCount; index += 1) {
    const hammer = document.createElement("span");
    const angle = (360 / hammerCount) * index;

    hammer.className = "hammer-item";
    hammer.style.setProperty("--hammer-angle", `${angle}deg`);
    hammer.innerHTML = createHammerIcon();

    fragment.appendChild(hammer);
  }

  hammerSpinner.appendChild(fragment);
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

buildHammerSpinner();
startRotatingHeadline();

/* Uklidí časovače při opuštění stránky. */
window.addEventListener("pagehide", stopHeadlineTimers);
