// Bubi English: curso de inglês A1 → B1 contado como uma série.
// Roda em dois lugares:
//  1) Artifact no claude.ai: progresso na conta + professor IA via window.claude
//  2) Local (node server.js) ou GitHub Pages: progresso no navegador; professor IA via /api/tutor (só local)

(function () {
  "use strict";

  const STORAGE_KEY = "bubi-english:v3";
  const USER_NAME = "Laís";
  const DAILY_GOAL = 30;
  const PASS = 70;
  const SRS_DAYS = [1, 3, 7, 14, 30, 60];
  const IN_ARTIFACT = typeof window.claude !== "undefined" && window.claude && typeof window.claude.use === "function";
  const ON_PAGES = location.hostname.endsWith("github.io");
  const STEPS = [["episode", "Episódio"], ["vocab", "Palavras"], ["lesson", "Entenda"], ["practice", "Pratique"], ["speak", "Fale"], ["mission", "Missão"]];

  // ---------- Ícones ----------
  const ICONS = {
    home: '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
    cards: '<rect x="3" y="7" width="13" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
    lips: '<path d="M3 12c3-4 6-5 9-3 3-2 6-1 9 3-3 4-6 6-9 6s-6-2-9-6z"/><path d="M3 12h18"/>',
    sound: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M18.5 6.5a7.5 7.5 0 0 1 0 11"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/>',
    play: '<path d="M7 5l12 7-12 7z"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
    arrow: '<path d="M7 17L17 7"/><path d="M9 7h8v8"/>',
    back: '<path d="M15 6l-6 6 6 6"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
    hand: '<path d="M8 13V6a1.5 1.5 0 0 1 3 0v6"/><path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11"/><path d="M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 8-7 8-3 0-4.5-1.5-6-4l-1.5-3a1.5 1.5 0 0 1 2.6-1.5L8 15"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2"/><path d="M3 13h18"/>',
    ruler: '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
    plane: '<path d="M2 16l20-6-20-6 4 6-4 6z"/><path d="M6 10h8"/>',
    cup: '<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3v2M12 3v2"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14"/><circle cx="12" cy="17" r=".6"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ""}</svg>`;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);

  function parseSentence(raw) {
    const m = raw.match(/\[([^\]]+)\]/), options = m[1].split("|");
    return { full: raw.replace(m[0], options[0]), blank: raw.replace(m[0], "___"), answer: options[0], options };
  }
  function normalize(s) {
    return String(s).toLowerCase().replace(/[’‘`´]/g, "'")
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
  const emptyState = () => ({ v: 3, xp: 0, log: {}, placement: null, units: {}, srs: {}, pron: {}, reviewed: { date: today(), n: 0 } });
  let state = emptyState();
  let store = null;
  let tutor = undefined; // undefined = carregando; null = indisponível

  const newProf = (mode, topic) => ({ mode: mode || "chat", topic: topic || "intro", custom: null, turns: [], busy: false, hint: "", lastHint: "", error: "", draft: "", fix: null });
  const ui = { tab: "inicio", unit: null, step: "episode", practice: null, review: null, test: null, prof: newProf(), write: {}, showPt: false, epq: {}, more: {}, why: {}, mic: null, pron: null, game: null, playing: null, showModel: false };

  const blankUnit = () => ({ seen: {}, practice: 0, speak: false, mission: false, done: false });
  const unitState = (id) => state.units[id] || (state.units[id] = blankUnit());
  const peekUnit = (id) => state.units[id] || blankUnit();
  const unitById = (id) => UNITS.find((u) => u.id === id);
  const doneCount = () => UNITS.filter((u) => peekUnit(u.id).done).length;
  function stepDone(id) {
    const s = peekUnit(id);
    return { episode: !!s.seen.episode, vocab: !!s.seen.vocab, lesson: !!s.seen.lesson, practice: s.practice >= PASS, speak: !!s.speak, mission: !!s.mission };
  }
  const stepsCount = (id) => Object.values(stepDone(id)).filter(Boolean).length;
  function nextUnit() {
    const start = state.placement ? state.placement.start : 1;
    return UNITS.find((u) => u.id >= start && !peekUnit(u.id).done) || UNITS.find((u) => !peekUnit(u.id).done) || null;
  }
  const currentLevel = () => { const u = nextUnit(); return u ? u.level : "B1"; };
  const dueCards = () => { const t = today(); return Object.keys(state.srs).filter((k) => state.srs[k].due <= t); };
  function streak() {
    const d = new Date();
    if (!state.log[today()]) d.setDate(d.getDate() - 1);
    let n = 0;
    while (state.log[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  const todayXp = () => state.log[today()] || 0;
  const todayReviewed = () => (state.reviewed.date === today() ? state.reviewed.n : 0);
  function gain(xp) {
    const t = today();
    state.xp += xp;
    state.log[t] = (state.log[t] || 0) + xp;
    const keys = Object.keys(state.log).sort();
    if (keys.length > 60) keys.slice(0, keys.length - 60).forEach((k) => delete state.log[k]);
    save();
  }

  // ---------- Armazenamento ----------
  async function initStore() {
    if (IN_ARTIFACT) {
      try {
        const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
        const id = user ? await user.id() : null;
        if (db && id) {
          const ref = db.doc("data/users/" + id + "/bubi");
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
    if (ON_PAGES) return null;
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
    rate_limited: "Muitas perguntas seguidas. Espere um pouquinho e tente de novo.",
    session_expired: "Sua sessão expirou. Entre de novo no claude.ai.",
    invalid_json: "A resposta veio num formato estranho. Tente de novo.",
    refused: "Essa mensagem não pôde ser respondida. Tente escrever de outro jeito."
  };
  const errorText = (e) => ERRORS[e && e.code] || "Não deu para falar com o professor agora. Tente de novo.";
  const hideTutor = (e) => ["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"].includes(e && e.code);
  const levelForAi = () => (state.placement || doneCount() ? currentLevel() : "A1");
  const tutorOffText = () => IN_ARTIFACT ? "Esta visualização não permite usar o Claude. Abra a página no claude.ai, com a sua conta."
    : ON_PAGES ? "Nesta versão do GitHub o professor IA não funciona. Para conversar, tirar dúvidas e corrigir textos, use a versão no claude.ai."
    : "Rode o projeto com npm start e uma chave de API para usar o professor.";

  // ---------- Voz: ouvir ----------
  const canSpeak = typeof window.speechSynthesis !== "undefined";
  function voiceFor() { try { const v = speechSynthesis.getVoices(); return v.find((x) => x.lang && x.lang.startsWith("en-US")) || v.find((x) => x.lang && x.lang.startsWith("en")); } catch (e) { return null; } }
  function utter(text, opts) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = (opts && opts.rate) || 0.9; u.pitch = (opts && opts.pitch) || 1;
    const v = voiceFor(); if (v) u.voice = v;
    return u;
  }
  function speak(text, rate) { if (!canSpeak) return; try { speechSynthesis.cancel(); speechSynthesis.speak(utter(text, { rate })); } catch (e) { /* sem áudio */ } }
  function speakAll(list) { if (!canSpeak) return; try { speechSynthesis.cancel(); list.forEach((t) => speechSynthesis.speak(utter(t))); } catch (e) { /* sem áudio */ } }
  function playLines(lines) {
    if (!canSpeak) return;
    try {
      speechSynthesis.cancel();
      ui.playing = true; markLine(-1);
      lines.forEach(([who, en], i) => {
        const u = utter(en, { pitch: (CAST[who] || {}).pitch || 1 });
        u.onstart = () => markLine(i);
        if (i === lines.length - 1) u.onend = () => { ui.playing = null; markLine(-1); const b = document.querySelector("[data-play-episode]"); if (b) b.innerHTML = icon("play") + "Ouvir o episódio"; };
        speechSynthesis.speak(u);
      });
    } catch (e) { ui.playing = null; }
  }
  function markLine(i) { document.querySelectorAll(".line").forEach((el, k) => el.classList.toggle("playing", k === i)); }
  const audioBtns = (text) => canSpeak ? `<span class="audio"><button class="icon-btn" data-saytext="${esc(text)}" aria-label="Ouvir">${icon("sound")}</button><button class="icon-btn slow" data-sayslow="${esc(text)}" aria-label="Ouvir devagar" title="Devagar">0.6×</button></span>` : "";

  // ---------- Voz: falar e conferir ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const canListen = !!SR && !IN_ARTIFACT;
  const micBtn = (text, key) => canListen ? `<button class="icon-btn mic ${ui.mic && ui.mic.key === key && ui.mic.state === "listening" ? "on" : ""}" data-listen="${esc(key)}" data-target="${esc(text)}" aria-label="Falar e conferir" title="Fale e confira">${icon("mic")}</button>` : "";
  function micResult(key) {
    const m = ui.mic;
    if (!m || m.key !== key) return "";
    if (m.state === "listening") return `<div class="mic-result">Pode falar, estou ouvindo…</div>`;
    if (m.state === "error") return `<div class="mic-result">${esc(m.error)}</div>`;
    const msg = m.pct >= 85 ? "Perfeito! Pronúncia muito boa." : m.pct >= 55 ? "Quase lá! Repita as palavras em vermelho com calma." : "Vamos de novo, devagar. Ouça o áudio e imite o ritmo.";
    return `<div class="mic-result"><strong>${m.pct}% · ${msg}</strong><span class="heard">${m.words.map((w) => `<span class="${w.ok ? "ok" : "miss"}">${esc(w.w)}</span>`).join("")}</span><small class="muted">Eu ouvi: "${esc(m.said)}"</small></div>`;
  }
  function listen(target, key) {
    if (!canListen) return;
    try { if (ui.mic && ui.mic.rec) ui.mic.rec.abort(); } catch (e) { /* ok */ }
    if (canSpeak) speechSynthesis.cancel();
    const rec = new SR();
    rec.lang = "en-US"; rec.interimResults = false; rec.maxAlternatives = 3;
    ui.mic = { key, state: "listening", rec };
    rec.onresult = (e) => {
      let best = null;
      for (const alt of e.results[0]) {
        const said = alt.transcript, set = new Set(normalize(said).split(" "));
        const words = target.replace(/[.,!?;:"]/g, "").split(/\s+/).filter(Boolean).map((w) => ({ w, ok: normalize(w).split(" ").every((p) => set.has(p)) }));
        const pct = Math.round((words.filter((w) => w.ok).length / Math.max(words.length, 1)) * 100);
        if (!best || pct > best.pct) best = { said, words, pct };
      }
      if (!best) return;
      ui.mic = { key, state: "done", said: best.said, words: best.words, pct: best.pct };
      if (best.pct >= 85) gain(1);
      render();
    };
    rec.onerror = (e) => {
      ui.mic = { key, state: "error", error: e.error === "not-allowed" || e.error === "service-not-allowed" ? "Permita o uso do microfone no navegador para usar esta função." : e.error === "no-speech" ? "Não ouvi nada. Fale mais perto do microfone." : "Não consegui ouvir. Tente de novo." };
      render();
    };
    rec.onend = () => { if (ui.mic && ui.mic.key === key && ui.mic.state === "listening") { ui.mic = { key, state: "error", error: "Não ouvi nada. Toque no microfone e fale de novo." }; render(); } };
    try { rec.start(); } catch (e) { ui.mic = { key, state: "error", error: "Não consegui ligar o microfone." }; }
    render();
  }

  // ---------- Peças visuais ----------
  function ring(pct, label, value, tone) {
    const r = 38, c = 2 * Math.PI * r, p = Math.max(0, Math.min(1, pct));
    return `<div class="ring-card glass">
      <svg class="ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle class="ring-track" cx="50" cy="50" r="${r}" fill="none" stroke-width="10"/>
        <circle class="ring-fill" cx="50" cy="50" r="${r}" fill="none" stroke-width="10" stroke-linecap="round" style="stroke:var(--${tone})"
          stroke-dasharray="${(c * p).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 50 50)" ${p === 0 ? 'stroke-opacity="0"' : ""}/>
        <text class="ring-value" x="50" y="57" text-anchor="middle">${esc(value)}</text>
      </svg>
      <span>${esc(label)}</span>
    </div>`;
  }
  const castColor = (who) => "var(--" + ((CAST[who] || {}).color || "lilac") + ")";
  const avatar = (who, cls) => `<span class="${cls || "avatar-i"}" style="background:${castColor(who)}">${esc(who[0])}</span>`;
  function epCard(u) {
    const s = peekUnit(u.id), n = stepsCount(u.id), next = nextUnit();
    const status = s.done ? `<span class="pill pill-dark">${icon("check")}Concluído</span>` : u === next ? `<span class="pill" style="background:var(--accent);color:#fff">Próximo</span>` : n ? `<span class="pill">Em andamento</span>` : `<span class="pill">Novo</span>`;
    return `<button class="ep" data-unit="${u.id}">
      <span class="ep-top"><span class="ep-num">Ep. ${u.id}</span>${status}</span>
      <h3>${esc(u.title)}</h3>
      <p>${esc(u.titlePt)}</p>
      <span class="dots" aria-label="${n} de 6 etapas">${STEPS.map((_, i) => `<i class="${i < n ? "on" : ""}"></i>`).join("")}</span>
    </button>`;
  }
  const bubbleSay = (t) => `<span class="bubble">${esc(t)}</span>`;
  const wordmark = () => `<span class="wordmark">bub<span class="i">ı</span></span>`;

  // ---------- Casca ----------
  const NAV = [["inicio", "Início", "home"], ["curso", "Curso", "film"], ["pronuncia", "Pronúncia", "lips"], ["revisao", "Revisão", "cards"], ["professor", "Professor", "chat"]];
  const $app = document.getElementById("app");
  document.getElementById("logo").innerHTML = `${logoMark(46)}<span>${wordmark()}<small>english · A1 → B1</small></span>`;
  function renderShell() {
    const due = dueCards().length;
    document.getElementById("nav").innerHTML = NAV.map(([id, label, ic]) =>
      `<button class="nav-item" data-tab="${id}" ${ui.tab === id ? 'aria-current="page"' : ""}>${icon(ic)}<span>${label}</span>${id === "revisao" && due ? `<b class="badge">${due}</b>` : ""}</button>`).join("");
    document.getElementById("side-xp").innerHTML = `<strong>${state.xp} XP</strong><span>${streak()} ${streak() === 1 ? "dia seguido" : "dias seguidos"}</span><div class="bar"><span style="width:${Math.min(100, (todayXp() / DAILY_GOAL) * 100)}%"></span></div><span>Meta do dia: ${Math.min(todayXp(), DAILY_GOAL)}/${DAILY_GOAL} XP</span>`;
  }
  function render() {
    renderShell();
    const views = { inicio: viewHome, curso: viewCourse, pronuncia: viewPron, revisao: viewReview, professor: viewProfessor, teste: viewTest };
    $app.innerHTML = `<div class="mobile-top">${logoMark(34)}${wordmark()}<span class="pill">${state.xp} XP · ${streak()}d</span></div>` + views[ui.tab]();
    if (ui.tab === "professor") { const c = document.getElementById("chat-end"); if (c) c.scrollIntoView({ block: "nearest" }); }
  }

  // ---------- Início ----------
  function viewHome() {
    const nu = nextUnit(), due = dueCards().length;
    let hero;
    if (!state.placement && !doneCount() && !Object.keys(state.units).length) {
      hero = { say: "Oi! Eu sou o Bubi. Aqui você aprende inglês acompanhando a história da Bia em Nova York.", title: "Vamos ver por onde você começa?", btn: `<button class="btn" data-go="teste">Fazer teste de nível</button><button class="btn btn-soft" data-start-zero>Começar do episódio 1</button>` };
    } else if (nu) {
      hero = { say: `Episódio ${nu.id}: ${nu.episode.title}. ${nu.goal}`, title: nu.title, btn: `<button class="btn" data-unit="${nu.id}">${icon("play")}${stepsCount(nu.id) ? "Continuar episódio" : "Assistir episódio"}</button>` };
    } else {
      hero = { say: "Você terminou as três temporadas! Agora é revisar e conversar para ganhar fluência.", title: "Série completa!", btn: `<button class="btn" data-tab="professor">Conversar com o professor</button>` };
    }
    const days = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return { k: dayKey(d), label: "DSTQQSS"[d.getDay()] }; });
    const max = Math.max(DAILY_GOAL, ...days.map((d) => state.log[d.k] || 0));
    const level = nu ? nu.level : "B1";
    const seasonUnits = UNITS.filter((u) => u.level === level);
    const reviewTotal = todayReviewed() + due;
    return `
      <div class="top-row">
        <div><span class="label">${esc(LEVELS[level].season)}</span><h1>Hello, ${esc(USER_NAME)}!</h1></div>
        <div class="row"><span class="pill">${esc(LEVELS[currentLevel()].name)}</span><button class="btn btn-soft" data-go="teste">${icon("target")}Teste de nível</button></div>
      </div>
      <div class="dash">
        <div class="stack" style="gap:20px">
          <section class="hero glass">
            <div class="stack">${bubbleSay(hero.say)}<h2>${esc(hero.title)}</h2><div class="row">${hero.btn}</div></div>
            ${mascot("wave", 180)}
          </section>
          <button class="continue" data-tab="revisao">
            <span class="circle">${icon("cards")}</span>
            <span><strong>${due ? `Revisão do dia: ${due} ${due === 1 ? "palavra" : "palavras"}` : "Revisão em dia"}</strong><small>${due ? "Revise agora para não esquecer" : "As palavras dos episódios concluídos voltam aqui no dia certo"}</small></span>
            <span class="arrow">${icon("arrow")}</span>
          </button>
          <section class="timeline glass">
            <div class="section-head"><h2>${esc(LEVELS[level].season)}</h2><button class="link" data-tab="curso">Ver todos ${icon("arrow")}</button></div>
            ${seasonUnits.map((u) => { const n = stepsCount(u.id), pct = Math.round((n / 6) * 100); return `<button class="tl-row ${u === nu ? "now" : ""}" data-unit="${u.id}"><span class="tl-ep">Ep. ${u.id}</span><span class="tl-bar"><i style="width:${pct}%;background:var(--${LEVELS[u.level].color})"></i><span><em>${esc(u.title)}</em><b>${pct}%</b></span></span></button>`; }).join("")}
          </section>
        </div>
        <div class="side-col">
          <section class="activity solid">
            <div class="row between"><h3>Sua semana</h3><span class="pill">${streak()} ${streak() === 1 ? "dia" : "dias"} seguidos</span></div>
            <div class="bars">${days.map((d) => { const v = state.log[d.k] || 0; return `<div title="${v} XP"><b class="${v >= DAILY_GOAL ? "" : "soft"}" style="height:${Math.max(6, (v / max) * 100)}%"></b><span>${d.label}</span></div>`; }).join("")}</div>
            <span class="muted" style="font-size:13px">Barra rosa forte = meta de ${DAILY_GOAL} XP batida. Hoje: ${todayXp()} XP.</span>
          </section>
          <div class="ring-row">
            ${ring(doneCount() / UNITS.length, "Curso", Math.round((doneCount() / UNITS.length) * 100) + "%", "violet")}
            ${ring(reviewTotal ? todayReviewed() / reviewTotal : 1, "Revisões hoje", due ? todayReviewed() + "/" + reviewTotal : "ok", "accent")}
          </div>
          <section class="panel glass">
            <h3>O elenco</h3>
            <div class="stack-sm">${Object.keys(CAST).map((n) => `<div class="row" style="flex-wrap:nowrap;align-items:flex-start">${avatar(n)}<span><strong>${n}</strong> <span class="muted" style="font-size:14px">${esc(CAST[n].about)}</span></span></div>`).join("")}</div>
          </section>
        </div>
      </div>
      <p class="foot">Progresso salvo ${store ? (store.kind === "conta" ? "na sua conta" : "neste navegador") : "…"}. Um episódio por dia, de 20 a 30 minutos, rende mais que horas seguidas no fim de semana.</p>`;
  }

  // ---------- Curso ----------
  function viewCourse() {
    if (ui.unit) return viewUnit();
    return `
      <div class="top-row"><div><span class="label">3 temporadas · ${UNITS.length} episódios · ${doneCount()} concluídos</span><h1>A série da Bia</h1></div><button class="btn btn-soft" data-go="teste">${icon("target")}Teste de nível</button></div>
      <p class="muted">Cada episódio tem 6 etapas: assistir, palavras, entender, praticar, falar e a missão. O episódio conta como concluído quando você acerta pelo menos ${PASS}% da prática.</p>
      ${Object.keys(LEVELS).map((lv) => `
        <section class="season">
          <div class="season-head"><span class="row"><span class="pill tone-${LEVELS[lv].color}">${esc(LEVELS[lv].name)}</span><h2>${esc(LEVELS[lv].season)}</h2></span><p class="muted">${esc(LEVELS[lv].note)}</p></div>
          <div class="ep-grid">${UNITS.filter((u) => u.level === lv).map(epCard).join("")}</div>
        </section>`).join("")}
      <section class="panel glass start-card">${mascot("think", 100)}<div class="stack-sm"><h3>Temporada 4 (B2) em breve</h3><p class="muted">Past perfect, used to, modais de dedução, terceira condicional e mais. Peça ao Claude Code para criar quando terminar a temporada 3.</p></div></section>`;
  }

  function viewUnit() {
    const u = unitById(ui.unit), s = peekUnit(u.id), done = stepDone(u.id);
    const body = { episode: stepEpisode, vocab: stepVocab, lesson: stepLesson, practice: stepPractice, speak: stepSpeak, mission: stepMission }[ui.step](u);
    const idx = STEPS.findIndex(([k]) => k === ui.step), next = STEPS[idx + 1];
    const inPractice = ui.step === "practice" && ui.practice && ui.practice.unitId === u.id && !ui.practice.finished;
    return `
      <button class="back" data-tab="curso">${icon("back")}Todos os episódios</button>
      <section class="cover tone-${LEVELS[u.level].color}">
        <div class="stack-sm">
          <span class="label">${esc(LEVELS[u.level].season)} · Episódio ${u.id}${s.done ? " · concluído" : ""}</span>
          <h1>${esc(u.title)}</h1>
          <p><strong>${esc(u.titlePt)}.</strong> ${esc(u.goal)}</p>
        </div>
        ${mascot(s.done ? "cheer" : "wave", 120)}
      </section>
      <nav class="steps" aria-label="Etapas do episódio">${STEPS.map(([k, label], i) => `<button class="step ${done[k] ? "done" : ""}" data-step="${k}" ${ui.step === k ? 'aria-current="step"' : ""}><span class="step-n">${done[k] ? icon("check") : i + 1}</span>${label}</button>`).join("")}</nav>
      ${body}
      ${next && !inPractice ? `<div class="row end"><button class="btn" data-step="${next[0]}">Próxima etapa: ${next[1]} →</button></div>` : ""}
      ${!next && s.done && unitById(u.id + 1) ? `<div class="row end"><button class="btn" data-unit="${u.id + 1}">Próximo episódio →</button></div>` : ""}`;
  }

  // Etapa 1: Episódio
  function stepEpisode(u) {
    const e = u.episode, answers = ui.epq[u.id] || {};
    return `<section class="panel glass">
      <div class="section-head"><h2>${esc(e.title)}</h2>
        <div class="row">${canSpeak ? `<button class="btn" data-play-episode>${icon(ui.playing ? "stop" : "play")}${ui.playing ? "Parar" : "Ouvir o episódio"}</button>` : ""}
        <button class="btn btn-soft" data-toggle-pt>${icon("eye")}${ui.showPt ? "Esconder tradução" : "Mostrar tradução"}</button></div></div>
      <div class="scene">${icon("film")}<span>${esc(e.scene)}</span></div>
      <p class="muted" style="font-size:14px">Dica: ouça a primeira vez sem tradução e tente pegar a ideia geral. Depois ouça de novo com a tradução.</p>
      <div class="lines">${e.lines.map(([who, en, pt], i) => `<div class="line ${who === "Bia" ? "right" : ""}">
        ${avatar(who, "line-av")}
        <div class="line-txt"><small>${esc(who)}</small><strong>${esc(en)}</strong>${ui.showPt ? `<span>${esc(pt)}</span>` : ""}</div>
        ${canSpeak ? `<span class="audio"><button class="icon-btn" data-sayline="${u.id}:${i}" aria-label="Ouvir esta fala">${icon("sound")}</button></span>` : "<span></span>"}
      </div>`).join("")}</div>
    </section>
    <section class="panel solid">
      <h2>Entendeu?</h2>
      ${e.questions.map(([q, opts, ans], qi) => { const picked = answers[qi]; return `<div class="quiz-inline"><strong>${esc(q)}</strong><div class="options">${opts.map((o, j) => {
        const cls = picked == null ? "" : j === ans ? "right" : j === picked ? "wrong" : "";
        return `<button class="opt ${cls}" data-epq="${u.id}:${qi}:${j}" ${picked != null ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}</div></div>`; }).join("")}
      ${Object.keys(answers).length === e.questions.length ? `<div class="feedback ok"><strong>Boa! Agora vamos ver as palavras que apareceram no episódio.</strong></div>` : ""}
    </section>`;
  }

  // Etapa 2: Palavras
  function stepVocab(u) {
    return `<section class="panel glass">
      <div class="section-head"><h2>Palavras e expressões</h2>${canSpeak ? `<button class="btn btn-soft" data-sayall>${icon("sound")}Ouvir todas</button>` : ""}</div>
      <div class="legend"><span><b>Como ler a pronúncia:</b> leia como se fosse português.</span><span><b>MAIÚSCULA</b> = sílaba forte.</span><span><b>th / dh</b> = língua entre os dentes.</span><span><b>ÍÍ</b> = vogal longa.</span></div>
      <p class="muted" style="font-size:14px">Para cada palavra: ouça, ouça devagar, repita em voz alta${canListen ? " e toque no microfone para conferir" : ""}. Depois invente uma frase sua com ela.</p>
      <div class="words">${u.vocab.map(([en, pt, pr], i) => `<div class="word">
        <div><strong>${esc(en)}</strong><span class="pt">${esc(pt)}</span><span class="pron">${esc(pr)}</span></div>
        <span class="audio">${audioBtns(en)}${micBtn(en, "v" + u.id + ":" + i)}</span>
        ${micResult("v" + u.id + ":" + i)}
      </div>`).join("")}</div>
    </section>`;
  }

  // Etapa 3: Entenda
  function stepLesson(u) {
    const L = u.lesson;
    return `<section class="why tone-lilac">${mascot("talk", 84)}<div class="stack-sm"><span class="label">Pra que serve</span><p style="font-size:17px">${esc(L.why)}</p></div></section>
    <div class="parts">${L.parts.map(([title, text, exs], i) => { const key = u.id + ":" + i, more = ui.more[key]; return `<section class="part">
      <div class="part-head"><span class="part-n">${i + 1}</span><h3>${esc(title)}</h3></div>
      <p>${esc(text)}</p>
      ${exs.map(([en, pt]) => `<div class="example"><span><strong>${esc(en)}</strong><small>${esc(pt)}</small></span>${audioBtns(en)}</div>`).join("")}
      ${more && more.text ? `<div class="explain-more"><strong>Explicando de outro jeito:</strong><span>${esc(more.text)}</span>${(more.examples || []).map((x) => `<div class="example"><span><strong>${esc(x.en)}</strong><small>${esc(x.pt)}</small></span>${audioBtns(x.en)}</div>`).join("")}</div>` : ""}
      ${more && more.error ? `<p class="notice">${esc(more.error)}</p>` : ""}
      ${tutor ? `<div class="row"><button class="link" data-more="${key}" ${more && more.busy ? "disabled" : ""}>${icon("spark")}${more && more.busy ? "Pensando num jeito mais fácil…" : "Não entendi, explica de outro jeito"}</button></div>` : ""}
    </section>`; }).join("")}</div>
    <section class="panel glass">
      <h2>Erros que todo brasileiro comete</h2>
      <ul class="mistakes">${L.mistakes.map(([w, r, why]) => `<li><span><span class="wrong">${esc(w)}</span> → <span class="right">${esc(r)}</span></span><small>${esc(why)}</small></li>`).join("")}</ul>
    </section>
    <section class="tip">${mascot("cheer", 64)}<div class="stack-sm"><span class="label">Truque do Bubi</span><strong>${esc(L.tip)}</strong></div></section>
    ${tutor ? `<div class="row"><button class="btn btn-soft" data-doubt="${u.id}">${icon("help")}Tenho outra dúvida sobre isso</button></div>` : ""}`;
  }
  async function explainAgain(key) {
    const [uid, i] = key.split(":").map(Number), u = unitById(uid), part = u.lesson.parts[i];
    ui.more[key] = { busy: true }; render();
    const prompt = `You are a very patient English teacher for a Brazilian beginner (CEFR ${u.level}) who found this explanation hard to understand.
Topic: ${u.titlePt}. Point: "${part[0]}" — "${part[1]}". Examples given: ${part[2].map((x) => x[0]).join(" | ")}.
Explain the same idea again in Brazilian Portuguese in a DIFFERENT and even simpler way, like talking to a friend: use an everyday analogy or a comparison with Portuguese, short sentences, no technical grammar words (at most 70 words). Then give 2 new, very simple English examples with Portuguese translations.
Reply with only a JSON object: {"explanation_pt":"...","examples":[{"en":"...","pt":"..."}]}`;
    try {
      const d = await tutor.ask(prompt);
      ui.more[key] = { text: String(d.explanation_pt || ""), examples: Array.isArray(d.examples) ? d.examples.slice(0, 3).map((x) => ({ en: String(x.en || ""), pt: String(x.pt || "") })) : [] };
    } catch (e) { if (hideTutor(e)) tutor = null; ui.more[key] = { error: errorText(e) }; }
    render();
  }

  // Etapa 4: Pratique
  function buildPractice(u) {
    const items = [], vocab = u.vocab;
    pick(vocab.map((_, i) => i), 4).forEach((i, k) => {
      const opts = shuffle([vocab[i], ...pick(vocab.filter((_, j) => j !== i), 3)]);
      if (k % 2 === 0) items.push({ type: "mc", label: "O que significa", prompt: vocab[i][0], say: vocab[i][0], options: opts.map((v) => v[1]), answer: opts.indexOf(vocab[i]) });
      else items.push({ type: "mc", label: "Como se diz em inglês", prompt: vocab[i][1], options: opts.map((v) => v[0]), answer: opts.indexOf(vocab[i]), say: vocab[i][0] });
    });
    const sents = u.sentences.map(([raw, pt]) => Object.assign(parseSentence(raw), { pt }));
    const order = shuffle(sents.map((_, i) => i));
    order.slice(0, 4).forEach((i) => { const s = sents[i], opts = shuffle(s.options); items.push({ type: "mc", label: "Complete a frase", prompt: s.blank, sub: s.pt, options: opts, answer: opts.indexOf(s.answer), say: s.full }); });
    order.slice(4, 6).forEach((i) => {
      const words = sents[i].full.split(" ");
      let tiles = shuffle(words.map((w, j) => ({ w, j })));
      if (tiles.every((t, k) => t.j === k)) tiles = tiles.reverse();
      items.push({ type: "order", label: "Monte a frase", sub: sents[i].pt, words, tiles, built: [], say: sents[i].full });
    });
    const line = pick(u.episode.lines.filter((l) => l[1].split(" ").length <= 9), 1)[0];
    if (canSpeak && line) items.push({ type: "dict", label: "Ditado: ouça e escreva", full: line[1], sub: line[2], say: line[1] });
    [order[6], order[7]].forEach((i) => { const s = sents[i]; items.push({ type: "trans", label: "Traduza para o inglês", prompt: s.pt, full: s.full, say: s.full }); });
    return items;
  }
  function startPractice(u, items, extra) { ui.why = {}; ui.practice = { unitId: u.id, items: items || buildPractice(u), i: 0, right: 0, answered: false, correct: null, finished: false, extra: !!extra }; }

  function stepPractice(u) {
    const p = ui.practice && ui.practice.unitId === u.id ? ui.practice : null, s = peekUnit(u.id);
    if (!p) {
      return `<section class="panel glass start-card">${mascot("think", 120)}<div class="stack">
        <h2>Hora de praticar</h2>
        <p>Cerca de 13 exercícios, cada vez diferentes: significado, completar, montar frase, ditado e tradução. Acerte ${PASS}% ou mais para concluir o episódio.${tutor ? ' Errou? Toque em "Por que errei?" e o Bubi explica.' : ""}</p>
        ${s.practice ? `<p class="muted">Seu melhor resultado: <strong>${s.practice}%</strong></p>` : ""}
        <div class="row"><button class="btn" data-practice-start>${s.practice ? "Praticar de novo" : "Começar"}</button></div>
      </div></section>`;
    }
    if (p.finished) {
      const pct = Math.round((p.right / p.items.length) * 100), passed = pct >= PASS;
      return `<section class="panel glass result">${mascot(passed ? "cheer" : "think", 150)}
        <span class="label">${p.extra ? "Exercícios extras" : "Prática concluída"}</span>
        <span class="result-level">${pct}%</span>
        <p>${p.extra ? `Você acertou ${p.right} de ${p.items.length}.` : passed ? "Episódio concluído! As palavras dele entraram na sua revisão." : `Faltou pouco: você precisa de ${PASS}%. Releia a etapa Entenda e tente de novo.`}</p>
        <div class="row center"><button class="btn" data-practice-start>Praticar de novo</button>
        ${tutor ? `<button class="btn btn-soft" data-extra ${ui.extraBusy ? "disabled" : ""}>${icon("spark")}${ui.extraBusy ? "Criando exercícios…" : "+5 exercícios novos com IA"}</button>` : ""}</div>
        ${ui.extraError ? `<p class="notice">${esc(ui.extraError)}</p>` : ""}
      </section>`;
    }
    const it = p.items[p.i];
    let body = "";
    if (it.type === "mc") {
      body = `<span class="q-text">${esc(it.prompt)}</span>${it.sub ? `<span class="muted">${esc(it.sub)}</span>` : ""}
        <div class="options">${it.options.map((o, j) => { const cls = !p.answered ? "" : j === it.answer ? "right" : j === p.picked ? "wrong" : ""; return `<button class="opt ${cls}" data-pick="${j}" ${p.answered ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}</div>`;
    } else if (it.type === "order") {
      const used = new Set(it.built);
      body = `<span class="muted">${esc(it.sub)}</span>
        <div class="built ${p.answered ? (p.correct ? "ok" : "bad") : ""}">${it.built.length ? it.built.map((ti, k) => `<button class="tile" data-unbuild="${k}" ${p.answered ? "disabled" : ""}>${esc(it.tiles[ti].w)}</button>`).join("") : `<span class="muted">Toque nas palavras na ordem certa</span>`}</div>
        <div class="tiles">${it.tiles.map((t, ti) => `<button class="tile" data-build="${ti}" ${used.has(ti) || p.answered ? "disabled" : ""}>${esc(t.w)}</button>`).join("")}</div>
        ${!p.answered ? `<div class="row"><button class="btn" data-check-order ${it.built.length !== it.words.length ? "disabled" : ""}>Verificar</button><button class="link" data-clear-order>Limpar</button></div>` : ""}`;
    } else {
      body = `${it.type === "dict" ? `<div class="row"><button class="btn btn-soft" data-saytext="${esc(it.full)}">${icon("sound")}Ouvir</button><button class="btn btn-soft" data-sayslow="${esc(it.full)}">Ouvir devagar</button></div>` : `<span class="q-text">${esc(it.prompt)}</span>`}
        <input class="field" id="typed" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escreva em inglês…" ${p.answered ? `disabled value="${esc(p.typed || "")}"` : ""}>
        ${!p.answered ? `<div class="row"><button class="btn" data-check-typed>Verificar</button></div>` : ""}`;
    }
    let feedback = "";
    if (p.answered) {
      const answer = it.type === "mc" ? it.options[it.answer] : it.type === "order" ? it.words.join(" ") : it.full;
      const why = ui.why[p.i];
      feedback = `<div class="feedback ${p.correct ? "ok" : "bad"}">
        <strong>${p.correct ? "Isso aí!" : "A resposta certa é:"}</strong>
        ${!p.correct || it.type !== "mc" ? `<span class="answer">${esc(answer)} ${it.say ? audioBtns(it.say) : ""}</span>` : ""}
        ${it.type === "dict" ? `<span class="muted">${esc(it.sub)}</span>` : ""}
        ${!p.correct && it.type === "trans" ? `<button class="link" data-accept>${icon("check")}Minha resposta também está certa</button>` : ""}
        ${!p.correct && tutor && !why ? `<button class="link" data-why>${icon("help")}Por que errei?</button>` : ""}
        ${why && why.busy ? `<span class="muted">O Bubi está pensando…</span>` : ""}
        ${why && why.text ? `<div class="explain-more"><strong>O Bubi explica:</strong><span>${esc(why.text)}</span></div>` : ""}
        ${why && why.error ? `<span class="notice">${esc(why.error)}</span>` : ""}
      </div>
      <div class="row"><button class="btn" data-next>${p.i + 1 < p.items.length ? "Continuar" : "Ver resultado"}</button></div>`;
    }
    return `<div class="quiz"><section class="panel solid">
        <div class="row between"><span class="label">${esc(it.label)}</span><span class="pill">${p.i + 1} de ${p.items.length}</span></div>
        <div class="bar"><span style="width:${(p.i / p.items.length) * 100}%"></span></div>
        ${body}${feedback}
      </section>
      <aside class="quiz-side glass">${mascot(!p.answered ? "think" : p.correct ? "cheer" : "talk", 150)}${bubbleSay(!p.answered ? "Você consegue!" : p.correct ? "Mandou bem!" : "Errar faz parte. Leia a certa em voz alta!")}</aside>
    </div>`;
  }
  function answerPractice(correct, typed) { const p = ui.practice; p.answered = true; p.correct = correct; p.typed = typed; if (correct) { p.right++; gain(2); } render(); }
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
  async function whyWrong() {
    const p = ui.practice, it = p.items[p.i], u = unitById(p.unitId), idx = p.i;
    ui.why[idx] = { busy: true }; render();
    const mine = it.type === "mc" ? it.options[p.picked] : it.type === "order" ? it.built.map((ti) => it.tiles[ti].w).join(" ") : p.typed;
    const right = it.type === "mc" ? it.options[it.answer] : it.type === "order" ? it.words.join(" ") : it.full;
    const prompt = `A Brazilian English learner (CEFR ${u.level}) is studying "${u.titlePt}". Exercise: "${it.prompt || it.sub || ""}". The learner answered "${mine}" but the expected answer is "${right}".
Explain in Brazilian Portuguese, in 2 or 3 very simple and kind sentences, why the expected answer is right and what was wrong in the learner's answer. If the learner's answer is also acceptable, say so clearly. No technical jargon.
Reply with only a JSON object: {"explanation_pt":"..."}`;
    try { const d = await tutor.ask(prompt); ui.why[idx] = { text: String(d.explanation_pt || "") }; }
    catch (e) { if (hideTutor(e)) tutor = null; ui.why[idx] = { error: errorText(e) }; }
    render();
  }
  async function extraExercises(u) {
    ui.extraBusy = true; ui.extraError = ""; render();
    const prompt = `Create 5 NEW fill-in-the-blank multiple-choice exercises in English for a Brazilian learner (CEFR ${u.level}).
Topic: ${u.title} (${u.titlePt}).
Rules being practiced:
${u.lesson.parts.map((g) => "- " + g[0] + ": " + g[1]).join("\n")}
Useful vocabulary: ${u.vocab.map((v) => v[0]).join(", ")}.
Each "sentence" contains "___" exactly once; "options" has exactly 3 short choices with only one correct; "answer" is the index of the correct option; "pt" is the Brazilian Portuguese translation of the complete sentence. Do not repeat these sentences: ${u.sentences.map((s) => parseSentence(s[0]).full).join(" | ")}.
Reply with only a JSON array: [{"sentence":"...","options":["...","...","..."],"answer":0,"pt":"..."}]`;
    try {
      const data = await tutor.ask(prompt);
      const items = (Array.isArray(data) ? data : []).filter((x) => x && typeof x.sentence === "string" && x.sentence.includes("___") && Array.isArray(x.options) && x.options.length >= 2 && Number.isInteger(x.answer) && x.options[x.answer] != null)
        .slice(0, 5).map((x) => { const opts = x.options.map(String), right = opts[x.answer], sh = shuffle(opts); return { type: "mc", label: "Exercício extra", prompt: x.sentence, sub: String(x.pt || ""), options: sh, answer: sh.indexOf(right), say: x.sentence.replace("___", right) }; });
      if (!items.length) throw { code: "invalid_json" };
      startPractice(u, items, true);
    } catch (e) { if (hideTutor(e)) tutor = null; ui.extraError = errorText(e); }
    finally { ui.extraBusy = false; render(); }
  }

  // Etapa 5: Fale
  function stepSpeak(u) {
    const s = peekUnit(u.id);
    return `<section class="panel glass">
      <h2>Fale como a Bia</h2>
      <p class="muted">Técnica de shadowing: ouça uma fala, pause e repita em voz alta imitando o ritmo e a entonação. Faça cada uma 3 vezes.${canListen ? " Toque no microfone para o Bubi conferir: as palavras verdes ele entendeu, as vermelhas precisam de mais treino." : IN_ARTIFACT ? " Para o Bubi conferir a sua pronúncia pelo microfone, use a versão do GitHub no Chrome." : ""}</p>
      <ol class="speak-list">${u.episode.lines.map(([who, en, pt], i) => `<li><div class="stack-sm"><small class="muted">${esc(who)}</small><strong>${esc(en)}</strong><span class="muted" style="font-size:14px">${esc(pt)}</span></div><span class="audio">${audioBtns(en)}${micBtn(en, "s" + u.id + ":" + i)}</span>${micResult("s" + u.id + ":" + i)}</li>`).join("")}</ol>
      <div class="row"><button class="btn" data-speak-done ${s.speak ? "disabled" : ""}>${s.speak ? "Feito!" : "Já repeti todas em voz alta"}</button></div>
    </section>`;
  }

  // Etapa 6: Missão
  function stepMission(u) {
    const m = u.mission, s = peekUnit(u.id), w = ui.write[u.id] || {};
    return `<section class="why tone-peach">${mascot("cheer", 84)}<div class="stack-sm"><span class="label">Sua missão</span><p style="font-size:17px"><strong>${esc(m.goal)}</strong></p></div></section>
    <div class="mission-grid">
      <section class="panel glass">
        <h2>Viva a cena</h2>
        <p>Converse por escrito com o professor IA, que faz o papel do personagem. Ele responde em inglês e o Bubi corrige cada mensagem sua em português. Troque 3 mensagens para cumprir a missão.</p>
        ${tutor ? `<div class="row"><button class="btn" data-roleplay="${u.id}">${icon("chat")}Começar a cena</button></div>` : `<p class="muted">${esc(tutorOffText())}</p>`}
      </section>
      <section class="panel solid">
        <h2>Escreva</h2>
        <div class="task">${icon("pen")}<span>${esc(m.writing)}</span></div>
        <textarea class="field area" id="write-text" placeholder="Escreva aqui em inglês…" ${w.busy ? "disabled" : ""}>${esc(w.text || "")}</textarea>
        <div class="row">
          ${tutor ? `<button class="btn" data-write-check ${w.busy ? "disabled" : ""}>${w.busy ? "O professor está lendo…" : "Corrigir com o professor"}</button>` : `<button class="btn" data-write-self>Marcar como feita</button>`}
          <button class="link" data-show-model>${icon("eye")}${ui.showModel ? "Esconder exemplo" : "Ver um exemplo de resposta"}</button>
        </div>
        ${ui.showModel ? `<div class="model stack-sm"><span class="label">Exemplo</span><p>${esc(m.model)}</p>${audioBtns(m.model)}</div>` : ""}
        ${w.error ? `<p class="notice">${esc(w.error)}</p>` : ""}
        ${w.result ? correctionView(w.result) : ""}
      </section>
    </div>
    ${s.mission ? `<div class="feedback ok"><strong>Missão cumprida!</strong></div>` : ""}`;
  }
  function correctionView(r) {
    return `<div class="correction">
      <div class="row between"><strong>Correção do professor</strong>${typeof r.score === "number" ? `<span class="pill pill-dark">${r.score}/10</span>` : ""}</div>
      ${r.feedback_pt ? `<p>${esc(r.feedback_pt)}</p>` : ""}
      ${Array.isArray(r.mistakes) && r.mistakes.length ? `<ul class="mistakes">${r.mistakes.slice(0, 8).map((m) => `<li><span><span class="wrong">${esc(m.wrong)}</span> → <span class="right">${esc(m.right)}</span></span>${m.why_pt ? `<small>${esc(m.why_pt)}</small>` : ""}</li>`).join("")}</ul>` : ""}
      ${r.corrected ? `<div class="example"><span><strong>Versão corrigida</strong><small>${esc(r.corrected)}</small></span>${audioBtns(r.corrected)}</div>` : ""}
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
- "feedback_pt": 2-3 short, kind sentences in Brazilian Portuguese: what was good and the main point to improve.
- "mistakes": up to 6 most important mistakes, each {"wrong": exact fragment from the text, "right": corrected fragment, "why_pt": very simple reason in Portuguese}. Empty array if none.
- "corrected": the full text rewritten correctly and naturally, keeping the learner's ideas and level.
Reply with only a JSON object: {"score":0,"feedback_pt":"...","mistakes":[{"wrong":"...","right":"...","why_pt":"..."}],"corrected":"..."}`;
  }
  async function checkWriting(u) {
    const w = ui.write[u.id] || (ui.write[u.id] = {});
    w.text = (document.getElementById("write-text").value || "").trim(); w.error = ""; w.result = null;
    if (w.text.split(/\s+/).length < 5) { w.error = "Escreva pelo menos uma ou duas frases completas."; render(); return; }
    w.busy = true; render();
    try { w.result = await tutor.ask(fixPrompt(w.text, u.mission.writing)); const s = unitState(u.id); if (!s.mission) { s.mission = true; gain(10); } else save(); }
    catch (e) { if (hideTutor(e)) tutor = null; w.error = errorText(e); }
    finally { w.busy = false; render(); }
  }

  // ---------- Pronúncia ----------
  function viewPron() {
    if (ui.pron) return viewPronLesson(PRONUNCIATION.find((x) => x.id === ui.pron));
    const done = PRONUNCIATION.filter((x) => state.pron[x.id]).length;
    return `
      <div class="top-row"><div><span class="label">${PRONUNCIATION.length} sons · ${done} treinados</span><h1>Pronúncia</h1></div></div>
      <section class="why glass">${mascot("talk", 90)}<div class="stack-sm"><strong style="font-size:18px">Os sons que mais confundem brasileiros, um de cada vez.</strong><p class="muted">Em cada lição: como posicionar a boca, palavras com áudio normal e devagar, o jogo "ouça e escolha" para treinar o ouvido${canListen ? " e o microfone para conferir a sua fala" : ""}.</p></div></section>
      <div class="legend"><span><b>Como ler as dicas de pronúncia do curso:</b> leia como se fosse português.</span><span><b>MAIÚSCULA</b> = sílaba forte.</span><span><b>th</b> = língua entre os dentes, sem vibrar. <b>dh</b> = língua entre os dentes, vibrando.</span><span><b>ÍÍ, ÚÚ</b> = vogal longa.</span></div>
      <div class="sound-grid">${PRONUNCIATION.map((x) => `<button class="sound" data-pron="${x.id}"><span class="row between"><span class="sound-big">${esc(x.sound)}</span>${state.pron[x.id] ? `<span class="pill pill-dark">${icon("check")}Treinado</span>` : ""}</span><h3>${esc(x.title)}</h3><span class="muted" style="font-size:14px">${x.words.slice(0, 3).map((w) => esc(w[0])).join(" · ")}</span></button>`).join("")}</div>
      ${!canListen ? `<p class="foot">${IN_ARTIFACT ? "Dica: para o Bubi conferir a sua pronúncia pelo microfone, abra a versão do GitHub no Chrome (computador ou Android)." : "O microfone funciona no Chrome e no Edge. Neste navegador, use o áudio e repita em voz alta."}</p>` : ""}`;
  }
  function viewPronLesson(x) {
    const g = ui.game && ui.game.id === x.id ? ui.game : null;
    let game = "";
    if (x.pairs.length) {
      if (!g) game = `<div class="pair-game"><p>Vou falar uma das duas palavras. Você escolhe qual ouviu. São 6 rodadas.</p><button class="btn" data-game-start>${icon("play")}Começar o jogo</button></div>`;
      else if (g.i >= g.rounds.length) game = `<div class="pair-game">${mascot(g.right >= 5 ? "cheer" : "think", 110)}<span class="result-level">${g.right}/6</span><p>${g.right >= 5 ? "Ouvido afiado!" : "Treine mais um pouco: ouça os pares devagar e compare."}</p><button class="btn" data-game-start>Jogar de novo</button></div>`;
      else {
        const r = g.rounds[g.i];
        game = `<div class="pair-game"><span class="label">Rodada ${g.i + 1} de 6</span><button class="big-play" data-game-play aria-label="Ouvir de novo">${icon("sound")}</button>
          <div class="pair-opts">${r.pair.map((w, j) => { const cls = g.picked == null ? "" : j === r.answer ? "right" : j === g.picked ? "wrong" : ""; return `<button class="opt ${cls}" data-game-pick="${j}" ${g.picked != null ? "disabled" : ""}>${esc(w)}</button>`; }).join("")}</div>
          ${g.picked != null ? `<div class="row center"><span class="pill">${g.picked === r.answer ? "Acertou!" : "Era " + esc(r.pair[r.answer])}</span><button class="btn" data-game-next>Próxima</button></div>` : ""}</div>`;
      }
    }
    return `
      <button class="back" data-pron-back>${icon("back")}Todos os sons</button>
      <section class="cover tone-pink"><div class="stack-sm"><span class="sound-big" style="font-size:48px">${esc(x.sound)}</span><h1>${esc(x.title)}</h1></div>${mascot("talk", 120)}</section>
      <section class="panel glass"><p style="font-size:17px">${esc(x.simple)}</p><h3>Passo a passo</h3><ol class="how">${x.how.map((h) => `<li><span>${esc(h)}</span></li>`).join("")}</ol></section>
      <section class="panel glass"><h2>Palavras</h2><div class="words">${x.words.map(([en, pt, pr], i) => `<div class="word"><div><strong>${esc(en)}</strong><span class="pt">${esc(pt)}</span><span class="pron">${esc(pr)}</span></div><span class="audio">${audioBtns(en)}${micBtn(en, "p" + x.id + ":" + i)}</span>${micResult("p" + x.id + ":" + i)}</div>`).join("")}</div></section>
      ${x.pairs.length && canSpeak ? `<section class="panel solid"><h2>Ouça e escolha</h2>${game}</section>` : ""}
      <section class="panel glass"><h2>Agora em frases</h2><ol class="speak-list">${x.say.map(([en, pt], i) => `<li><div class="stack-sm"><strong>${esc(en)}</strong><span class="muted" style="font-size:14px">${esc(pt)}</span></div><span class="audio">${audioBtns(en)}${micBtn(en, "q" + x.id + ":" + i)}</span>${micResult("q" + x.id + ":" + i)}</li>`).join("")}</ol></section>
      <section class="tip">${mascot("cheer", 64)}<div class="stack-sm"><span class="label">Truque do Bubi</span><strong>${esc(x.tip)}</strong></div></section>
      <div class="row end"><button class="btn" data-pron-done="${x.id}" ${state.pron[x.id] ? "disabled" : ""}>${state.pron[x.id] ? "Som treinado!" : "Treinei este som"}</button></div>`;
  }

  // ---------- Revisão ----------
  function cardOf(key) { const [uid, i] = key.split(":"); const u = unitById(+uid); return { key, unit: u, en: u.vocab[+i][0], pt: u.vocab[+i][1], pron: u.vocab[+i][2], box: state.srs[key].box }; }
  function viewReview() {
    const r = ui.review, due = dueCards(), total = Object.keys(state.srs).length;
    if (!r) {
      if (!total) return `<section class="panel glass start-card">${mascot("think", 120)}<div class="stack"><span class="label">Repetição espaçada</span><h1>Revisão</h1><p>Quando você concluir um episódio, as palavras dele entram aqui e voltam em 1, 3, 7, 14, 30 e 60 dias. É assim que o vocabulário vai para a memória de longo prazo, sem decoreba.</p><div class="row"><button class="btn" data-tab="curso">Ir para os episódios</button></div></div></section>`;
      const next = Object.values(state.srs).map((x) => x.due).sort()[0];
      return `<section class="panel glass start-card">${mascot(due.length ? "wave" : "cheer", 130)}<div class="stack">
        <span class="label">${total} palavras no seu baralho</span>
        <h1>${due.length ? `${due.length} para revisar hoje` : "Tudo revisado!"}</h1>
        <p>${due.length ? "Veja a palavra, tente lembrar e só então vire o cartão. Seja sincera: isso decide quando ela volta." : `A próxima revisão é em ${next.split("-").reverse().join("/")}. Enquanto isso, siga a série.`}</p>
        <div class="row">${due.length ? `<button class="btn" data-review-start>Começar revisão</button>` : `<button class="btn" data-tab="curso">Continuar a série</button>`}</div>
      </div></section>`;
    }
    if (r.i >= r.keys.length) return `<section class="panel glass result">${mascot("cheer", 150)}<span class="label">Revisão concluída</span><span class="result-level">${r.right}/${r.keys.length}</span><p>As que você não lembrou voltam amanhã. As outras, daqui a alguns dias.</p><div class="row center"><button class="btn" data-review-close>Voltar</button></div></section>`;
    const c = cardOf(r.keys[r.i]), reverse = c.box >= 2;
    return `<div class="quiz"><section class="panel solid">
      <div class="row between"><span class="label">Ep. ${c.unit.id} · ${reverse ? "português → inglês" : "inglês → português"}</span><span class="pill">${r.i + 1} de ${r.keys.length}</span></div>
      <div class="bar"><span style="width:${(r.i / r.keys.length) * 100}%"></span></div>
      <div class="flash ${r.flipped ? "flipped" : ""}">
        <span class="flash-front">${esc(reverse ? c.pt : c.en)} ${!reverse ? audioBtns(c.en) : ""}</span>
        ${r.flipped ? `<span class="flash-back">${esc(reverse ? c.en : c.pt)} ${reverse ? audioBtns(c.en) : ""}</span><span class="pron">${esc(c.pron)}</span>` : ""}
      </div>
      ${r.flipped ? `<div class="row center"><button class="btn btn-soft" data-recall="0">Não lembrei</button><button class="btn" data-recall="1">Lembrei</button></div>` : `<div class="row center"><button class="btn" data-flip>Mostrar resposta</button></div>`}
    </section><aside class="quiz-side glass">${mascot(r.flipped ? "talk" : "think", 150)}${bubbleSay(r.flipped ? "E aí, lembrou?" : "Pense antes de virar!")}</aside></div>`;
  }

  // ---------- Teste de nível ----------
  function viewTest() {
    const t = ui.test;
    if (!t) return `<section class="panel glass start-card">${mascot("think", 130)}<div class="stack">
      <span class="label">${PLACEMENT.length} perguntas · cerca de 5 minutos</span><h1>Teste de nível</h1>
      <p>As perguntas ficam mais difíceis aos poucos. Não consulte nada; se não souber, chute. O resultado indica o episódio certo para começar, e você pode abrir qualquer episódio quando quiser.</p>
      ${state.placement && state.placement.score != null && state.placement.taken ? `<p class="muted">Último resultado: <strong>${esc(LEVELS[state.placement.level].name)}</strong> (${state.placement.score}/${PLACEMENT.length}).</p>` : ""}
      <div class="row"><button class="btn" data-test-start>Começar</button><button class="link" data-tab="inicio">Voltar</button></div>
    </div></section>`;
    if (t.i >= PLACEMENT.length) {
      const res = placementResult(t.score), u = unitById(res.start);
      return `<section class="panel glass result">${mascot("cheer", 160)}<span class="label">Resultado · ${t.score}/${PLACEMENT.length} acertos</span><span class="result-level">${res.level}</span><h2>${esc(LEVELS[res.level].name)}</h2>
        <p>${t.score >= 14 ? "Você já tem uma base ótima, até de B2! Comece pela temporada 3 para firmar os pontos mais difíceis." : `Seu ponto de partida é o episódio ${u.id}: ${esc(u.title)}.`}</p>
        <div class="row center"><button class="btn" data-unit="${u.id}">${icon("play")}Ir para o episódio ${u.id}</button><button class="btn btn-soft" data-tab="inicio">Ver painel</button></div></section>`;
    }
    const q = PLACEMENT[t.i];
    return `<div class="quiz"><section class="panel solid">
      <div class="row between"><span class="label">Teste de nível</span><span class="pill">${t.i + 1} de ${PLACEMENT.length}</span></div>
      <div class="bar"><span style="width:${(t.i / PLACEMENT.length) * 100}%"></span></div>
      <span class="q-text">${esc(q.q)}</span>
      <div class="options">${q.options.map((o, j) => { const cls = t.picked == null ? "" : j === q.answer ? "right" : j === t.picked ? "wrong" : ""; return `<button class="opt ${cls}" data-tpick="${j}" ${t.picked != null ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}</div>
      ${t.picked != null ? `<p class="explain">${esc(q.why)}</p><div class="row"><button class="btn" data-tnext>${t.i + 1 < PLACEMENT.length ? "Próxima" : "Ver meu nível"}</button></div>` : ""}
    </section><aside class="quiz-side glass">${mascot(t.picked == null ? "think" : t.picked === q.answer ? "cheer" : "talk", 150)}${bubbleSay(t.picked == null ? "Sem pressa." : t.picked === q.answer ? "Mandou bem!" : "Tudo bem errar.")}</aside></div>`;
  }

  // ---------- Professor IA ----------
  function viewProfessor() {
    const pr = ui.prof;
    const modes = [["chat", "Conversar", "chat"], ["doubt", "Tirar dúvidas", "help"], ["fix", "Corrigir texto", "pen"]];
    const tabs = `<div class="seg glass">${modes.map(([k, l, ic]) => `<button class="seg-btn" data-mode="${k}" aria-pressed="${pr.mode === k}" ${pr.busy ? "disabled" : ""}>${icon(ic)}${l}</button>`).join("")}</div>`;
    let body;
    if (tutor === undefined) body = `<section class="panel glass"><p class="muted">Conectando o professor…</p></section>`;
    else if (tutor === null) body = `<section class="panel glass start-card">${mascot("think", 110)}<div class="stack"><h2>Professor indisponível aqui</h2><p class="muted">${esc(tutorOffText())} O curso, a pronúncia e a revisão funcionam normalmente.</p></div></section>`;
    else body = pr.mode === "chat" ? profChat() : pr.mode === "doubt" ? profDoubt() : profFix();
    return `<div><span class="label">Nível ${levelForAi()} · respostas adaptadas a você</span><h1>Professor IA</h1></div>${tabs}${body}`;
  }
  function profChat() {
    const pr = ui.prof, topic = pr.custom || TOPICS.find((t) => t.id === pr.topic);
    const chips = pr.custom ? `<div class="row"><span class="pill pill-dark">${icon("flag")}Missão do episódio ${pr.custom.unitId}</span><button class="link" data-prof-free>Trocar para conversa livre</button></div>`
      : `<div class="chips">${TOPICS.map((t) => `<button class="chip" data-topic="${t.id}" aria-pressed="${t.id === pr.topic}" ${pr.busy ? "disabled" : ""}>${icon(t.icon)}${esc(t.name)}</button>`).join("")}</div>`;
    if (!pr.turns.length && !pr.busy) {
      return `${chips}<section class="panel glass start-card">${mascot("talk", 120)}<div class="stack">
        <span class="label">${pr.custom ? "Missão" : "Tema"}: ${esc(topic.name)}</span><h2>Converse em inglês</h2>
        <p>${pr.custom ? esc(pr.custom.goal) + " " : ""}O professor puxa assunto em inglês. Depois de cada mensagem sua, o Bubi comenta em português e mostra como ficaria mais natural. Se travar, peça uma dica.</p>
        ${pr.error ? `<p class="notice">${esc(pr.error)}</p>` : ""}
        <div class="row"><button class="btn" data-chat-start>Começar conversa</button></div>
      </div></section>`;
    }
    const msgs = pr.turns.map((t) => {
      if (t.role === "them") return `<div class="msg msg-them"><span class="msg-who">${esc(pr.custom ? pr.custom.who : "Teacher")}</span><span>${esc(t.text)}</span><span class="msg-actions">${t.pt ? `<details><summary class="link">${icon("eye")}Tradução</summary><span class="msg-pt">${esc(t.pt)}</span></details>` : ""}${canSpeak ? `<button class="link" data-saytext="${esc(t.text)}">${icon("sound")}Ouvir</button>` : ""}</span></div>`;
      let h = `<div class="msg msg-me"><span class="msg-who">Você</span><span>${esc(t.text)}</span></div>`;
      if (t.fb) h += `<div class="fb ${t.better ? "fb-fix" : "fb-ok"}"><span class="avatar">${mascot(t.better ? "talk" : "cheer", 42)}</span><div class="fb-body"><span>${esc(t.fb)}</span>${t.better ? `<span class="fb-better">${esc(t.better)}</span>` : ""}</div></div>`;
      return h;
    }).join("");
    return `${chips}<section class="chat-wrap glass">
      <div class="chat" aria-live="polite">${msgs}${pr.busy ? `<p class="thinking">Escrevendo…</p>` : ""}<span id="chat-end"></span></div>
      ${pr.error ? `<p class="notice">${esc(pr.error)}</p>` : ""}
      ${pr.hint ? `<div class="hint"><strong>Dica do Bubi:</strong> ${esc(pr.hint)}</div>` : ""}
      <form class="composer" data-form="chat"><input id="chat-input" autocomplete="off" placeholder="Escreva em inglês…" ${pr.busy ? "disabled" : ""} aria-label="Sua mensagem"><button class="btn" ${pr.busy ? "disabled" : ""}>Enviar</button></form>
      <div class="row"><button class="btn btn-soft" data-hint ${pr.busy || !pr.lastHint ? "disabled" : ""}>Preciso de uma dica</button><button class="link" data-prof-reset ${pr.busy ? "disabled" : ""}>Recomeçar</button>${pr.custom ? `<button class="link" data-unit="${pr.custom.unitId}">${icon("back")}Voltar ao episódio</button>` : ""}</div>
    </section>`;
  }
  function profDoubt() {
    const pr = ui.prof;
    const msgs = pr.turns.map((t) => t.role === "me" ? `<div class="msg msg-me"><span>${esc(t.text)}</span></div>`
      : `<div class="fb fb-ok left"><span class="avatar">${mascot("talk", 42)}</span><div class="fb-body"><span>${esc(t.text)}</span>${(t.examples || []).map((x) => `<div class="example"><span><strong>${esc(x.en)}</strong><small>${esc(x.pt)}</small></span>${audioBtns(x.en)}</div>`).join("")}</div></div>`).join("");
    return `<section class="chat-wrap glass">
      ${!pr.turns.length ? `<div class="start-card">${mascot("think", 100)}<div class="stack"><h2>Pergunte qualquer coisa</h2><p class="muted">Em português mesmo, do jeito que vier. Exemplos: "Quando uso since e quando uso for?", "Qual a diferença entre make e do?", "Como se diz 'saudade' em inglês?"</p></div></div>` : ""}
      <div class="chat" aria-live="polite">${msgs}${pr.busy ? `<p class="thinking">O professor está pensando…</p>` : ""}<span id="chat-end"></span></div>
      ${pr.error ? `<p class="notice">${esc(pr.error)}</p>` : ""}
      <form class="composer" data-form="doubt"><input id="chat-input" autocomplete="off" placeholder="Escreva sua dúvida…" value="${esc(pr.draft || "")}" ${pr.busy ? "disabled" : ""} aria-label="Sua dúvida"><button class="btn" ${pr.busy ? "disabled" : ""}>Perguntar</button></form>
      ${pr.turns.length ? `<div class="row"><button class="link" data-prof-reset ${pr.busy ? "disabled" : ""}>Limpar conversa</button></div>` : ""}
    </section>`;
  }
  function profFix() {
    const pr = ui.prof;
    return `<section class="panel glass"><h2>Corrigir texto</h2>
      <p class="muted">Cole ou escreva qualquer texto em inglês: um e-mail, uma legenda do Instagram, uma mensagem. O professor corrige, explica os erros e devolve uma versão natural.</p>
      <textarea class="field area" id="fix-text" placeholder="Escreva aqui em inglês…" ${pr.busy ? "disabled" : ""}>${esc(pr.draft || "")}</textarea>
      <div class="row"><button class="btn" data-fix ${pr.busy ? "disabled" : ""}>${pr.busy ? "Corrigindo…" : "Corrigir"}</button></div>
      ${pr.error ? `<p class="notice">${esc(pr.error)}</p>` : ""}${pr.fix ? correctionView(pr.fix) : ""}</section>`;
  }
  function chatPrompt() {
    const pr = ui.prof, level = levelForAi();
    const scene = pr.custom ? pr.custom.scene : TOPICS.find((t) => t.id === pr.topic).scene;
    const transcript = pr.turns.slice(-12).map((t) => (t.role === "me" ? "Learner: " : "You: ") + t.text).join("\n");
    const lastMe = [...pr.turns].reverse().find((t) => t.role === "me");
    return `You are a friendly English teacher doing a written conversation with a Brazilian learner who speaks Portuguese. Learner level (CEFR): ${level}.
Situation: ${scene}

Fields to return:
- "reply": your next line, natural English, 1-3 short sentences, vocabulary suited to ${level}. React to what the learner said and end with a question. Never write Portuguese here.
- "reply_pt": Brazilian Portuguese translation of "reply".
- "feedback_pt": in Brazilian Portuguese, friendly, at most 2 short sentences about the learner's LAST message. Praise if correct and natural; if there's a mistake, explain it very simply. If the learner wrote in Portuguese, encourage her and show how to say it. Use "" if the learner hasn't written yet.
- "correct_version": a natural, corrected English version of the learner's last message, or "" if it was already correct (or there is none).
- "hint_pt": in Portuguese, a suggestion of how to answer your reply, with one short English example in quotes.

${transcript ? "Conversation so far:\n" + transcript : "The conversation has not started. Open with a friendly first line."}
${lastMe ? "\nThe learner's last message is: " + lastMe.text : ""}

Reply with only a JSON object: {"reply":"...","reply_pt":"...","feedback_pt":"...","correct_version":"...","hint_pt":"..."}`;
  }
  function doubtPrompt() {
    const history = ui.prof.turns.slice(-8).map((t) => (t.role === "me" ? "Learner: " : "Teacher: ") + t.text).join("\n");
    return `You are a very patient English teacher for a Brazilian learner (CEFR ${levelForAi()}). Answer the learner's latest question in Brazilian Portuguese, clearly and simply, like explaining to a friend who is starting from zero (at most about 120 words, short sentences, compare with Portuguese when it helps, never use a technical term without an example). Then give 2 or 3 short English examples with Portuguese translations. If the question is not about English or language learning, answer kindly in one sentence and bring the focus back to English.
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
        if (lastMe) {
          gain(3);
          if (pr.custom && pr.turns.filter((t) => t.role === "me").length >= 3) { const s = unitState(pr.custom.unitId); if (!s.mission) { s.mission = true; gain(10); } }
        }
      } else {
        const data = await tutor.ask(doubtPrompt());
        if (ui.prof !== mine) return;
        pr.turns.push({ role: "them", text: String(data.answer_pt || ""), examples: Array.isArray(data.examples) ? data.examples.slice(0, 4).map((x) => ({ en: String(x.en || ""), pt: String(x.pt || "") })) : [] });
        gain(1);
      }
    } catch (e) { if (hideTutor(e)) tutor = null; pr.error = errorText(e); }
    finally { pr.busy = false; if (ui.prof === mine) { render(); const input = document.getElementById("chat-input"); if (input) input.focus(); } }
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
  function stopAudio() { if (canSpeak) try { speechSynthesis.cancel(); } catch (e) { /* ok */ } ui.playing = null; }
  function go(tab) {
    stopAudio(); ui.mic = null;
    ui.tab = tab;
    if (tab === "curso") ui.unit = null;
    if (tab === "pronuncia") { ui.pron = null; ui.game = null; }
    if (tab === "revisao") ui.review = ui.review && ui.review.i < ui.review.keys.length ? ui.review : null;
    if (tab === "teste" && ui.test && ui.test.i >= PLACEMENT.length) ui.test = null;
    render(); window.scrollTo(0, 0);
  }
  function openUnit(id) {
    stopAudio(); ui.mic = null; ui.showModel = false;
    ui.tab = "curso"; ui.unit = id;
    const d = stepDone(id);
    ui.step = STEPS.map(([k]) => k).find((k) => !d[k]) || "episode";
    markSeen(id, ui.step);
    if (!ui.practice || ui.practice.unitId !== id) ui.practice = null;
    render(); window.scrollTo(0, 0);
  }
  function markSeen(id, step) {
    if (step !== "vocab" && step !== "lesson") return;
    const s = unitState(id);
    if (!s.seen[step]) { s.seen[step] = true; gain(2); }
  }

  // ---------- Eventos ----------
  document.addEventListener("click", (ev) => {
    const el = ev.target.closest("button");
    if (!el || el.disabled) return;
    const d = el.dataset, u = ui.unit ? unitById(ui.unit) : null;

    if (d.tab) return go(d.tab);
    if (d.go) return go(d.go);
    if (d.unit) return openUnit(+d.unit);
    if ("startZero" in d) { state.placement = { score: null, level: "A1", start: 1 }; save(); return openUnit(1); }
    if (d.step && u) { stopAudio(); ui.mic = null; ui.step = d.step; markSeen(u.id, d.step); render(); window.scrollTo(0, 0); return; }

    // áudio e microfone
    if (d.saytext) return speak(d.saytext);
    if (d.sayslow) return speak(d.sayslow, 0.6);
    if (d.sayline) { const [uid, i] = d.sayline.split(":").map(Number), l = unitById(uid).episode.lines[i]; if (canSpeak) { speechSynthesis.cancel(); speechSynthesis.speak(utter(l[1], { pitch: (CAST[l[0]] || {}).pitch })); } return; }
    if ("sayall" in d && u) return speakAll(u.vocab.map((v) => v[0]));
    if ("playEpisode" in d && u) { if (ui.playing) { stopAudio(); markLine(-1); } else playLines(u.episode.lines); el.innerHTML = icon(ui.playing ? "stop" : "play") + (ui.playing ? "Parar" : "Ouvir o episódio"); return; }
    if (d.listen) return listen(d.target, d.listen);

    // episódio
    if ("togglePt" in d) { ui.showPt = !ui.showPt; render(); return; }
    if (d.epq) {
      const [uid, qi, j] = d.epq.split(":").map(Number), ans = ui.epq[uid] || (ui.epq[uid] = {});
      if (ans[qi] != null) return;
      ans[qi] = j;
      const unit = unitById(uid);
      if (j === unit.episode.questions[qi][2]) gain(2);
      if (Object.keys(ans).length === unit.episode.questions.length) { const s = unitState(uid); if (!s.seen.episode) { s.seen.episode = true; gain(3); } }
      render(); return;
    }

    // entenda
    if (d.more && tutor) return explainAgain(d.more);
    if ("doubt" in d && u) { ui.prof = newProf("doubt"); ui.prof.draft = `Pode me explicar de um jeito bem simples: ${u.titlePt.toLowerCase()}?`; return go("professor"); }

    // prática
    const p = ui.practice;
    if ("practiceStart" in d && u) { startPractice(u); render(); return; }
    if ("extra" in d && u && tutor) return extraExercises(u);
    if (d.pick != null && p && !p.answered) { p.picked = +d.pick; return answerPractice(+d.pick === p.items[p.i].answer); }
    if (d.build != null && p && !p.answered) { p.items[p.i].built.push(+d.build); render(); return; }
    if (d.unbuild != null && p && !p.answered) { p.items[p.i].built.splice(+d.unbuild, 1); render(); return; }
    if ("clearOrder" in d && p) { p.items[p.i].built = []; render(); return; }
    if ("checkOrder" in d && p) { const it = p.items[p.i]; return answerPractice(it.built.map((ti) => it.tiles[ti].w).join(" ") === it.words.join(" ")); }
    if ("checkTyped" in d && p) { const it = p.items[p.i], typed = (document.getElementById("typed").value || "").trim(); if (!typed) return; return answerPractice(normalize(typed) === normalize(it.full), typed); }
    if ("accept" in d && p && !p.correct) { p.correct = true; p.right++; gain(2); render(); return; }
    if ("why" in d && p && tutor) return whyWrong();
    if ("next" in d && p) {
      if (p.i + 1 >= p.items.length) return finishPractice();
      p.i++; p.answered = false; p.correct = null; p.picked = null; p.typed = "";
      render(); const f = document.getElementById("typed"); if (f) f.focus(); return;
    }

    // fala e missão
    if ("speakDone" in d && u) { const s = unitState(u.id); if (!s.speak) { s.speak = true; gain(5); } render(); return; }
    if (d.roleplay) { const unit = unitById(+d.roleplay), who = unit.episode.lines.find((l) => l[0] !== "Bia")[0]; ui.prof = newProf("chat"); ui.prof.custom = { unitId: unit.id, name: unit.episode.title, goal: unit.mission.goal, scene: unit.mission.roleplay, who }; return go("professor"); }
    if ("writeCheck" in d && u && tutor) return checkWriting(u);
    if ("writeSelf" in d && u) { const w = ui.write[u.id] || (ui.write[u.id] = {}); w.text = document.getElementById("write-text").value; const s = unitState(u.id); if (!s.mission) { s.mission = true; gain(5); } render(); return; }
    if ("showModel" in d) { ui.showModel = !ui.showModel; render(); return; }

    // pronúncia
    if (d.pron) { ui.pron = d.pron; ui.game = null; ui.mic = null; render(); window.scrollTo(0, 0); return; }
    if ("pronBack" in d) { ui.pron = null; ui.game = null; ui.mic = null; render(); return; }
    if (d.pronDone) { if (!state.pron[d.pronDone]) { state.pron[d.pronDone] = true; gain(5); } render(); return; }
    if ("gameStart" in d && ui.pron) {
      const x = PRONUNCIATION.find((y) => y.id === ui.pron);
      ui.game = { id: x.id, i: 0, right: 0, picked: null, rounds: [...Array(6)].map(() => ({ pair: shuffle(pick(x.pairs, 1)[0]), answer: Math.random() < 0.5 ? 0 : 1 })) };
      render(); const r = ui.game.rounds[0]; speak(r.pair[r.answer], 0.8); return;
    }
    if ("gamePlay" in d && ui.game) { const r = ui.game.rounds[ui.game.i]; return speak(r.pair[r.answer], 0.8); }
    if (d.gamePick != null && ui.game && ui.game.picked == null) { const g = ui.game; g.picked = +d.gamePick; if (g.picked === g.rounds[g.i].answer) { g.right++; gain(1); } render(); return; }
    if ("gameNext" in d && ui.game) {
      const g = ui.game; g.i++; g.picked = null;
      if (g.i >= g.rounds.length && g.right >= 5 && !state.pron[g.id]) { state.pron[g.id] = true; gain(5); }
      render(); if (g.i < g.rounds.length) { const r = g.rounds[g.i]; speak(r.pair[r.answer], 0.8); } return;
    }

    // revisão
    if ("reviewStart" in d) { ui.review = { keys: shuffle(dueCards()).slice(0, 25), i: 0, right: 0, flipped: false }; render(); return; }
    if ("flip" in d && ui.review) { ui.review.flipped = true; const c = cardOf(ui.review.keys[ui.review.i]); speak(c.en); render(); return; }
    if (d.recall != null && ui.review) {
      const r = ui.review, card = state.srs[r.keys[r.i]];
      if (d.recall === "1") { card.box = Math.min(card.box + 1, SRS_DAYS.length - 1); card.due = addDays(SRS_DAYS[card.box]); r.right++; }
      else { card.box = 0; card.due = addDays(1); }
      if (state.reviewed.date !== today()) state.reviewed = { date: today(), n: 0 };
      state.reviewed.n++; gain(1);
      r.i++; r.flipped = false; render(); return;
    }
    if ("reviewClose" in d) { ui.review = null; render(); return; }

    // teste de nível
    if ("testStart" in d) { ui.test = { i: 0, score: 0, picked: null }; render(); return; }
    if (d.tpick != null && ui.test && ui.test.picked == null) { ui.test.picked = +d.tpick; if (+d.tpick === PLACEMENT[ui.test.i].answer) ui.test.score++; render(); return; }
    if ("tnext" in d && ui.test) {
      ui.test.i++; ui.test.picked = null;
      if (ui.test.i >= PLACEMENT.length) { const res = placementResult(ui.test.score); state.placement = { score: ui.test.score, level: res.level, start: res.start, taken: true }; gain(20); }
      render(); return;
    }

    // professor
    if (d.mode && !ui.prof.busy) { ui.prof = newProf(d.mode, ui.prof.topic); render(); return; }
    if (d.topic && !ui.prof.busy) { ui.prof = newProf("chat", d.topic); render(); return; }
    if ("profFree" in d && !ui.prof.busy) { ui.prof = newProf("chat"); render(); return; }
    if ("chatStart" in d && tutor) return profSend("chat");
    if ("profReset" in d) { const c = ui.prof.custom; ui.prof = newProf(ui.prof.mode, ui.prof.topic); ui.prof.custom = c; render(); return; }
    if ("hint" in d) { ui.prof.hint = ui.prof.lastHint || ""; render(); return; }
    if ("fix" in d && tutor) return profFixRun();
  });

  document.addEventListener("input", (ev) => {
    const id = ev.target.id;
    if (id === "write-text" && ui.unit) { (ui.write[ui.unit] || (ui.write[ui.unit] = {})).text = ev.target.value; }
    else if (id === "fix-text" || (id === "chat-input" && ui.prof.mode === "doubt")) ui.prof.draft = ev.target.value;
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" && ev.target.id === "typed") { ev.preventDefault(); const b = document.querySelector("[data-check-typed]"); if (b) b.click(); }
  });
  document.addEventListener("submit", (ev) => {
    const kind = ev.target.dataset.form;
    if (!kind) return;
    ev.preventDefault();
    const text = (document.getElementById("chat-input").value || "").trim();
    if (!text || ui.prof.busy || !tutor) return;
    ui.prof.turns.push({ role: "me", text }); ui.prof.draft = "";
    profSend(kind);
  });
  if (canSpeak) try { speechSynthesis.getVoices(); } catch (e) { /* ok */ }

  // ---------- Início ----------
  render();
  (async () => {
    store = await initStore();
    try { const saved = await store.load(); if (saved && typeof saved === "object" && saved.v === 3) state = Object.assign(emptyState(), saved); } catch (e) { /* começa do zero */ }
    render();
  })();
  initTutor().then((t) => { tutor = t; render(); }).catch(() => { tutor = null; render(); });
})();
