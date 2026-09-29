/* Construct Corp — interactions & animations */

(function () {
  "use strict";

  /* ============================================================
     Blueprint illustrations — bespoke line-art per category,
     rendered on the fly so every card in the same category
     shares the same "technical plan" plate.
     ============================================================ */

  const ICONS = {
    "salle-de-bain": `
      <rect x="8" y="32" width="36" height="18" rx="7" fill="var(--orange)" fill-opacity="0.15" stroke="var(--orange-deep)"/>
      <line x1="8" y1="41" x2="1" y2="41" stroke="var(--black)"/>
      <circle cx="50" cy="12" r="4" fill="none" stroke="var(--black)"/>
      <line x1="50" y1="16" x2="50" y2="26" stroke="var(--black)"/>
      <line x1="45" y1="28" x2="41" y2="35" stroke="var(--navy)"/>
      <line x1="50" y1="29" x2="50" y2="36" stroke="var(--navy)"/>
      <line x1="55" y1="28" x2="59" y2="35" stroke="var(--navy)"/>`,
    "cuisine": `
      <path d="M14 18 L24 6 H40 L50 18" fill="none" stroke="var(--black)"/>
      <circle cx="20" cy="28" r="3.4" fill="var(--orange)" fill-opacity="0.6" stroke="var(--orange-deep)"/>
      <circle cx="32" cy="28" r="3.4" fill="var(--orange)" fill-opacity="0.6" stroke="var(--orange-deep)"/>
      <circle cx="44" cy="28" r="3.4" fill="var(--orange)" fill-opacity="0.6" stroke="var(--orange-deep)"/>
      <line x1="8" y1="36" x2="56" y2="36" stroke="var(--black)" stroke-width="2"/>
      <rect x="8" y="40" width="48" height="16" fill="none" stroke="var(--black)"/>
      <line x1="20" y1="40" x2="20" y2="56" stroke="var(--black)"/>
      <line x1="32" y1="40" x2="32" y2="56" stroke="var(--black)"/>
      <line x1="44" y1="40" x2="44" y2="56" stroke="var(--black)"/>`,
    "extension": `
      <path d="M10 56 V30 L27 14 L44 30 V40" fill="none" stroke="var(--black)"/>
      <line x1="10" y1="56" x2="44" y2="56" stroke="var(--black)"/>
      <rect x="40" y="40" width="18" height="16" fill="var(--navy)" fill-opacity="0.1" stroke="var(--navy)" stroke-dasharray="3 3"/>
      <line x1="49" y1="40" x2="49" y2="56" stroke="var(--navy)" stroke-dasharray="2 2"/>`,
    "facade": `
      <rect x="10" y="12" width="10" height="44" fill="none" stroke="var(--black)"/>
      <rect x="20" y="12" width="10" height="44" fill="var(--navy)" fill-opacity="0.12" stroke="var(--navy)"/>
      <rect x="30" y="12" width="6" height="44" fill="none" stroke="var(--black)"/>
      <rect x="40" y="24" width="14" height="18" fill="var(--orange)" fill-opacity="0.15" stroke="var(--orange-deep)"/>
      <line x1="44" y1="10" x2="48" y2="4" stroke="var(--orange-deep)"/>
      <line x1="50" y1="10" x2="54" y2="4" stroke="var(--orange-deep)"/>
      <line x1="56" y1="14" x2="60" y2="9" stroke="var(--orange-deep)"/>`,
    "combles": `
      <path d="M6 42 L32 12 L58 42" fill="none" stroke="var(--black)"/>
      <line x1="6" y1="42" x2="58" y2="42" stroke="var(--black)"/>
      <path d="M22 22 L30 12 L38 22 V34 H22 Z" fill="var(--orange)" fill-opacity="0.15" stroke="var(--orange-deep)"/>
      <rect x="14" y="42" width="12" height="8" fill="none" stroke="var(--navy)"/>
      <circle cx="18" cy="46" r="1.6" fill="var(--navy)"/>`,
    "renovation-complete": `
      <rect x="8" y="8" width="48" height="48" fill="none" stroke="var(--black)"/>
      <line x1="34" y1="8" x2="34" y2="56" stroke="var(--black)"/>
      <line x1="8" y1="34" x2="34" y2="34" stroke="var(--black)"/>
      <path d="M34 20 A10 10 0 0 1 24 30" fill="none" stroke="var(--navy)" stroke-dasharray="2 2"/>
      <path d="M20 34 A8 8 0 0 1 12 42" fill="none" stroke="var(--navy)" stroke-dasharray="2 2"/>
      <rect x="12" y="12" width="16" height="16" fill="var(--orange)" fill-opacity="0.08"/>`
  };

  const STAMPS = {
    "salle-de-bain": "SDB",
    "cuisine": "CUI",
    "extension": "EXT",
    "facade": "FAC",
    "combles": "CBL",
    "renovation-complete": "REN"
  };

  let uidCounter = 0;

  function blueprintSVG(categoryKey, codeText) {
    const id = "bp" + uidCounter++;
    const icon = ICONS[categoryKey] || "";
    const stamp = STAMPS[categoryKey] || "";
    return `
      <svg viewBox="0 0 400 300" role="img" aria-hidden="true">
        <defs>
          <pattern id="${id}" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" fill="var(--navy)" fill-opacity="0.16"/>
          </pattern>
        </defs>
        <rect width="400" height="300" fill="var(--paper)"/>
        <rect width="400" height="300" fill="url(#${id})"/>
        <g stroke="var(--black)" stroke-opacity="0.4" fill="none" stroke-width="1.3">
          <path d="M14 30V14H30"/>
          <path d="M370 14H386V30"/>
          <path d="M386 270V286H370"/>
          <path d="M30 286H14V270"/>
        </g>
        <g transform="translate(136,86) scale(2)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          ${icon}
        </g>
        <g transform="translate(345,42) rotate(-9)">
          <circle r="26" fill="none" stroke="var(--orange-deep)" stroke-width="1.3" stroke-dasharray="3 3"/>
          <text text-anchor="middle" dy="5" font-family="IBM Plex Mono, monospace" font-size="13" font-weight="600" fill="var(--orange-deep)">${stamp}</text>
        </g>
        <text x="18" y="284" font-family="IBM Plex Mono, monospace" font-size="12" fill="var(--black)" fill-opacity="0.55">${codeText}</text>
      </svg>`;
  }

  /* ============================================================
     Content — services, projects, testimonials
     ============================================================ */

  const SERVICES = [
    {
      key: "salle-de-bain",
      name: "Salle de bain",
      desc: "De la douche à l'italienne à l'évacuation qu'on découvre en général en cassant le carrelage. On chiffre la marge d'incertitude au devis, pas en cours de chantier.",
      duration: "1 à 3 semaines",
      budget: "5 000 – 18 000 €",
      code: "SERV.01",
      included: ["Dépose complète et évacuation des gravats", "Reprise plomberie et étanchéité (SPEC)", "Carrelage, faïence et receveur extra-plat", "Adaptation PMR sur demande"]
    },
    {
      key: "cuisine",
      name: "Cuisine",
      desc: "Ouverture sur le séjour, déplacement de l'évier ou de l'arrivée de gaz : la partie invisible du chantier compte plus que le choix des façades.",
      duration: "3 à 6 semaines",
      budget: "8 000 – 30 000 €",
      code: "SERV.02",
      included: ["Étude de mur porteur si ouverture", "Plomberie, électricité et hotte", "Pose du mobilier et du plan de travail", "Raccordement électroménager"]
    },
    {
      key: "extension",
      name: "Extension",
      desc: "Ossature bois, véranda ou surélévation. On dépose le permis de construire ou la déclaration préalable avec vous, avant de sortir un seul outil.",
      duration: "3 à 5 mois",
      budget: "1 200 – 2 200 €/m²",
      code: "SERV.03",
      included: ["Dépôt des autorisations d'urbanisme", "Fondations et gros œuvre", "Étanchéité, isolation, menuiseries", "Raccordement au bâti existant"]
    },
    {
      key: "facade",
      name: "Façade & isolation",
      desc: "Ravalement, isolation thermique par l'extérieur, toiture. Souvent un dossier de copropriété à monter avant le premier échafaudage.",
      duration: "6 à 12 semaines",
      budget: "80 – 180 €/m²",
      code: "SERV.04",
      included: ["Diagnostic de façade et devis technique", "Isolation thermique par l'extérieur (ITE)", "Ravalement, enduit et peinture", "Dossier de présentation en assemblée générale"]
    },
    {
      key: "renovation-complete",
      name: "Rénovation complète",
      desc: "Studio haussmannien ou T5 des années 70 : électricité, plomberie et isolation reprises avant de toucher aux finitions.",
      duration: "4 à 7 mois",
      budget: "900 – 1 600 €/m²",
      code: "SERV.05",
      included: ["Mise aux normes électrique et plomberie", "Isolation, cloisons et menuiseries", "Sols, peintures et finitions", "Coordination des corps de métier"]
    },
    {
      key: "combles",
      name: "Combles",
      desc: "Création d'une chambre ou d'un bureau sous toiture : isolation, fenêtres de toit et parfois renfort de plancher.",
      duration: "2 à 4 semaines",
      budget: "700 – 1 300 €/m²",
      code: "SERV.06",
      included: ["Vérification de la charpente et du plancher", "Isolation sous rampants", "Pose de fenêtres de toit", "Électricité et finitions"]
    }
  ];

  const PROJECTS = [
    { code: "CHT-014", cat: "salle-de-bain", title: "Salle de bain à l'italienne", place: "Villeurbanne", size: "6 m²", duration: "9 jours" },
    { code: "CHT-021", cat: "cuisine", title: "Cuisine ouverte sur séjour", place: "Lyon 7e", size: "14 m²", duration: "5 semaines" },
    { code: "CHT-018", cat: "extension", title: "Extension bois sur jardin", place: "Caluire-et-Cuire", size: "28 m²", duration: "4 mois" },
    { code: "CHT-026", cat: "facade", title: "Ravalement + ITE", place: "Lyon 6e", size: "Immeuble R+4", duration: "3 mois" },
    { code: "CHT-009", cat: "combles", title: "Combles aménagés en chambre", place: "Bron", size: "22 m²", duration: "3 semaines" },
    { code: "CHT-031", cat: "renovation-complete", title: "Rénovation complète d'un T3", place: "Oullins", size: "68 m²", duration: "5 mois" },
    { code: "CHT-007", cat: "salle-de-bain", title: "Salle de bain PMR", place: "Vénissieux", size: "5 m²", duration: "8 jours" },
    { code: "CHT-029", cat: "cuisine", title: "Cuisine et électricité refaites", place: "Écully", size: "11 m²", duration: "4 semaines" },
    { code: "CHT-033", cat: "extension", title: "Garage transformé en studio", place: "Saint-Priest", size: "24 m²", duration: "4 mois" }
  ];

  const CAT_LABELS = {
    "salle-de-bain": "Salle de bain",
    "cuisine": "Cuisine",
    "extension": "Extension",
    "facade": "Façade & extérieur",
    "combles": "Combles",
    "renovation-complete": "Rénovation complète"
  };

  const TESTIMONIALS = [
    { stars: 5, quote: "On a trouvé une fuite active derrière le carrelage le deuxième jour de démolition. Ils nous ont montré le surcoût réel — 340 €, pas un chiffre rond sorti du chapeau — avant de continuer. Le reste du devis n'a pas bougé.", name: "Camille Reynaud", place: "Villeurbanne", tag: "Salle de bain, mars 2025" },
    { stars: 5, quote: "On avait fait ouvrir le mur entre cuisine et salon nous-mêmes avant de les appeler — mauvaise idée. Ils ont repris le dossier, fait valider la structure par un bureau d'études, et tenu le planning qu'on avait raté de trois mois avec l'entreprise précédente.", name: "Thomas Bellamy", place: "Lyon 7e", tag: "Cuisine ouverte, nov. 2024" },
    { stars: 5, quote: "Le conducteur de travaux rencontré au premier rendez-vous est resté le même jusqu'à la réception, six mois plus tard. Aucune des trois entreprises contactées avant n'avait pu nous garantir ça.", name: "Nadia Ferhat", place: "Caluire-et-Cuire", tag: "Extension 28 m², été 2024" },
    { stars: 4.5, quote: "Ravalement sur un immeuble des années 30, avec syndic et copropriétaires à convaincre. Ils sont venus présenter le projet en assemblée générale eux-mêmes, schémas à l'appui. Ça a évité deux mois de mails contradictoires.", name: "Marc-Antoine Guyot", place: "Lyon 6e — syndic bénévole", tag: "Façade & isolation, 2024" },
    { stars: 5, quote: "Combles aménagés en chambre pour notre fille, avec fenêtre de toit. Chantier de trois semaines, exactement ce qui était écrit sur le planning distribué le premier jour.", name: "Élise Vasseur", place: "Bron — aucun lien avec le fondateur", tag: "Combles, janv. 2025" },
    { stars: 5, quote: "Rénovation complète d'un T3 des années 70 qu'on venait d'acheter. Ils ont géré la demande de travaux en copropriété à notre place, dossier inclus dans le devis. On ne savait même pas que ça se faisait.", name: "Paul Tissandier", place: "Oullins", tag: "Rénovation complète, 2025" }
  ];

  function starRow(value) {
    let out = "";
    for (let i = 1; i <= 5; i++) {
      if (value >= i) out += "★";
      else if (value >= i - 0.5) out += "⯪";
      else out += "☆";
    }
    return out;
  }

  /* ============================================================
     Header — scroll state + mobile nav
     ============================================================ */

  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  });

  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  mainNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.classList.remove("is-active");
    });
  });

  /* ============================================================
     Services — interactive tabs
     ============================================================ */

  const serviceList = document.getElementById("serviceList");
  const servicePanel = document.getElementById("servicePanel");

  function renderServiceList(activeKey) {
    serviceList.innerHTML = SERVICES.map((s, i) => `
      <button class="service-tab" role="tab" data-key="${s.key}" aria-selected="${s.key === activeKey}">
        <span class="idx">${String(i + 1).padStart(2, "0")}</span>
        <span class="name">${s.name}</span>
        <svg class="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>`).join("");

    serviceList.querySelectorAll(".service-tab").forEach((btn) => {
      btn.addEventListener("click", () => selectService(btn.dataset.key));
    });
  }

  function renderServicePanel(service) {
    const panelContent = `
      <div class="visual">${blueprintSVG(service.key, service.code)}</div>
      <h3>${service.name}</h3>
      <p class="desc">${service.desc}</p>
      <div class="service-meta">
        <div><span>Durée moyenne</span><strong>${service.duration}</strong></div>
        <div><span>Budget indicatif</span><strong>${service.budget}</strong></div>
      </div>
      <ul class="service-included">
        ${service.included.map((item) => `
          <li>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M20 6L9 17l-5-5"/></svg>
            ${item}
          </li>`).join("")}
      </ul>`;

    if (window.gsap) {
      gsap.fromTo(servicePanel, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", onStart: () => { servicePanel.innerHTML = panelContent; } });
    } else {
      servicePanel.innerHTML = panelContent;
    }
  }

  function selectService(key) {
    const service = SERVICES.find((s) => s.key === key) || SERVICES[0];
    renderServiceList(key);
    renderServicePanel(service);
  }

  selectService(SERVICES[0].key);

  /* ============================================================
     Showcase — filterable project grid
     ============================================================ */

  const projectGrid = document.getElementById("projectGrid");
  const filterRow = document.getElementById("filterRow");

  projectGrid.innerHTML = PROJECTS.map((p) => `
    <div class="project-card reveal" data-category="${p.cat}">
      <div class="visual">${blueprintSVG(p.cat, p.code)}</div>
      <div class="card-body">
        <span class="code">${p.code}</span>
        <h3>${p.title}</h3>
        <div class="meta">
          <span>${p.place}</span>
          <span>${p.size}</span>
          <span>${p.duration}</span>
        </div>
      </div>
    </div>`).join("");

  filterRow.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;

    filterRow.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;
    const cards = Array.from(projectGrid.querySelectorAll(".project-card"));

    const run = () => {
      cards.forEach((card) => {
        const match = filter === "tout" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !match);
      });
      const visible = cards.filter((c) => !c.classList.contains("is-hidden"));
      if (window.gsap) {
        gsap.fromTo(visible, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" });
      }
    };

    if (window.gsap) {
      gsap.to(cards, { opacity: 0, y: 8, duration: 0.16, onComplete: run });
    } else {
      run();
    }
  });

  /* ============================================================
     Testimonials — carousel
     ============================================================ */

  const testimonialTrack = document.getElementById("testimonialTrack");

  testimonialTrack.innerHTML = TESTIMONIALS.map((t) => `
    <div class="testimonial-card reveal">
      <div class="stars">${starRow(t.stars)}</div>
      <p class="quote">“${t.quote}”</p>
      <div class="who">
        <div>
          <strong>${t.name}</strong>
          <span>${t.place}</span>
        </div>
        <span class="tag">${t.tag}</span>
      </div>
    </div>`).join("");

  document.getElementById("prevTestimonial").addEventListener("click", () => scrollTrack(-1));
  document.getElementById("nextTestimonial").addEventListener("click", () => scrollTrack(1));

  function scrollTrack(dir) {
    const card = testimonialTrack.querySelector(".testimonial-card");
    if (!card) return;
    const gap = 22;
    const amount = (card.offsetWidth + gap) * dir;
    testimonialTrack.scrollBy({ left: amount, behavior: "smooth" });
  }

  /* ============================================================
     Contact wizard
     ============================================================ */

  const wizardStage = document.getElementById("wizardStage");
  const wizardSteps = Array.from(wizardStage.querySelectorAll(".wizard-step"));
  const wizardSuccess = document.getElementById("wizardSuccess");
  const wizardBar = document.getElementById("wizardBar");
  const wizardLabel = document.getElementById("wizardLabel");
  const wizardBack = document.getElementById("wizardBack");
  const wizardSummary = document.getElementById("wizardSummary");
  const TOTAL_STEPS = wizardSteps.length;

  const state = { project: null, scope: null, timeline: null, budget: null };
  let currentStep = 1;

  function updateProgress() {
    wizardBar.style.width = (currentStep / TOTAL_STEPS) * 100 + "%";
    wizardLabel.textContent = `Étape ${currentStep} / ${TOTAL_STEPS}`;
    wizardBack.classList.toggle("show", currentStep > 1);
  }

  function goToStep(n) {
    const current = wizardStage.querySelector(".wizard-step.is-active");
    const target = wizardSteps.find((s) => Number(s.dataset.step) === n);
    if (!target) return;

    const finish = () => {
      wizardSteps.forEach((s) => s.classList.remove("is-active"));
      target.classList.add("is-active");
      currentStep = n;
      updateProgress();
      preselect(target);
      if (n === TOTAL_STEPS) renderSummary();
      if (window.gsap) {
        gsap.fromTo(target, { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" });
      }
    };

    if (window.gsap && current) {
      gsap.to(current, { opacity: 0, x: -16, duration: 0.2, onComplete: finish });
    } else {
      finish();
    }
  }

  function preselect(stepEl) {
    const group = stepEl.querySelector("[data-group]");
    if (!group) return;
    const key = group.dataset.group;
    group.querySelectorAll(".option-card").forEach((btn) => {
      btn.classList.toggle("is-selected", btn.dataset.value === state[key]);
    });
  }

  function renderSummary() {
    const items = [state.project, state.scope, state.timeline, state.budget].filter(Boolean);
    wizardSummary.innerHTML = items.map((v) => `<span class="sum-chip">${v}</span>`).join("");
  }

  wizardStage.querySelectorAll("[data-group]").forEach((group) => {
    const key = group.dataset.group;
    group.querySelectorAll(".option-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        group.querySelectorAll(".option-card").forEach((b) => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        state[key] = btn.dataset.value;
        window.setTimeout(() => {
          if (currentStep < TOTAL_STEPS) goToStep(currentStep + 1);
        }, 380);
      });
    });
  });

  wizardBack.addEventListener("click", () => {
    if (currentStep > 1) goToStep(currentStep - 1);
  });

  document.getElementById("wizardSubmit").addEventListener("click", () => {
    const name = document.getElementById("fName").value.trim();
    const contactVal = document.getElementById("fPhone").value.trim() || document.getElementById("fEmail").value.trim();
    const zip = document.getElementById("fZip").value.trim();

    if (!name || !contactVal) {
      const field = !name ? document.getElementById("fName") : document.getElementById("fPhone");
      field.focus();
      if (window.gsap) {
        gsap.fromTo(field, { x: -6 }, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" });
      }
      return;
    }

    const projectLabel = state.project || "votre projet";
    const zipText = zip ? ` à ${zip}` : "";
    document.getElementById("wizardSuccessText").textContent =
      `Un conducteur de travaux vous recontacte sous 24 h ouvrées pour votre projet « ${projectLabel} »${zipText}.`;

    wizardStage.querySelectorAll(".wizard-step").forEach((s) => s.classList.remove("is-active"));
    wizardSuccess.style.display = "block";
    wizardBack.classList.remove("show");
    wizardBar.style.width = "100%";
    wizardLabel.textContent = "Terminé";

    if (window.gsap) {
      gsap.fromTo(wizardSuccess, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
      gsap.fromTo(wizardSuccess.querySelector(".check"), { scale: 0 }, { scale: 1, duration: 0.5, delay: 0.15, ease: "back.out(2.4)" });
    }
  });

  document.getElementById("wizardReset").addEventListener("click", () => {
    Object.keys(state).forEach((k) => (state[k] = null));
    ["fName", "fPhone", "fEmail", "fZip"].forEach((id) => (document.getElementById(id).value = ""));
    wizardStage.querySelectorAll(".option-card").forEach((b) => b.classList.remove("is-selected"));
    wizardSuccess.style.display = "none";
    currentStep = 1;
    wizardSteps.forEach((s) => s.classList.remove("is-active"));
    wizardSteps[0].classList.add("is-active");
    updateProgress();
  });

  updateProgress();

  /* ============================================================
     GSAP — scroll reveal + hero draw-in
     ============================================================ */

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.gsap && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

    // Hero headline lines
    gsap.set(".hero-copy h1 .line > span", { yPercent: 110 });
    gsap.to(".hero-copy h1 .line > span", {
      yPercent: 0,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.08,
      delay: 0.15
    });

    gsap.from(".hero-copy .sub, .hero-cta, .hero-meta .item", {
      opacity: 0,
      y: 16,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.08,
      delay: 0.55
    });

    // Hero blueprint draw-in
    const heroDraw = gsap.utils.toArray("#heroSvg .cc-draw");
    const heroFill = gsap.utils.toArray("#heroSvg .cc-fill");
    gsap.set(heroFill, { opacity: 0 });
    gsap.set(".blueprint-card", { opacity: 0, y: 20 });

    const heroTl = gsap.timeline({ delay: 0.3 });
    heroTl
      .to(".blueprint-card", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .fromTo(heroDraw, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.4, ease: "power1.inOut", stagger: 0.03 }, "-=0.2")
      .to(heroFill, { opacity: 1, duration: 0.6, stagger: 0.03, ease: "power2.out" }, "-=0.5");

    // Generic scroll reveal
    gsap.utils.toArray(".reveal").forEach((el) => gsap.set(el, { opacity: 0, y: 26 }));

    ScrollTrigger.batch(".reveal", {
      start: "top 88%",
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" })
    });

    // Guarantee grid + process rail + service panel need reveal class applied
    // dynamically-rendered project cards already carry .reveal from render step,
    // so refresh ScrollTrigger after they mount.
    ScrollTrigger.refresh();
  }
})();
