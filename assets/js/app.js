/* ========================================================================
   BYTKOJN – DOČASNÁ ÚVODNÍ STRÁNKA
   Celý obsah tohoto souboru patří do assets/js/app.js.
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

const blockHeight = document.querySelector("#blockHeight");
const blockNonce = document.querySelector("#blockNonce");
const blockTx = document.querySelector("#blockTx");
const blockWeight = document.querySelector("#blockWeight");
const blockMerkle = document.querySelector("#blockMerkle");
const codeStream = document.querySelector("#codeStream");
const progressFill = document.querySelector("#progressFill");

let rotatingInterval = null;
let rotatingTimeout = null;
let blockInterval = null;
let progressValue = 36;

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

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomHex(length) {
  const chars = "0123456789abcdef";
  let value = "";

  for (let index = 0; index < length; index += 1) {
    value += chars[Math.floor(Math.random() * chars.length)];
  }

  return value;
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
  pageTitle.setAttribute(
    "aria-label",
    `Bitcoin bez ${words[wordIndex]}`
  );

  if (reducedMotion) {
    return;
  }

  rotatingInterval = window.setInterval(() => {
    rotatingWord.classList.add("is-changing");

    rotatingTimeout = window.setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotatingWord.textContent = words[wordIndex];

      pageTitle.setAttribute(
        "aria-label",
        `Bitcoin bez ${words[wordIndex]}`
      );

      rotatingWord.classList.remove("is-changing");
      rotatingTimeout = null;
    }, 220);
  }, 1800);
}

function updateProgrammingBlock() {
  if (!blockHeight || !blockNonce || !blockTx || !blockWeight || !blockMerkle || !codeStream || !progressFill) {
    return;
  }

  blockHeight.textContent = String(839000 + randomInt(1, 600));
  blockNonce.textContent = String(randomInt(100000000, 999999999));
  blockTx.textContent = String(randomInt(1200, 3400));
  blockWeight.textContent = String(randomInt(3120000, 3999999));
  blockMerkle.textContent = `${randomHex(16)}...`;
  codeStream.textContent = `${randomHex(24)}...`;

  progressValue += randomInt(2, 7);

  if (progressValue > 100) {
    progressValue = 24;
  }

  progressFill.style.width = `${progressValue}%`;
}

function startProgrammingBlock() {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  updateProgrammingBlock();

  if (reducedMotion) {
    return;
  }

  blockInterval = window.setInterval(updateProgrammingBlock, 650);
}

function stopAllTimers() {
  if (rotatingInterval !== null) {
    window.clearInterval(rotatingInterval);
    rotatingInterval = null;
  }

  if (rotatingTimeout !== null) {
    window.clearTimeout(rotatingTimeout);
    rotatingTimeout = null;
  }

  if (blockInterval !== null) {
    window.clearInterval(blockInterval);
    blockInterval = null;
  }
}

startRotatingHeadline();
startProgrammingBlock();

window.addEventListener("pagehide", stopAllTimers);
