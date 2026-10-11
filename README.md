# Malu English · Inglês de Viagem

Plataforma para aprender o inglês que você usa numa viagem: teste de nível, 48 frases em 6 situações com áudio, treino de múltipla escolha e um tutor de IA que faz o papel de atendente, garçom ou oficial de imigração e corrige suas mensagens em português.

## Rodar no seu computador

Precisa do [Node.js](https://nodejs.org) 18 ou mais novo.

```bash
cd ingles-viagem
npm install
export ANTHROPIC_API_KEY=sk-ant-...   # no Windows: set ANTHROPIC_API_KEY=sk-ant-...
npm start
```

Abra http://localhost:3000. Sem a chave de API, tudo funciona menos a aba **Conversar**.

A chave é criada em https://console.anthropic.com e a API é cobrada à parte da assinatura do claude.ai. Na versão publicada no claude.ai o tutor usa sua própria conta, sem chave.

## Continuar no Claude Code

Dentro da pasta, rode `claude` e peça mudanças em linguagem normal, por exemplo:

- "adicione uma situação de farmácia com 8 frases"
- "crie revisão espaçada para as frases que eu errei"
- "depois de mudar, gere o dist/artifact.html de novo"

O arquivo `CLAUDE.md` explica a estrutura para o Claude Code entender o projeto.

## Estrutura

```
src/data.js      conteúdo (situações, frases, teste)
src/mascot.js    Malu, a mascote (SVG em traço)
src/app.js       lógica e telas
src/styles.css   visual
src/body.html    casca da página
build.js         gera public/index.html e dist/artifact.html
server.js        servidor local + ponte com a API do Claude
```
