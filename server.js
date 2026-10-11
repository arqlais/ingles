// Servidor local: entrega public/ e faz a ponte com a API do Claude para o tutor.
// Uso: ANTHROPIC_API_KEY=sk-... node server.js  →  http://localhost:3000
const http = require("http");
const fs = require("fs");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");

const PORT = process.env.PORT || 3000;
const MODEL = process.env.TUTOR_MODEL || "claude-haiku-5-5";
let client = null; // criado no primeiro uso; lê ANTHROPIC_API_KEY do ambiente

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };

function extractJson(text) {
  try { return JSON.parse(text); } catch (e) { /* tenta achar o objeto */ }
  const a = text.indexOf("{"), b = text.lastIndexOf("}");
  if (a >= 0 && b > a) return JSON.parse(text.slice(a, b + 1));
  throw new Error("resposta sem JSON");
}

async function tutor(req, res) {
  let body = "";
  for await (const chunk of req) body += chunk;
  try {
    const { prompt } = JSON.parse(body);
    if (!prompt || prompt.length > 50000) throw new Error("prompt inválido");
    if (!process.env.ANTHROPIC_API_KEY) throw new Error("defina ANTHROPIC_API_KEY para usar o tutor");
    client = client || new Anthropic();
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 700,
      messages: [{ role: "user", content: prompt }]
    });
    const text = msg.content.filter((c) => c.type === "text").map((c) => c.text).join("");
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ data: extractJson(text) }));
  } catch (e) {
    console.error("tutor:", e.message);
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: e.message }));
  }
}

http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/tutor") return tutor(req, res);
  const file = path.join(__dirname, "public", req.url === "/" ? "index.html" : path.normalize(req.url).replace(/^(\.\.[/\\])+/, ""));
  if (!file.startsWith(path.join(__dirname, "public"))) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); return res.end("não encontrado"); }
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
    res.end(buf);
  });
}).listen(PORT, () => console.log(`Inglês de Viagem rodando em http://localhost:${PORT}`));
