// Nível A2 · Temporada 2: "A vida em Nova York"

const UNITS_A2 = [
  {
    id: 9, level: "A2", title: "How was your weekend?", titlePt: "Passado · was, were e verbos com ED",
    goal: "Contar onde você estava e o que fez.",
    episode: {
      title: "Segunda-feira no estúdio", scene: "Segunda de manhã. O Leo quer saber do fim de semana da Bia.",
      lines: [
        ["Leo", "How was your weekend?", "Como foi seu fim de semana?"],
        ["Bia", "It was great! I visited the Brooklyn Museum.", "Foi ótimo! Visitei o Museu do Brooklyn."],
        ["Leo", "Nice! Were you alone?", "Legal! Você estava sozinha?"],
        ["Bia", "No, Sam was with me. We walked a lot.", "Não, o Sam estava comigo. A gente andou muito."],
        ["Leo", "I stayed at home and watched movies.", "Eu fiquei em casa e vi filmes."],
        ["Bia", "All weekend?", "O fim de semana todo?"],
        ["Leo", "Yes! It rained a lot. And I was tired anyway.", "Sim! Choveu muito. E eu estava cansado de qualquer jeito."],
        ["Bia", "Well, I started a new sketchbook. I was so inspired!", "Bom, eu comecei um caderno de desenho novo. Fiquei tão inspirada!"]
      ],
      questions: [["Aonde a Bia foi no fim de semana?", ["Ao Museu do Brooklyn", "Ao cinema", "À praia"], 0], ["O que o Leo fez?", ["Ficou em casa vendo filmes", "Viajou", "Trabalhou"], 0]]
    },
    vocab: [["yesterday", "ontem", "IÉS-ter-dei"], ["last night", "ontem à noite", "lést NÁIT"], ["ago", "atrás (tempo)", "a-GÔU"], ["visit", "visitar", "VÍ-zit"], ["stay", "ficar", "STÊI"], ["travel", "viajar", "TRÉ-vel"], ["finish", "terminar", "FÍ-nix"], ["start", "começar", "STÁRT"], ["relax", "relaxar", "ri-LÉKS"], ["decide", "decidir", "di-SÁID"]],
    lesson: {
      why: "Agora você começa a contar o que já aconteceu. Primeiro, o passado do to be e dos verbos regulares, que são os mais fáceis.",
      parts: [
        ["Era, estava, foi: was e were", "Am e is viram WAS. Are vira WERE.", [["I was at home.", "Eu estava em casa."], ["They were tired.", "Eles estavam cansados."]]],
        ["Passado regular: é só colocar ED", "A maioria dos verbos vai para o passado com ED: work → worked, play → played, visit → visited.", [["I worked yesterday.", "Eu trabalhei ontem."], ["We visited my aunt.", "Nós visitamos minha tia."]]],
        ["Igual para todo mundo", "No passado não tem S nem nenhuma mudança: I worked, she worked, they worked.", [["She watched a movie.", "Ela viu um filme."], ["He played soccer.", "Ele jogou futebol."]]],
        ["Palavras que mostram passado", "yesterday (ontem) · last night (ontem à noite) · last week (semana passada) · two days ago (dois dias atrás).", [["I called her two days ago.", "Liguei para ela dois dias atrás."], ["It rained last night.", "Choveu ontem à noite."]]]
      ],
      mistakes: [["I was work yesterday.", "I worked yesterday.", "Para ações, use o verbo com ED. Was é só para ser e estar."], ["They was tired.", "They were tired.", "Com they, use were."], ["She studyed.", "She studied.", "Consoante + y vira IED."]],
      tip: "Pronúncia: o ED quase nunca vira sílaba. Worked soa 'UÂRKT', e não 'uórquedi'. Só vira 'id' depois de T ou D: wanted, needed."
    },
    sentences: [
      ["I [was|were|am] at home yesterday.", "Eu estava em casa ontem."], ["They [were|was|are] very tired last night.", "Eles estavam muito cansados ontem à noite."],
      ["We [visited|visit|visiting] my grandmother last weekend.", "Visitamos minha avó no último fim de semana."], ["She [studied|studyed|studies] all night.", "Ela estudou a noite toda."],
      ["I [finished|finish|finishing] the project two days ago.", "Terminei o projeto dois dias atrás."], ["[Were|Was|Did] you at the party?", "Você estava na festa?"],
      ["He [stopped|stoped|stops] working at 6.", "Ele parou de trabalhar às 6."], ["It [wasn't|weren't|didn't] cold yesterday.", "Não estava frio ontem."]
    ],
    mission: {
      goal: "Conte ao Leo como foi o seu fim de semana.",
      roleplay: "You are Leo on Monday morning. Ask the learner how her weekend was, where she was and what she did. Use was/were and regular past verbs.",
      writing: "Conte o que você fez no último fim de semana (5 a 7 frases no passado).",
      model: "Last weekend I visited my grandmother. We cooked lunch together. In the afternoon I watched a movie. It was very relaxing. On Sunday I stayed home and studied."
    }
  },
  {
    id: 10, level: "A2", title: "What did you do?", titlePt: "Passado irregular · did e didn't",
    goal: "Contar uma história e perguntar sobre o passado.",
    episode: {
      title: "A viagem para Boston", scene: "A Bia voltou de uma viagem de trabalho para Boston. O Sam quer saber tudo.",
      lines: [
        ["Sam", "So, how was Boston?", "E aí, como foi Boston?"],
        ["Bia", "Amazing! I went with Olivia for a client meeting.", "Incrível! Fui com a Olivia para uma reunião com um cliente."],
        ["Sam", "Did you see the old buildings?", "Você viu os prédios antigos?"],
        ["Bia", "Yes! I saw beautiful houses and I took a hundred photos.", "Vi! Vi casas lindas e tirei cem fotos."],
        ["Sam", "Did you eat lobster?", "Você comeu lagosta?"],
        ["Bia", "No, I didn't. I ate clam chowder. It was delicious.", "Não. Comi sopa de mariscos. Estava deliciosa."],
        ["Sam", "What did Olivia say about the meeting?", "O que a Olivia disse sobre a reunião?"],
        ["Bia", "She said 'perfect'! We got the project!", "Ela disse 'perfeito'! Conseguimos o projeto!"]
      ],
      questions: [["Com quem a Bia foi a Boston?", ["Com a Olivia", "Com o Sam", "Sozinha"], 0], ["Como terminou a reunião?", ["Conseguiram o projeto", "Perderam o cliente", "Foi cancelada"], 0]]
    },
    vocab: [["went", "foi (go)", "UÉNT"], ["saw", "viu (see)", "SÓ"], ["bought", "comprou (buy)", "BÓT"], ["ate", "comeu (eat)", "ÊIT"], ["had", "teve, tomou (have)", "RÉD"], ["made", "fez (make)", "MÊID"], ["took", "pegou, levou (take)", "TUK"], ["got", "conseguiu, recebeu (get)", "GÁT"], ["said", "disse (say)", "SÉD"], ["came", "veio (come)", "KÊIM"]],
    lesson: {
      why: "Alguns verbos muito usados não aceitam o ED: eles têm um passado próprio. E para perguntar e negar no passado, o inglês usa o ajudante DID.",
      parts: [
        ["Os irregulares mais usados", "Não tem regra: é decorar, mas são poucos e aparecem o tempo todo. go → went · have → had · see → saw · eat → ate · buy → bought · make → made · take → took · get → got · say → said · come → came.", [["I went to the beach.", "Eu fui à praia."], ["She bought a dress.", "Ela comprou um vestido."]]],
        ["Negar com didn't", "Coloque didn't antes do verbo. Atenção: o verbo volta para a forma normal, porque o did já mostra que é passado.", [["I didn't go.", "Eu não fui."], ["She didn't buy it.", "Ela não comprou."]]],
        ["Perguntar com did", "Did no começo + pessoa + verbo normal.", [["Did you see the movie?", "Você viu o filme?"], ["Did she call you?", "Ela te ligou?"]]],
        ["O quê, onde, quando no passado", "Palavra de pergunta + did + pessoa + verbo normal.", [["Where did you go?", "Aonde você foi?"], ["What did he say?", "O que ele disse?"]]]
      ],
      mistakes: [["I didn't went.", "I didn't go.", "Depois de didn't, o verbo volta ao normal."], ["Did you saw?", "Did you see?", "O did já é o passado; o verbo fica normal."], ["I goed.", "I went.", "Go é irregular: went."]],
      tip: "O DID é ciumento: quando ele aparece, ele fica com o passado só para ele, e o verbo volta ao normal."
    },
    sentences: [
      ["I [went|goed|go] to the beach last summer.", "Fui à praia no verão passado."], ["She [bought|buyed|buy] a new phone.", "Ela comprou um celular novo."],
      ["We [didn't see|didn't saw|not saw] the movie.", "Não vimos o filme."], ["[Did|Do|Was] you have lunch?", "Você almoçou?"],
      ["Where did you [go|went|going] on vacation?", "Para onde você foi nas férias?"], ["He [took|taked|take] the bus to work.", "Ele pegou o ônibus para o trabalho."],
      ["I [made|maked|make] a cake for my mom.", "Fiz um bolo para minha mãe."], ["What did she [say|said|says]?", "O que ela disse?"]
    ],
    mission: {
      goal: "Conte ao Sam uma viagem ou um dia especial da sua vida.",
      roleplay: "You are Sam. Ask the learner about a trip or a special day in her past: where she went, what she saw, ate and bought. Use did questions and react with interest.",
      writing: "Conte um dia marcante ou uma viagem da sua vida (6 a 8 frases, com verbos irregulares).",
      model: "Last year I went to Rio with my friends. We took a bus and arrived at night. We ate a lot and saw the beach. I bought a souvenir for my mom. It was amazing!"
    }
  },
  {
    id: 11, level: "A2", title: "How much is it?", titlePt: "Compras · some, any, much, many",
    goal: "Comprar coisas e perguntar preços e quantidades.",
    episode: {
      title: "No mercado", scene: "Bia e Sam fazem as compras da semana.",
      lines: [
        ["Bia", "We need some eggs and some cheese.", "Precisamos de ovos e de queijo."],
        ["Sam", "How many eggs?", "Quantos ovos?"],
        ["Bia", "A dozen. And we don't have any rice.", "Uma dúzia. E não temos arroz nenhum."],
        ["Sam", "How much rice do we need?", "De quanto arroz precisamos?"],
        ["Bia", "One bag is enough. How much is this cheese?", "Um pacote basta. Quanto custa este queijo?"],
        ["Sam", "Twelve dollars! That's expensive.", "Doze dólares! É caro."],
        ["Bia", "Let's take the cheap one. We don't have much money this month.", "Vamos levar o barato. Não temos muito dinheiro este mês."],
        ["Sam", "Good idea. Can I have a receipt, please?", "Boa ideia. Pode me dar a nota, por favor?"]
      ],
      questions: [["Quantos ovos eles compram?", ["Uma dúzia", "Seis", "Nenhum"], 0], ["Por que levam o queijo barato?", ["Não têm muito dinheiro", "Gostam mais dele", "O caro acabou"], 0]]
    },
    vocab: [["money", "dinheiro", "MÂ-ni"], ["bread", "pão", "BRÉD"], ["egg", "ovo", "ÉG"], ["cheese", "queijo", "TCHÍZ"], ["rice", "arroz", "RÁIS"], ["bottle", "garrafa", "BÁ-rol"], ["price", "preço", "PRÁIS"], ["cheap", "barato", "TCHÍP"], ["expensive", "caro", "iks-PÉN-siv"], ["receipt", "nota, recibo", "ri-SÍT"]],
    lesson: {
      why: "Para fazer compras e falar de quantidade, você precisa saber o que dá para contar e o que não dá. Parece estranho, mas é bem lógico.",
      parts: [
        ["Dá para contar nos dedos?", "Coisas que você conta uma por uma (1 ovo, 2 ovos) têm plural: eggs, apples. Coisas que não dá para contar (água, dinheiro, arroz, pão) não têm plural: water, money, rice, bread.", [["I need three eggs.", "Preciso de três ovos."], ["I need some rice.", "Preciso de arroz."]]],
        ["Some e any", "Some = um pouco, alguns, em frases normais. Any = nenhum ou algum, em negativas e perguntas.", [["I have some money.", "Tenho um pouco de dinheiro."], ["Do you have any questions?", "Vocês têm alguma pergunta?"]]],
        ["Quantos? Quanto?", "How many = quantos (coisas que se contam). How much = quanto (o que não se conta e preços).", [["How many people?", "Quantas pessoas?"], ["How much is it?", "Quanto custa?"]]],
        ["Muito: a lot of", "A lot of serve para tudo e é o mais usado na conversa.", [["She has a lot of friends.", "Ela tem muitos amigos."], ["We have a lot of time.", "Temos muito tempo."]]]
      ],
      mistakes: [["How many is it?", "How much is it?", "Preço sempre usa how much."], ["I need breads.", "I need some bread.", "Bread não tem plural."], ["I don't have some money.", "I don't have any money.", "Na negativa, use any."]],
      tip: "How MUCH → muito dinheiro (não dá para contar). How MANY → muitas coisas que dá para contar nos dedos."
    },
    sentences: [
      ["How [much|many|lot] is this jacket?", "Quanto custa esta jaqueta?"], ["How [many|much|lot] eggs do we need?", "Quantos ovos precisamos?"],
      ["There isn't [any|some|a] milk in the fridge.", "Não tem leite na geladeira."], ["I'd like [some|any|many] water, please.", "Eu gostaria de água, por favor."],
      ["Do you have [any|some|much] questions?", "Vocês têm alguma pergunta?"], ["She has [a lot of|many of|much of] friends.", "Ela tem muitos amigos."],
      ["We don't have [much|many|a] time.", "Não temos muito tempo."], ["Can I have the [receipt|price|money], please?", "Pode me dar a nota, por favor?"]
    ],
    mission: {
      goal: "Faça compras num mercado: pergunte preços e quantidades.",
      roleplay: "You are a cashier at a small grocery store in New York. The learner is shopping. Answer about prices and quantities, and ask how many or how much she wants.",
      writing: "Faça uma lista de compras e escreva um pequeno diálogo perguntando preços numa loja ou num mercado.",
      model: "Shopping list: some bread, six eggs, some cheese and rice. — Hi! How much is this cheese? — It's twenty dollars. — And how many eggs are there in a box? — Twelve. — OK, I'll take it."
    }
  },
  {
    id: 12, level: "A2", title: "Bigger and better", titlePt: "Comparar · mais, menos, o melhor",
    goal: "Comparar lugares, coisas e pessoas.",
    episode: {
      title: "Procurando apartamento", scene: "O contrato do apartamento está acabando. Bia e Sam comparam duas opções.",
      lines: [
        ["Sam", "Let's look at these two apartments.", "Vamos ver esses dois apartamentos."],
        ["Bia", "The one in Brooklyn is bigger than ours.", "O do Brooklyn é maior que o nosso."],
        ["Sam", "But the one in Queens is cheaper.", "Mas o do Queens é mais barato."],
        ["Bia", "Queens is farther from the studio.", "O Queens é mais longe do estúdio."],
        ["Sam", "True. And the Brooklyn kitchen is more modern.", "Verdade. E a cozinha do Brooklyn é mais moderna."],
        ["Bia", "It's the most beautiful kitchen in the city!", "É a cozinha mais bonita da cidade!"],
        ["Sam", "OK, the Brooklyn one is better. But it's the most expensive.", "Ok, o do Brooklyn é melhor. Mas é o mais caro."],
        ["Bia", "Better kitchen, better life!", "Cozinha melhor, vida melhor!"]
      ],
      questions: [["Qual apartamento é mais barato?", ["O do Queens", "O do Brooklyn", "Os dois custam igual"], 0], ["O que a Bia mais gosta no do Brooklyn?", ["A cozinha", "O preço", "A distância"], 0]]
    },
    vocab: [["tall", "alto", "TÓL"], ["short", "baixo, curto", "XÓRT"], ["big", "grande", "BÍG"], ["small", "pequeno", "SMÓL"], ["fast", "rápido", "FÉST"], ["slow", "lento", "SLÔU"], ["comfortable", "confortável", "KÂMF-ter-bol"], ["modern", "moderno", "MÁ-dern"], ["old", "velho, antigo", "ÔULD"], ["beautiful", "bonito", "BIÚ-ri-ful"]],
    lesson: {
      why: "Comparar é muito útil: mais barato, maior, o melhor. O inglês tem duas regras simples e poucos rebeldes.",
      parts: [
        ["Palavra curta: ER", "Adjetivos pequenos ganham ER para dizer 'mais': cheap → cheaper, big → bigger. 'Do que' é than.", [["The bus is cheaper than the taxi.", "O ônibus é mais barato que o táxi."], ["New York is bigger than Boston.", "Nova York é maior que Boston."]]],
        ["Palavra longa: MORE", "Adjetivos compridos não ganham ER. Coloque more antes: more expensive, more comfortable.", [["This hotel is more expensive.", "Este hotel é mais caro."], ["The sofa is more comfortable than the chair.", "O sofá é mais confortável que a cadeira."]]],
        ["O mais de todos", "Para 'o mais': the + EST (the cheapest) ou the most (the most beautiful).", [["It's the cheapest option.", "É a opção mais barata."], ["It's the most beautiful city.", "É a cidade mais bonita."]]],
        ["Os rebeldes", "good → better → the best (bom, melhor, o melhor). bad → worse → the worst (ruim, pior, o pior).", [["This pizza is better.", "Esta pizza é melhor."], ["It was the worst day.", "Foi o pior dia."]]]
      ],
      mistakes: [["more big", "bigger", "Palavra curta usa ER."], ["more good", "better", "Good é rebelde: better."], ["bigger that", "bigger than", "'Do que' é than."]],
      tip: "Conte as sílabas: 1 sílaba = ER. 3 ou mais = MORE."
    },
    sentences: [
      ["New York is [bigger|more big|biggest] than Boston.", "Nova York é maior que Boston."], ["This chair is [more comfortable|comfortabler|most comfortable] than that one.", "Esta cadeira é mais confortável que aquela."],
      ["It's the [best|better|goodest] pizza in town.", "É a melhor pizza da cidade."], ["My phone is [worse|badder|worst] than yours.", "Meu celular é pior que o seu."],
      ["She is taller [than|that|then] her brother.", "Ela é mais alta que o irmão."], ["This is the [most beautiful|beautifullest|more beautiful] building in the city.", "Este é o prédio mais bonito da cidade."],
      ["The train is [faster|more fast|fastest] than the bus.", "O trem é mais rápido que o ônibus."], ["I'm as tall [as|than|like] my mother.", "Sou tão alta quanto minha mãe."]
    ],
    mission: {
      goal: "Compare dois lugares com o Sam e escolha o melhor.",
      roleplay: "You are Sam comparing two apartments (or two cities) with the learner. Ask her opinion and compare size, price, location and style using comparatives and superlatives.",
      writing: "Compare duas cidades, dois lugares ou dois objetos que você conhece (use comparativos e superlativos).",
      model: "São Paulo is bigger than Santo André. Santo André is quieter and cheaper. São Paulo has the best restaurants, but the traffic is worse. For me, Santo André is more comfortable."
    }
  },
  {
    id: 13, level: "A2", title: "Plans for the summer", titlePt: "Planos · going to",
    goal: "Contar seus planos e intenções.",
    episode: {
      title: "Planos de férias", scene: "O verão está chegando. No café do estúdio, Leo e Bia falam das férias.",
      lines: [
        ["Leo", "Are you going to travel in the summer?", "Você vai viajar no verão?"],
        ["Bia", "Yes! I'm going to visit my family in Brazil.", "Vou! Vou visitar minha família no Brasil."],
        ["Leo", "Lovely. Are you going to stay long?", "Que bom. Vai ficar muito tempo?"],
        ["Bia", "Three weeks. I'm going to book the flight tonight.", "Três semanas. Vou reservar o voo hoje à noite."],
        ["Leo", "I'm going to go to Scotland with my sister.", "Eu vou para a Escócia com minha irmã."],
        ["Bia", "Scotland? It's going to be cold!", "Escócia? Vai fazer frio!"],
        ["Leo", "I know. I'm not going to pack shorts, don't worry.", "Eu sei. Não vou levar shorts, relaxa."],
        ["Bia", "Ha! Take a lot of photos for me.", "Haha! Tira muitas fotos para mim."]
      ],
      questions: [["Para onde a Bia vai nas férias?", ["Para o Brasil", "Para a Escócia", "Para Londres"], 0], ["Com quem o Leo vai viajar?", ["Com a irmã", "Com a Bia", "Sozinho"], 0]]
    },
    vocab: [["trip", "viagem", "TRÍP"], ["flight", "voo", "FLÁIT"], ["ticket", "passagem, ingresso", "TÍ-ket"], ["book", "reservar", "BUK"], ["pack", "fazer as malas", "PÉK"], ["abroad", "no exterior", "a-BRÓD"], ["passport", "passaporte", "PÉS-port"], ["luggage", "bagagem", "LÂ-guedj"], ["sightseeing", "passeio turístico", "SÁIT-sí-ing"], ["beach", "praia", "BÍÍTCH"]],
    lesson: {
      why: "Going to é o jeito mais comum de falar dos seus planos: o que você VAI fazer. É bem parecido com o português.",
      parts: [
        ["Vou fazer = I'm going to", "am/is/are + going to + verbo. Igualzinho ao 'eu vou viajar'.", [["I'm going to travel.", "Eu vou viajar."], ["She is going to study.", "Ela vai estudar."]]],
        ["Previsão com prova", "Também usamos quando dá para VER que algo vai acontecer.", [["Look at the clouds! It's going to rain.", "Olha as nuvens! Vai chover."], ["Be careful! You're going to fall.", "Cuidado! Você vai cair."]]],
        ["Negar e perguntar", "Negar: I'm not going to. Perguntar: Are you going to...?", [["I'm not going to buy it.", "Não vou comprar."], ["Are you going to come?", "Você vai vir?"]]],
        ["Gonna", "Na fala rápida, going to vira 'gonna'. Você vai ouvir muito em séries e músicas. Para escrever, use going to.", [["I'm gonna call you.", "Vou te ligar."], ["What are you gonna do?", "O que você vai fazer?"]]]
      ],
      mistakes: [["I going to travel.", "I'm going to travel.", "Não esqueça o am, is ou are."], ["She is going to studies.", "She is going to study.", "Depois de going to, o verbo fica normal."], ["I'm going travel.", "I'm going to travel.", "Não esqueça o to."]],
      tip: "Going to = plano já pensado antes. Se você já decidiu, use going to."
    },
    sentences: [
      ["I'm [going to|go to|going] travel abroad next year.", "Vou viajar para o exterior no ano que vem."], ["She [is going to|are going to|going to] book a hotel.", "Ela vai reservar um hotel."],
      ["Look at the sky! It's going to [rain|rains|raining].", "Olha o céu! Vai chover."], ["[Are|Is|Do] you going to visit your parents?", "Você vai visitar seus pais?"],
      ["We [aren't|isn't|don't] going to stay long.", "Não vamos ficar muito tempo."], ["What are you going to [do|doing|does] tonight?", "O que você vai fazer hoje à noite?"],
      ["They're going to [pack|packing|packed] tonight.", "Eles vão fazer as malas hoje à noite."], ["I'm not going to [take|takes|took] much luggage.", "Não vou levar muita bagagem."]
    ],
    mission: {
      goal: "Conte ao Leo seus planos para as próximas férias.",
      roleplay: "You are Leo. Ask the learner about her plans for the next vacation or next year: where, with whom and what she is going to do there.",
      writing: "Descreva seus planos para as próximas férias ou para o próximo ano (use going to).",
      model: "Next year I'm going to travel to Portugal. I'm going to visit Lisbon and Porto. I'm going to take a lot of photos. I'm not going to take much luggage."
    }
  },
  {
    id: 14, level: "A2", title: "I'll help you!", titlePt: "Will · decisões, promessas e ofertas",
    goal: "Oferecer ajuda, prometer e dar opiniões sobre o futuro.",
    episode: {
      title: "O dia da mudança", scene: "Dia da mudança para o apartamento novo. Tudo dá errado, e a Bia salva o dia.",
      lines: [
        ["Sam", "These boxes are so heavy!", "Essas caixas são tão pesadas!"],
        ["Bia", "Don't worry, I'll help you.", "Não se preocupe, eu te ajudo."],
        ["Sam", "Thanks. Oh no, I forgot the keys!", "Valeu. Ah não, esqueci as chaves!"],
        ["Bia", "I'll go back and get them.", "Eu volto e pego."],
        ["Sam", "You're the best. I'll buy pizza for us tonight.", "Você é demais. Vou comprar pizza para nós hoje."],
        ["Bia", "Deal! Do you think the new place will be noisy?", "Fechado! Você acha que o lugar novo vai ser barulhento?"],
        ["Sam", "Maybe a little. But I promise I won't play the drums at night.", "Talvez um pouco. Mas prometo que não vou tocar bateria à noite."],
        ["Bia", "You play the drums?!", "Você toca bateria?!"]
      ],
      questions: [["O que o Sam esqueceu?", ["As chaves", "A pizza", "As caixas"], 0], ["O que o Sam promete?", ["Não tocar bateria à noite", "Cozinhar todo dia", "Carregar todas as caixas"], 0]]
    },
    vocab: [["promise", "prometer", "PRÁ-mis"], ["forget", "esquecer", "for-GUÉT"], ["call", "ligar", "KÓL"], ["remember", "lembrar", "ri-MÉM-ber"], ["maybe", "talvez", "MÊI-bi"], ["probably", "provavelmente", "PRÁ-ba-bli"], ["future", "futuro", "FIÚ-tcher"], ["soon", "em breve", "SÚN"], ["later", "mais tarde", "LÊI-rer"], ["worry", "preocupar-se", "UÂ-ri"]],
    lesson: {
      why: "Will também fala do futuro, mas para decisões tomadas na hora, promessas, ofertas e opiniões sobre o que vai acontecer.",
      parts: [
        ["Decidi agora!", "Quando você decide no momento em que está falando, use will (I'll).", [["The phone is ringing. I'll answer it.", "O telefone está tocando. Eu atendo."], ["I'm hungry. I'll make a sandwich.", "Estou com fome. Vou fazer um sanduíche."]]],
        ["Prometer e oferecer", "Will soa como compromisso.", [["I'll help you.", "Eu te ajudo."], ["I promise I'll call you.", "Prometo que vou te ligar."]]],
        ["Achar algo sobre o futuro", "Com I think, maybe e probably usamos will.", [["I think it will rain.", "Acho que vai chover."], ["She'll probably be late.", "Ela provavelmente vai se atrasar."]]],
        ["Negar: won't", "Will not vira won't. Cuidado: não confunda com want (querer).", [["I won't forget.", "Não vou esquecer."], ["It won't be easy.", "Não vai ser fácil."]]]
      ],
      mistakes: [["I will to call you.", "I will call you.", "Depois de will, o verbo vem sem to."], ["She wills go.", "She will go.", "Will nunca muda."], ["I don't will go.", "I won't go.", "A negativa de will é won't."]],
      tip: "Going to = plano. Will = ideia que surgiu agora."
    },
    sentences: [
      ["It's cold. I [will|am|going] close the window.", "Está frio. Vou fechar a janela."], ["I promise I [won't|don't|willn't] be late.", "Prometo que não vou me atrasar."],
      ["I think it [will|is|does] rain tomorrow.", "Acho que vai chover amanhã."], ["[Will|Do|Are] you help me with this box?", "Você me ajuda com esta caixa?"],
      ["Don't worry, I'll [remember|remembers|to remember].", "Não se preocupe, vou lembrar."], ["She'll probably [call|calls|calling] you later.", "Ela provavelmente vai te ligar mais tarde."],
      ["Maybe we [will|are|do] travel together someday.", "Talvez a gente viaje junto algum dia."], ["I'll [have|having|has] the chicken, please.", "Vou querer o frango, por favor."]
    ],
    mission: {
      goal: "Ajude o Sam na mudança: ofereça ajuda e faça promessas.",
      roleplay: "You are Sam on moving day with the learner. Create small problems (heavy boxes, forgotten keys, no food) so she offers help and makes promises with will.",
      writing: "Escreva 5 previsões sobre como será sua vida daqui a 10 anos (use will e won't).",
      model: "In ten years I will live in a bigger house. I will have my own studio. I think I will speak English very well. I won't work on weekends! Maybe I will live abroad."
    }
  },
  {
    id: 15, level: "A2", title: "Have you ever...?", titlePt: "Experiências · present perfect",
    goal: "Contar e perguntar sobre experiências de vida.",
    episode: {
      title: "Jogo na festa", scene: "Festa no apartamento novo. A turma joga 'Have you ever...?' ('Você já...?').",
      lines: [
        ["Leo", "Let's play! Bia, have you ever been to Europe?", "Vamos jogar! Bia, você já foi à Europa?"],
        ["Bia", "No, I haven't. Have you ever been to Brazil?", "Não. Você já foi ao Brasil?"],
        ["Leo", "Yes, I have! I've been to Rio twice.", "Já! Fui ao Rio duas vezes."],
        ["Olivia", "Have you ever eaten feijoada, Leo?", "Você já comeu feijoada, Leo?"],
        ["Leo", "Never. But I've tried caipirinha!", "Nunca. Mas já experimentei caipirinha!"],
        ["Bia", "Olivia, have you ever met a famous architect?", "Olivia, você já conheceu um arquiteto famoso?"],
        ["Olivia", "Yes, I've met a few. They're normal people!", "Já conheci alguns. São pessoas normais!"],
        ["Bia", "Wow! I've never met anyone famous.", "Uau! Eu nunca conheci ninguém famoso."]
      ],
      questions: [["Quantas vezes o Leo foi ao Rio?", ["Duas", "Nenhuma", "Uma"], 0], ["O que o Leo nunca comeu?", ["Feijoada", "Sushi", "Hambúrguer"], 0]]
    },
    vocab: [["once", "uma vez", "UÂNS"], ["twice", "duas vezes", "TUÁIS"], ["been", "estado, ido (be)", "BIN"], ["seen", "visto (see)", "SÍN"], ["tried", "experimentado (try)", "TRÁID"], ["met", "conhecido (meet)", "MÉT"], ["eaten", "comido (eat)", "Í-ten"], ["won", "ganhado (win)", "UÂN"], ["lost", "perdido (lose)", "LÓST"], ["experience", "experiência", "iks-PÍ-ri-ens"]],
    lesson: {
      why: "O present perfect (have + verbo) fala das suas experiências, sem dizer quando aconteceram. Ele não existe igualzinho em português, então vá com calma: a ideia é 'já fiz alguma vez na vida'.",
      parts: [
        ["Já fiz alguma vez?", "have/has + a 3ª forma do verbo. Não importa QUANDO foi, importa que aconteceu.", [["I have been to Rio.", "Eu já fui ao Rio."], ["She has seen this movie.", "Ela já viu esse filme."]]],
        ["Ever e never", "Ever = alguma vez (em perguntas). Never = nunca.", [["Have you ever eaten sushi?", "Você já comeu sushi?"], ["I have never flown.", "Eu nunca andei de avião."]]],
        ["A 3ª forma do verbo", "Regulares: igual ao passado (visited, worked). Irregulares têm forma própria: be → been, see → seen, eat → eaten, do → done, write → written, meet → met.", [["Have you done your homework?", "Você já fez a lição?"], ["He has written a book.", "Ele já escreveu um livro."]]],
        ["Disse QUANDO? Então é passado", "Se você fala quando foi (yesterday, in 2020), volte para o passado simples.", [["I've been to Rio.", "Eu já fui ao Rio."], ["I went to Rio in 2020.", "Eu fui ao Rio em 2020."]]]
      ],
      mistakes: [["Have you ever went?", "Have you ever been?", "Depois de have, use a 3ª forma."], ["She have seen it.", "She has seen it.", "Com she, use has."], ["I have been to Rio last year.", "I went to Rio last year.", "Com 'ano passado', use o passado simples."]],
      tip: "Pergunte-se: importa QUANDO? Sim → passado (went). Não, só importa que aconteceu → have + 3ª forma."
    },
    sentences: [
      ["Have you ever [been|went|go] to Europe?", "Você já foi à Europa?"], ["I've never [eaten|ate|eat] sushi.", "Nunca comi sushi."],
      ["She [has|have|is] seen that movie twice.", "Ela já viu esse filme duas vezes."], ["[Have|Has|Did] they ever met a famous person?", "Eles já conheceram alguém famoso?"],
      ["We [have|has|are] visited Rio once.", "Já visitamos o Rio uma vez."], ["He has never [tried|try|tryed] Indian food.", "Ele nunca experimentou comida indiana."],
      ["Have you [done|did|do] your homework?", "Você já fez a lição de casa?"], ["She has [written|wrote|writed] three books.", "Ela já escreveu três livros."]
    ],
    mission: {
      goal: "Jogue 'Have you ever...?' com um amigo.",
      roleplay: "You are a friend at a party playing 'Have you ever...?'. Ask the learner about life experiences and share yours. Use present perfect with ever and never, and ask a follow-up question in the past when she says yes.",
      writing: "Escreva sobre 3 experiências que você já teve e 3 que nunca teve (use ever e never).",
      model: "I have been to Rio twice. I have eaten sushi and I loved it. I have met a famous singer. I have never flown abroad. I have never climbed a mountain. I have never seen snow."
    }
  },
  {
    id: 16, level: "A2", title: "You should rest", titlePt: "Conselhos e obrigações · should, have to",
    goal: "Dar conselhos e falar do que você precisa fazer.",
    episode: {
      title: "A Bia ficou doente", scene: "A Bia acorda passando mal. O Sam vira enfermeiro.",
      lines: [
        ["Bia", "I feel terrible. I have a headache and a fever.", "Estou péssima. Estou com dor de cabeça e febre."],
        ["Sam", "You should stay in bed today.", "Você deveria ficar na cama hoje."],
        ["Bia", "But I have to finish a project!", "Mas tenho que terminar um projeto!"],
        ["Sam", "You don't have to finish it today. Call Olivia.", "Você não precisa terminar hoje. Liga para a Olivia."],
        ["Bia", "You're right. Should I see a doctor?", "Você tem razão. Devo ir ao médico?"],
        ["Sam", "Yes. And you mustn't drink coffee with that medicine.", "Sim. E você não pode tomar café com esse remédio."],
        ["Bia", "No coffee?! That's the worst part.", "Sem café?! Essa é a pior parte."],
        ["Sam", "Drink tea. I'll make some for you.", "Toma chá. Eu faço um para você."]
      ],
      questions: [["O que a Bia tem?", ["Dor de cabeça e febre", "Dor nas costas", "Nada"], 0], ["O que ela não pode tomar com o remédio?", ["Café", "Chá", "Água"], 0]]
    },
    vocab: [["headache", "dor de cabeça", "RÉD-êik"], ["fever", "febre", "FÍ-ver"], ["cold", "resfriado", "KÔULD"], ["rest", "descansar", "RÉST"], ["medicine", "remédio", "MÉ-di-sin"], ["doctor", "médico", "DÁK-ter"], ["appointment", "consulta, horário marcado", "a-PÓINT-ment"], ["healthy", "saudável", "RÉL-thi"], ["exercise", "exercício", "ÉK-ser-sáiz"], ["advice", "conselho", "ad-VÁIS"]],
    lesson: {
      why: "Aqui você aprende a dar conselhos (deveria) e falar de obrigações (tenho que, não preciso, é proibido).",
      parts: [
        ["Conselho: should", "Should = deveria. É o jeito gentil de aconselhar.", [["You should rest.", "Você deveria descansar."], ["You shouldn't drink so much coffee.", "Você não deveria tomar tanto café."]]],
        ["Obrigação: have to", "Have to = tenho que (regra que vem de fora: trabalho, escola, lei). Com he e she: has to.", [["I have to work on Saturday.", "Tenho que trabalhar no sábado."], ["She has to wear a uniform.", "Ela tem que usar uniforme."]]],
        ["Não precisa: don't have to", "Don't have to = não precisa. Você pode, mas não é obrigado.", [["You don't have to come.", "Você não precisa vir."], ["We don't have to pay.", "Não precisamos pagar."]]],
        ["Proibido: mustn't", "Must = obrigação forte. Mustn't = é proibido. Cuidado: mustn't NÃO significa 'não precisa'.", [["You must wear a seatbelt.", "Você tem que usar cinto."], ["You mustn't smoke here.", "É proibido fumar aqui."]]]
      ],
      mistakes: [["You should to rest.", "You should rest.", "Depois de should, o verbo vem sem to."], ["She have to work.", "She has to work.", "Com she, use has to."], ["You mustn't come. (querendo dizer 'não precisa vir')", "You don't have to come.", "Mustn't é proibido. Não precisa é don't have to."]],
      tip: "Should = conselho de amiga. Have to = regra do chefe. Mustn't = placa de proibido."
    },
    sentences: [
      ["You [should|should to|shoulds] see a doctor.", "Você deveria ir ao médico."], ["I [have to|has to|must to] work on Saturday.", "Tenho que trabalhar no sábado."],
      ["She has a fever. She [should|shouldn't|have] stay in bed.", "Ela está com febre. Deveria ficar na cama."], ["You [mustn't|don't have to|haven't] smoke in the hospital.", "É proibido fumar no hospital."],
      ["Tomorrow is Sunday, so I [don't have to|mustn't|haven't to] wake up early.", "Amanhã é domingo, então não preciso acordar cedo."], ["What [should|must to|shoulds] I do?", "O que eu deveria fazer?"],
      ["He [has to|have to|must to] wear a uniform.", "Ele tem que usar uniforme."], ["You should [drink|to drink|drinks] more water.", "Você deveria beber mais água."]
    ],
    mission: {
      goal: "Conte um problema seu e peça conselhos (ou aconselhe um amigo).",
      roleplay: "You are a caring friend. The learner tells you about a problem (health, stress, studies, work). Give advice with should, and talk about obligations with have to and don't have to. Ask her for advice about a small problem of yours too.",
      writing: "Uma amiga está muito estressada com a faculdade. Escreva conselhos para ela (use should, have to e don't have to).",
      model: "You should rest more and sleep well. You have to finish your project, but you don't have to do everything today. You should talk to your teacher. You shouldn't drink so much coffee!"
    }
  }
];

if (typeof module !== "undefined") module.exports = { UNITS_A2 };
