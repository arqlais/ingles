# Bubi English

Curso completo de inglês do A1 ao B1 com o Bubi, um balãozinho de fala que acompanha os estudos.

- **Teste de nível** com 16 perguntas que indica em qual unidade começar.
- **24 unidades**, cada uma com vocabulário, gramática explicada em português, prática com 13 exercícios variados, fala (shadowing com áudio) e escrita corrigida por IA.
- **Revisão espaçada**: as palavras voltam em 1, 3, 7, 14, 30 e 60 dias para irem para a memória de longo prazo.
- **Professor IA**: conversa por tema com correção em português, tira-dúvidas e correção de textos.
- Meta diária, sequência de dias e progresso por nível.

## Rodar no seu computador

Precisa do [Node.js](https://nodejs.org) 18 ou mais novo.

```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-...   # no Windows: set ANTHROPIC_API_KEY=sk-ant-...
npm start
```

Abra http://localhost:3000. Sem a chave de API, tudo funciona menos o professor IA (conversa, dúvidas, correção de escrita e exercícios extras).

A chave é criada em https://console.anthropic.com e a API é cobrada à parte da assinatura do claude.ai. Na versão publicada no claude.ai o professor usa sua própria conta, sem chave.

## Continuar no Claude Code

Dentro da pasta, rode `claude` e peça mudanças em linguagem normal, por exemplo:

- "adicione o nível B2 com 6 unidades"
- "crie uma etapa de leitura em cada unidade"
- "depois de mudar, gere o dist/artifact.html de novo"

O `CLAUDE.md` explica a estrutura para o Claude Code entender o projeto.

## Estrutura

```
src/data.js      conteúdo: unidades, teste de nível, temas de conversa
src/mascot.js    Bubi, o mascote (SVG em traço)
src/app.js       lógica e telas
src/styles.css   visual
src/body.html    casca da página
build.js         gera public/index.html e dist/artifact.html
server.js        servidor local + ponte com a API do Claude
```
