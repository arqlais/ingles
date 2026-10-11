# Inglês de Viagem

Plataforma pessoal da Laís para aprender inglês com foco em viagem. Ela tem base de alguns meses de curso e quer ganhar segurança para falar em situações reais (aeroporto, imigração, hotel, restaurante, transporte, compras).

## Como o projeto funciona

- `src/` é a fonte única. Nunca edite `public/` ou `dist/` à mão: rode `npm run build`.
  - `data.js`: situações, frases (en/pt/dica), teste de nível e níveis CEFR.
  - `app.js`: app em JavaScript puro, sem framework. Renderiza tudo por template string; texto vindo da IA sempre passa por `esc()`.
  - `styles.css`: tokens de cor no `:root` com tema claro e escuro. Visual pastel (menta, pêssego, rosa, lilás, céu, manteiga), cartões bem arredondados, botões-pílula pretos, barra lateral no desktop e barra inferior no celular.
  - `mascot.js`: a **Malu**, malinha mascote em line art (SVG). `mascot(mood, size)` com humores `wave`, `think`, `talk`, `cheer`. Cores vêm dos tokens, então funciona nos dois temas.
  - `body.html`: casca da página (topo, abas, `<main id="app">`).
- `build.js` gera:
  - `public/index.html` para rodar localmente.
  - `dist/artifact.html` para publicar como Artifact no claude.ai.
- `server.js` serve `public/` e expõe `POST /api/tutor`, que chama a API do Claude (modelo em `TUTOR_MODEL`, padrão `claude-haiku-5-5`).

## Dois ambientes, um código

`app.js` detecta onde está (`IN_ARTIFACT`):
- **Artifact**: progresso em `claude.use("db")` (documento privado `data/users/<id>/progress`), tutor em `claude.use("sample")`.
- **Local**: progresso em `localStorage`, tutor via `fetch("/api/tutor")`.

Mantenha as duas rotas funcionando ao mudar armazenamento ou tutor.

## Comandos

```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-...   # chave do console.anthropic.com
npm start                              # build + http://localhost:3000
```

## Convenções

- Interface e explicações em português do Brasil; frases e respostas do personagem em inglês.
- Linguagem simples, nível A1–B1. Correções curtas e encorajadoras.
- Ao adicionar situação: novo objeto em `SITUATIONS` com `code` de 3 letras, `color` (um dos tons pastel), `icon` existente em `ICONS`, `role`, `roleLabel`, `scene` e 8 frases.
- A Malu fala com a usuária em português, de forma curta e animada. Mantenha o traço preto e os detalhes em rosa/amarelo ao criar novas poses.

## Ideias para as próximas versões

- Revisão espaçada: reapresentar frases erradas no treino em 1, 3 e 7 dias.
- Prática de pronúncia: gravar a voz e comparar (Web Speech API, só local).
- Novas situações: farmácia/emergência, passeio turístico, aluguel de carro, pequenas conversas.
- Vocabulário de arquitetura e design em inglês (tema de interesse da Laís).
- Lembrete diário de estudo.
