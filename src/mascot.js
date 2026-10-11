// Bubi: um balão de fala fofinho, em degradê com reflexo de vidro.
// A marca registrada dele é o acento agudo (´) no topo da cabeça.
//   mascot(mood, size)  → mood: "wave" | "think" | "talk" | "cheer"
//   logoMark(size)      → o símbolo do app (Bubi dentro do ícone de vidro escuro)

let __bubiSeq = 0;

function bubiDefs(id) {
  return `<defs>
    <linearGradient id="${id}b" x1="0.15" y1="0.05" x2="0.9" y2="1">
      <stop offset="0" stop-color="#C7B8FF"/><stop offset="0.45" stop-color="#FF9ECD"/><stop offset="1" stop-color="#FFC3A0"/>
    </linearGradient>
    <radialGradient id="${id}s" cx="0.3" cy="0.25" r="0.75">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity=".75"/><stop offset="0.45" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${id}r" cx="0.8" cy="0.85" r="0.6">
      <stop offset="0" stop-color="#7FB2FF" stop-opacity=".55"/><stop offset="1" stop-color="#7FB2FF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7B5CFF"/><stop offset="1" stop-color="#FF4F9A"/></linearGradient>
    <filter id="${id}g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
  </defs>`;
}

// Corpo: balão arredondado (squircle) com rabinho embaixo à esquerda.
const BUBI_BODY = "M100 38 C146 38 166 58 166 100 C166 140 146 160 104 160 L84 160 L60 182 C56 185 52 182 54 177 L60 158 C42 151 34 132 34 100 C34 58 54 38 100 38 Z";

function mascot(mood, size) {
  mood = mood || "wave";
  size = size || 160;
  const id = "bubi" + (++__bubiSeq);
  const ink = "#2A1B4A";
  const eye = (x, y, dx, dy) => `<ellipse cx="${x + (dx || 0)}" cy="${y + (dy || 0)}" rx="6.2" ry="8.4" fill="${ink}"/><circle cx="${x + (dx || 0) + 2.2}" cy="${y + (dy || 0) - 3}" r="2.3" fill="#fff"/>`;
  const eyes = {
    wave: eye(82, 96) + eye(118, 96),
    talk: eye(82, 96) + eye(118, 96),
    think: eye(82, 96, -3, -4) + eye(118, 96, -3, -4),
    cheer: `<path d="M74 98 q8 -10 16 0" fill="none" stroke="${ink}" stroke-width="4.5" stroke-linecap="round"/><path d="M110 98 q8 -10 16 0" fill="none" stroke="${ink}" stroke-width="4.5" stroke-linecap="round"/>`
  }[mood];
  const mouth = {
    wave: `<path d="M91 116 q9 8 18 0" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>`,
    think: `<ellipse cx="106" cy="118" rx="4.5" ry="4" fill="${ink}"/>`,
    talk: `<ellipse cx="100" cy="118" rx="7.5" ry="6.5" fill="${ink}"/><ellipse cx="100" cy="121" rx="4" ry="2.2" fill="#FF6FA8"/>`,
    cheer: `<path d="M86 112 h28 q0 17 -14 17 q-14 0 -14 -17z" fill="${ink}"/><path d="M93 123 q7 -5 14 0 q-7 5 -14 0z" fill="#FF6FA8"/>`
  }[mood];
  const arm = (cx, cy, rot) => `<ellipse cx="${cx}" cy="${cy}" rx="11" ry="15" transform="rotate(${rot} ${cx} ${cy})" fill="url(#${id}b)"/><ellipse cx="${cx}" cy="${cy}" rx="11" ry="15" transform="rotate(${rot} ${cx} ${cy})" fill="url(#${id}s)"/>`;
  const arms = {
    wave: arm(30, 118, 30) + arm(172, 74, -35) + `<path d="M182 50 l5 -7 M191 62 l9 -2 M172 46 l0 -9" stroke="#8C7BFF" stroke-width="3.5" stroke-linecap="round"/>`,
    think: arm(30, 118, 30) + arm(132, 132, -60) + `<circle cx="160" cy="42" r="5" fill="#C7B8FF"/><circle cx="174" cy="24" r="8" fill="#C7B8FF" opacity=".8"/>`,
    talk: arm(30, 118, 30) + arm(170, 118, -30) + `<path d="M178 82 q8 8 0 16 M188 76 q14 14 0 28" fill="none" stroke="#8C7BFF" stroke-width="3.5" stroke-linecap="round"/>`,
    cheer: arm(26, 70, 35) + arm(174, 70, -35)
  }[mood];
  const star = (x, y, r, c) => { const k = r * 0.18; return `<path d="M${x} ${y - r} C${x + k} ${y - k} ${x + k} ${y - k} ${x + r} ${y} C${x + k} ${y + k} ${x + k} ${y + k} ${x} ${y + r} C${x - k} ${y + k} ${x - k} ${y + k} ${x - r} ${y} C${x - k} ${y - k} ${x - k} ${y - k} ${x} ${y - r}z" fill="${c}"/>`; };
  const extras = {
    wave: star(24, 52, 9, "#FFC3A0") + star(186, 168, 7, "#C7B8FF"),
    cheer: star(30, 30, 11, "#FF9ECD") + star(178, 28, 8, "#C7B8FF") + star(22, 168, 7, "#FFC3A0") + star(182, 150, 9, "#7FB2FF"),
    think: "", talk: star(30, 54, 7, "#C7B8FF")
  }[mood];

  return `<svg class="mascot" width="${size}" height="${size * 1.1}" viewBox="0 0 200 220" role="img" aria-label="Bubi, o mascote">
    ${bubiDefs(id)}
    <ellipse cx="102" cy="206" rx="46" ry="6" fill="#5B3FD0" opacity=".14"/>
    <path d="${BUBI_BODY}" fill="#FF9ECD" opacity=".45" filter="url(#${id}g)" transform="translate(0 6)"/>
    ${extras}
    ${arms}
    <path d="${BUBI_BODY}" fill="url(#${id}b)"/>
    <path d="${BUBI_BODY}" fill="url(#${id}r)"/>
    <path d="${BUBI_BODY}" fill="url(#${id}s)"/>
    <path d="M58 70 q10 -20 34 -22" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/>
    <path d="M111 33 L127 13" stroke="url(#${id}a)" stroke-width="11" stroke-linecap="round"/>
    <ellipse cx="66" cy="114" rx="9" ry="5.5" fill="#FF5FA2" opacity=".35"/><ellipse cx="134" cy="114" rx="9" ry="5.5" fill="#FF5FA2" opacity=".35"/>
    ${eyes}
    ${mouth}
  </svg>`;
}

function logoMark(size) {
  size = size || 44;
  const id = "logo" + (++__bubiSeq);
  return `<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 200 200" role="img" aria-label="Bubi English">
    ${bubiDefs(id)}
    <defs>
      <linearGradient id="${id}bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2B1F55"/><stop offset="1" stop-color="#120D24"/></linearGradient>
      <radialGradient id="${id}glow" cx="0.5" cy="0.55" r="0.5"><stop offset="0" stop-color="#FF8FC8" stop-opacity=".55"/><stop offset="1" stop-color="#FF8FC8" stop-opacity="0"/></radialGradient>
    </defs>
    <rect x="4" y="4" width="192" height="192" rx="56" fill="url(#${id}bg)"/>
    <rect x="4" y="4" width="192" height="192" rx="56" fill="url(#${id}glow)"/>
    <rect x="5" y="5" width="190" height="190" rx="55" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="2"/>
    <g transform="translate(22 30) scale(0.78)">
      <path d="${BUBI_BODY}" fill="url(#${id}b)"/>
      <path d="${BUBI_BODY}" fill="url(#${id}r)"/>
      <path d="${BUBI_BODY}" fill="url(#${id}s)"/>
      <path d="M112 30 L128 10" stroke="url(#${id}a)" stroke-width="12" stroke-linecap="round"/>
      <path d="M74 100 q8 -10 16 0" fill="none" stroke="#2A1B4A" stroke-width="6" stroke-linecap="round"/>
      <path d="M110 100 q8 -10 16 0" fill="none" stroke="#2A1B4A" stroke-width="6" stroke-linecap="round"/>
      <path d="M90 116 q10 9 20 0" fill="none" stroke="#2A1B4A" stroke-width="5" stroke-linecap="round"/>
    </g>
  </svg>`;
}

if (typeof module !== "undefined") module.exports = { mascot, logoMark };
