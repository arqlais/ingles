// Conteúdo do Bubi English.
//
// As unidades ficam em units-a1.js, units-a2.js e units-b1.js. Cada unidade é um
// episódio da série da Bia, com este formato:
//   episode:   { title, scene, lines: [[personagem, inglês, português]], questions: [[pergunta, [opções], certa]] }
//   vocab:     [[inglês, português, pronúncia]]   pronúncia lida como português, MAIÚSCULA = sílaba forte
//   lesson:    { why, parts: [[título, explicação, [[en, pt], ...]]], mistakes: [[errado, certo, por quê]], tip }
//   sentences: [["I [am|is|are] from Brazil.", "tradução"]]   a resposta certa vem primeiro
//   mission:   { goal, roleplay (cena para a IA, em inglês), writing, model }

const LEVELS = {
  A1: { name: "A1 · Iniciante", season: "Temporada 1 · Chegando em Nova York", color: "mint", note: "A Bia chega, conhece o Sam e começa no estúdio. Você aprende a base: to be, rotina, perguntas, lugares e o que está acontecendo agora." },
  A2: { name: "A2 · Básico", season: "Temporada 2 · A vida em Nova York", color: "peach", note: "Viagens, compras, mudança e festas. Você aprende a contar o passado, fazer planos, comparar e dar conselhos." },
  B1: { name: "B1 · Intermediário", season: "Temporada 3 · A Bia no comando", color: "lilac", note: "Um ano depois, a Bia cresce no trabalho. Você aprende a ligar passado e presente, imaginar, contar histórias e falar como nativo." }
};

// Personagens: cor do avatar e voz (o tom muda um pouco para cada um).
const CAST = {
  Bia: { color: "pink", pitch: 1.18, about: "Arquiteta brasileira, 26 anos. Acabou de se mudar para Nova York." },
  Sam: { color: "sky", pitch: 0.92, about: "O colega de apartamento americano. Engraçado e um pouco bagunceiro." },
  Leo: { color: "mint", pitch: 0.82, about: "Colega britânico do estúdio. Adora conversar." },
  Olivia: { color: "lilac", pitch: 1.05, about: "A chefe da Bia no Linea Studio. Exigente e muito gentil." }
};

const UNITS = [].concat(UNITS_A1, UNITS_A2, UNITS_B1);

const PLACEMENT = [
  { q: "Hello! How ___ you?", options: ["is", "are", "am", "be"], answer: 1, why: "Com you, o verbo to be é are." },
  { q: "I ___ from Brazil.", options: ["is", "are", "am", "be"], answer: 2, why: "Com I, o verbo to be é am." },
  { q: "She ___ coffee every morning.", options: ["drink", "drinking", "drinks", "is drink"], answer: 2, why: "No presente, he, she e it ganham S: she drinks." },
  { q: "___ you like pizza?", options: ["Are", "Do", "Does", "Is"], answer: 1, why: "Perguntas no presente usam do (ou does com he, she, it)." },
  { q: "Yesterday I ___ to the beach.", options: ["go", "went", "goes", "gone"], answer: 1, why: "Yesterday pede passado: go vira went." },
  { q: "There ___ many people at the party.", options: ["is", "are", "has", "be"], answer: 1, why: "Many people é plural: there are." },
  { q: "This phone is ___ than my old one.", options: ["more good", "best", "better", "gooder"], answer: 2, why: "Good é irregular: good → better → the best." },
  { q: "I've never ___ to London.", options: ["went", "been", "go", "going"], answer: 1, why: "Com have, usa-se a 3ª forma: I've never been." },
  { q: "If it rains tomorrow, we ___ stay at home.", options: ["would", "did", "will", "are"], answer: 2, why: "Situação possível no futuro: if + presente, will + verbo." },
  { q: "I've lived here ___ 2019.", options: ["for", "since", "from", "in"], answer: 1, why: "Since mostra desde quando; for mostra quanto tempo." },
  { q: "If I ___ more time, I would learn Japanese.", options: ["have", "will have", "had", "would have"], answer: 2, why: "Situação imaginária: if + passado, would + verbo." },
  { q: "This bridge ___ in 1890.", options: ["built", "was built", "is building", "has built"], answer: 1, why: "Voz passiva no passado: was + 3ª forma." },
  { q: "She told me she ___ busy.", options: ["is", "were", "was", "be"], answer: 2, why: "Contando o que alguém disse, o verbo volta um tempo: is → was." },
  { q: "The man ___ car was stolen called the police.", options: ["who", "whose", "which", "that"], answer: 1, why: "Whose mostra posse: o homem cujo carro foi roubado." },
  { q: "By the time we arrived, the film ___.", options: ["started", "has started", "had started", "starts"], answer: 2, why: "Algo que aconteceu antes de outra coisa no passado: had + 3ª forma." },
  { q: "I'm used to ___ up early.", options: ["wake", "waking", "woke", "be waking"], answer: 1, why: "Be used to + verbo com ING = estar acostumado a." }
];

function placementResult(score) {
  if (score >= 10) return { level: "B1", start: 17 };
  if (score >= 6) return { level: "A2", start: 9 };
  return { level: "A1", start: 1 };
}

// Conversas livres com o professor IA.
const TOPICS = [
  { id: "intro", name: "Apresentações", icon: "hand", scene: "You just met the learner at a friendly language exchange meetup. Get to know her." },
  { id: "routine", name: "Rotina", icon: "sun", scene: "Chat with the learner about her daily routine and habits." },
  { id: "work", name: "Trabalho e estudos", icon: "briefcase", scene: "Chat with the learner about her work, studies and career plans." },
  { id: "design", name: "Arquitetura e design", icon: "ruler", scene: "Chat with the learner about architecture, buildings, interiors and design she likes." },
  { id: "travel", name: "Viagens", icon: "plane", scene: "Chat with the learner about trips she took and places she wants to visit." },
  { id: "food", name: "Comida", icon: "cup", scene: "Chat with the learner about food, cooking and restaurants." },
  { id: "movies", name: "Filmes e séries", icon: "play", scene: "Chat with the learner about movies, TV series and music she enjoys." },
  { id: "restaurant", name: "No restaurante", icon: "cup", scene: "Role-play: you are a waiter at a restaurant in New York and the learner is a customer." },
  { id: "interview", name: "Entrevista de emprego", icon: "briefcase", scene: "Role-play: you are a friendly interviewer for a design job and the learner is the candidate." }
];

// Trilha de pronúncia: os sons que mais confundem brasileiros.
//   words: [inglês, português, pronúncia]   pairs: pares para "ouça e escolha"   say: frases para repetir
const PRONUNCIATION = [
  {
    id: "h", title: "O H que soa como R", sound: "H",
    simple: "No começo das palavras, o H do inglês soa como o nosso R de 'rato', só que bem suave: é só um sopro. Por isso hello soa 'rê-LOU' e happy soa 'RÉ-pi'.",
    how: ["Abra a boca como se fosse embaçar um espelho.", "Solte o ar sem fazer barulho na garganta.", "Diga a vogal logo em seguida: h-ello."],
    words: [["hello", "olá", "rê-LOU"], ["house", "casa", "RÁUS"], ["happy", "feliz", "RÉ-pi"], ["help", "ajuda", "RÉLP"], ["hotel", "hotel", "rou-TÉL"], ["hour", "hora (H mudo!)", "ÁUR"]],
    pairs: [["hat", "at"], ["heat", "eat"], ["hair", "air"]],
    say: [["Hello, how are you?", "Olá, como vai?"], ["I'm happy at home.", "Estou feliz em casa."], ["Can you help me with my homework?", "Você pode me ajudar com a lição?"]],
    tip: "Algumas palavras têm o H mudo, como hour e honest. Mas são poucas: na dúvida, sopre."
  },
  {
    id: "th", title: "O famoso TH", sound: "TH",
    simple: "O TH não existe em português. Coloque a pontinha da língua entre os dentes da frente e solte o ar. Ele tem dois sons: sem vibrar (think, three) e vibrando a garganta (this, mother). Nas dicas de pronúncia do curso, 'th' é o som sem vibrar e 'dh' é o som vibrando.",
    how: ["Mostre a pontinha da língua entre os dentes, bem de leve.", "Para think: só sopre, sem voz.", "Para this: faça a garganta vibrar, como um zumbido."],
    words: [["think", "pensar", "THÍNK"], ["three", "três", "THRÍ"], ["thanks", "obrigado", "THÉNKS"], ["this", "isto", "DHÍS"], ["mother", "mãe", "MÂ-dher"], ["the", "o, a", "DHÂ"]],
    pairs: [["think", "sink"], ["three", "tree"], ["thank", "tank"], ["they", "day"]],
    say: [["Thank you so much!", "Muito obrigada!"], ["This is my mother.", "Esta é minha mãe."], ["I think it's three o'clock.", "Acho que são três horas."]],
    tip: "Não troque o TH por F nem por T. 'Tank you' quer dizer outra coisa: tank é tanque!"
  },
  {
    id: "vowels", title: "Vogal curta × vogal longa", sound: "i / ii",
    simple: "Em inglês, o tamanho da vogal muda a palavra. Ship (navio) tem um 'i' curtinho e relaxado. Sheep (ovelha) tem um 'iii' comprido, com a boca sorrindo. Nas dicas, vogal dobrada (ÍÍ, ÚÚ) quer dizer vogal longa.",
    how: ["Vogal longa: sorria, estique o som e conte até dois.", "Vogal curta: relaxe a boca e fale rapidinho.", "Grave e compare as duas palavras do par."],
    words: [["ship", "navio", "XÍP"], ["sheep", "ovelha", "XÍÍP"], ["live", "morar", "LÍV"], ["leave", "sair, partir", "LÍÍV"], ["full", "cheio", "FUL"], ["fool", "bobo", "FÚÚL"]],
    pairs: [["ship", "sheep"], ["live", "leave"], ["sit", "seat"], ["full", "fool"], ["bed", "bad"]],
    say: [["I live here, but I leave at nine.", "Eu moro aqui, mas saio às nove."], ["Please take a seat.", "Por favor, sente-se."], ["The bus is full.", "O ônibus está cheio."]],
    tip: "Beach (praia) tem vogal longa. Fale bem comprido: 'BÍÍTCH'."
  },
  {
    id: "endings", title: "Termine a palavra seco, sem 'i'", sound: "-g, -k, -d",
    simple: "O brasileiro tende a colocar um 'i' no final das palavras: 'bigui', 'bléqui', 'gudi'. Em inglês a palavra termina seca, na consoante. Isso deixa o seu inglês muito mais natural.",
    how: ["Fale a palavra e pare de soltar o ar na última letra.", "Feche a boca no P e no B, encoste a língua no T e no D.", "Imagine que alguém apertou o pause."],
    words: [["big", "grande", "BÍG (sem 'i')"], ["black", "preto", "BLÉK"], ["good", "bom", "GUD"], ["stop", "parar", "STÓP"], ["night", "noite", "NÁIT"], ["Facebook", "Facebook", "FÊIS-buk"]],
    pairs: [["back", "bag"], ["cap", "cab"], ["right", "ride"]],
    say: [["It's a big black dog.", "É um cachorro grande e preto."], ["Good night!", "Boa noite!"], ["Stop the bus, please.", "Pare o ônibus, por favor."]],
    tip: "Quanto mais curto o final, melhor. Grave a si mesma e confira se o 'i' sumiu."
  },
  {
    id: "ed", title: "Os finais ED e S", sound: "-ed / -s",
    simple: "O ED do passado quase nunca vira sílaba. Ele soa como T (worked = 'UÂRKT'), como D (played = 'PLÊID') ou como 'id', mas só depois de T ou D (wanted = 'UÓN-tid'). O S final é parecido: soa S (works), Z (plays) ou 'iz' (watches).",
    how: ["Se o verbo termina com som de T ou D, o ED vira 'id': wanted, needed.", "Nos outros casos, grude só um T ou D no final: worked, played.", "Nunca diga 'uórquedi'."],
    words: [["worked", "trabalhou", "UÂRKT"], ["played", "jogou", "PLÊID"], ["wanted", "quis", "UÓN-tid"], ["needed", "precisou", "NÍ-did"], ["watches", "assiste", "UÓ-tchiz"], ["plays", "joga", "PLÊIZ"]],
    pairs: [["work", "worked"], ["play", "played"], ["want", "wanted"]],
    say: [["I worked and then I played.", "Trabalhei e depois joguei."], ["She wanted to stay.", "Ela quis ficar."], ["He watches TV and plays games.", "Ele vê TV e joga videogame."]],
    tip: "Teste rápido: se dá para dizer o verbo sem criar uma sílaba nova, não crie."
  },
  {
    id: "silent", title: "Letras que ficam mudas", sound: "mudas",
    simple: "Várias palavras têm letras que não se falam. No papel parecem difíceis, mas na fala ficam até mais fáceis: é só pular a letra.",
    how: ["walk e talk: o L não se fala.", "knife e know: o K do começo não se fala.", "write e wrong: o W do começo não se fala."],
    words: [["walk", "andar", "UÓK"], ["talk", "conversar", "TÓK"], ["knife", "faca", "NÁIF"], ["write", "escrever", "RÁIT"], ["listen", "escutar", "LÍ-sen"], ["island", "ilha", "ÁI-lend"], ["receipt", "nota fiscal", "ri-SÍT"], ["Wednesday", "quarta-feira", "UÉNZ-dei"]],
    pairs: [],
    say: [["I know the answer.", "Eu sei a resposta."], ["Let's walk and talk.", "Vamos andar e conversar."], ["Can you write it on the receipt?", "Você pode escrever isso na nota?"]],
    tip: "Know e no têm o mesmo som. Write e right também. Quem decide o sentido é a frase."
  },
  {
    id: "rl", title: "O R americano e o L do final", sound: "R / L",
    simple: "O R americano parece o R do interior ('porrrta'): a língua enrola para trás e não encosta em nada. E o L no final da palavra não vira U: nós dizemos 'Brasiu', mas em inglês a língua encosta atrás dos dentes de cima: hotel, call, people.",
    how: ["Para o R: dobre a pontinha da língua para trás, sem encostar.", "Para o L final: termine com a língua grudada atrás dos dentes de cima.", "Fale devagar: ho-tel-l."],
    words: [["car", "carro", "KÁR"], ["world", "mundo", "UÂRLD"], ["girl", "menina", "GÂRL"], ["call", "ligar", "KÓL"], ["feel", "sentir", "FÍÍL"], ["people", "pessoas", "PÍ-pol"]],
    pairs: [],
    say: [["Call me later.", "Me liga mais tarde."], ["I feel good today.", "Estou me sentindo bem hoje."], ["Hello, world!", "Olá, mundo!"]],
    tip: "Hotel termina com a língua no céu da boca: 'rou-TÉL', e nunca 'rou-TÉU'."
  },
  {
    id: "stress", title: "Sílaba forte e fala conectada", sound: "ritmo",
    simple: "Toda palavra tem uma sílaba forte. Se a força vai para o lugar errado, ninguém entende. Nas dicas do curso, a sílaba forte está em MAIÚSCULA. E na fala rápida as palavras se juntam: 'want to' vira 'wanna', 'going to' vira 'gonna', 'did you' vira 'didja'.",
    how: ["Bata uma palma na sílaba forte: PHO-to-graph.", "As outras sílabas ficam fracas e rápidas.", "Ouça devagar, depois na velocidade normal."],
    words: [["photograph", "fotografia", "FÔU-ro-gréf"], ["photography", "fotografia (a arte)", "fo-TÁ-gra-fi"], ["comfortable", "confortável", "KÂMF-ter-bol"], ["vegetable", "legume", "VÉDJ-tâ-bol"], ["wanna", "want to", "UÓ-na"], ["gonna", "going to", "GÂ-na"]],
    pairs: [],
    say: [["I wanna go home.", "Quero ir para casa."], ["What are you gonna do?", "O que você vai fazer?"], ["Did you eat?", "Você comeu?"]],
    tip: "Comfortable tem só 3 sílabas na fala: 'KÂMF-ter-bol'. A sílaba do meio some!"
  }
];

if (typeof module !== "undefined") module.exports = { LEVELS, CAST, UNITS, PLACEMENT, placementResult, TOPICS, PRONUNCIATION };
