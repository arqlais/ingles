# bubi english

Curso completo de inglês, do básico ao intermediário (A1 → B1), contado como uma série. Você acompanha a Bia, uma arquiteta brasileira que se muda para Nova York, e aprende com cada episódio da vida dela.

**Como funciona cada episódio**
1. **Episódio**: ouça o diálogo (cada personagem com sua voz) e veja se entendeu.
2. **Palavras**: expressões com áudio normal e lento, mais a pronúncia escrita do jeito que se lê em português (hello → *rê-LOU*).
3. **Entenda**: a gramática explicada bem simples, com exemplos fáceis, os erros que todo brasileiro comete e um truque para lembrar.
4. **Pratique**: 13 exercícios variados, diferentes a cada vez.
5. **Fale**: repita as falas do episódio; o microfone confere a sua pronúncia.
6. **Missão**: viva a cena com o professor IA ou escreva um texto e receba a correção.

E mais: teste de nível, trilha de **pronúncia** com os 8 sons que mais confundem brasileiros, **revisão espaçada** do vocabulário, metas diárias e o **Bubi**, o mascote.

## Usar

- **No navegador (GitHub Pages)**: tudo funciona, menos o professor IA. O microfone funciona no Chrome e no Edge.
- **No claude.ai (Artifact)**: tudo funciona, inclusive o professor IA, menos o microfone.
- **No seu computador**:

```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-...   # Windows: set ANTHROPIC_API_KEY=sk-ant-...
npm start                              # http://localhost:3000
```

A chave é criada em https://console.anthropic.com (cobrada à parte da assinatura do claude.ai).

## Continuar no Claude Code

Rode `claude` na pasta e peça, por exemplo: "crie a temporada 4 (B2)" ou "adicione uma leitura em cada episódio". O `CLAUDE.md` explica a estrutura.

## Estrutura

```
src/units-a1.js  temporada 1 (A1)
src/units-a2.js  temporada 2 (A2)
src/units-b1.js  temporada 3 (B1)
src/data.js      níveis, elenco, teste de nível, temas e pronúncia
src/mascot.js    Bubi e o símbolo do app
src/app.js       telas e lógica
src/styles.css   visual glass
build.js         gera index.html, public/index.html e dist/artifact.html
server.js        servidor local + ponte com a API do Claude
```
