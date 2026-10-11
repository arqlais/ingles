# Bubi English

Curso completo de inglês da Laís, do A1 ao B1, contado como uma série. A Bia, arquiteta brasileira, se muda para Nova York e cada unidade é um episódio da vida dela. Laís já fez alguns meses de curso tradicional e achou repetitivo: aqui a ideia é aprender por história, contexto, fala e revisão espaçada, com explicações bem simples em português.

## Arquivos

- `src/` é a fonte única. Nunca edite `index.html`, `public/` ou `dist/` à mão: rode `npm run build`.
  - `units-a1.js`, `units-a2.js`, `units-b1.js`: as 3 temporadas (8 episódios cada). Formato de cada unidade descrito no topo de `data.js`:
    - `episode`: cena, falas `[personagem, en, pt]` e 2 perguntas de compreensão.
    - `vocab`: 10 itens `[en, pt, pronúncia]`. Pronúncia lida como português, sílaba forte em MAIÚSCULA, `th`/`dh` = língua entre os dentes, vogal dobrada = longa.
    - `lesson`: `why` (pra que serve), 4 `parts` `[título, explicação simples, exemplos]`, 3 `mistakes` `[errado, certo, por quê]`, `tip`.
    - `sentences`: 8 frases com a lacuna entre colchetes, resposta certa primeiro: `"I [am|is|are] from Brazil."`.
    - `mission`: `goal`, `roleplay` (cena em inglês para a IA), `writing` e `model` (exemplo de resposta).
  - `data.js`: `LEVELS` (temporadas), `CAST` (personagens, cor e tom de voz), `UNITS`, `PLACEMENT` (teste de nível, 16 perguntas), `TOPICS` (conversa livre) e `PRONUNCIATION` (8 lições de sons, com pares para o jogo "ouça e escolha").
  - `app.js`: app em JavaScript puro. Renderiza por template string; todo texto vindo da IA passa por `esc()`.
  - `mascot.js`: o **Bubi**, balão de fala 3D em degradê (lilás, rosa, pêssego) com reflexo de vidro e um acento agudo (´) na cabeça, sua marca. `mascot(mood, size)` com `wave`, `think`, `talk`, `cheer`; `logoMark(size)` é o símbolo do app (Bubi num ícone escuro arredondado). Cores fixas do personagem, para ficar igual nos dois temas.
  - `styles.css`: estilo glass. Tokens no `:root` com tema claro e escuro, fundo lilás com manchas de luz (`.backdrop`), cartões de vidro (`.glass`) e cartões brancos sólidos (`.solid`) para o que pede foco, rosa (`--accent`) e violeta (`--violet`) como destaques. Fontes: Plus Jakarta Sans (texto) e Fredoka (marca).
  - `body.html`: casca (fundo, barra lateral, `<main id="app">`).
- `build.js` gera `public/index.html` (local), `index.html` na raiz (GitHub Pages) e `dist/artifact.html` (Artifact no claude.ai).
- `server.js` serve `public/` e expõe `POST /api/tutor`, que chama a API do Claude (`TUTOR_MODEL`, padrão `claude-haiku-5-5`) e devolve `{ data }` em JSON.

## Método

Cada episódio tem 6 etapas: Episódio → Palavras → Entenda → Pratique → Fale → Missão.
- **Episódio**: ouvir o diálogo (voz com tom diferente por personagem), primeiro sem tradução, e responder 2 perguntas.
- **Palavras**: áudio normal e lento, dica de pronúncia e microfone.
- **Entenda**: gramática simples; botão "explica de outro jeito" (IA) em cada parte.
- **Pratique**: ~13 exercícios gerados dos dados (significado, lacuna, montar frase, ditado de uma fala do episódio, tradução). Concluir exige `PASS` (70%). "Por que errei?" (IA) e "+5 exercícios com IA".
- **Fale**: shadowing das falas do episódio, com microfone.
- **Missão**: viver a cena com a IA (3 mensagens) ou escrever o texto (correção da IA, com exemplo de resposta).
- Ao concluir, as 10 palavras entram na revisão espaçada (`SRS_DAYS` = 1, 3, 7, 14, 30, 60). A partir da caixa 2 o cartão inverte (pt → en).

## Onde roda e o que funciona

`app.js` detecta o ambiente:
- **Artifact (claude.ai)**: progresso em `claude.use("db")` (doc privado `data/users/<id>/bubi`), professor via `claude.use("sample")`. Microfone indisponível (o artifact não libera).
- **GitHub Pages**: progresso no `localStorage` (`bubi-english:v3`), sem professor IA, microfone funciona no Chrome/Edge.
- **Local** (`npm start`): `localStorage`, professor via `/api/tutor`, microfone funciona.

Mantenha as três rotas funcionando. Todo pedido à IA termina com o formato JSON exato esperado.

## Comandos

```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-...
npm start          # build + http://localhost:3000
npm run build      # só gera os HTML
```

## Convenções

- Interface e explicações em português do Brasil, bem simples, como para quem está começando do zero. Exemplos curtos e do dia a dia. Nada de termo técnico sem exemplo.
- Diálogos e falas em inglês natural, no nível do episódio.
- Ao criar episódio: mesmo formato, falas só de personagens do `CAST`, 3 opções sem repetição por frase, e confira com `node -e` que toda frase tem exatamente um `[...]`.
- O Bubi fala com a usuária em português, curto e animado.

## Próximos passos

- **Temporada 4 (B2)**: past perfect, used to / be used to, modais de dedução, terceira condicional, gerúndio × infinitivo, conectores.
- Leituras curtas por episódio (o "jornal" do bairro da Bia) com perguntas.
- Lembrete diário de estudo.
