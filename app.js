/* ========================================================================
   BYTKOJN – HLAVNÍ JAVASCRIPT

   JavaScript zde zajišťuje dvě věci:
   1) po kliknutí na horní záložku vytvoří odpovídající levé menu,
   2) po kliknutí na položku levého menu změní text hlavního obsahu.

   Stránka by fungovala i bez složitých knihoven. Nepoužíváme React,
   databázi ani server, takže stačí otevřít index.html v prohlížeči.
   ======================================================================== */

/* ------------------------------------------------------------------------
   1) DATA CELÉ STRÁNKY

   Toto je nejdůležitější část pro budoucí úpravy obsahu.
   Každá hlavní sekce obsahuje:
   - title: název levého panelu,
   - items: položky levého panelu,
   - content: texty, které se zobrazí po kliknutí na konkrétní položku.
   ------------------------------------------------------------------------ */
const websiteSections = {
  home: {
    title: "Startovní bod",
    items: [
      { id: "overview", label: "Přehled" },
      { id: "principles", label: "Základní princip" },
      { id: "roadmap", label: "Mapa obsahu" },
      { id: "about", label: "O projektu" }
    ],
    content: {
      overview: {
        path: "~/bytkojn/home/overview",
        /* Pevná část hlavního nadpisu. */
        title: "Bitcoin bez",
        /* Slova, která se budou v nadpisu automaticky střídat. */
        rotatingWords: [
          "polopravd",
          "prostředníků",
          "humbuku",
          "technického strašení",
          "mýtů",
          "rychlého bohatství",
          "zmatku",
          "marketingu",
          "slepé poslušnosti",
          "hádanek",
          "cenových predikcí",
          "balastu",
          "cenzury",
          "falešných slibů",
          "nejasností",
          "korporátní řeči",
          "iluzí",
          "zaručených tipů",
          "pozlátka",
          "finančních guru",
          "povrchnosti",
          "dogmat",
          "bankovní omáčky",
          "strachu",
          "zkratek",
          "ekonomických kouzel",
          "zamlčování",
          "FOMO",
          "kompromisů",
          "slepé víry",
          "investičních pohádek",
          "zkreslení",
          "tajemství",
          "složitých řečí",
          "frází",
          "centrální autority",
          "paniky",
          "nepochopení",
          "výmluv",
          "předsudků",
          "omáčky",
          "dozoru",
          "senzací",
          "chaosu",
          "zbytečné teorie",
          "klišé",
          "hranic",
          "lží",
          "zkreslených představ"
        ],
        lead:
          "Český průvodce Bitcoinem, penězi a světem kolem nich. " +
          "Od prvních principů přes historii a ekonomii až po technologie, " +
          "projekty a lidi, kteří Bitcoin tvoří.",

        cards: [
          [
            "DOPORUČUJEME",
            "Proč Bitcoin vůbec vznikl",
            "Příběh peněz, problém důvěry a důvody, které vedly ke vzniku Bitcoinu.",
            "pages/proc-bitcoin-vznikl.html"
          ],
          [
            "AKTUÁLNĚ",
            "Co se právě děje kolem Bitcoinu",
            "Vybrané téma, událost nebo problém, kterému má právě smysl věnovat pozornost.",
            "pages/aktualni-tema.html"
          ],
          [
            "DO HLOUBKY",
            "Co skutečně znamená decentralizace",
            "Proč nestačí říct, že Bitcoin nemá centrálního správce, a jakou roli hrají jeho uživatelé a uzly.",
            "pages/decentralizace.html"
          ]
        ],
        detailTitle: "Základ, který může růst s obsahem.",
        detailText: "Celý web funguje bez databáze a bez instalace. Stačí otevřít soubor index.html. Až budeš připravený, můžeš stejnou složku nahrát na GitHub Pages."
      },
      principles: {
        path: "~/bytkojn/home/principles",
        title: "Otevřený protokol. Vlastní pravidla.",
        lead: "Tato podsekce je připravená jako místo pro základní vysvětlení, proč Bitcoin vznikl, jaké problémy řeší a v čem se liší od běžných finančních systémů.",
        cards: [
          ["PRINCIP_01", "Bez centrálního správce", "Místo pro stručné vysvětlení decentralizace a role jednotlivých uzlů."],
          ["PRINCIP_02", "Pevně daná pravidla", "Místo pro popis nabídky, emisního plánu a ověřování transakcí."],
          ["PRINCIP_03", "Ověřuj, nevěř", "Místo pro vysvětlení vlastní kontroly, privátních klíčů a odpovědnosti uživatele."]
        ],
        detailTitle: "Obsah zatím slouží jako vizuální maketa.",
        detailText: "Texty můžeš později přepsat přímo v objektu websiteSections v souboru assets/js/app.js. Vzhled zůstane zachovaný."
      },
      roadmap: {
        path: "~/bytkojn/home/roadmap",
        title: "Mapa budoucího obsahu.",
        lead: "Tady může vzniknout rozcestník, který návštěvníka provede od úplných základů přes bezpečnost až po technické fungování sítě.",
        cards: [
          ["LEVEL_01", "Začátečník", "Co je Bitcoin, peněženka, transakce a proč má omezenou nabídku."],
          ["LEVEL_02", "Pokročilý", "Bloky, těžba, mempool, poplatky, uzly a praktická bezpečnost."],
          ["LEVEL_03", "Technický", "Skripty, podpisy, UTXO, Lightning Network a vlastní infrastruktura."]
        ],
        detailTitle: "Jedna hlavní trasa, více úrovní detailu.",
        detailText: "Strukturu lze později rozšířit o skutečné odkazy na samostatné HTML stránky ve složce pages."
      },
      about: {
        path: "~/bytkojn/home/about",
        title: "Projekt BYTKOJN.",
        lead: "Místo pro vysvětlení, kdo web tvoří, proč vznikl a jakým způsobem budou informace vybírány a aktualizovány.",
        cards: [
          ["AUTOR", "Vlastní hlas", "Prostor pro představení autora a důvodu, proč web vznikl."],
          ["ZDROJE", "Dohledatelné informace", "Prostor pro pravidla citování a odkazy na primární zdroje."],
          ["STATUS", "Průběžně budováno", "Prostor pro verze webu, historii změn a budoucí plán."]
        ],
        detailTitle: "Web může zůstat jednoduchý a současně důvěryhodný.",
        detailText: "Statický web je rychlý, levný na provoz a snadno se zálohuje. Obsah máš plně pod kontrolou."
      }
    }
  },

  learn: {
    title: "Sekce 01",
    items: [
      { id: "topic-a", label: "Téma A" },
      { id: "topic-b", label: "Téma B" },
      { id: "topic-c", label: "Téma C" }
    ],
    content: {
      "topic-a": createPlaceholderContent("learn", "topic-a", "První hlavní téma", "Zde může být první skutečná obsahová kapitola webu."),
      "topic-b": createPlaceholderContent("learn", "topic-b", "Druhé hlavní téma", "Tady může vzniknout navazující vysvětlení nebo praktický návod."),
      "topic-c": createPlaceholderContent("learn", "topic-c", "Třetí hlavní téma", "Tuto položku můžeš později změnit na libovolnou oblast.")
    }
  },

  network: {
    title: "Sekce 02",
    items: [
      { id: "module-a", label: "Modul A" },
      { id: "module-b", label: "Modul B" },
      { id: "module-c", label: "Modul C" },
      { id: "module-d", label: "Modul D" }
    ],
    content: {
      "module-a": createPlaceholderContent("network", "module-a", "Síťový modul A", "Univerzální prostor pro obsah druhé hlavní sekce."),
      "module-b": createPlaceholderContent("network", "module-b", "Síťový modul B", "Může zde být technické vysvětlení, přehled nebo schéma."),
      "module-c": createPlaceholderContent("network", "module-c", "Síťový modul C", "Další podsekce generovaná stejným JavaScriptem."),
      "module-d": createPlaceholderContent("network", "module-d", "Síťový modul D", "Položky lze přidávat a odebírat pouze úpravou dat nahoře v souboru.")
    }
  },

  tools: {
    title: "Sekce 03",
    items: [
      { id: "tool-a", label: "Nástroj A" },
      { id: "tool-b", label: "Nástroj B" },
      { id: "links", label: "Odkazy" }
    ],
    content: {
      "tool-a": createPlaceholderContent("tools", "tool-a", "Praktický nástroj A", "Místo pro budoucí kalkulačku, checklist nebo interaktivní přehled."),
      "tool-b": createPlaceholderContent("tools", "tool-b", "Praktický nástroj B", "Později sem můžeš přidat další JavaScriptovou funkci."),
      links: createPlaceholderContent("tools", "links", "Vybrané odkazy", "Připravený prostor pro odkazy na zdroje, dokumentaci a související projekty.")
    }
  }
};

/* ------------------------------------------------------------------------
   NÁHODNÉ PROMÍCHÁNÍ SEZNAMU

   Funkce vytvoří kopii seznamu a náhodně změní pořadí jeho položek.
   Původní seznam přitom přímo neupravuje.
   ------------------------------------------------------------------------ */
function shuffleArray(items) {
  const shuffledItems = [...items];

  /* Fisher–Yatesův algoritmus:
     postupuje seznamem odzadu a každou položku vymění
     s náhodně vybranou předchozí položkou. */
  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledItems[index], shuffledItems[randomIndex]] =
      [shuffledItems[randomIndex], shuffledItems[index]];
  }

  return shuffledItems;
}


/* Po každém načtení stránky náhodně promíchá slova hlavního nadpisu. */
websiteSections.home.content.overview.rotatingWords =
  shuffleArray(
    websiteSections.home.content.overview.rotatingWords
  );

/* ------------------------------------------------------------------------
   2) POMOCNÁ FUNKCE PRO UNIVERZÁLNÍ VÝPLŇ
   Díky této funkci nemusíme několikrát ručně opakovat stejná data.
   ------------------------------------------------------------------------ */
function createPlaceholderContent(section, item, title, lead) {
  return {
    path: `~/bytkojn/${section}/${item}`,
    title,
    lead,
    cards: [
      [
        "BLOK_A",
        "První obsahový blok",
        "Přepiš tento text na vlastní obsah."
      ],
      [
        "BLOK_B",
        "Druhý obsahový blok",
        "Každá karta může později odkazovat na samostatnou stránku."
      ],
      [
        "BLOK_C",
        "Třetí obsahový blok",
        "Vzhled a rozložení zůstávají společné pro celý web."
      ]
    ],
        detailTitle: "Univerzální připravená sekce.",
        detailText: "Název, popis i jednotlivé karty upravíš v souboru assets/js/app.js."
      };
    }

/* ------------------------------------------------------------------------
   3) NALEZENÍ HTML PRVKŮ
   document.querySelector hledá prvek podle CSS selektoru.
   ------------------------------------------------------------------------ */
const topTabs = document.querySelectorAll(".top-tab");
const sideNavigation = document.querySelector("#sideNavigation");
const sidebarTitle = document.querySelector("#sidebarTitle");
const sidebar = document.querySelector("#sidebar");

/* page-bitcoin.html používá vlastní strom a vlastní obsahový renderer. */
const isBitcoinPage = document.body.classList.contains("page-bitcoin");

const textElements = {
  path: document.querySelector("#terminalPath"),
  title: document.querySelector("#contentTitle"),
  lead: document.querySelector("#contentLead"),

  /* Celé klikací karty. */
  cardLinks: [
    document.querySelector("#cardOneLink"),
    document.querySelector("#cardTwoLink"),
    document.querySelector("#cardThreeLink")
  ],

  /* Malé horní štítky karet. */
  cardLabels: [
    document.querySelector("#cardOneLabel"),
    document.querySelector("#cardTwoLabel"),
    document.querySelector("#cardThreeLabel")
  ],

  /* Hlavní nadpisy karet. */
  cardTitles: [
    document.querySelector("#cardOneTitle"),
    document.querySelector("#cardTwoTitle"),
    document.querySelector("#cardThreeTitle")
  ],

  /* Krátké popisy karet. */
  cardTexts: [
    document.querySelector("#cardOneText"),
    document.querySelector("#cardTwoText"),
    document.querySelector("#cardThreeText")
  ]
};

/* Aktuálně vybraná hlavní sekce. */
let activeSectionKey = "home";
/* ------------------------------------------------------------------------
   4) DYNAMICKÝ HLAVNÍ NADPIS

   Pokud obsah obsahuje pole rotatingWords, bude JavaScript postupně
   měnit poslední slovo hlavního nadpisu.

   U ostatních stránek se zobrazí obyčejný pevný nadpis.
   ------------------------------------------------------------------------ */

/* Uchovává právě spuštěné časovače animace. */
let rotatingWordInterval = null;
let rotatingWordTimeout = null;


/* Zastaví předchozí animaci.
   Je to důležité při přechodu na jinou podsekci webu. */
function stopRotatingWord() {
  if (rotatingWordInterval !== null) {
    window.clearInterval(rotatingWordInterval);
    rotatingWordInterval = null;
  }

  if (rotatingWordTimeout !== null) {
    window.clearTimeout(rotatingWordTimeout);
    rotatingWordTimeout = null;
  }
}


/* Vytvoří buď dynamický, nebo obyčejný hlavní nadpis. */
function renderHeroTitle(content) {
  if (!textElements.title) {
    return;
  }

  /* Před vytvořením nového nadpisu zastavíme případnou starou animaci. */
  stopRotatingWord();


  /* Pokud obsah nemá seznam měnících se slov,
     zobrazí se obyčejný pevný nadpis. */
  if (
    !Array.isArray(content.rotatingWords) ||
    content.rotatingWords.length === 0
  ) {
    textElements.title.textContent = content.title;
    textElements.title.removeAttribute("aria-label");
    return;
  }


  /* Index právě zobrazeného slova. */
  let wordIndex = 0;


  /* Pevná část zůstane na prvním řádku.
    Měnící se slovo bude vždy na samostatném druhém řádku. */
  textElements.title.innerHTML =
    `${content.title}<span class="rotating-line"><span id="rotatingWord" class="rotating-word" aria-hidden="true">${content.rotatingWords[wordIndex]}</span></span>`;

  /* Čtečka obrazovky přečte pouze jednu stabilní variantu.
     Nebude každé tři sekundy oznamovat změnu slova. */
  textElements.title.setAttribute(
    "aria-label",
    `${content.title} ${content.rotatingWords[0]}`
  );


  /* Najde právě vytvořený span s měnícím se slovem. */
  const rotatingWord = textElements.title.querySelector("#rotatingWord");

  if (!rotatingWord) {
    return;
  }


  /* Každé tři sekundy spustí výměnu slova. */
  rotatingWordInterval = window.setInterval(() => {

    /* CSS třída nechá původní slovo krátce zmizet. */
    rotatingWord.classList.add("is-changing");


    /* Po dokončení přechodu se vloží další slovo. */
    rotatingWordTimeout = window.setTimeout(() => {
      wordIndex =
        (wordIndex + 1) % content.rotatingWords.length;

      rotatingWord.textContent =
        content.rotatingWords[wordIndex];

      rotatingWord.classList.remove("is-changing");
      rotatingWordTimeout = null;
    }, 220);

  }, 1500);
}

/* ------------------------------------------------------------------------
   4) VYTVOŘENÍ LEVÉHO MENU
   Funkce smaže staré položky a vytvoří nové podle aktivní horní záložky.
   ------------------------------------------------------------------------ */
function renderSideNavigation(sectionKey) {
  const section = websiteSections[sectionKey];

  if (
    !section ||
    !sidebar ||
    !sideNavigation ||
    !sidebarTitle
  ) {
    return;
  }

  activeSectionKey = sectionKey;


  /*
    Úvodní stránka nemá levou navigaci.
    Místo ní se zobrazí grafický circuit motiv.
  */
  if (sectionKey === "home") {
    sidebar.classList.add("is-home");

    sidebar.setAttribute(
      "aria-label",
      "Dekorativní panel úvodní stránky"
    );

    sideNavigation.innerHTML = "";

    /* Na úvodu se vždy načte hlavní obsah overview. */
    updateContent(section.content.overview);

    return;
  }


  /*
    V ostatních hlavních sekcích se grafika skryje
    a znovu se zobrazí běžná navigace.
  */
  sidebar.classList.remove("is-home");

  sidebar.setAttribute(
    "aria-label",
    "Navigace aktuální sekce"
  );

  sidebarTitle.textContent = section.title;
  sideNavigation.innerHTML = "";


  section.items.forEach((item, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "side-link";
    button.dataset.item = item.id;

    const number =
      String(index + 1).padStart(2, "0");

    button.innerHTML = `
      <span class="side-link-number">${number}</span>
      <span class="side-link-text">${item.label}</span>
    `;

    button.addEventListener("click", () => {
      setActiveSideItem(item.id);
      updateContent(section.content[item.id]);
    });

    sideNavigation.appendChild(button);
  });


  /* Po otevření sekce se zobrazí její první položka. */
  const firstItem = section.items[0];

  if (firstItem) {
    setActiveSideItem(firstItem.id);
    updateContent(section.content[firstItem.id]);
  }
}

/* ------------------------------------------------------------------------
   5) OZNAČENÍ AKTIVNÍ POLOŽKY LEVÉHO MENU
   Třída is-active mění vzhled vybraného tlačítka v CSS.
   ------------------------------------------------------------------------ */
function setActiveSideItem(itemId) {
  document.querySelectorAll(".side-link").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.item === itemId);
  });
}

/* ------------------------------------------------------------------------
   6) PŘEPSÁNÍ HLAVNÍHO OBSAHU
   Texty se mění bez obnovení celé stránky.
   ------------------------------------------------------------------------ */
function updateContent(content) {
  if (!content) {
    return;
  }

  textElements.path.textContent = content.path;
  renderHeroTitle(content);
  textElements.lead.textContent = content.lead;

  content.cards.forEach((card, index) => {
    const cardLink = textElements.cardLinks[index];
    const cardLabel = textElements.cardLabels[index];
    const cardTitle = textElements.cardTitles[index];
    const cardText = textElements.cardTexts[index];

    /* Jednotlivé údaje z pole karty. */
    const label = card[0];
    const title = card[1];
    const description = card[2];
    const href = card[3];

    /* Přepsání textového obsahu. */
    if (cardLabel) {
      cardLabel.textContent = label;
    }

    if (cardTitle) {
      cardTitle.textContent = title;
    }

    if (cardText) {
      cardText.textContent = description;
    }

    /*
      Pokud má karta zadanou adresu, bude klikací.
      Pokud adresa chybí, href se odstraní.
    */
    if (cardLink && href) {
      cardLink.setAttribute("href", href);
      cardLink.removeAttribute("aria-disabled");
    } else if (cardLink) {
      cardLink.removeAttribute("href");
      cardLink.setAttribute("aria-disabled", "true");
    }
  });
}

/* ------------------------------------------------------------------------
   7) KLIKÁNÍ NA HORNÍ ZÁLOŽKY
   data-section v HTML určuje, kterou část objektu websiteSections použít.
   ------------------------------------------------------------------------ */
if (!isBitcoinPage) {
  topTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const sectionKey = tab.dataset.section;

      topTabs.forEach((otherTab) => {
        otherTab.classList.toggle("is-active", otherTab === tab);
      });

      renderSideNavigation(sectionKey);
    });
  });
}


/* ------------------------------------------------------------------------
   9) AUTOMATICKÝ ROK VE SPODNÍ LIŠTĚ
   Díky tomu nebude potřeba rok každý leden ručně přepisovat.
   ------------------------------------------------------------------------ */
const currentYear = document.querySelector("#currentYear");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* ------------------------------------------------------------------------
   10) PRVNÍ SPUŠTĚNÍ
   Po načtení stránky vytvoří levé menu pro úvodní sekci.
   ------------------------------------------------------------------------ */
if (!isBitcoinPage) {
  renderSideNavigation(activeSectionKey);
}

/* ========================================================================
   11) STRÁNKA BITCOIN — ROZBALOVACÍ STROM A ODBORNÉ ČLÁNKY
   ======================================================================== */

const bitcoinOverview = {
  path: "~/bytkojn/bitcoin",
  kicker: "// ZÁKLADY A PRINCIPY",
  title: "Bitcoin",
  lead:
    "Od základních principů přes historii a fungování sítě " +
    "až po technické detaily, bezpečnost a používání.",
  html: document.querySelector("#articleContent")?.innerHTML ?? ""
};

function updateBitcoinPageContent(content) {
  if (!content) {
    return;
  }

  const terminalPath = document.querySelector("#terminalPath");
  const contentKicker = document.querySelector("#contentKicker");
  const contentTitle = document.querySelector("#contentTitle");
  const contentLead = document.querySelector("#contentLead");
  const articleContent = document.querySelector("#articleContent");

  if (terminalPath) {
    terminalPath.textContent = content.path;
  }

  if (contentKicker) {
    contentKicker.textContent = content.kicker;
  }

  if (contentTitle) {
    contentTitle.textContent = content.title;
  }

  if (contentLead) {
    contentLead.textContent = content.lead;
  }

  if (articleContent) {
    articleContent.innerHTML = content.html;
    articleContent.classList.toggle("is-overview", content === bitcoinOverview);
  }

  document.body.classList.toggle(
    "is-bitcoin-overview",
    content === bitcoinOverview
  );
}

const bitcoinArticles = {
  "bitcoin-v-kostce": {
    path: "~/bytkojn/bitcoin/co-je-bitcoin/bitcoin-v-kostce",
    kicker: "01 / CO JE BITCOIN",
    title: "Bitcoin v kostce",
    lead:
      "Základní orientace v tom, co Bitcoin je, z jakých vrstev se skládá " +
      "a čím se liší od běžné služby nebo firmy.",
    html: `
      <section class="article-section">
        <p class="article-intro">
          Bitcoin je otevřený systém digitálních peněz, který umožňuje
          převádět hodnotu přímo mezi uživateli bez nutnosti centrálního
          provozovatele. Nejde pouze o měnu ani pouze o databázi: Bitcoin
          současně označuje síť, soubor pravidel a měnovou jednotku této sítě.
        </p>

        <p>
          Síť tvoří nezávisle provozované počítače, které si předávají
          transakce a bloky a samostatně ověřují jejich platnost. Uživatel
          proto nemusí přijímat účetní záznam jedné společnosti jako
          konečnou autoritu; může dodržení pravidel ověřovat vlastním uzlem.
        </p>
      </section>

      <aside class="article-callout" aria-label="Definice Bitcoinu">
        <span class="article-callout-label">// DEFINICE</span>
        <h2>Bitcoin</h2>
        <p>
          Decentralizovaná peer-to-peer síť a otevřený protokol pro převod
          a evidenci digitální peněžní hodnoty. Měnová jednotka systému se
          označuje jako bitcoin, případně zkratkou BTC.
        </p>
      </aside>

      <section class="article-media-row">
        <div class="article-media-copy">
          <h2>Jedno slovo, tři související významy</h2>
          <p>
            Pojem Bitcoin se používá pro síť propojených uzlů, pro pravidla,
            podle nichž síť funguje, a také pro peněžní jednotku převáděnou
            mezi uživateli. Tyto významy spolu souvisejí, ale nejsou totožné.
          </p>

          <ul class="article-list">
            <li><strong>Síť:</strong> počítače, které spolu komunikují.</li>
            <li><strong>Protokol:</strong> pravidla pro transakce, bloky a emisi.</li>
            <li><strong>BTC:</strong> měnová jednotka evidovaná systémem.</li>
          </ul>
        </div>

        <figure class="article-visual">
          <div class="article-visual-placeholder">
            <span class="article-visual-label">// BUDOUCÍ GRAFIKA</span>
            <strong>Síť → protokol → BTC</strong>
            Sem lze později vložit vlastní SVG, obrázek nebo diagram.
          </div>
        </figure>
      </section>

      <section class="article-media-row is-media-left">
        <div class="article-media-copy">
          <h2>Bitcoin není firma ani aplikace</h2>
          <p>
            Neexistuje jediný provozovatel, který by vlastnil celou síť,
            schvaloval jednotlivé platby nebo mohl libovolně přepsat její
            pravidla. Konkrétní peněženky, burzy a služby jsou pouze aplikace
            a společnosti postavené kolem Bitcoinu; nejsou Bitcoinem samotným.
          </p>
        </div>

        <figure class="article-visual">
          <div class="article-visual-placeholder">
            <span class="article-visual-label">// BUDOUCÍ VYSVĚTLIVKA</span>
            <strong>Bitcoin ≠ burza ≠ peněženka</strong>
            Vlevo může být schéma, definice nebo srovnávací tabulka.
          </div>
        </figure>
      </section>

      <aside class="article-note">
        <span class="article-note-label">// POZNÁMKA K DALŠÍMU TEXTU</span>
        <p>
          Tohle je zatím ukázková skladba článku. Mezi odstavce lze vkládat
          definice, obrázky, grafy, tabulky, citace, technické poznámky nebo
          celé dvousloupcové bloky s grafikou vlevo či vpravo.
        </p>
      </aside>
    `
  },

  "sit-protokol-btc": {
    path: "~/bytkojn/bitcoin/co-je-bitcoin/sit-protokol-btc",
    kicker: "01 / CO JE BITCOIN",
    title: "Síť, protokol a BTC",
    lead:
      "Tři vrstvy, které se běžně označují jedním slovem Bitcoin, " +
      "ale každá z nich má jinou úlohu.",
    html: `
      <section class="article-section">
        <p class="article-intro">
          Bitcoin lze chápat jako síť účastníků, jako protokol určující
          pravidla jejich komunikace a jako měnovou jednotku evidovanou
          podle těchto pravidel.
        </p>
        <h2>Síť</h2>
        <p>Propojuje uzly, které si předávají transakce a bloky.</p>
        <h2>Protokol</h2>
        <p>Určuje podmínky platnosti transakcí, bloků a emisního plánu.</p>
        <h2>BTC</h2>
        <p>Je účetní jednotkou, ve které jsou vyjadřovány převáděné částky.</p>
      </section>
    `
  },

  "kdo-bitcoin-ridi": {
    path: "~/bytkojn/bitcoin/co-je-bitcoin/kdo-bitcoin-ridi",
    kicker: "01 / CO JE BITCOIN",
    title: "Kdo Bitcoin řídí",
    lead:
      "Bitcoin nemá centrálního správce. Jeho fungování vzniká souhrou " +
      "uživatelů, uzlů, vývojářů, těžařů a ekonomických pobídek.",
    html: `
      <section class="article-section">
        <p class="article-intro">
          Žádná jednotlivá skupina nemůže sama rozhodnout, co je platný
          Bitcoin. Vývojáři navrhují software, těžaři sestavují bloky,
          ale jednotlivé uzly si samy ověřují, zda přijatá data splňují
          pravidla, která jejich provozovatel zvolil.
        </p>
      </section>
      <aside class="article-callout">
        <span class="article-callout-label">// ZÁKLADNÍ PRINCIP</span>
        <h2>Pravidla se nevynucují titulem, ale ověřováním</h2>
        <p>Každý plný uzel může odmítnout transakci nebo blok, který nesplňuje pravidla.</p>
      </aside>
    `
  },

  "zakladni-vlastnosti": {
    path: "~/bytkojn/bitcoin/co-je-bitcoin/zakladni-vlastnosti",
    kicker: "01 / CO JE BITCOIN",
    title: "Základní vlastnosti",
    lead:
      "Omezená nabídka, dělitelnost, ověřitelnost, převoditelnost " +
      "a odolnost vůči jednostranné kontrole.",
    html: `
      <section class="article-section">
        <p class="article-intro">
          Vlastnosti Bitcoinu nevycházejí z jediného prvku. Vznikají kombinací
          kryptografie, distribuované sítě, konsenzuálních pravidel,
          proof-of-work a ekonomických pobídek.
        </p>
        <ul class="article-list">
          <li>předvídatelná a omezená nabídka,</li>
          <li>snadná dělitelnost a převoditelnost,</li>
          <li>nezávislé ověřování platnosti,</li>
          <li>otevřený přístup k síti,</li>
          <li>odolnost vůči jednostranné změně historie nebo pravidel.</li>
        </ul>
      </section>
    `
  },

  "bitcoin-a-blockchain": {
    path: "~/bytkojn/bitcoin/co-je-bitcoin/bitcoin-a-blockchain",
    kicker: "01 / CO JE BITCOIN",
    title: "Bitcoin a blockchain",
    lead:
      "Blockchain je důležitá datová struktura Bitcoinu, nikoli synonymum " +
      "pro celý systém.",
    html: `
      <section class="article-section">
        <p class="article-intro">
          Blockchain zachycuje chronologickou návaznost potvrzených bloků.
          Sám o sobě ale nevysvětluje, kdo data ověřuje, podle jakých pravidel
          jsou přijímána ani proč je přepis historie nákladný.
        </p>
      </section>
      <aside class="article-note">
        <span class="article-note-label">// DŮLEŽITÉ ROZLIŠENÍ</span>
        <p>Bitcoin používá blockchain, ale Bitcoin není pouze blockchain.</p>
      </aside>
    `
  },

  "co-bitcoin-neni": {
    path: "~/bytkojn/bitcoin/co-je-bitcoin/co-bitcoin-neni",
    kicker: "01 / CO JE BITCOIN",
    title: "Co Bitcoin není",
    lead:
      "Vymezení nejčastějších záměn: Bitcoin není firma, účet u poskytovatele " +
      "ani jedna konkrétní aplikace.",
    html: `
      <section class="article-section">
        <p class="article-intro">
          Pro pochopení Bitcoinu je užitečné oddělit samotný protokol od služeb,
          které kolem něj vznikly. Burza může držet bitcoin za zákazníka,
          peněženka může spravovat klíče a průzkumník může zobrazovat data,
          ale žádná z těchto služeb sama Bitcoin netvoří ani neovládá.
        </p>
        <ul class="article-list">
          <li>není to obchodní společnost,</li>
          <li>není to jedna centrální databáze,</li>
          <li>není to konkrétní peněženka nebo burza,</li>
          <li>není to anonymní účet vedený jedním provozovatelem.</li>
        </ul>
      </section>
    `
  }
};

function renderBitcoinArticle(articleId) {
  const article = bitcoinArticles[articleId];

  if (!article) {
    return;
  }

  updateBitcoinPageContent(article);

  const bitcoinOverviewLink = document.querySelector("#bitcoinOverviewLink");
  bitcoinOverviewLink?.classList.remove("is-active");
  bitcoinOverviewLink?.removeAttribute("aria-current");

  document.querySelectorAll(".tree-article-link").forEach((link) => {
    link.classList.toggle(
      "is-active",
      link.dataset.article === articleId
    );
  });

  const activeLink = document.querySelector(
    `.tree-article-link[data-article="${articleId}"]`
  );

  if (activeLink) {
    const activeGroup = activeLink.closest(".tree-group");
    const activeToggle = activeGroup?.querySelector(".tree-section-toggle");
    const activeChildren = activeGroup?.querySelector(".tree-children");

    document.querySelectorAll(".tree-section-toggle").forEach((toggle) => {
      toggle.classList.toggle("is-active", toggle === activeToggle);
    });

    if (activeToggle && activeChildren) {
      activeToggle.setAttribute("aria-expanded", "true");
      activeGroup.classList.add("is-open");
      activeChildren.hidden = false;
    }
  }
}

function renderBitcoinOverview() {
  updateBitcoinPageContent(bitcoinOverview);

  const bitcoinOverviewLink = document.querySelector("#bitcoinOverviewLink");
  bitcoinOverviewLink?.classList.add("is-active");
  bitcoinOverviewLink?.setAttribute("aria-current", "page");

  document.querySelectorAll(".tree-article-link").forEach((link) => {
    link.classList.remove("is-active");
  });

  document.querySelectorAll(".tree-section-toggle").forEach((toggle) => {
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");

    const controlsId = toggle.getAttribute("aria-controls");
    const children = controlsId
      ? document.querySelector(`#${controlsId}`)
      : null;

    toggle.closest(".tree-group")?.classList.remove("is-open");

    if (children) {
      children.hidden = true;
    }
  });
}

function initBitcoinPage() {
  if (!isBitcoinPage) {
    return;
  }

  const bitcoinTree = document.querySelector("#bitcoinTree");
  const bitcoinOverviewLink = document.querySelector("#bitcoinOverviewLink");

  if (!bitcoinTree) {
    return;
  }

  bitcoinOverviewLink?.addEventListener("click", () => {
    renderBitcoinOverview();
  });

  bitcoinTree.addEventListener("click", (event) => {
    const sectionToggle = event.target.closest(".tree-section-toggle");
    const articleLink = event.target.closest(".tree-article-link");

    if (sectionToggle) {
      const controlsId = sectionToggle.getAttribute("aria-controls");
      const children = controlsId
        ? document.querySelector(`#${controlsId}`)
        : null;

      const willOpen =
        sectionToggle.getAttribute("aria-expanded") !== "true";

      sectionToggle.setAttribute(
        "aria-expanded",
        String(willOpen)
      );

      sectionToggle
        .closest(".tree-group")
        ?.classList.toggle("is-open", willOpen);

      if (children) {
        children.hidden = !willOpen;
      }
    }

    if (articleLink) {
      renderBitcoinArticle(articleLink.dataset.article);
    }
  });

  renderBitcoinOverview();
}

initBitcoinPage();