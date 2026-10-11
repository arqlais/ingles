# Bubi English

Curso completo de inglês da Laís, do A1 ao B1, com professor de IA. Ela tem base de alguns meses de curso e quer aprender de verdade, para usar no dia a dia, no trabalho e em viagens.

## Como o projeto funciona

- `src/` é a fonte única. Nunca edite `public/` ou `dist/` à mão: rode `npm run build`.
  - `data.js`: o conteúdo do curso.
    - `UNITS`: 24 unidades (8 por nível). Cada uma tem `grammar` (regra em português + exemplo), `vocab` (10 pares en/pt), `sentences` (8 frases com a lacuna entre colchetes, resposta certa primeiro: `"I [am|is|are] from Brazil."`) e `writing` (proposta de texto).
    - `PLACEMENT`: teste de nível com 16 perguntas em dificuldade crescente; `placementResult()` diz em qual unidade começar.
    - `TOPICS`: temas de conversa do professor IA.
  - `app.js`: app em JavaScript puro, sem framework. Renderiza por template string; todo texto vindo da IA passa por `esc()`.
  - `mascot.js`: o **Bubi**, balãozinho de fala em line art (SVG). `mascot(mood, size)` com humores `wave`, `think`, `talk`, `cheer`. Cores vêm dos tokens, então funciona nos dois temas.
  - `styles.css`: tokens no `:root` com tema claro e escuro. Visual pastel (menta, pêssego, rosa, lilás, céu, manteiga), cartões bem arredondados, botões-pílula pretos, barra lateral no desktop e barra inferior no celular.
  - `body.html`: casca da página (barra lateral, `<main id="app">`).
- `build.js` gera `public/index.html` (local) e `dist/artifact.html` (Artifact no claude.ai).
- `server.js` serve `public/` e expõe `POST /api/tutor`, que chama a API do Claude (modelo em `TUTOR_MODEL`, padrão `claude-haiku-5-5`) e devolve `{ data }` já em JSON.

## Estrutura de aprendizado

Cada unidade tem 5 etapas: Vocabulário → Gramática → Prática → Fala → Escrita.
- **Prática** gera ~13 exercícios a partir dos dados: significado (en→pt e pt→en), completar lacuna, montar frase, ditado (se houver voz) e tradução digitada. Concluir a unidade exige `PASS` (70%).
- Ao concluir, as 10 palavras entram na **revisão espaçada** (`state.srs`), com intervalos `SRS_DAYS` = 1, 3, 7, 14, 30, 60 dias. A partir da caixa 2 o cartão inverte (pt → en).
- **Professor IA** tem 3 modos: conversa por tema (com correção em português a cada mensagem), tirar dúvidas e corrigir texto. A escrita das unidades e os "+5 exercícios com IA" também usam o professor.
- Meta diária: `DAILY_GOAL` XP.

## Dois ambientes, um código

`app.js` detecta onde está (`IN_ARTIFACT`):
- **Artifact**: progresso em `claude.use("db")` (documento privado `data/users/<id>/course`), professor em `claude.use("sample")`.
- **Local**: progresso em `localStorage` (`bubi-english:v2`), professor via `fetch("/api/tutor")`.

Mantenha as duas rotas funcionando ao mudar armazenamento ou professor. Todo pedido à IA termina com o formato JSON exato esperado.

## Comandos

```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-...   # chave do console.anthropic.com
npm start                              # build + http://localhost:3000
```

## Convenções

- Interface e explicações em português do Brasil; exemplos, frases e falas do professor em inglês.
- Explicações curtas, claras e encorajadoras. Nada de jargão sem exemplo.
- Ao adicionar unidade: siga o formato de `UNITS` (4 regras, 10 palavras, 8 frases com 3 opções sem repetição, 1 proposta de escrita) e confira com `node -e` que toda frase tem exatamente um `[...]`.
- O Bubi fala com a usuária em português, de forma curta e animada. Mantenha o traço preto e os detalhes em rosa e amarelo ao criar novas poses.

## Próximos passos

- **B2**: past perfect, used to / be used to, modais de dedução (must have, might have), terceira condicional, gerúndio × infinitivo, conectores.
- Prática de pronúncia com reconhecimento de voz (Web Speech API, só local).
- Leituras curtas por nível com perguntas de interpretação.
- Lembrete diário de estudo.
