// Bubi English — curso de inglês A1 → B1 em JavaScript puro.
// Roda em dois lugares:
//  1) como Artifact no claude.ai (progresso na conta + professor IA via window.claude)
//  2) localmente (node server.js): progresso no navegador + professor IA via /api/tutor

(function () {
  "use strict";

  const STORAGE_KEY = "bubi-english:v2";
  const USER_NAME = "Laís";
  const DAILY_GOAL = 30;
  const PASS = 70;
  const SRS_DAYS = [1, 3, 7, 14, 30, 60];
  const IN_ARTIFACT = typeof window.claude !== "undefined" && window.claude && typeof window.claude.use === "function";
  const STEPS = [["vocab", "Vocabulário"], ["grammar", "Gramática"], ["practice", "Prática"], ["speak", "Fala"], ["write", "Escrita"]];

  // ---------- Ícones (traço) ----------
  const ICONS = {
    home: '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/><path d="M9 7h6"/>',
    cards: '<rect x="3" y="7" width="13" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
    sound: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M18.5 6.5a7.5 7.5 0 0 1 0 11"/>',
    arrow: '<path d="M7 17L17 7"/><path d="M9 7h8v8"/>',
    back: '<path d="M15 6l-6 6 6 6"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    test: '<path d="M9 4h6v3H9z"/><path d="M7 5H5v16h14V5h-2"/><path d="M9 13l2 2 4-4"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
    hand: '<path d="M8 13V6a1.5 1.5 0 0 1 3 0v6"/><path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11"/><path d="M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 8-7 8-3 0-4.5-1.5-6-4l-1.5-3a1.5 1.5 0 0 1 2.6-1.5L8 15"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2"/><path d="M3 13h18"/>',
    ruler: '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
    plane: '<path d="M2 16l20-6-20-6 4 6-4 6z"/><path d="M6 10h8"/>',
    cup: '<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3v2M12 3v2"/>',
    play: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M10 8l5 3-5 3z"/><path d="M8 21h8"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14"/><circle cx="12" cy="17" r=".6"/>'
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);

  // ---------- Frases com lacuna ----------
  function parseSentence(raw) {
    const m = raw.match(/\[([^\]]+)\]/);
    const options = m[1].split("|");
    return { full: raw.replace(m[0], options[0]), blank: raw.replace(m[0], "___"), answer: options[0], options };
  }
  function normalize(s) {
    return String(s).toLowerCase()
      .replace(/[’‘`´]/g, "'")
      .replace(/\bcan't\b/g, "can not").replace(/\bcannot\b/g, "can not").replace(/\bwon't\b/g, "will not")
      .replace(/n't\b/g, " not").replace(/'m\b/g, " am").replace(/'re\b/g, " are").replace(/'ve\b/g, " have")
      .replace(/'ll\b/g, " will").replace(/'d\b/g, " would").replace(/'s\b/g, " is")
      .replace(/[^a-z0-9à-ú\s]/g, " ").replace(/\s+/g, " ").trim();
  }

  // ---------- Datas ----------
  const dayKey = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const today = () => dayKey(new Date());
  const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return dayKey(d); };

  // ---------- Estado ----------
  const emptyState = () => ({ v: 2, xp: 0, daily: { date: today(), xp: 0 }, days: [], placement: null, units: {}, srs: {}, reviewed: { date: today(), n: 0 } });
  let state = emptyState();
  let store = null;
  let tutor = undefined; // undefined = carregando; null = indisponível

  const newProf = (mode, topic) => ({ mode: mode || "chat", topic: topic || "intro", turns: [], busy: false, hint: "", lastHint: "", error: "", draft: "", fix: null });
  const ui = { tab: "inicio", unit: null, step: "vocab", practice: null, review: null, test: null, prof: newProf(), write: { busy: false, result: null, error: "" } };

  const unitState = (id) => state.units[id] || (state.units[id] = { seen: {}, practice: 0, speak: false, write: false, done: false });
  const peekUnit = (id) => state.units[id] || { seen: {}, practice: 0, speak: false, write: false, done: false };
  const unitById = (id) => UNITS.find((u) => u.id === id);
  const doneCount = () => UNITS.filter((u) => peekUnit(u.id).done).length;
  const stepsDone = (id) => { const s = peekUnit(id); return (s.seen.vocab ? 1 : 0) + (s.seen.grammar ? 1 : 0) + (s.practice >= PASS ? 1 : 0) + (s.speak ? 1 : 0) + (s.write ? 1 : 0); };
  function nextUnit() {
    const start = state.placement ? state.placement.start : 1;
    return UNITS.find((u) => u.id >= start && !peekUnit(u.id).done) || UNITS.find((u) => !peekUnit(u.id).done) || null;
  }
  function currentLevel() { const u = nextUnit(); return u ? u.level : "B1"; }
  function dueCards() { const t = today(); return Object.keys(state.srs).filter((k) => state.srs[k].due <= t); }
  function streak() {
    const set = new Set(state.days), d = new Date();
    if (!set.has(today())) d.setDate(d.getDate() - 1);
    let n = 0;
    while (set.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function todayXp() { return state.daily.date === today() ? state.daily.xp : 0; }
  function todayReviewed() { return state.reviewed.date === today() ? state.reviewed.n : 0; }

  function gain(xp) {
    const t = today();
    state.xp += xp;
    if (state.daily.date !== t) state.daily = { date: t, xp: 0 };
    state.daily.xp += xp;
    if (!state.days.includes(t)) { state.days.push(t); state.days = state.days.slice(-120); }
    save();
  }

  // ---------- Armazenamento ----------
  async function initStore() {
    if (IN_ARTIFACT) {
      try {
        const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
        const id = user ? await user.id() : null;
        if (db && id) {
          const ref = db.doc("data/users/" + id + "/course");
          return { kind: "conta", load: async () => { const s = await ref.get(); return s.exists ? s.data() : null; }, save: (d) => ref.set(d) };
        }
      } catch (e) { /* usa o navegador */ }
    }
    return {
      kind: "navegador",
      load: async () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch (e) { return null; } },
      save: async (d) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch (e) { /* sem armazenamento */ } }
    };
  }
  let saveTimer = null, saving = false, dirty = false;
  function save() { dirty = true; clearTimeout(saveTimer); saveTimer = setTimeout(flush, 700); }
  async function flush() {
    if (!store || saving || !dirty) return;
    saving = true; dirty = false;
    try { await store.save(JSON.parse(JSON.stringify(state))); } catch (e) { /* tenta na próxima mudança */ }
    saving = false;
    if (dirty) flush();
  }

  // ---------- Professor IA ----------
  async function initTutor() {
    if (IN_ARTIFACT) {
      const sample = await window.claude.use("sample");
      return sample ? { ask: (prompt) => sample.json(prompt, { modelTier: "quick", cache: false }) } : null;
    }
    if (location.hostname.endsWith("github.io")) return null; // site estático: sem servidor para o professor
    if (location.protocol.startsWith("http")) {
      return {
        ask: async (prompt) => {
          const r = await fetch("/api/tutor", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ prompt }) });
          if (!r.ok) throw { code: "upstream_error" };
          return (await r.json()).data;
        }
      };
    }
    return null;
  }
  const ERRORS = {
    not_granted: "O professor precisa da sua permissão para usar o Claude. Recarregue a página para permitir.",
    sampling_disabled: "O professor IA não está disponível nesta conta.",
    rate_limited: "Muitas mensagens seguidas. Espere um pouco e tente de novo.",
    session_expired: "Sua sessão expirou. Entre de novo no claude.ai.",
    invalid_json: "A resposta veio num formato inesperado. Tente de novo.",
    refused: "Essa mensagem não pôde ser respondida. Tente escrever de outro jeito."
  };
  const errorText = (e) => ERRORS[e && e.code] || "Não deu para falar com o professor agora. Tente de novo.";
  const hideTutor = (e) => ["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"].includes(e && e.code);
  const levelForAi = () => (state.placement ? currentLevel() : "A1");

  // ---------- Áudio ----------
  const canSpeak = typeof window.speechSynthesis !== "undefined";
  function utter(text, rate) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = rate || 0.85;
    const v = speechSynthesis.getVoices().find((x) => x.lang && x.lang.startsWith("en-US"));
    if (v) u.voice = v;
    return u;
  }
  function speak(text, rate) { if (!canSpeak) return; try { speechSynthesis.cancel(); speechSynthesis.speak(utter(text, rate)); } catch (e) { /* sem áudio */ } }
  function speakAll(list) { if (!canSpeak) return; try { speechSynthesis.cancel(); list.forEach((t) => speechSynthesis.speak(utter(t))); } catch (e) { /* sem áudio */ } }
  const sayBtn = (text, cls) => canSpeak ? `<button class="${cls || "icon-btn"}" data-saytext="${esc(text)}" aria-label="Ouvir">${icon("sound")}</button>` : "";

  // ---------- Peças visuais ----------
  function ring(pct, label, value, tone) {
    const r = 38, c = 2 * Math.PI * r, p = Math.max(0, Math.min(1, pct));
    return `<div class="ring-card tone-${tone}">
      <svg class="ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle class="ring-track" cx="50" cy="50" r="${r}" fill="none" stroke-width="10"/>
        <circle class="ring-fill" cx="50" cy="50" r="${r}" fill="none" stroke-width="10" stroke-linecap="round"
          stroke-dasharray="${(c * p).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 50 50)" ${p === 0 ? 'stroke-opacity="0"' : ""}/>
        <text class="ring-value" x="50" y="57" text-anchor="middle">${esc(value)}</text>
      </svg>
      <span>${esc(label)}</span>
    </div>`;
  }
  function unitCard(u) {
    const s = peekUnit(u.id), n = stepsDone(u.id), next = nextUnit();
    const status = s.done ? `<span class="pill pill-dark">${icon("check")}Concluída</span>` : u === next ? `<span class="pill pill-dark">Próxima</span>` : n ? `<span class="pill">Em andamento</span>` : `<span class="pill">Nova</span>`;
    return `<button class="unit tone-${LEVELS[u.level].color}" data-unit="${u.id}">
      <span class="unit-num">Unidade ${u.id}</span>
      <h3>${esc(u.title)}</h3>
      <p>${esc(u.titlePt)}</p>
      <span class="dots" aria-label="${n} de 5 etapas">${STEPS.map((_, i) => `<i class="${i < n ? "on" : ""}"></i>`).join("")}</span>
      <span class="row">${status}</span>
    </button>`;
  }
  const bubbleSay = (text) => `<span class="bubble">${esc(text)}</span>`;

  // ---------- Casca ----------
  const NAV = [["inicio", "Início", "home"], ["curso", "Curso", "book"], ["revisao", "Revisão", "cards"], ["professor", "Professor IA", "chat"]];
  const $app = document.getElementById("app");
  document.getElementById("logo").innerHTML = `${mascot("wave", 46)}<span class="logo-text">Bubi English<span>Curso A1 → B1</span></span>`;

  function renderShell() {
    const due = dueCards().length;
    document.getElementById("nav").innerHTML = NAV.map(([id, label, ic]) =>
      `<button class="nav-item" data-tab="${id}" ${ui.tab === id ? 'aria-current="page"' : ""}>${icon(ic)}<span>${label}</span>${id === "revisao" && due ? `<b class="badge">${due}</b>` : ""}</button>`).join("");
    document.getElementById("side-xp").innerHTML = `<strong>${state.xp} XP</strong><span>${streak()} ${streak() === 1 ? "dia seguido" : "dias seguidos"} · meta ${Math.min(todayXp(), DAILY_GOAL)}/${DAILY_GOAL}</span>`;
  }
  function render() {
    renderShell();
    const views = { inicio: viewHome, curso: viewCourse, revisao: viewReview, professor: viewProfessor, teste: viewTest };
    $app.innerHTML = views[ui.tab]();
    if (ui.tab === "professor") { const c = document.getElementById("chat-end"); if (c) c.scrollIntoView({ block: "nearest" }); }
  }

  // ---------- Início ----------
  function viewHome() {
    const nu = nextUnit(), due = dueCards().length;
    let hero;
    if (!state.placement && !doneCount()) {
      hero = { say: "Oi! Eu sou o Bubi. Vamos ver em que nível você está para começar no lugar certo?", title: "Seu curso de inglês, do básico ao intermediário", btn: `<button class="btn" data-go="teste">Fazer teste de nível</button><button class="btn btn-soft" data-start-zero>Começar do zero</button>` };
    } else if (nu) {
      hero = { say: `Próxima parada: Unidade ${nu.id}. ${nu.goal}`, title: nu.title, btn: `<button class="btn" data-unit="${nu.id}">${stepsDone(nu.id) ? "Continuar unidade" : "Começar unidade"}</button>` };
    } else {
      hero = { say: "Você concluiu todas as unidades! Continue revisando e conversando para ganhar fluência.", title: "Curso concluído", btn: `<button class="btn" data-tab="professor">Conversar com o professor</button>` };
    }
    const reviewTotal = todayReviewed() + due;
    const levelUnits = UNITS.filter((u) => u.level === (nu ? nu.level : "B1"));
    return `
      <div class="top-row">
        <div><span class="label">Painel de estudos</span><h1>Hello, ${esc(USER_NAME)}!</h1></div>
        <span class="pill">${esc(LEVELS[currentLevel()].name)}</span>
      </div>
      <div class="home-grid">
        <div class="col">
          <section class="hero">
            <div class="stack">
              ${bubbleSay(hero.say)}
              <h2>${esc(hero.title)}</h2>
              <div class="row">${hero.btn}</div>
            </div>
            ${mascot("wave", 170)}
          </section>
          <button class="continue" data-tab="revisao">
            <span class="circle">${icon("cards")}</span>
            <span><strong>${due ? `Revisão do dia: ${due} ${due === 1 ? "palavra" : "palavras"}` : "Revisão em dia"}</strong><small>${due ? "Revise agora para não esquecer" : "As palavras das unidades concluídas voltam aqui no dia certo"}</small></span>
            <span class="arrow">${icon("arrow")}</span>
          </button>
          <div class="section-head"><h2>Sua trilha · ${esc(LEVELS[levelUnits[0].level].name)}</h2><button class="link" data-tab="curso">Ver curso completo</button></div>
          <div class="unit-grid">${levelUnits.map(unitCard).join("")}</div>
        </div>
        <div class="rings">
          ${ring(doneCount() / UNITS.length, "Curso concluído", Math.round((doneCount() / UNITS.length) * 100) + "%", "lilac")}
          ${ring(reviewTotal ? todayReviewed() / reviewTotal : 1, "Revisões de hoje", due ? todayReviewed() + "/" + reviewTotal : "ok", "mint")}
          ${ring(todayXp() / DAILY_GOAL, "Meta do dia", Math.min(todayXp(), DAILY_GOAL) + "/" + DAILY_GOAL, "butter")}
        </div>
      </div>
      <p class="foot">Progresso salvo ${store ? (store.kind === "conta" ? "na sua conta" : "neste navegador") : "…"}. Estude um pouco todo dia: 20 a 30 minutos rendem mais que horas no fim de semana.</p>`;
  }

  // ---------- Curso ----------
  function viewCourse() {
    if (ui.unit) return viewUnit();
    return `
      <div class="top-row">
        <div><span class="label">${UNITS.length} unidades · ${doneCount()} concluídas</span><h1>Curso completo</h1></div>
        <button class="btn btn-soft" data-go="teste">${state.placement ? "Refazer teste de nível" : "Teste de nível"}</button>
      </div>
      <p class="muted">Cada unidade tem 5 etapas: vocabulário, gramática, prática, fala e escrita. A unidade conta como concluída quando você acerta pelo menos ${PASS}% da prática.</p>
      ${Object.keys(LEVELS).map((lv) => `
        <section class="level">
          <div class="level-head"><span class="pill tone-${LEVELS[lv].color}">${esc(LEVELS[lv].name)}</span><p class="muted">${esc(LEVELS[lv].note)}</p></div>
          <div class="unit-grid">${UNITS.filter((u) => u.level === lv).map(unitCard).join("")}</div>
        </section>`).join("")}
      <section class="panel soon">${mascot("think", 90)}<div><h3>B2 em breve</h3><p class="muted">Past perfect, used to, modais de dedução, terceira condicional e mais. Peça ao Claude Code para adicionar quando terminar o B1.</p></div></section>`;
  }

  function viewUnit() {
    const u = unitById(ui.unit), s = peekUnit(u.id);
    const stepDone = { vocab: s.seen.vocab, grammar: s.seen.grammar, practice: s.practice >= PASS, speak: s.speak, write: s.write };
    const body = { vocab: stepVocab, grammar: stepGrammar, practice: stepPractice, speak: stepSpeak, write: stepWrite }[ui.step](u);
    const idx = STEPS.findIndex(([k]) => k === ui.step);
    const next = STEPS[idx + 1];
    return `
      <button class="back" data-tab="curso">${icon("back")}Todas as unidades</button>
      <section class="unit-hero tone-${LEVELS[u.level].color}">
        <div class="stack">
          <span class="label">Unidade ${u.id} · ${u.level}${s.done ? " · concluída" : ""}</span>
          <h1>${esc(u.title)}</h1>
          <p><strong>${esc(u.titlePt)}.</strong> ${esc(u.goal)}</p>
        </div>
      </section>
      <nav class="steps" aria-label="Etapas da unidade">${STEPS.map(([k, label], i) =>
        `<button class="step" data-step="${k}" ${ui.step === k ? 'aria-current="step"' : ""}><span class="step-n">${stepDone[k] ? icon("check") : i + 1}</span>${label}</button>`).join("")}</nav>
      ${body}
      ${next && !(ui.step === "practice" && ui.practice && ui.practice.unitId === u.id && !ui.practice.finished) ? `<div class="row end"><button class="btn btn-soft" data-step="${next[0]}">Próxima etapa: ${next[1]} →</button></div>` : ""}`;
  }

  function stepVocab(u) {
    return `<section class="panel">
      <div class="section-head"><h2>Vocabulário</h2>${canSpeak ? `<button class="btn btn-soft" data-sayall="vocab">${icon("sound")} Ouvir todas</button>` : ""}</div>
      <p class="muted">Ouça cada palavra, repita em voz alta e tente criar uma frase sua com ela.</p>
      <div class="words">${u.vocab.map(([en, pt]) => `<div class="word"><div><strong>${esc(en)}</strong><span>${esc(pt)}</span></div>${sayBtn(en)}</div>`).join("")}</div>
    </section>`;
  }

  function stepGrammar(u) {
    return `<section class="panel">
      <h2>Gramática</h2>
      <div class="rules">${u.grammar.map(([rule, ex], i) => `<div class="rule">
        <span class="rule-n">${i + 1}</span>
        <div class="stack-sm"><p>${esc(rule)}</p><div class="example"><span>${esc(ex)}</span>${sayBtn(ex)}</div></div>
      </div>`).join("")}</div>
      <div class="ask-row">${mascot("talk", 64)}<div class="stack-sm"><strong>Ficou alguma dúvida?</strong><span class="muted">Pergunte ao professor IA, em português.</span></div><button class="btn btn-soft" data-doubt="${u.id}">Perguntar</button></div>
    </section>`;
  }

  // ---------- Prática ----------
  function buildPractice(u) {
    const items = [];
    const vocab = u.vocab;
    pick(vocab.map((_, i) => i), 4).forEach((i, k) => {
      const others = pick(vocab.filter((_, j) => j !== i), 3);
      if (k % 2 === 0) {
        const opts = shuffle([vocab[i], ...others]);
        items.push({ type: "mc", label: "O que significa", prompt: vocab[i][0], say: vocab[i][0], options: opts.map((v) => v[1]), answer: opts.indexOf(vocab[i]) });
      } else {
        const opts = shuffle([vocab[i], ...others]);
        items.push({ type: "mc", label: "Como se diz em inglês", prompt: vocab[i][1], options: opts.map((v) => v[0]), answer: opts.indexOf(vocab[i]) });
      }
    });
    const sents = u.sentences.map(([raw, pt]) => Object.assign(parseSentence(raw), { pt }));
    const order = shuffle(sents.map((_, i) => i));
    order.slice(0, 4).forEach((i) => {
      const s = sents[i], opts = shuffle(s.options);
      items.push({ type: "mc", label: "Complete a frase", prompt: s.blank, sub: s.pt, options: opts, answer: opts.indexOf(s.answer), say: s.full });
    });
    order.slice(4, 6).forEach((i) => {
      const words = sents[i].full.split(" ");
      let tiles = shuffle(words.map((w, j) => ({ w, j })));
      if (tiles.every((t, k) => t.j === k)) tiles = tiles.reverse();
      items.push({ type: "order", label: "Monte a frase", sub: sents[i].pt, words, tiles, built: [], say: sents[i].full });
    });
    if (canSpeak) { const s = sents[order[6]]; items.push({ type: "dict", label: "Ouça e escreva", full: s.full, sub: s.pt, say: s.full }); }
    [order[7], order[canSpeak ? 0 : 6]].forEach((i) => { const s = sents[i]; items.push({ type: "trans", label: "Traduza para o inglês", prompt: s.pt, full: s.full, say: s.full }); });
    return items;
  }
  function startPractice(u, items, extra) {
    ui.practice = { unitId: u.id, items: items || buildPractice(u), i: 0, right: 0, answered: false, correct: null, finished: false, extra: !!extra };
  }

  function stepPractice(u) {
    const p = ui.practice && ui.practice.unitId === u.id ? ui.practice : null, s = peekUnit(u.id);
    if (!p) {
      return `<section class="panel start-card">${mascot("think", 120)}<div class="stack">
        <h2>Prática</h2>
        <p>Cerca de 13 exercícios variados: significado das palavras, completar frases, montar frases, ditado e tradução. Acerte ${PASS}% ou mais para concluir a unidade.</p>
        ${s.practice ? `<p class="muted">Seu melhor resultado: <strong>${s.practice}%</strong></p>` : ""}
        <div class="row"><button class="btn" data-practice-start>${s.practice ? "Praticar de novo" : "Começar prática"}</button></div>
      </div></section>`;
    }
    if (p.finished) {
      const pct = Math.round((p.right / p.items.length) * 100), passed = pct >= PASS;
      return `<section class="panel result">${mascot(passed ? "cheer" : "think", 140)}
        <span class="label">${p.extra ? "Exercícios extras" : "Prática concluída"}</span>
        <span class="result-level">${pct}%</span>
        <p>${p.extra ? `Você acertou ${p.right} de ${p.items.length}.` : passed ? "Unidade concluída! As palavras desta unidade entraram na sua revisão." : `Faltou pouco. Revise a gramática e tente de novo: você precisa de ${PASS}%.`}</p>
        <div class="row center">
          <button class="btn" data-practice-start>Praticar de novo</button>
          ${tutor ? `<button class="btn btn-soft" data-extra ${ui.extraBusy ? "disabled" : ""}>${ui.extraBusy ? "Criando exercícios…" : "+5 exercícios com IA"}</button>` : ""}
        </div>
        ${ui.extraError ? `<p class="notice">${esc(ui.extraError)}</p>` : ""}
      </section>`;
    }
    const it = p.items[p.i];
    let body = "";
    if (it.type === "mc") {
      body = `<span class="q-text">${esc(it.prompt)}</span>${it.sub ? `<span class="muted">${esc(it.sub)}</span>` : ""}
        <div class="options">${it.options.map((o, j) => {
          const cls = !p.answered ? "" : j === it.answer ? "right" : j === p.picked ? "wrong" : "";
          return `<button class="opt ${cls}" data-pick="${j}" ${p.answered ? "disabled" : ""}>${esc(o)}</button>`;
        }).join("")}</div>`;
    } else if (it.type === "order") {
      const used = new Set(it.built);
      body = `<span class="muted">${esc(it.sub)}</span>
        <div class="built ${p.answered ? (p.correct ? "ok" : "bad") : ""}">${it.built.length ? it.built.map((ti, k) => `<button class="tile" data-unbuild="${k}" ${p.answered ? "disabled" : ""}>${esc(it.tiles[ti].w)}</button>`).join("") : `<span class="muted">Toque nas palavras na ordem certa</span>`}</div>
        <div class="tiles">${it.tiles.map((t, ti) => `<button class="tile" data-build="${ti}" ${used.has(ti) || p.answered ? "disabled" : ""}>${esc(t.w)}</button>`).join("")}</div>
        ${!p.answered ? `<div class="row"><button class="btn" data-check-order ${it.built.length !== it.words.length ? "disabled" : ""}>Verificar</button><button class="link" data-clear-order>Limpar</button></div>` : ""}`;
    } else {
      body = `${it.type === "dict" ? `<div class="row">${canSpeak ? `<button class="btn btn-soft" data-saytext="${esc(it.full)}">${icon("sound")} Ouvir</button><button class="link" data-sayslow="${esc(it.full)}">Ouvir devagar</button>` : ""}</div>` : `<span class="q-text">${esc(it.prompt)}</span>`}
        <input class="field" id="typed" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escreva em inglês…" ${p.answered ? `disabled value="${esc(p.typed || "")}"` : ""}>
        ${!p.answered ? `<div class="row"><button class="btn" data-check-typed>Verificar</button></div>` : ""}`;
    }
    let feedback = "";
    if (p.answered) {
      const answer = it.type === "mc" ? it.options[it.answer] : it.type === "order" ? it.words.join(" ") : it.full;
      feedback = `<div class="feedback ${p.correct ? "ok" : "bad"}">
        <strong>${p.correct ? "Isso aí!" : "Resposta certa:"}</strong>
        ${!p.correct || it.type !== "mc" ? `<span class="answer">${esc(answer)} ${it.say ? sayBtn(it.say, "link") : ""}</span>` : ""}
        ${it.type === "dict" ? `<span class="muted">${esc(it.sub)}</span>` : ""}
        ${!p.correct && (it.type === "trans") ? `<button class="link" data-accept>Minha resposta também está certa</button>` : ""}
      </div>
      <div class="row"><button class="btn" data-next>${p.i + 1 < p.items.length ? "Continuar" : "Ver resultado"}</button></div>`;
    }
    return `<div class="quiz"><section class="panel">
        <div class="row between"><span class="label">${esc(it.label)}</span><span class="pill soft">${p.i + 1} de ${p.items.length}</span></div>
        <div class="bar"><span style="width:${(p.i / p.items.length) * 100}%"></span></div>
        ${body}${feedback}
      </section>
      <aside class="quiz-side">${mascot(!p.answered ? "think" : p.correct ? "cheer" : "talk", 140)}${bubbleSay(!p.answered ? "Você consegue!" : p.correct ? "Mandou bem!" : "Errar faz parte. Leia a certa em voz alta.")}</aside>
    </div>`;
  }

  function answerPractice(correct, typed) {
    const p = ui.practice;
    p.answered = true; p.correct = correct; p.typed = typed;
    if (correct) { p.right++; gain(2); }
    render();
  }
  function finishPractice() {
    const p = ui.practice, u = unitById(p.unitId);
    p.finished = true;
    if (!p.extra) {
      const pct = Math.round((p.right / p.items.length) * 100), s = unitState(u.id);
      s.practice = Math.max(s.practice, pct);
      if (pct >= PASS && !s.done) {
        s.done = true; gain(10);
        u.vocab.forEach((_, i) => { const k = u.id + ":" + i; if (!state.srs[k]) state.srs[k] = { box: 0, due: addDays(1) }; });
      }
      save();
    }
    render();
  }

  async function extraExercises(u) {
    ui.extraBusy = true; ui.extraError = ""; render();
    const prompt = `Create 5 NEW fill-in-the-blank multiple-choice exercises in English for a Brazilian learner (CEFR ${u.level}).
Topic: ${u.title} (${u.titlePt}).
Grammar rules being practiced:
${u.grammar.map((g) => "- " + g[0] + " Example: " + g[1]).join("\n")}
Useful vocabulary: ${u.vocab.map((v) => v[0]).join(", ")}.
Rules: each "sentence" contains "___" exactly once; "options" has exactly 3 short choices, only one correct; "answer" is the index of the correct option; "pt" is the Brazilian Portuguese translation of the complete sentence. Use different sentences from these: ${u.sentences.map((s) => parseSentence(s[0]).full).join(" | ")}.
Reply with only a JSON array: [{"sentence":"...","options":["...","...","..."],"answer":0,"pt":"..."}]`;
    try {
      const data = await tutor.ask(prompt);
      const items = (Array.isArray(data) ? data : []).filter((x) => x && typeof x.sentence === "string" && x.sentence.includes("___") && Array.isArray(x.options) && x.options.length >= 2 && Number.isInteger(x.answer) && x.options[x.answer] != null)
        .slice(0, 5).map((x) => {
          const opts = x.options.map(String), right = opts[x.answer], sh = shuffle(opts);
          return { type: "mc", label: "Exercício extra · complete", prompt: x.sentence, sub: String(x.pt || ""), options: sh, answer: sh.indexOf(right), say: x.sentence.replace("___", right) };
        });
      if (!items.length) throw { code: "invalid_json" };
      startPractice(u, items, true);
    } catch (e) {
      if (hideTutor(e)) tutor = null;
      ui.extraError = errorText(e);
    } finally {
      ui.extraBusy = false; render();
    }
  }

  function stepSpeak(u) {
    const s = peekUnit(u.id);
    const sents = u.sentences.map(([raw, pt]) => ({ full: parseSentence(raw).full, pt }));
    return `<section class="panel">
      <h2>Fala</h2>
      <p class="muted">Técnica de shadowing: ouça cada frase, pause e repita em voz alta imitando o ritmo e a entonação. Repita cada uma 3 vezes.</p>
      <ol class="speak-list">${sents.map((x) => `<li><div class="stack-sm"><strong>${esc(x.full)}</strong><span class="muted">${esc(x.pt)}</span></div>${sayBtn(x.full)}</li>`).join("")}</ol>
      <div class="row">${canSpeak ? `<button class="btn btn-soft" data-sayall="sentences">${icon("sound")} Ouvir todas</button>` : ""}<button class="btn" data-speak-done ${s.speak ? "disabled" : ""}>${s.speak ? "Feito!" : "Já repeti todas em voz alta"}</button></div>
    </section>`;
  }

  function stepWrite(u) {
    const s = peekUnit(u.id), w = ui.write;
    let result = "";
    if (w.result && w.unit === u.id) result = correctionView(w.result);
    return `<section class="panel">
      <h2>Escrita</h2>
      <div class="task">${icon("pen")}<span>${esc(u.writing)}</span></div>
      <textarea class="field area" id="write-text" placeholder="Escreva aqui em inglês…" ${w.busy ? "disabled" : ""}>${esc(w.unit === u.id ? w.text || "" : "")}</textarea>
      <div class="row">
        ${tutor ? `<button class="btn" data-write-check ${w.busy ? "disabled" : ""}>${w.busy ? "O professor está lendo…" : "Corrigir com o professor IA"}</button>` : ""}
        ${!tutor && !s.write ? `<button class="btn" data-write-self>Marcar como feita</button>` : ""}
        ${s.write ? `<span class="pill">${icon("check")}Escrita feita</span>` : ""}
      </div>
      ${tutor === null ? `<p class="muted">O professor IA não está disponível aqui. Escreva mesmo assim: compare com os exemplos da gramática e leia seu texto em voz alta.</p>` : ""}
      ${w.error && w.unit === u.id ? `<p class="notice">${esc(w.error)}</p>` : ""}
      ${result}
    </section>`;
  }

  function correctionView(r) {
    return `<div class="correction">
      <div class="row between"><strong>Correção do professor</strong>${typeof r.score === "number" ? `<span class="pill pill-dark">${r.score}/10</span>` : ""}</div>
      ${r.feedback_pt ? `<p>${esc(r.feedback_pt)}</p>` : ""}
      ${Array.isArray(r.mistakes) && r.mistakes.length ? `<ul class="mistakes">${r.mistakes.slice(0, 8).map((m) => `<li><span class="wrong">${esc(m.wrong)}</span> → <span class="right">${esc(m.right)}</span>${m.why_pt ? `<small>${esc(m.why_pt)}</small>` : ""}</li>`).join("")}</ul>` : ""}
      ${r.corrected ? `<div class="example"><span><strong>Versão corrigida:</strong> ${esc(r.corrected)}</span>${sayBtn(r.corrected)}</div>` : ""}
    </div>`;
  }
  function fixPrompt(text, task) {
    return `You are an encouraging English teacher correcting a text written by a Brazilian learner (CEFR ${levelForAi()}).
${task ? "The task was: " + task + "\n" : ""}Learner's text:
"""
${text.slice(0, 4000)}
"""
Return:
- "score": integer 0-10 for accuracy and clarity at this level.
- "feedback_pt": 2-3 short sentences in Brazilian Portuguese: what was good and the main point to improve.
- "mistakes": up to 6 most important mistakes, each {"wrong": exact fragment from the text, "right": corrected fragment, "why_pt": short reason in Portuguese}. Empty array if none.
- "corrected": the full text rewritten correctly and naturally, keeping the learner's ideas and level.
Reply with only a JSON object: {"score":0,"feedback_pt":"...","mistakes":[{"wrong":"...","right":"...","why_pt":"..."}],"corrected":"..."}`;
  }
  async function checkWriting(u) {
    const text = (document.getElementById("write-text").value || "").trim();
    const w = ui.write;
    w.unit = u.id; w.text = text; w.error = ""; w.result = null;
    if (text.split(/\s+/).length < 5) { w.error = "Escreva pelo menos uma ou duas frases completas."; render(); return; }
    w.busy = true; render();
    try {
      w.result = await tutor.ask(fixPrompt(text, u.writing));
      const s = unitState(u.id);
      if (!s.write) { s.write = true; gain(10); } else save();
    } catch (e) {
      if (hideTutor(e)) tutor = null;
      w.error = errorText(e);
    } finally { w.busy = false; render(); }
  }

  // ---------- Revisão (repetição espaçada) ----------
  function cardOf(key) { const [uid, i] = key.split(":"); const u = unitById(+uid); return { key, unit: u, en: u.vocab[+i][0], pt: u.vocab[+i][1], box: state.srs[key].box }; }
  function viewReview() {
    const r = ui.review, due = dueCards(), total = Object.keys(state.srs).length;
    if (!r) {
      if (!total) return `<section class="panel start-card">${mascot("think", 120)}<div class="stack"><span class="label">Repetição espaçada</span><h1>Revisão</h1><p>Quando você concluir uma unidade, as palavras dela entram aqui e voltam em 1, 3, 7, 14, 30 e 60 dias. É assim que o vocabulário vai para a memória de longo prazo.</p><div class="row"><button class="btn" data-tab="curso">Ir para o curso</button></div></div></section>`;
      const next = Object.values(state.srs).map((x) => x.due).sort()[0];
      return `<section class="panel start-card tone-mint">${mascot(due.length ? "wave" : "cheer", 130)}<div class="stack">
        <span class="label">${total} palavras no seu baralho</span>
        <h1>${due.length ? `${due.length} para revisar hoje` : "Tudo revisado!"}</h1>
        <p>${due.length ? "Veja a palavra, tente lembrar o significado e só então vire o cartão. Seja honesta: isso define quando ela volta." : `A próxima revisão é em ${next.split("-").reverse().join("/")}. Enquanto isso, avance no curso.`}</p>
        <div class="row">${due.length ? `<button class="btn" data-review-start>Começar revisão</button>` : `<button class="btn" data-tab="curso">Continuar o curso</button>`}</div>
      </div></section>`;
    }
    if (r.i >= r.keys.length) {
      return `<section class="panel result">${mascot("cheer", 150)}<span class="label">Revisão concluída</span><span class="result-level">${r.right}/${r.keys.length}</span><p>Palavras que você não lembrou voltam amanhã. As outras, daqui a alguns dias.</p><div class="row center"><button class="btn" data-review-close>Voltar</button></div></section>`;
    }
    const c = cardOf(r.keys[r.i]), reverse = c.box >= 2;
    const front = reverse ? c.pt : c.en, back = reverse ? c.en : c.pt;
    return `<div class="quiz"><section class="panel">
      <div class="row between"><span class="label">Unidade ${c.unit.id} · ${reverse ? "português → inglês" : "inglês → português"}</span><span class="pill soft">${r.i + 1} de ${r.keys.length}</span></div>
      <div class="bar"><span style="width:${(r.i / r.keys.length) * 100}%"></span></div>
      <div class="flash ${r.flipped ? "flipped" : ""}">
        <span class="flash-front">${esc(front)} ${!reverse ? sayBtn(c.en, "link") : ""}</span>
        ${r.flipped ? `<span class="flash-back">${esc(back)} ${reverse ? sayBtn(c.en, "link") : ""}</span>` : ""}
      </div>
      ${r.flipped ? `<div class="row center"><button class="btn btn-soft" data-recall="0">Não lembrei</button><button class="btn" data-recall="1">Lembrei</button></div>` : `<div class="row center"><button class="btn" data-flip>Mostrar resposta</button></div>`}
    </section><aside class="quiz-side">${mascot(r.flipped ? "talk" : "think", 140)}${bubbleSay(r.flipped ? "E aí, lembrou?" : "Pense antes de virar!")}</aside></div>`;
  }

  // ---------- Teste de nível ----------
  function viewTest() {
    const t = ui.test;
    if (!t) {
      return `<section class="panel start-card tone-lilac">${mascot("think", 130)}<div class="stack">
        <span class="label">${PLACEMENT.length} perguntas · cerca de 5 minutos</span>
        <h1>Teste de nível</h1>
        <p>As perguntas ficam mais difíceis aos poucos. Não consulte nada; se não souber, chute. O resultado indica em qual unidade começar, e você ainda pode abrir qualquer unidade quando quiser.</p>
        ${state.placement ? `<p class="muted">Último resultado: <strong>${esc(LEVELS[state.placement.level].name)}</strong> (${state.placement.score}/${PLACEMENT.length}).</p>` : ""}
        <div class="row"><button class="btn" data-test-start>${state.placement ? "Refazer o teste" : "Começar"}</button><button class="link" data-tab="inicio">Voltar</button></div>
      </div></section>`;
    }
    if (t.i >= PLACEMENT.length) {
      const res = placementResult(t.score), u = unitById(res.start);
      return `<section class="panel result">${mascot("cheer", 160)}
        <span class="label">Resultado · ${t.score}/${PLACEMENT.length} acertos</span>
        <span class="result-level">${res.level}</span><h2>${esc(LEVELS[res.level].name)}</h2>
        <p>${t.score >= 14 ? "Você já tem uma boa base, inclusive de B2. Comece pelo B1 para firmar os pontos mais difíceis." : `Recomendo começar pela Unidade ${u.id}: ${esc(u.title)}.`}</p>
        <div class="row center"><button class="btn" data-unit="${u.id}">Ir para a Unidade ${u.id}</button><button class="btn btn-soft" data-tab="inicio">Ver painel</button></div>
      </section>`;
    }
    const q = PLACEMENT[t.i];
    const main = `<div class="row between"><span class="label">Teste de nível</span><span class="pill soft">${t.i + 1} de ${PLACEMENT.length}</span></div>
      <div class="bar"><span style="width:${(t.i / PLACEMENT.length) * 100}%"></span></div>
      <span class="q-text">${esc(q.q)}</span>
      <div class="options">${q.options.map((o, j) => {
        const cls = t.picked == null ? "" : j === q.answer ? "right" : j === t.picked ? "wrong" : "";
        return `<button class="opt ${cls}" data-tpick="${j}" ${t.picked != null ? "disabled" : ""}>${esc(o)}</button>`;
      }).join("")}</div>
      ${t.picked != null ? `<p class="explain">${esc(q.why)}</p><div class="row"><button class="btn" data-tnext>${t.i + 1 < PLACEMENT.length ? "Próxima" : "Ver meu nível"}</button></div>` : ""}`;
    const mood = t.picked == null ? "think" : t.picked === q.answer ? "cheer" : "talk";
    const said = t.picked == null ? "Sem pressa." : t.picked === q.answer ? "Mandou bem!" : "Tudo bem errar.";
    return `<div class="quiz"><section class="panel">${main}</section><aside class="quiz-side">${mascot(mood, 140)}${bubbleSay(said)}</aside></div>`;
  }

  // ---------- Professor IA ----------
  function viewProfessor() {
    const pr = ui.prof;
    const modes = [["chat", "Conversar", "chat"], ["doubt", "Tirar dúvidas", "help"], ["fix", "Corrigir texto", "pen"]];
    const tabs = `<div class="seg">${modes.map(([k, l, ic]) => `<button class="seg-btn" data-mode="${k}" aria-pressed="${pr.mode === k}" ${pr.busy ? "disabled" : ""}>${icon(ic)}${l}</button>`).join("")}</div>`;
    let body;
    if (tutor === undefined) body = `<section class="panel"><p class="muted">Conectando o professor…</p></section>`;
    else if (tutor === null) body = `<section class="panel start-card">${mascot("think", 110)}<div class="stack"><h2>Professor indisponível aqui</h2><p class="muted">${IN_ARTIFACT ? "Esta visualização não permite usar o Claude. Abra a página no claude.ai, com sua conta." : location.hostname.endsWith("github.io") ? "Nesta versão do GitHub o professor IA não funciona. Para conversar, tirar dúvidas e corrigir textos, use a versão no claude.ai." : "Rode o projeto com npm start e uma chave de API para usar o professor."} O curso e a revisão funcionam normalmente.</p></div></section>`;
    else if (pr.mode === "chat") body = profChat();
    else if (pr.mode === "doubt") body = profDoubt();
    else body = profFix();
    return `<div><span class="label">Nível ${levelForAi()} · respostas adaptadas a você</span><h1>Professor IA</h1></div>${tabs}${body}`;
  }

  function profChat() {
    const pr = ui.prof, topic = TOPICS.find((t) => t.id === pr.topic);
    const chips = `<div class="chips">${TOPICS.map((t) => `<button class="chip" data-topic="${t.id}" aria-pressed="${t.id === pr.topic}" ${pr.busy ? "disabled" : ""}>${icon(t.icon)}${esc(t.name)}</button>`).join("")}</div>`;
    if (!pr.turns.length && !pr.busy) {
      return `${chips}<section class="panel start-card tone-sky">${mascot("talk", 120)}<div class="stack">
        <span class="label">Tema: ${esc(topic.name)}</span>
        <h2>Converse em inglês</h2>
        <p>O professor puxa assunto em inglês. Depois de cada mensagem sua, o Bubi comenta em português e mostra como ficaria mais natural. Se travar, peça uma dica.</p>
        ${pr.error ? `<p class="notice">${esc(pr.error)}</p>` : ""}
        <div class="row"><button class="btn" data-chat-start>Começar conversa</button></div>
      </div></section>`;
    }
    const msgs = pr.turns.map((t) => {
      if (t.role === "them") return `<div class="msg msg-them"><span class="msg-who">Teacher</span><span>${esc(t.text)}</span>
        <span class="msg-actions">${t.pt ? `<details><summary class="link">Tradução</summary><span class="msg-pt">${esc(t.pt)}</span></details>` : ""}${sayBtn(t.text, "link")}</span></div>`;
      let html = `<div class="msg msg-me"><span class="msg-who">Você</span><span>${esc(t.text)}</span></div>`;
      if (t.fb) html += `<div class="fb ${t.better ? "fb-fix" : "fb-ok"}"><span class="avatar">${mascot(t.better ? "talk" : "cheer", 40)}</span><div class="fb-body"><span>${esc(t.fb)}</span>${t.better ? `<span class="fb-better">${esc(t.better)}</span>` : ""}</div></div>`;
      return html;
    }).join("");
    return `${chips}<section class="chat-wrap">
      <div class="chat" aria-live="polite">${msgs}${pr.busy ? `<p class="thinking">O professor está escrevendo…</p>` : ""}<span id="chat-end"></span></div>
      ${pr.error ? `<p class="notice">${esc(pr.error)}</p>` : ""}
      ${pr.hint ? `<div class="hint"><strong>Dica do Bubi:</strong> ${esc(pr.hint)}</div>` : ""}
      <form class="composer" data-form="chat">
        <input id="chat-input" autocomplete="off" placeholder="Escreva em inglês…" ${pr.busy ? "disabled" : ""} aria-label="Sua mensagem">
        <button class="btn" ${pr.busy ? "disabled" : ""}>Enviar</button>
      </form>
      <div class="row"><button class="btn btn-soft" data-hint ${pr.busy || !pr.lastHint ? "disabled" : ""}>Preciso de uma dica</button><button class="link" data-prof-reset ${pr.busy ? "disabled" : ""}>Recomeçar</button></div>
    </section>`;
  }

  function profDoubt() {
    const pr = ui.prof;
    const msgs = pr.turns.map((t) => t.role === "me"
      ? `<div class="msg msg-me"><span>${esc(t.text)}</span></div>`
      : `<div class="fb fb-ok left"><span class="avatar">${mascot("talk", 40)}</span><div class="fb-body"><span>${esc(t.text)}</span>${(t.examples || []).map((x) => `<div class="example"><span><strong>${esc(x.en)}</strong><br><small class="muted">${esc(x.pt)}</small></span>${sayBtn(x.en)}</div>`).join("")}</div></div>`).join("");
    return `<section class="chat-wrap">
      ${!pr.turns.length ? `<div class="start-card">${mascot("think", 100)}<div class="stack"><h2>Pergunte qualquer coisa</h2><p class="muted">Em português mesmo. Exemplos: "Quando uso since e quando uso for?", "Qual a diferença entre make e do?", "Como se diz 'saudade' em inglês?"</p></div></div>` : ""}
      <div class="chat" aria-live="polite">${msgs}${pr.busy ? `<p class="thinking">O professor está pensando…</p>` : ""}<span id="chat-end"></span></div>
      ${pr.error ? `<p class="notice">${esc(pr.error)}</p>` : ""}
      <form class="composer" data-form="doubt">
        <input id="chat-input" autocomplete="off" placeholder="Escreva sua dúvida…" value="${esc(pr.draft || "")}" ${pr.busy ? "disabled" : ""} aria-label="Sua dúvida">
        <button class="btn" ${pr.busy ? "disabled" : ""}>Perguntar</button>
      </form>
      ${pr.turns.length ? `<div class="row"><button class="link" data-prof-reset ${pr.busy ? "disabled" : ""}>Limpar conversa</button></div>` : ""}
    </section>`;
  }

  function profFix() {
    const pr = ui.prof;
    return `<section class="panel">
      <h2>Corrigir texto</h2>
      <p class="muted">Cole ou escreva qualquer texto em inglês: um e-mail, uma legenda, uma mensagem. O professor corrige, explica os erros e devolve uma versão natural.</p>
      <textarea class="field area" id="fix-text" placeholder="Escreva aqui em inglês…" ${pr.busy ? "disabled" : ""}>${esc(pr.draft || "")}</textarea>
      <div class="row"><button class="btn" data-fix ${pr.busy ? "disabled" : ""}>${pr.busy ? "Corrigindo…" : "Corrigir"}</button></div>
      ${pr.error ? `<p class="notice">${esc(pr.error)}</p>` : ""}
      ${pr.fix ? correctionView(pr.fix) : ""}
    </section>`;
  }

  function chatPrompt() {
    const pr = ui.prof, topic = TOPICS.find((t) => t.id === pr.topic), level = levelForAi();
    const transcript = pr.turns.slice(-12).map((t) => (t.role === "me" ? "Learner: " : "Teacher: ") + t.text).join("\n");
    const lastMe = [...pr.turns].reverse().find((t) => t.role === "me");
    return `You are a friendly English teacher having a spoken-style conversation with a Brazilian learner who speaks Portuguese. Learner level (CEFR): ${level}.
Situation: ${topic.scene}

Fields to return:
- "reply": your next line, natural English, 1-3 short sentences, vocabulary suited to ${level}. Show interest, react to what the learner said, and end with a question. Never write Portuguese here.
- "reply_pt": Brazilian Portuguese translation of "reply".
- "feedback_pt": in Brazilian Portuguese, friendly, at most 2 short sentences about the learner's LAST message. Praise if correct and natural; if there's a mistake, explain it simply. If the learner wrote in Portuguese, encourage them and show how to say it. Use "" if the learner hasn't written yet.
- "correct_version": a natural, corrected English version of the learner's last message, or "" if it was already correct (or there is none).
- "hint_pt": in Portuguese, a suggestion of how to answer your reply, with one short English example in quotes.

${transcript ? "Conversation so far:\n" + transcript : "The conversation has not started. Open with a friendly first line."}
${lastMe ? "\nThe learner's last message is: " + lastMe.text : ""}

Reply with only a JSON object: {"reply":"...","reply_pt":"...","feedback_pt":"...","correct_version":"...","hint_pt":"..."}`;
  }
  function doubtPrompt() {
    const pr = ui.prof, history = pr.turns.slice(-8).map((t) => (t.role === "me" ? "Learner: " : "Teacher: ") + t.text).join("\n");
    return `You are a patient English teacher for a Brazilian learner (CEFR ${levelForAi()}). Answer the learner's latest question in Brazilian Portuguese, clearly and briefly (at most about 120 words), like a good teacher would. Then give 2 or 3 short English examples with Portuguese translations. If the question is not about English or language learning, answer kindly in one sentence and bring the focus back to English.
Conversation:
${history}

Reply with only a JSON object: {"answer_pt":"...","examples":[{"en":"...","pt":"..."}]}`;
  }

  async function profSend(kind) {
    const pr = ui.prof, mine = pr;
    pr.busy = true; pr.error = ""; pr.hint = ""; render();
    try {
      if (kind === "chat") {
        const data = await tutor.ask(chatPrompt());
        if (ui.prof !== mine) return;
        const lastMe = [...pr.turns].reverse().find((t) => t.role === "me");
        if (lastMe && !lastMe.fb) {
          lastMe.fb = String(data.feedback_pt || "Muito bem!");
          const better = String(data.correct_version || "").trim();
          lastMe.better = better && normalize(better) !== normalize(lastMe.text) ? better : "";
        }
        pr.turns.push({ role: "them", text: String(data.reply || "Sorry, could you say that again?"), pt: String(data.reply_pt || "") });
        pr.lastHint = String(data.hint_pt || "");
        if (lastMe) gain(3);
      } else {
        const data = await tutor.ask(doubtPrompt());
        if (ui.prof !== mine) return;
        pr.turns.push({ role: "them", text: String(data.answer_pt || ""), examples: Array.isArray(data.examples) ? data.examples.slice(0, 4).map((x) => ({ en: String(x.en || ""), pt: String(x.pt || "") })) : [] });
        gain(1);
      }
    } catch (e) {
      if (hideTutor(e)) tutor = null;
      pr.error = errorText(e);
    } finally {
      pr.busy = false;
      if (ui.prof === mine) { render(); const input = document.getElementById("chat-input"); if (input) input.focus(); }
    }
  }
  async function profFixRun() {
    const pr = ui.prof, text = (document.getElementById("fix-text").value || "").trim();
    pr.draft = text; pr.error = ""; pr.fix = null;
    if (text.split(/\s+/).length < 3) { pr.error = "Escreva pelo menos uma frase completa."; render(); return; }
    pr.busy = true; render();
    try { pr.fix = await tutor.ask(fixPrompt(text, "")); gain(3); }
    catch (e) { if (hideTutor(e)) tutor = null; pr.error = errorText(e); }
    finally { pr.busy = false; render(); }
  }

  // ---------- Navegação ----------
  function go(tab) {
    ui.tab = tab;
    if (tab === "curso") { ui.unit = null; }
    if (tab === "revisao") ui.review = ui.review && ui.review.i < ui.review.keys.length ? ui.review : null;
    if (tab === "teste" && ui.test && ui.test.i >= PLACEMENT.length) ui.test = null;
    render(); window.scrollTo(0, 0);
  }
  function openUnit(id) {
    ui.tab = "curso"; ui.unit = id;
    const s = peekUnit(id);
    ui.step = !s.seen.vocab ? "vocab" : !s.seen.grammar ? "grammar" : s.practice < PASS ? "practice" : !s.speak ? "speak" : !s.write ? "write" : "vocab";
    markSeen(id, ui.step);
    if (!ui.practice || ui.practice.unitId !== id) ui.practice = null;
    render(); window.scrollTo(0, 0);
  }
  function markSeen(id, step) {
    if (step !== "vocab" && step !== "grammar") return;
    const s = unitState(id);
    if (!s.seen[step]) { s.seen[step] = true; gain(2); }
  }

  // ---------- Eventos ----------
  document.addEventListener("click", (ev) => {
    const el = ev.target.closest("button");
    if (!el || el.disabled) return;
    const d = el.dataset;
    const u = ui.unit ? unitById(ui.unit) : null;

    if (d.tab) return go(d.tab);
    if (d.go) return go(d.go);
    if (d.unit) return openUnit(+d.unit);
    if ("startZero" in d) { state.placement = { score: 0, level: "A1", start: 1 }; save(); return openUnit(1); }
    if (d.step && u) { ui.step = d.step; markSeen(u.id, d.step); render(); window.scrollTo(0, 0); return; }
    if (d.saytext) return speak(d.saytext);
    if (d.sayslow) return speak(d.sayslow, 0.6);
    if (d.sayall && u) return speakAll(d.sayall === "vocab" ? u.vocab.map((v) => v[0]) : u.sentences.map((s) => parseSentence(s[0]).full));
    if ("doubt" in d && u) { ui.prof = newProf("doubt"); ui.prof.draft = `Pode me explicar melhor ${u.titlePt.toLowerCase()}?`; return go("professor"); }

    // prática
    const p = ui.practice;
    if ("practiceStart" in d && u) { startPractice(u); render(); return; }
    if ("extra" in d && u && tutor) return extraExercises(u);
    if (d.pick != null && p && !p.answered) { p.picked = +d.pick; return answerPractice(+d.pick === p.items[p.i].answer); }
    if (d.build != null && p && !p.answered) { p.items[p.i].built.push(+d.build); render(); return; }
    if (d.unbuild != null && p && !p.answered) { p.items[p.i].built.splice(+d.unbuild, 1); render(); return; }
    if ("clearOrder" in d && p) { p.items[p.i].built = []; render(); return; }
    if ("checkOrder" in d && p) { const it = p.items[p.i]; return answerPractice(it.built.map((ti) => it.tiles[ti].w).join(" ") === it.words.join(" ")); }
    if ("checkTyped" in d && p) {
      const it = p.items[p.i], typed = (document.getElementById("typed").value || "").trim();
      if (!typed) return;
      return answerPractice(normalize(typed) === normalize(it.full), typed);
    }
    if ("accept" in d && p && !p.correct) { p.correct = true; p.right++; gain(2); render(); return; }
    if ("next" in d && p) {
      if (p.i + 1 >= p.items.length) return finishPractice();
      p.i++; p.answered = false; p.correct = null; p.picked = null; p.typed = "";
      render(); const f = document.getElementById("typed"); if (f) f.focus(); return;
    }

    // fala e escrita
    if ("speakDone" in d && u) { const s = unitState(u.id); if (!s.speak) { s.speak = true; gain(5); } render(); return; }
    if ("writeCheck" in d && u && tutor) return checkWriting(u);
    if ("writeSelf" in d && u) { ui.write.unit = u.id; ui.write.text = document.getElementById("write-text").value; const s = unitState(u.id); if (!s.write) { s.write = true; gain(5); } render(); return; }

    // revisão
    if ("reviewStart" in d) { ui.review = { keys: shuffle(dueCards()).slice(0, 25), i: 0, right: 0, flipped: false }; render(); return; }
    if ("flip" in d && ui.review) { ui.review.flipped = true; const c = cardOf(ui.review.keys[ui.review.i]); if (c.box < 2) speak(c.en); render(); return; }
    if (d.recall != null && ui.review) {
      const r = ui.review, key = r.keys[r.i], card = state.srs[key];
      if (d.recall === "1") { card.box = Math.min(card.box + 1, SRS_DAYS.length - 1); card.due = addDays(SRS_DAYS[card.box]); r.right++; }
      else { card.box = 0; card.due = addDays(1); }
      if (state.reviewed.date !== today()) state.reviewed = { date: today(), n: 0 };
      state.reviewed.n++;
      gain(1);
      r.i++; r.flipped = false; render(); return;
    }
    if ("reviewClose" in d) { ui.review = null; render(); return; }

    // teste de nível
    if ("testStart" in d) { ui.test = { i: 0, score: 0, picked: null }; render(); return; }
    if (d.tpick != null && ui.test && ui.test.picked == null) { ui.test.picked = +d.tpick; if (+d.tpick === PLACEMENT[ui.test.i].answer) ui.test.score++; render(); return; }
    if ("tnext" in d && ui.test) {
      ui.test.i++; ui.test.picked = null;
      if (ui.test.i >= PLACEMENT.length) { const res = placementResult(ui.test.score); state.placement = { score: ui.test.score, level: res.level, start: res.start }; gain(20); }
      render(); return;
    }

    // professor
    if (d.mode && !ui.prof.busy) { ui.prof = newProf(d.mode, ui.prof.topic); render(); return; }
    if (d.topic && !ui.prof.busy) { ui.prof = newProf("chat", d.topic); render(); return; }
    if ("chatStart" in d && tutor) return profSend("chat");
    if ("profReset" in d) { ui.prof = newProf(ui.prof.mode, ui.prof.topic); render(); return; }
    if ("hint" in d) { ui.prof.hint = ui.prof.lastHint || ""; render(); return; }
    if ("fix" in d && tutor) return profFixRun();
  });

  document.addEventListener("input", (ev) => {
    const id = ev.target.id;
    if (id === "write-text" && ui.unit) { ui.write.unit = ui.unit; ui.write.text = ev.target.value; }
    else if (id === "fix-text" || (id === "chat-input" && ui.prof.mode === "doubt")) ui.prof.draft = ev.target.value;
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" && ev.target.id === "typed") { ev.preventDefault(); const b = document.querySelector("[data-check-typed]"); if (b) b.click(); }
  });

  document.addEventListener("submit", (ev) => {
    const kind = ev.target.dataset.form;
    if (!kind) return;
    ev.preventDefault();
    const input = document.getElementById("chat-input");
    const text = (input.value || "").trim();
    if (!text || ui.prof.busy || !tutor) return;
    ui.prof.turns.push({ role: "me", text });
    ui.prof.draft = "";
    profSend(kind);
  });

  // ---------- Início ----------
  render();
  (async () => {
    store = await initStore();
    try {
      const saved = await store.load();
      if (saved && typeof saved === "object" && saved.v === 2) state = Object.assign(emptyState(), saved);
    } catch (e) { /* começa do zero */ }
    render();
  })();
  initTutor().then((t) => { tutor = t; render(); }).catch(() => { tutor = null; render(); });
})();
