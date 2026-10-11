// Gera duas saídas a partir de src/:
//   public/index.html  → app local (servido por server.js)
//   dist/artifact.html → página única para publicar como Artifact no claude.ai
const fs = require("fs");
const path = require("path");

const src = (f) => fs.readFileSync(path.join(__dirname, "src", f), "utf8");
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">';
const TITLE = "<title>Bubi English</title>";

const css = src("styles.css"), body = src("body.html"), data = ["units-a1.js", "units-a2.js", "units-b1.js", "data.js"].map(src).join("\n"), mascot = src("mascot.js"), app = src("app.js");

fs.mkdirSync(path.join(__dirname, "public"), { recursive: true });
fs.mkdirSync(path.join(__dirname, "dist"), { recursive: true });

const local = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
${TITLE}
${FONTS}
<style>
${css}</style>
</head>
<body>
${body}<script>
${data}
${mascot}
${app}</script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, "public", "index.html"), local);
// Cópia na raiz para o GitHub Pages (Settings → Pages → branch main, pasta / root).
fs.writeFileSync(path.join(__dirname, "index.html"), local);

const artifact = `${TITLE}
${FONTS}
<style>
${css}</style>
${body}<script>
${data}
${mascot}
${app}</script>
`;
fs.writeFileSync(path.join(__dirname, "dist", "artifact.html"), artifact);
console.log("ok: public/index.html, index.html (GitHub Pages) e dist/artifact.html");
