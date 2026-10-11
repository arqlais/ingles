// Malu, a malinha mascote. Desenho em traço (line art) com SVG.
// mascot(mood, size): mood = "wave" | "think" | "cheer" | "talk"

function mascot(mood, size) {
  mood = mood || "wave";
  size = size || 160;
  const S = 'stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';

  const eyes = {
    wave:  '<circle cx="86" cy="106" r="5" fill="var(--ink)"/><circle cx="116" cy="106" r="5" fill="var(--ink)"/><circle cx="87.6" cy="104.4" r="1.6" fill="var(--surface)"/><circle cx="117.6" cy="104.4" r="1.6" fill="var(--surface)"/>',
    talk:  '<circle cx="86" cy="106" r="5" fill="var(--ink)"/><circle cx="116" cy="106" r="5" fill="var(--ink)"/><circle cx="87.6" cy="104.4" r="1.6" fill="var(--surface)"/><circle cx="117.6" cy="104.4" r="1.6" fill="var(--surface)"/>',
    think: '<circle cx="89" cy="102" r="5" fill="var(--ink)"/><circle cx="119" cy="102" r="5" fill="var(--ink)"/><circle cx="91" cy="100.5" r="1.6" fill="var(--surface)"/><circle cx="121" cy="100.5" r="1.6" fill="var(--surface)"/>',
    cheer: `<path d="M80 108 q6 -8 12 0" fill="none" ${S}/><path d="M110 108 q6 -8 12 0" fill="none" ${S}/>`
  }[mood];

  const mouth = {
    wave:  `<path d="M92 120 q9 9 18 0" fill="none" ${S}/>`,
    think: `<path d="M98 123 h10" fill="none" ${S}/>`,
    talk:  `<ellipse cx="101" cy="123" rx="6" ry="5" fill="var(--ink)"/>`,
    cheer: `<path d="M89 118 h24 q0 14 -12 14 q-12 0 -12 -14z" fill="var(--ink)" ${S}/><path d="M95 127 q6 -4 12 0 q-6 5 -12 0z" fill="var(--pink-strong)"/>`
  }[mood];

  const arms = {
    wave:  `<path d="M52 122 q-16 8 -20 24" fill="none" ${S}/><circle cx="31" cy="149" r="5" fill="var(--surface)" ${S}/>
            <path d="M150 116 q18 -6 22 -30" fill="none" ${S}/><circle cx="173" cy="82" r="6" fill="var(--surface)" ${S}/>
            <path d="M182 66 l5 -6 M188 76 l8 -2 M176 60 l1 -8" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/>`,
    think: `<path d="M52 122 q-16 8 -20 24" fill="none" ${S}/><circle cx="31" cy="149" r="5" fill="var(--surface)" ${S}/>
            <path d="M150 120 q16 6 4 16 q-10 6 -26 -6" fill="none" ${S}/><circle cx="127" cy="129" r="6" fill="var(--surface)" ${S}/>
            <circle cx="160" cy="62" r="4" fill="none" stroke="var(--ink)" stroke-width="2.5"/><circle cx="172" cy="46" r="6" fill="none" stroke="var(--ink)" stroke-width="2.5"/><path d="M178 20 a12 12 0 1 1 6 22" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/><circle cx="186" cy="46" r="1.8" fill="var(--ink)"/>`,
    talk:  `<path d="M52 122 q-16 8 -20 24" fill="none" ${S}/><circle cx="31" cy="149" r="5" fill="var(--surface)" ${S}/>
            <path d="M150 122 q16 8 20 24" fill="none" ${S}/><circle cx="171" cy="149" r="5" fill="var(--surface)" ${S}/>`,
    cheer: `<path d="M52 116 q-18 -6 -22 -30" fill="none" ${S}/><circle cx="29" cy="82" r="6" fill="var(--surface)" ${S}/>
            <path d="M150 116 q18 -6 22 -30" fill="none" ${S}/><circle cx="173" cy="82" r="6" fill="var(--surface)" ${S}/>`
  }[mood];

  const sparkle = (x, y, r, fill) => `<path d="M${x} ${y - r} C${x + r * 0.15} ${y - r * 0.15} ${x + r * 0.15} ${y - r * 0.15} ${x + r} ${y} C${x + r * 0.15} ${y + r * 0.15} ${x + r * 0.15} ${y + r * 0.15} ${x} ${y + r} C${x - r * 0.15} ${y + r * 0.15} ${x - r * 0.15} ${y + r * 0.15} ${x - r} ${y} C${x - r * 0.15} ${y - r * 0.15} ${x - r * 0.15} ${y - r * 0.15} ${x} ${y - r}z" fill="${fill}" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>`;
  const extras = mood === "cheer"
    ? sparkle(20, 40, 12, "var(--ink)") + sparkle(186, 128, 9, "var(--surface)") + sparkle(42, 186, 7, "var(--surface)")
    : mood === "wave" ? sparkle(24, 70, 9, "var(--surface)") + sparkle(178, 170, 7, "var(--ink)") : "";

  return `<svg class="mascot" width="${size}" height="${size * 1.1}" viewBox="0 0 200 220" role="img" aria-label="Malu, a malinha mascote">
    <ellipse cx="100" cy="212" rx="48" ry="5" fill="var(--ink)" opacity=".08"/>
    ${extras}
    <path d="M84 186 v16" ${S}/><path d="M118 186 v16" ${S}/>
    <path d="M72 204 q0 -6 12 -6 q8 0 8 6 z" fill="var(--ink)" ${S}/><path d="M110 204 q0 -6 8 -6 q12 0 12 6 z" fill="var(--ink)" ${S}/>
    <path d="M80 62 v-14 a9 9 0 0 1 9 -9 h24 a9 9 0 0 1 9 9 v14" fill="none" ${S}/>
    <rect x="50" y="60" width="102" height="128" rx="24" fill="var(--surface)" ${S}/>
    <path d="M72 62 v124 M130 62 v124" stroke="var(--line-strong)" stroke-width="3" stroke-linecap="round"/>
    <rect x="60" y="150" width="22" height="22" rx="6" fill="var(--butter-strong)" stroke="var(--ink)" stroke-width="2.4" transform="rotate(-10 71 161)"/>
    <path d="M71 156 l1.8 3.6 4 .6 -2.9 2.8 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.8 4 -.6z" fill="var(--ink)" transform="rotate(-10 71 161)"/>
    <path d="M124 160 c0 -6 8 -6 8 0 c0 -6 8 -6 8 0 c0 6 -8 10 -8 12 c0 -2 -8 -6 -8 -12z" fill="var(--pink-strong)" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
    <ellipse cx="76" cy="119" rx="6" ry="3.5" fill="var(--pink-strong)" opacity=".8"/><ellipse cx="126" cy="119" rx="6" ry="3.5" fill="var(--pink-strong)" opacity=".8"/>
    ${eyes}
    ${mouth}
    ${arms}
  </svg>`;
}

if (typeof module !== "undefined") module.exports = { mascot };
