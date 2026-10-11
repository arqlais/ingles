// Inglês de Viagem — app em JavaScript puro, com a Malu (mascote) guiando.
// Roda em dois lugares:
//  1) como Artifact no claude.ai (progresso na conta + tutor via window.claude)
//  2) localmente (node server.js): progresso no navegador + tutor via /api/tutor

(function () {
  "use strict";

  const STORAGE_KEY = "ingles-viagem:v1";
  const USER_NAME = "Laís";
  const IN_ARTIFACT = typeof window.claude !== "undefined" && window.claude && typeof window.claude.use === "function";
  const TOTAL_PHRASES = SITUATIONS.reduce((n, s) => n + s.phrases.length, 0);

  // ---------- Ícones (traço) ----------
  const ICONS = {
    plane: '<path d="M2 16l20-6-20-6 4 6-4 6z"/><path d="M6 10h8"/>',
    passport: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 16h6"/>',
    bed: '<path d="M3 18V7"/><path d="M3 13h18v5"/><path d="M7 13V10h5v3"/>',
    fork: '<path d="M7 3v8a2 2 0 0 0 2 2v8"/><path d="M11 3v8a2 2 0 0 1-2 2"/><path d="M16 21V3c2 1 3 3 3 6s-1 4-3 4"/>',
    train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14"/><path d="M8 21l2-4M16 21l-2-4"/>',
    bag: '<path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    sound: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M18.5 6.5a7.5 7.5 0 0 1 0 11"/>',
    home: '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
    test: '<path d="M9 4h6v3H9z"/><path d="M7 5H5v16h14V5h-2"/><path d="M9 13l2 2 4-4"/>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
    arrow: '<path d="M7 17L17 7"/><path d="M9 7h8v8"/>',
    back: '<path d="M15 6l-6 6 6 6"/>'
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Estado ----------
  const emptyState = () => ({ xp: 0, level: null, testScore: null, learned: {}, quiz: {}, days: [], chats: 0 });
  let state = emptyState();
  let store = null;
  let tutor = undefined; // undefined = carregando; null = indisponível

  const newChat = (code) => ({ code, turns: [], busy: false, hint: "", lastHint: "", error: "" });
  const ui = { tab: "inicio", sit: null, quiz: null, test: null, chat: newChat("AIR") };

  const dayKey = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const today = () => dayKey(new Date());
  function streak() {
    const set = new Set(state.days), d = new Date();
    if (!set.has(today())) d.setDate(d.getDate() - 1);
    let n = 0;
    while (set.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  const learnedCount = (code) => (state.learned[code] || []).length;
  const totalLearned = () => SITUATIONS.reduce((n, s) => n + learnedCount(s.code), 0);
  const quizDone = () => SITUATIONS.filter((s) => state.quiz[s.code] != null).length;
  const sitByCode = (code) => SITUATIONS.find((x) => x.code === code);

  function gain(xp) {
    state.xp += xp;
    const t = today();
    if (!state.days.includes(t)) { state.days.push(t); state.days = state.days.slice(-90); }
    save();
  }

  // ---------- Armazenamento ----------
  async function initStore() {
    if (IN_ARTIFACT) {
      try {
        const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
        const id = user ? await user.id() : null;
        if (db && id) {
          const ref = db.doc("data/users/" + id + "/progress");
          return {
            kind: "conta",
            load: async () => { const s = await ref.get(); return s.exists ? s.data() : null; },
            save: (d) => ref.set(d)
          };
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

  // ---------- Tutor de IA ----------
  async function initTutor() {
    if (IN_ARTIFACT) {
      const sample = await window.claude.use("sample");
      return sample ? { ask: (prompt) => sample.json(prompt, { modelTier: "quick", cache: false }) } : null;
    }
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
    not_granted: "O tutor precisa da sua permissão para usar o Claude. Recarregue a página para permitir.",
    sampling_disabled: "O tutor não está disponível nesta conta.",
    rate_limited: "Muitas mensagens seguidas. Espere um pouco e tente de novo.",
    session_expired: "Sua sessão expirou. Entre de novo no claude.ai.",
    invalid_json: "A resposta veio num formato inesperado. Tente enviar de novo.",
    refused: "Essa mensagem não pôde ser respondida. Tente escrever de outro jeito."
  };
  const errorText = (e) => ERRORS[e && e.code] || "Não deu para falar com o tutor agora. Tente de novo.";
  const hideTutor = (e) => ["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"].includes(e && e.code);

  // ---------- Áudio ----------
  const canSpeak = typeof window.speechSynthesis !== "undefined";
  function speak(text) {
    if (!canSpeak) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 0.85;
      const v = speechSynthesis.getVoices().find((x) => x.lang && x.lang.startsWith("en-US"));
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) { /* áudio indisponível */ }
  }

  // ---------- Peças visuais ----------
  function ring(pct, label, value) {
    const r = 38, c = 2 * Math.PI * r, p = Math.max(0, Math.min(1, pct));
    return `<div class="ring-card">
      <svg class="ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle class="ring-track" cx="50" cy="50" r="${r}" fill="none" stroke-width="10"/>
        <circle class="ring-fill" cx="50" cy="50" r="${r}" fill="none" stroke-width="10" stroke-linecap="round"
          stroke-dasharray="${(c * p).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 50 50)" ${p === 0 ? 'stroke-opacity="0"' : ""}/>
        <text class="ring-value" x="50" y="57" text-anchor="middle">${esc(value)}</text>
      </svg>
      <span>${esc(label)}</span>
    </div>`;
  }

  function destCard(s) {
    const n = learnedCount(s.code), best = state.quiz[s.code];
    return `<button class="dest tone-${s.color}" data-go="sit:${s.code}">
      <span class="circle">${icon(s.icon)}</span>
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.phrases[0].en)}</p>
      <span class="row"><span class="pill">${n}/${s.phrases.length} frases</span>${best != null ? `<span class="pill pill-dark">treino ${best}/5</span>` : ""}</span>
    </button>`;
  }

  // ---------- Casca ----------
  const NAV = [["inicio", "Início", "home"], ["situacoes", "Situações", "map"], ["teste", "Teste", "test"], ["conversa", "Conversar", "chat"]];
  const $app = document.getElementById("app");
  document.getElementById("logo").innerHTML = `${mascot("wave", 44)}<span class="logo-text">Malu English<span>Inglês de viagem</span></span>`;

  function renderShell() {
    document.getElementById("nav").innerHTML = NAV.map(([id, label, ic]) =>
      `<button class="nav-item" data-tab="${id}" ${ui.tab === id ? 'aria-current="page"' : ""}>${icon(ic)}<span>${label}</span></button>`).join("");
    document.getElementById("side-xp").innerHTML = `<strong>${state.xp} XP</strong><span>${streak()} ${streak() === 1 ? "dia seguido" : "dias seguidos"}</span>`;
  }

  function render() {
    renderShell();
    const views = { inicio: viewHome, teste: viewTest, situacoes: viewSituations, conversa: viewChat };
    $app.innerHTML = views[ui.tab]();
    if (ui.tab === "conversa") { const c = document.getElementById("chat-end"); if (c) c.scrollIntoView({ block: "nearest" }); }
  }

  // ---------- Telas ----------
  function nextStep() {
    if (!state.level) return { say: "Oi! Eu sou a Malu. Vamos descobrir seu nível? São só 10 perguntas.", go: "teste", label: "Fazer o teste", sub: "10 perguntas · 3 minutos" };
    const s = SITUATIONS.slice().sort((a, b) => learnedCount(a.code) / a.phrases.length - learnedCount(b.code) / b.phrases.length)[0];
    if (learnedCount(s.code) < s.phrases.length) return { say: `Próxima parada: ${s.name}. Ouça as frases e repita em voz alta comigo!`, go: "sit:" + s.code, label: "Ir para " + s.name, sub: `${learnedCount(s.code)}/${s.phrases.length} frases aprendidas` };
    return { say: "Você já marcou todas as frases. Agora é hora de conversar!", go: "conversa", label: "Conversar", sub: "Tutor de IA com correção" };
  }

  function viewHome() {
    const n = nextStep();
    const lvlPct = state.level ? { A1: 1 / 3, A2: 2 / 3, B1: 1 }[state.level] : 0;
    return `
      <div class="top-row">
        <div><span class="label">Painel de estudos</span><h1>Hello, ${esc(USER_NAME)}!</h1></div>
        <span class="pill">${state.level ? esc(LEVELS[state.level].name) : "Nível ainda não definido"}</span>
      </div>
      <div class="home-grid">
        <div class="main" style="padding:0">
          <section class="hero">
            <div style="display:grid;gap:14px">
              <span class="bubble">${esc(n.say)}</span>
              <h2>Aprenda o inglês da sua próxima viagem</h2>
              <div class="row"><button class="btn" data-go="${n.go}">${esc(n.label)}</button></div>
            </div>
            ${mascot("wave", 170)}
          </section>
          <div class="section-head"><h2>Recomendado para você</h2><button class="link" data-go="situacoes">Ver todos</button></div>
          <div class="dest-grid">${recommended().map(destCard).join("")}</div>
          <button class="continue" data-go="conversa">
            <span class="circle">${icon("chat")}</span>
            <span><strong>Conversar com o tutor</strong><small>Pratique uma situação real e receba correções</small></span>
            <span class="arrow">${icon("arrow")}</span>
          </button>
        </div>
        <div class="rings">
          ${ring(totalLearned() / TOTAL_PHRASES, "Frases aprendidas", Math.round((totalLearned() / TOTAL_PHRASES) * 100) + "%")}
          ${ring(quizDone() / SITUATIONS.length, "Treinos feitos", quizDone() + "/" + SITUATIONS.length)}
          ${ring(lvlPct, "Nível", state.level || "–")}
        </div>
      </div>
      <p class="foot">Progresso salvo ${store ? (store.kind === "conta" ? "na sua conta" : "neste navegador") : "…"}. Estudar 20 minutos por dia rende mais que 2 horas no fim de semana.</p>`;
  }

  function recommended() {
    return SITUATIONS.slice().sort((a, b) => learnedCount(a.code) / a.phrases.length - learnedCount(b.code) / b.phrases.length).slice(0, 2);
  }

  function viewSituations() {
    if (ui.quiz) return viewQuiz();
    if (!ui.sit) return `
      <div><span class="label">6 destinos · ${TOTAL_PHRASES} frases</span><h1>Situações de viagem</h1></div>
      <p class="muted">Escolha uma etapa da viagem. Ouça cada frase, repita em voz alta e marque quando souber.</p>
      <div class="dest-grid">${SITUATIONS.map(destCard).join("")}</div>`;
    const s = sitByCode(ui.sit), learned = state.learned[s.code] || [];
    return `
      <button class="back" data-go="situacoes">${icon("back")}Todos os destinos</button>
      <section class="sit-hero tone-${s.color}">
        <span class="circle">${icon(s.icon)}</span>
        <div><span class="label">${learned.length}/${s.phrases.length} aprendidas</span><h1>${esc(s.name)}</h1></div>
      </section>
      <ul class="phrases">${s.phrases.map((p, i) => `<li class="phrase">
        <input type="checkbox" class="check" id="ph-${s.code}-${i}" data-learn="${s.code}:${i}" ${learned.includes(i) ? "checked" : ""} aria-label="Marcar como aprendida">
        <label for="ph-${s.code}-${i}" style="display:grid;gap:2px;cursor:pointer">
          <span class="phrase-en">${esc(p.en)}</span>
          <span class="phrase-pt">${esc(p.pt)}</span>
          ${p.tip ? `<span><span class="phrase-tip">${esc(p.tip)}</span></span>` : ""}
        </label>
        ${canSpeak ? `<button class="icon-btn" data-say="${s.code}:${i}" aria-label="Ouvir">${icon("sound")}</button>` : "<span></span>"}
      </li>`).join("")}</ul>
      <div class="row">
        <button class="btn" data-quiz="${s.code}">Treinar estas frases</button>
        <button class="btn btn-soft" data-chat="${s.code}">Conversar nesta situação</button>
      </div>`;
  }

  function startQuiz(code) {
    const s = sitByCode(code);
    const shuffle = (a) => a.sort(() => Math.random() - 0.5);
    const idx = shuffle(s.phrases.map((_, i) => i)).slice(0, 5);
    const items = idx.map((i) => {
      const options = shuffle([i, ...shuffle(s.phrases.map((_, j) => j).filter((j) => j !== i)).slice(0, 3)]);
      return { pt: s.phrases[i].pt, options: options.map((j) => s.phrases[j].en), answer: options.indexOf(i) };
    });
    ui.quiz = { code, items, i: 0, score: 0, picked: null };
  }

  function quizShell(mood, side, main) {
    return `<div class="quiz"><section class="panel">${main}</section><aside class="quiz-side">${mascot(mood, 150)}${side}</aside></div>`;
  }

  function viewQuiz() {
    const q = ui.quiz, s = sitByCode(q.code);
    if (q.i >= q.items.length) {
      const msg = q.score === 5 ? "Perfeito! Você está pronta para essa etapa da viagem." : q.score >= 3 ? "Bom resultado! Revise as que errou e tente de novo." : "Volte às frases, ouça cada uma e repita em voz alta antes de tentar de novo.";
      return `<section class="panel result">${mascot(q.score >= 3 ? "cheer" : "think", 150)}
        <span class="label">${esc(s.name)} · treino concluído</span>
        <span class="result-level">${q.score}/5</span><p>${msg}</p>
        <div class="row" style="justify-content:center"><button class="btn" data-quiz="${s.code}">Treinar de novo</button><button class="btn btn-soft" data-go="sit:${s.code}">Voltar às frases</button></div>
      </section>`;
    }
    const it = q.items[q.i];
    const main = `
      <div class="row" style="justify-content:space-between"><button class="back" style="background:var(--surface-2)" data-go="sit:${s.code}">${icon("back")}${esc(s.name)}</button><span class="pill" style="background:var(--surface-2)">${q.i + 1} de ${q.items.length}</span></div>
      <div class="bar"><span style="width:${(q.i / q.items.length) * 100}%"></span></div>
      <span class="muted">Como se diz em inglês:</span>
      <span class="q-text">${esc(it.pt)}</span>
      <div class="options">${it.options.map((o, j) => {
        const cls = q.picked == null ? "" : j === it.answer ? "right" : j === q.picked ? "wrong" : "";
        return `<button class="opt ${cls}" data-qpick="${j}" ${q.picked != null ? "disabled" : ""}>${esc(o)}</button>`;
      }).join("")}</div>
      ${q.picked != null ? `<div class="row"><button class="btn" data-qnext>${q.i + 1 < q.items.length ? "Próxima" : "Ver resultado"}</button>${canSpeak ? `<button class="btn btn-soft" data-saytext="${esc(it.options[it.answer])}">Ouvir a resposta</button>` : ""}</div>` : ""}`;
    const said = q.picked == null ? "Você consegue!" : q.picked === it.answer ? "Isso aí!" : "Quase! Veja a certa em verde.";
    return quizShell(q.picked == null ? "think" : q.picked === it.answer ? "cheer" : "talk", `<span class="bubble">${said}</span>`, main);
  }

  function viewTest() {
    const t = ui.test;
    if (!t) {
      return `<section class="panel start-card tone-lilac">${mascot("think", 130)}
        <div style="display:grid;gap:12px">
          <span class="label">10 perguntas · cerca de 3 minutos</span>
          <h1>Teste de nível</h1>
          <p>Responda sem consultar nada. Se não souber, chute: o resultado serve para ajustar o tutor e indicar por onde começar.</p>
          ${state.level ? `<p class="muted">Seu último resultado: <strong>${esc(LEVELS[state.level].name)}</strong> (${state.testScore}/10).</p>` : ""}
          <div class="row"><button class="btn" data-test-start>${state.level ? "Refazer o teste" : "Começar"}</button></div>
        </div>
      </section>`;
    }
    if (t.i >= LEVEL_TEST.length) {
      const lvl = levelFromScore(t.score);
      return `<section class="panel result">${mascot("cheer", 160)}
        <span class="label">Resultado · ${t.score}/10 acertos</span>
        <span class="result-level">${lvl}</span><h2>${esc(LEVELS[lvl].name)}</h2><p>${esc(LEVELS[lvl].note)}</p>
        <div class="row" style="justify-content:center"><button class="btn" data-go="situacoes">Ver as situações</button><button class="btn btn-soft" data-go="conversa">Conversar com o tutor</button></div>
      </section>`;
    }
    const q = LEVEL_TEST[t.i];
    const main = `
      <div class="row" style="justify-content:space-between"><span class="label">Teste de nível</span><span class="pill" style="background:var(--surface-2)">${t.i + 1} de ${LEVEL_TEST.length}</span></div>
      <div class="bar"><span style="width:${(t.i / LEVEL_TEST.length) * 100}%"></span></div>
      <span class="q-text">${esc(q.q)}</span>
      <div class="options">${q.options.map((o, j) => {
        const cls = t.picked == null ? "" : j === q.answer ? "right" : j === t.picked ? "wrong" : "";
        return `<button class="opt ${cls}" data-tpick="${j}" ${t.picked != null ? "disabled" : ""}>${esc(o)}</button>`;
      }).join("")}</div>
      ${t.picked != null ? `<p class="explain">${esc(q.why)}</p><div class="row"><button class="btn" data-tnext>${t.i + 1 < LEVEL_TEST.length ? "Próxima" : "Ver meu nível"}</button></div>` : ""}`;
    const said = t.picked == null ? "Sem pressa. Leia com calma." : t.picked === q.answer ? "Mandou bem!" : "Tudo bem errar, é assim que se aprende.";
    return quizShell(t.picked == null ? "think" : t.picked === q.answer ? "cheer" : "talk", `<span class="bubble">${said}</span>`, main);
  }

  function viewChat() {
    const c = ui.chat, s = sitByCode(c.code);
    const chips = SITUATIONS.map((x) => `<button class="chip" data-chatsit="${x.code}" aria-pressed="${x.code === c.code}" ${c.busy ? "disabled" : ""}>${icon(x.icon)}${esc(x.name)}</button>`).join("");
    let body;
    if (tutor === undefined) body = `<section class="panel"><p class="muted">Conectando o tutor…</p></section>`;
    else if (tutor === null) body = `<section class="panel start-card">${mascot("think", 120)}<div style="display:grid;gap:8px"><h2>Tutor indisponível aqui</h2><p class="muted">${IN_ARTIFACT ? "Esta visualização não permite usar o Claude. Abra a página no claude.ai, com sua conta." : "Rode o projeto com npm start e uma chave de API para conversar com o tutor."} As frases e os treinos funcionam normalmente.</p></div></section>`;
    else if (!c.turns.length && !c.busy) {
      body = `<section class="panel start-card tone-${s.color}">${mascot("talk", 130)}
        <div style="display:grid;gap:12px">
          <span class="label">Você vai falar com: ${esc(s.roleLabel)}</span>
          <h2>${esc(s.name)}</h2>
          <p>O tutor faz o papel de ${esc(s.roleLabel.toLowerCase())} e responde em inglês. Depois de cada mensagem sua, a Malu comenta em português. Escreva do seu jeito; se travar, peça uma dica.</p>
          ${c.error ? `<p class="notice">${esc(c.error)}</p>` : ""}
          <div class="row"><button class="btn" data-chat-start>Começar conversa</button></div>
        </div>
      </section>`;
    } else {
      const msgs = c.turns.map((t) => {
        if (t.role === "them") return `<div class="msg msg-them"><span class="msg-who">${esc(s.roleLabel)}</span><span>${esc(t.text)}</span>
          <span class="msg-actions">${t.pt ? `<details><summary class="link">Tradução</summary><span class="msg-pt">${esc(t.pt)}</span></details>` : ""}${canSpeak ? `<button class="link" data-saytext="${esc(t.text)}">Ouvir</button>` : ""}</span></div>`;
        let html = `<div class="msg msg-me"><span class="msg-who">Você</span><span>${esc(t.text)}</span></div>`;
        if (t.fb) html += `<div class="fb ${t.better ? "fb-fix" : "fb-ok"}"><span class="avatar">${mascot(t.better ? "talk" : "cheer", 40)}</span><div class="fb-body"><span>${esc(t.fb)}</span>${t.better ? `<span class="fb-better">${esc(t.better)}</span>` : ""}</div></div>`;
        return html;
      }).join("");
      body = `<section class="chat-wrap">
        <div class="chat" aria-live="polite">${msgs}${c.busy ? `<p class="thinking">${esc(s.roleLabel)} está respondendo…</p>` : ""}<span id="chat-end"></span></div>
        ${c.error ? `<p class="notice">${esc(c.error)}</p>` : ""}
        ${c.hint ? `<div class="hint"><strong>Dica da Malu:</strong> ${esc(c.hint)}</div>` : ""}
        <form class="composer" id="composer">
          <input id="chat-input" autocomplete="off" placeholder="Escreva em inglês…" ${c.busy ? "disabled" : ""} aria-label="Sua mensagem">
          <button class="btn" ${c.busy ? "disabled" : ""}>Enviar</button>
        </form>
        <div class="row"><button class="btn btn-soft" data-hint ${c.busy || !c.lastHint ? "disabled" : ""}>Preciso de uma dica</button><button class="link" data-chat-reset ${c.busy ? "disabled" : ""}>Recomeçar</button></div>
      </section>`;
    }
    return `
      <div><span class="label">Tutor de IA · nível ${state.level || "A1"}</span><h1>Conversar</h1></div>
      <div class="chips">${chips}</div>
      ${body}`;
  }

  // ---------- Conversa ----------
  function buildPrompt(s) {
    const level = state.level || "A1";
    const transcript = ui.chat.turns.slice(-12).map((t) => (t.role === "me" ? "Learner: " : s.roleLabel + ": ") + t.text).join("\n");
    const lastMe = [...ui.chat.turns].reverse().find((t) => t.role === "me");
    return `You are an English tutor running a travel role-play with a Brazilian learner who speaks Portuguese. Learner level (CEFR): ${level}.
You play: ${s.role}. Scene: ${s.scene} Stay in character.

Fields to return:
- "reply": your next line in character, natural spoken English, 1-2 short sentences, vocabulary suited to ${level}. End with a question or a prompt the learner must answer. Never write Portuguese here.
- "reply_pt": Brazilian Portuguese translation of "reply".
- "feedback_pt": in Brazilian Portuguese, friendly, at most 2 short sentences about the learner's LAST message. Praise it if it was correct and natural; if it had a mistake, explain the mistake simply. If the learner wrote in Portuguese, encourage them and show how to say it. Use "" if the learner has not written yet.
- "correct_version": a natural, corrected English version of the learner's last message, or "" if it was already correct (or there is no learner message yet).
- "hint_pt": in Portuguese, a suggestion of how the learner could answer your reply, with one short example in English in quotes.

${transcript ? "Conversation so far:\n" + transcript : "The conversation has not started. Open the scene with your first line."}
${lastMe ? "\nThe learner's last message is: " + lastMe.text : ""}

Reply with only a JSON object: {"reply":"...","reply_pt":"...","feedback_pt":"...","correct_version":"...","hint_pt":"..."}`;
  }

  async function chatStep() {
    const c = ui.chat, s = sitByCode(c.code), code = c.code;
    c.busy = true; c.error = ""; c.hint = ""; render();
    try {
      const data = await tutor.ask(buildPrompt(s));
      if (ui.chat !== c || c.code !== code) return;
      const lastMe = [...c.turns].reverse().find((t) => t.role === "me");
      if (lastMe && !lastMe.fb) {
        lastMe.fb = String(data.feedback_pt || "Muito bem!");
        const better = String(data.correct_version || "").trim();
        lastMe.better = better && better !== lastMe.text.trim() ? better : "";
      }
      c.turns.push({ role: "them", text: String(data.reply || "Sorry, could you say that again?"), pt: String(data.reply_pt || "") });
      c.lastHint = String(data.hint_pt || "");
      if (lastMe) { state.chats++; gain(3); }
    } catch (e) {
      if (hideTutor(e)) tutor = null;
      c.error = errorText(e);
    } finally {
      c.busy = false;
      if (ui.chat === c) { render(); const input = document.getElementById("chat-input"); if (input) input.focus(); }
    }
  }

  // ---------- Eventos ----------
  function go(target) {
    ui.quiz = null;
    if (target.startsWith("sit:")) { ui.tab = "situacoes"; ui.sit = target.slice(4); }
    else { ui.tab = target; if (target === "situacoes") ui.sit = null; if (target === "teste" && ui.test && ui.test.i >= LEVEL_TEST.length) ui.test = null; }
    render(); window.scrollTo(0, 0);
  }

  document.addEventListener("click", (ev) => {
    const el = ev.target.closest("button");
    if (!el) return;
    const d = el.dataset;
    if (d.tab) return go(d.tab);
    if (d.go) return go(d.go);
    if (d.say) { const [code, i] = d.say.split(":"); speak(sitByCode(code).phrases[+i].en); return; }
    if (d.saytext) return speak(d.saytext);
    if (d.quiz) { startQuiz(d.quiz); ui.tab = "situacoes"; render(); window.scrollTo(0, 0); return; }
    if (d.qpick != null && ui.quiz && ui.quiz.picked == null) {
      ui.quiz.picked = +d.qpick;
      if (+d.qpick === ui.quiz.items[ui.quiz.i].answer) { ui.quiz.score++; gain(5); }
      render(); return;
    }
    if ("qnext" in d && ui.quiz) {
      ui.quiz.i++; ui.quiz.picked = null;
      if (ui.quiz.i >= ui.quiz.items.length) { state.quiz[ui.quiz.code] = Math.max(state.quiz[ui.quiz.code] || 0, ui.quiz.score); save(); }
      render(); return;
    }
    if ("testStart" in d) { ui.test = { i: 0, score: 0, picked: null }; render(); return; }
    if (d.tpick != null && ui.test && ui.test.picked == null) {
      ui.test.picked = +d.tpick;
      if (+d.tpick === LEVEL_TEST[ui.test.i].answer) ui.test.score++;
      render(); return;
    }
    if ("tnext" in d && ui.test) {
      ui.test.i++; ui.test.picked = null;
      if (ui.test.i >= LEVEL_TEST.length) { state.level = levelFromScore(ui.test.score); state.testScore = ui.test.score; gain(20); }
      render(); return;
    }
    if (d.chat) { ui.tab = "conversa"; if (ui.chat.code !== d.chat) ui.chat = newChat(d.chat); render(); window.scrollTo(0, 0); return; }
    if (d.chatsit && !ui.chat.busy) { ui.chat = newChat(d.chatsit); render(); return; }
    if ("chatStart" in d && tutor) return chatStep();
    if ("chatReset" in d) { ui.chat = newChat(ui.chat.code); render(); return; }
    if ("hint" in d) { ui.chat.hint = ui.chat.lastHint || ""; render(); return; }
  });

  document.addEventListener("change", (ev) => {
    const d = ev.target.dataset;
    if (!d || !d.learn) return;
    const [code, i] = d.learn.split(":"), n = +i;
    const list = state.learned[code] || (state.learned[code] = []);
    if (ev.target.checked && !list.includes(n)) { list.push(n); gain(2); }
    else if (!ev.target.checked) { state.learned[code] = list.filter((x) => x !== n); save(); }
    render();
  });

  document.addEventListener("submit", (ev) => {
    if (ev.target.id !== "composer") return;
    ev.preventDefault();
    const text = document.getElementById("chat-input").value.trim();
    if (!text || ui.chat.busy || !tutor) return;
    ui.chat.turns.push({ role: "me", text });
    chatStep();
  });

  // ---------- Início ----------
  render();
  (async () => {
    store = await initStore();
    try { const saved = await store.load(); if (saved && typeof saved === "object") state = Object.assign(emptyState(), saved); } catch (e) { /* começa do zero */ }
    render();
  })();
  initTutor().then((t) => { tutor = t; if (ui.tab === "conversa") render(); }).catch(() => { tutor = null; render(); });
})();
