// Bubi, o balãozinho de fala mascote. Desenho em traço (line art) com SVG.
// mascot(mood, size): mood = "wave" | "think" | "talk" | "cheer"

function mascot(mood, size) {
  mood = mood || "wave";
  size = size || 160;
  const S = 'stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
  const hand = (x, y) => `<circle cx="${x}" cy="${y}" r="6" fill="var(--surface)" ${S}/>`;

  const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="5.2" fill="var(--ink)"/><circle cx="${x + 1.7}" cy="${y - 1.7}" r="1.7" fill="var(--surface)"/>`;
  const eyes = {
    wave: eye(86, 98) + eye(114, 98),
    talk: eye(86, 98) + eye(114, 98),
    think: eye(90, 94) + eye(118, 94),
    cheer: `<path d="M79 100 q7 -9 14 0" fill="none" ${S}/><path d="M107 100 q7 -9 14 0" fill="none" ${S}/>`
  }[mood];

  const mouth = {
    wave: `<path d="M91 112 q9 9 18 0" fill="none" ${S}/>`,
    think: `<path d="M97 115 h12" fill="none" ${S}/>`,
    talk: `<path d="M92 110 h16 q0 11 -8 11 q-8 0 -8 -11z" fill="var(--ink)" ${S}/>`,
    cheer: `<path d="M88 110 h24 q0 15 -12 15 q-12 0 -12 -15z" fill="var(--ink)" ${S}/><path d="M94 119 q6 -4 12 0 q-6 5 -12 0z" fill="var(--pink-strong)"/>`
  }[mood];

  const arms = {
    wave: `<path d="M40 112 q-16 6 -20 22" fill="none" ${S}/>${hand(19, 137)}
           <path d="M160 104 q18 -6 20 -28" fill="none" ${S}/>${hand(180, 72)}
           <path d="M190 58 l5 -6 M195 70 l8 -1 M183 52 l1 -8" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/>`,
    think: `<path d="M40 112 q-16 6 -20 22" fill="none" ${S}/>${hand(19, 137)}
            <path d="M160 112 q16 10 2 20 q-10 4 -30 -8" fill="none" ${S}/>${hand(131, 124)}
            <circle cx="164" cy="44" r="4" fill="none" stroke="var(--ink)" stroke-width="2.5"/><circle cx="176" cy="28" r="6" fill="none" stroke="var(--ink)" stroke-width="2.5"/>`,
    talk: `<path d="M40 112 q-16 6 -20 22" fill="none" ${S}/>${hand(19, 137)}
           <path d="M160 112 q16 6 20 22" fill="none" ${S}/>${hand(181, 137)}`,
    cheer: `<path d="M40 104 q-18 -6 -20 -28" fill="none" ${S}/>${hand(20, 72)}
            <path d="M160 104 q18 -6 20 -28" fill="none" ${S}/>${hand(180, 72)}`
  }[mood];

  const sparkle = (x, y, r, fill) => {
    const k = r * 0.16;
    return `<path d="M${x} ${y - r} C${x + k} ${y - k} ${x + k} ${y - k} ${x + r} ${y} C${x + k} ${y + k} ${x + k} ${y + k} ${x} ${y + r} C${x - k} ${y + k} ${x - k} ${y + k} ${x - r} ${y} C${x - k} ${y - k} ${x - k} ${y - k} ${x} ${y - r}z" fill="${fill}" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>`;
  };
  const extras = {
    wave: sparkle(26, 46, 9, "var(--surface)") + sparkle(184, 170, 7, "var(--ink)"),
    cheer: sparkle(100, 14, 11, "var(--ink)") + sparkle(28, 160, 8, "var(--surface)") + sparkle(178, 156, 9, "var(--surface)"),
    think: "",
    talk: sparkle(178, 50, 8, "var(--surface)")
  }[mood];

  // Corpo: balão de fala arredondado com rabinho à esquerda.
  const body = "M120 156 L78 156 L52 182 L58 152 Q40 146 40 122 L40 88 Q40 46 82 46 L118 46 Q160 46 160 88 L160 116 Q160 156 120 156 Z";

  return `<svg class="mascot" width="${size}" height="${size * 1.1}" viewBox="0 0 200 220" role="img" aria-label="Bubi, o mascote">
    <ellipse cx="108" cy="212" rx="46" ry="5" fill="var(--ink)" opacity=".08"/>
    ${extras}
    <path d="M96 156 v38" ${S}/><path d="M122 156 v38" ${S}/>
    <path d="M84 202 q0 -8 12 -8 q8 0 8 8 z" fill="var(--ink)" ${S}/><path d="M114 202 q0 -8 8 -8 q12 0 12 8 z" fill="var(--ink)" ${S}/>
    <path d="${body}" fill="var(--surface)" ${S}/>
    <path d="M100 46 q-6 -18 10 -22" fill="none" ${S}/><circle cx="112" cy="23" r="5" fill="var(--pink-strong)" stroke="var(--ink)" stroke-width="2.4"/>
    <path d="M62 62 l3 -8 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 z" fill="var(--butter-strong)" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
    <ellipse cx="72" cy="111" rx="6.5" ry="3.8" fill="var(--pink-strong)" opacity=".85"/><ellipse cx="128" cy="111" rx="6.5" ry="3.8" fill="var(--pink-strong)" opacity=".85"/>
    ${eyes}
    ${mouth}
    ${arms}
  </svg>`;
}

if (typeof module !== "undefined") module.exports = { mascot };
