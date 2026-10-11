// Conteúdo do curso Bubi English (A1 → B1).
//
// Cada unidade tem:
//   grammar: [regra em português, exemplo em inglês]
//   vocab:   [inglês, português]
//   sentences: frase com a lacuna entre colchetes, a resposta certa primeiro:
//              "I [am|is|are] from Brazil."  →  resposta "am"
//   writing: proposta de texto (corrigida pela IA)
// Os exercícios (múltipla escolha, lacuna, ordem das palavras, ditado e
// tradução) são gerados automaticamente a partir desses dados.

const LEVELS = {
  A1: { name: "A1 · Iniciante", color: "mint", note: "Base da língua: verbo to be, presente, rotina e perguntas simples." },
  A2: { name: "A2 · Básico", color: "peach", note: "Passado, futuro, comparações e conversas do dia a dia." },
  B1: { name: "B1 · Intermediário", color: "lilac", note: "Tempos verbais combinados, condicionais, voz passiva e mais fluência." }
};

const UNITS = [
  // ---------------- A1 ----------------
  {
    id: 1, level: "A1", title: "Hello! Nice to meet you", titlePt: "Apresentações e verbo to be",
    goal: "Se apresentar, dizer de onde é e como está.",
    grammar: [
      ["O verbo to be significa ser e estar ao mesmo tempo.", "I am Laís. I am tired."],
      ["I am · you are · he/she/it is · we/they are.", "She is a designer. We are friends."],
      ["Na fala usamos contrações: I'm, you're, he's, she's, it's, we're, they're.", "I'm from Brazil."],
      ["Negativa: acrescente not. Pergunta: coloque o verbo antes do sujeito.", "She isn't here. Are you OK?"]
    ],
    vocab: [["hello", "olá"], ["goodbye", "tchau"], ["name", "nome"], ["friend", "amigo, amiga"], ["country", "país"], ["city", "cidade"], ["student", "estudante"], ["teacher", "professor, professora"], ["happy", "feliz"], ["tired", "cansado, cansada"]],
    sentences: [
      ["I [am|is|are] from Brazil.", "Eu sou do Brasil."],
      ["She [is|am|are] my friend.", "Ela é minha amiga."],
      ["We [are|is|am] students.", "Nós somos estudantes."],
      ["[Are|Is|Am] you tired?", "Você está cansado?"],
      ["He [isn't|aren't|am not] a teacher.", "Ele não é professor."],
      ["My name [is|are|am] Laís.", "Meu nome é Laís."],
      ["They [are|is|am] in São Paulo.", "Eles estão em São Paulo."],
      ["It [is|are|am] a big city.", "É uma cidade grande."]
    ],
    writing: "Apresente-se em 3 a 5 frases: seu nome, de onde você é, o que você faz e como está hoje."
  },
  {
    id: 2, level: "A1", title: "This is my family", titlePt: "Família, possessivos e this/that",
    goal: "Falar sobre a família e dizer de quem é cada coisa.",
    grammar: [
      ["Possessivos vêm antes do substantivo e não mudam no plural: my, your, his, her, its, our, their.", "This is my sister. These are my sisters."],
      ["His = dele, her = dela. O possessivo concorda com o dono, não com a coisa.", "Paulo and his mother."],
      ["This/these = isto, estes (perto). That/those = aquilo, aqueles (longe).", "This is my phone. Those are my keys."],
      ["O 's mostra posse: my mother's house = a casa da minha mãe.", "It's Ana's car."]
    ],
    vocab: [["mother", "mãe"], ["father", "pai"], ["sister", "irmã"], ["brother", "irmão"], ["son", "filho"], ["daughter", "filha"], ["husband", "marido"], ["wife", "esposa"], ["parents", "pais (pai e mãe)"], ["cousin", "primo, prima"]],
    sentences: [
      ["This is [my|me|I] mother.", "Esta é minha mãe."],
      ["Ana and [her|his|she] husband live in Santo André.", "Ana e o marido dela moram em Santo André."],
      ["Pedro is my cousin. [His|Her|He] dog is small.", "Pedro é meu primo. O cachorro dele é pequeno."],
      ["[These|This|That] are my parents.", "Estes são meus pais."],
      ["Is [that|those|these] your car?", "Aquele é o seu carro?"],
      ["It's my [sister's|sisters|sister] phone.", "É o celular da minha irmã."],
      ["[Our|We|Us] house is small.", "Nossa casa é pequena."],
      ["They love [their|there|they] children.", "Eles amam os filhos deles."]
    ],
    writing: "Descreva sua família em 4 a 6 frases: quem são, como se chamam e uma característica de cada um."
  },
  {
    id: 3, level: "A1", title: "What time is it?", titlePt: "Horas, dias e in/on/at",
    goal: "Dizer horários, dias da semana e quando as coisas acontecem.",
    grammar: [
      ["Horas: It's seven o'clock (7h). It's half past seven (7h30). It's quarter to eight (7h45).", "It's half past six."],
      ["AT para horas e momentos: at 9 o'clock, at night, at noon.", "The class is at 7."],
      ["ON para dias e datas: on Monday, on May 5th.", "I work on Saturdays."],
      ["IN para meses, anos e partes do dia: in May, in 2026, in the morning.", "I study in the evening."]
    ],
    vocab: [["Monday", "segunda-feira"], ["Wednesday", "quarta-feira"], ["weekend", "fim de semana"], ["morning", "manhã"], ["afternoon", "tarde"], ["evening", "noite (início)"], ["today", "hoje"], ["tomorrow", "amanhã"], ["early", "cedo"], ["late", "tarde, atrasado"]],
    sentences: [
      ["The meeting is [at|on|in] 10 o'clock.", "A reunião é às 10 horas."],
      ["I go to the gym [on|in|at] Mondays.", "Eu vou à academia às segundas."],
      ["My birthday is [in|on|at] March.", "Meu aniversário é em março."],
      ["I study English [in|on|at] the morning.", "Eu estudo inglês de manhã."],
      ["It's half [past|to|after] six.", "São seis e meia."],
      ["I'm always [late|early|tomorrow] for class. Sorry!", "Estou sempre atrasada para a aula. Desculpa!"],
      ["What time [is|are|do] it?", "Que horas são?"],
      ["The store opens [at|in|on] 9 a.m.", "A loja abre às 9 da manhã."]
    ],
    writing: "Escreva sobre a sua semana: o que você faz em alguns dias e em quais horários (use at, on e in)."
  },
  {
    id: 4, level: "A1", title: "My daily routine", titlePt: "Rotina e presente simples",
    goal: "Descrever sua rotina e hábitos.",
    grammar: [
      ["Present simple fala de rotina e de verdades: I work, you work, we work.", "I work from home."],
      ["Com he/she/it, acrescente -s: she works, he lives, it rains.", "She lives in Rio."],
      ["Verbos em -o, -ch, -sh, -ss, -x ganham -es. Consoante + y vira -ies. Have vira has.", "He goes. She watches. He studies. She has a cat."],
      ["Advérbios de frequência vêm antes do verbo: always, usually, often, sometimes, never.", "I usually wake up at 7."]
    ],
    vocab: [["wake up", "acordar"], ["get up", "levantar-se"], ["have breakfast", "tomar café da manhã"], ["go to work", "ir trabalhar"], ["take a shower", "tomar banho"], ["cook", "cozinhar"], ["watch TV", "assistir TV"], ["go to bed", "ir dormir"], ["always", "sempre"], ["never", "nunca"]],
    sentences: [
      ["She [works|work|working] from home.", "Ela trabalha de casa."],
      ["I [wake|wakes|waking] up at 7.", "Eu acordo às 7."],
      ["He [watches|watchs|watch] TV at night.", "Ele assiste TV à noite."],
      ["My brother [studies|studys|study] architecture.", "Meu irmão estuda arquitetura."],
      ["We [have|has|haves] lunch at noon.", "Nós almoçamos ao meio-dia."],
      ["Laís [goes|gos|go] to university in the evening.", "Laís vai para a faculdade à noite."],
      ["I [usually|usual|use] take a shower in the morning.", "Eu geralmente tomo banho de manhã."],
      ["It [rains|rain|raining] a lot in São Paulo.", "Chove muito em São Paulo."]
    ],
    writing: "Descreva sua rotina num dia normal, da hora em que acorda até a hora em que dorme (5 a 8 frases)."
  },
  {
    id: 5, level: "A1", title: "Do you like coffee?", titlePt: "Perguntas e negativas no presente",
    goal: "Fazer perguntas e dizer do que gosta e não gosta.",
    grammar: [
      ["Negativa: don't (I/you/we/they) e doesn't (he/she/it) + verbo sem -s.", "I don't like tea. She doesn't eat meat."],
      ["Pergunta: Do/Does + sujeito + verbo.", "Do you like coffee? Does he work here?"],
      ["Respostas curtas repetem o auxiliar.", "Yes, I do. No, she doesn't."],
      ["Perguntas com palavras wh-: What, Where, When, Why, How.", "What do you do? Where does she live?"]
    ],
    vocab: [["like", "gostar"], ["love", "amar"], ["hate", "odiar"], ["prefer", "preferir"], ["coffee", "café"], ["tea", "chá"], ["meat", "carne"], ["vegetables", "legumes, verduras"], ["sweet", "doce"], ["spicy", "apimentado"]],
    sentences: [
      ["I [don't|doesn't|not] like spicy food.", "Eu não gosto de comida apimentada."],
      ["[Do|Does|Are] you drink coffee?", "Você toma café?"],
      ["She [doesn't|don't|isn't] eat meat.", "Ela não come carne."],
      ["[Does|Do|Is] he live in Brazil?", "Ele mora no Brasil?"],
      ["What [do|does|are] you do?", "O que você faz?"],
      ["Where does she [work|works|working]?", "Onde ela trabalha?"],
      ["Yes, I [do|does|am].", "Sim, eu gosto."],
      ["They [don't|doesn't|aren't] like tea.", "Eles não gostam de chá."]
    ],
    writing: "Escreva do que você gosta e do que não gosta de comer e beber. Faça também 2 perguntas para um amigo."
  },
  {
    id: 6, level: "A1", title: "Around town", titlePt: "There is/are e preposições de lugar",
    goal: "Descrever lugares e dizer onde as coisas estão.",
    grammar: [
      ["There is (singular) e there are (plural) significam 'há' ou 'tem' (existir).", "There is a bank near here. There are two parks."],
      ["Negativa e pergunta: there isn't, there aren't, is there...?, are there...?", "Is there a pharmacy near here?"],
      ["Preposições de lugar: in, on, under, next to, between, in front of, behind.", "The cat is under the table."],
      ["Não use have para 'tem' no sentido de existir.", "There is a café here. (não: Have a café here)"]
    ],
    vocab: [["bank", "banco"], ["pharmacy", "farmácia"], ["supermarket", "supermercado"], ["street", "rua"], ["park", "parque"], ["near", "perto"], ["far", "longe"], ["next to", "ao lado de"], ["between", "entre"], ["behind", "atrás de"]],
    sentences: [
      ["There [is|are|have] a pharmacy on this street.", "Tem uma farmácia nesta rua."],
      ["There [are|is|has] three bedrooms in my apartment.", "Há três quartos no meu apartamento."],
      ["[Is|Are|Have] there a supermarket near here?", "Tem um supermercado aqui perto?"],
      ["The bank is [next|near|between] to the park.", "O banco fica ao lado do parque."],
      ["The cat is [under|between|next] the table.", "O gato está embaixo da mesa."],
      ["There [aren't|isn't|don't] any parks in my neighborhood.", "Não há parques no meu bairro."],
      ["My house is [between|next|behind] the school and the church.", "Minha casa fica entre a escola e a igreja."],
      ["The car is [in front of|in front|front of] the building.", "O carro está na frente do prédio."]
    ],
    writing: "Descreva seu bairro ou sua casa usando there is, there are e preposições de lugar."
  },
  {
    id: 7, level: "A1", title: "I can do it", titlePt: "Can, can't e could",
    goal: "Falar de habilidades, pedir ajuda e permissão.",
    grammar: [
      ["Can = poder ou saber fazer. Não muda com he/she e o verbo vem sem to.", "She can draw. (não: She cans / can to draw)"],
      ["Negativa: can't (cannot). Pergunta: Can you...?", "I can't swim. Can you help me?"],
      ["Can também serve para pedir e dar permissão.", "Can I open the window?"],
      ["Could é a forma mais educada de pedir.", "Could you help me, please?"]
    ],
    vocab: [["swim", "nadar"], ["drive", "dirigir"], ["draw", "desenhar"], ["sing", "cantar"], ["dance", "dançar"], ["speak", "falar (um idioma)"], ["ride a bike", "andar de bicicleta"], ["play the guitar", "tocar violão"], ["help", "ajudar"], ["borrow", "pegar emprestado"]],
    sentences: [
      ["I [can|cans|can to] speak a little English.", "Eu sei falar um pouco de inglês."],
      ["She can [draw|draws|to draw] very well.", "Ela desenha muito bem."],
      ["I [can't|don't can|not can] drive.", "Eu não sei dirigir."],
      ["[Can|Do|Are] you help me, please?", "Você pode me ajudar, por favor?"],
      ["[Can|Does|Is] he play the guitar?", "Ele sabe tocar violão?"],
      ["Could I [borrow|borrows|to borrow] your pen?", "Posso pegar sua caneta emprestada?"],
      ["We can't [swim|swimming|swims] here.", "Não podemos nadar aqui."],
      ["My mother can [sing|sings|singing] beautifully.", "Minha mãe canta lindamente."]
    ],
    writing: "Escreva 3 coisas que você sabe fazer, 3 que não sabe e 1 coisa que você gostaria de aprender."
  },
  {
    id: 8, level: "A1", title: "What are you doing?", titlePt: "Presente contínuo",
    goal: "Falar do que está acontecendo agora.",
    grammar: [
      ["Present continuous = ação acontecendo agora: am/is/are + verbo com -ing.", "I'm studying now."],
      ["Regras do -ing: write → writing, sit → sitting, study → studying.", "He is writing an email."],
      ["Compare rotina e agora: I work every day × I'm working now.", "She usually walks, but today she's driving."],
      ["Também serve para compromissos já marcados.", "I'm meeting Ana tomorrow."]
    ],
    vocab: [["now", "agora"], ["at the moment", "no momento"], ["wear", "vestir, usar (roupa)"], ["rain", "chover"], ["wait", "esperar"], ["listen", "escutar"], ["look for", "procurar"], ["jacket", "jaqueta"], ["umbrella", "guarda-chuva"], ["sunny", "ensolarado"]],
    sentences: [
      ["I [am studying|study|studying] English right now.", "Estou estudando inglês agora."],
      ["It's [raining|rains|rain] outside.", "Está chovendo lá fora."],
      ["She [is wearing|wears|wearing] a blue jacket today.", "Ela está usando uma jaqueta azul hoje."],
      ["What [are|is|do] you doing?", "O que você está fazendo?"],
      ["They [aren't|isn't|don't] listening to me.", "Eles não estão me escutando."],
      ["He [is writing|is writeing|writes] an email at the moment.", "Ele está escrevendo um e-mail no momento."],
      ["[Are|Is|Do] you waiting for the bus?", "Você está esperando o ônibus?"],
      ["I [am going|go|going] to the dentist tomorrow at 3.", "Vou ao dentista amanhã às 3."]
    ],
    writing: "Olhe ao seu redor e descreva o que está acontecendo agora: o que você e outras pessoas estão fazendo (5 frases)."
  },

  // ---------------- A2 ----------------
  {
    id: 9, level: "A2", title: "Last weekend", titlePt: "Was/were e passado regular",
    goal: "Contar o que você fez e onde estava.",
    grammar: [
      ["Passado do to be: I/he/she/it was · you/we/they were.", "I was at home. They were tired."],
      ["Verbos regulares ganham -ed: work → worked, study → studied, stop → stopped.", "We visited my grandmother."],
      ["O passado é igual para todas as pessoas.", "I worked. She worked. They worked."],
      ["Marcadores de passado: yesterday, last night, last week, two days ago.", "I finished it two days ago."]
    ],
    vocab: [["yesterday", "ontem"], ["last night", "ontem à noite"], ["ago", "atrás (tempo)"], ["visit", "visitar"], ["stay", "ficar"], ["travel", "viajar"], ["finish", "terminar"], ["start", "começar"], ["relax", "relaxar"], ["decide", "decidir"]],
    sentences: [
      ["I [was|were|am] at home yesterday.", "Eu estava em casa ontem."],
      ["They [were|was|are] very tired last night.", "Eles estavam muito cansados ontem à noite."],
      ["We [visited|visit|visiting] my grandmother last weekend.", "Visitamos minha avó no último fim de semana."],
      ["She [studied|studyed|studies] all night.", "Ela estudou a noite toda."],
      ["I [finished|finish|finishing] the project two days ago.", "Terminei o projeto há dois dias."],
      ["[Were|Was|Did] you at the party?", "Você estava na festa?"],
      ["He [stopped|stoped|stops] working at 6.", "Ele parou de trabalhar às 6."],
      ["It [wasn't|weren't|didn't] cold yesterday.", "Não estava frio ontem."]
    ],
    writing: "Conte o que você fez no último fim de semana (5 a 7 frases no passado)."
  },
  {
    id: 10, level: "A2", title: "What did you do?", titlePt: "Passado irregular e did",
    goal: "Contar histórias e perguntar sobre o passado.",
    grammar: [
      ["Muitos verbos comuns são irregulares: go → went, have → had, see → saw, eat → ate, buy → bought, make → made, take → took.", "I went to the beach."],
      ["Negativa: didn't + verbo na forma base.", "I didn't go. (não: I didn't went)"],
      ["Pergunta: Did + sujeito + verbo na forma base.", "Did you see the movie?"],
      ["Wh- no passado: Where did you go? What did she say?", "What did you buy?"]
    ],
    vocab: [["went", "foi (go)"], ["saw", "viu (see)"], ["bought", "comprou (buy)"], ["ate", "comeu (eat)"], ["had", "teve, tomou (have)"], ["made", "fez (make)"], ["took", "pegou, levou (take)"], ["got", "conseguiu, recebeu (get)"], ["said", "disse (say)"], ["came", "veio (come)"]],
    sentences: [
      ["I [went|goed|go] to the beach last summer.", "Fui à praia no verão passado."],
      ["She [bought|buyed|buy] a new phone.", "Ela comprou um celular novo."],
      ["We [didn't see|didn't saw|not saw] the movie.", "Não vimos o filme."],
      ["[Did|Do|Was] you have lunch?", "Você almoçou?"],
      ["Where did you [go|went|going] on vacation?", "Para onde você foi nas férias?"],
      ["He [took|taked|take] the bus to work.", "Ele pegou o ônibus para o trabalho."],
      ["I [made|maked|make] a cake for my mom.", "Fiz um bolo para minha mãe."],
      ["What did she [say|said|says]?", "O que ela disse?"]
    ],
    writing: "Conte um dia marcante ou uma viagem da sua vida (6 a 8 frases, com verbos irregulares)."
  },
  {
    id: 11, level: "A2", title: "How much is it?", titlePt: "Some/any, much/many e compras",
    goal: "Fazer compras, perguntar preços e quantidades.",
    grammar: [
      ["Contáveis têm plural (apple → apples). Incontáveis não: water, money, bread, information.", "I need some bread and two apples."],
      ["Some em frases afirmativas; any em negativas e perguntas.", "I have some money. Do you have any questions?"],
      ["How many + contáveis; how much + incontáveis e preços.", "How many eggs? How much water? How much is it?"],
      ["A lot of serve para os dois tipos.", "a lot of friends, a lot of time"]
    ],
    vocab: [["money", "dinheiro"], ["bread", "pão"], ["egg", "ovo"], ["cheese", "queijo"], ["rice", "arroz"], ["bottle", "garrafa"], ["price", "preço"], ["cheap", "barato"], ["expensive", "caro"], ["receipt", "recibo, nota"]],
    sentences: [
      ["How [much|many|lot] is this jacket?", "Quanto custa esta jaqueta?"],
      ["How [many|much|lot] eggs do we need?", "Quantos ovos precisamos?"],
      ["There isn't [any|some|a] milk in the fridge.", "Não tem leite na geladeira."],
      ["I'd like [some|any|many] water, please.", "Eu gostaria de água, por favor."],
      ["Do you have [any|some|much] questions?", "Vocês têm alguma pergunta?"],
      ["She has [a lot of|many of|much of] friends.", "Ela tem muitos amigos."],
      ["We don't have [much|many|a] time.", "Não temos muito tempo."],
      ["Can I have the [receipt|price|money], please?", "Pode me dar a nota, por favor?"]
    ],
    writing: "Faça uma lista de compras e escreva um pequeno diálogo perguntando preços numa loja ou num mercado."
  },
  {
    id: 12, level: "A2", title: "Bigger and better", titlePt: "Comparativos e superlativos",
    goal: "Comparar pessoas, lugares e coisas.",
    grammar: [
      ["Adjetivos curtos: + er e the + est.", "cheap → cheaper → the cheapest"],
      ["Adjetivos longos: more e the most.", "expensive → more expensive → the most expensive"],
      ["Irregulares: good → better → the best; bad → worse → the worst.", "It's the best pizza in town."],
      ["Use than para comparar e as ... as para igualdade.", "Rio is hotter than Curitiba. She is as tall as me."]
    ],
    vocab: [["tall", "alto"], ["short", "baixo, curto"], ["big", "grande"], ["small", "pequeno"], ["fast", "rápido"], ["slow", "lento"], ["comfortable", "confortável"], ["modern", "moderno"], ["old", "velho, antigo"], ["beautiful", "bonito"]],
    sentences: [
      ["São Paulo is [bigger|more big|biggest] than Santo André.", "São Paulo é maior que Santo André."],
      ["This chair is [more comfortable|comfortabler|most comfortable] than that one.", "Esta cadeira é mais confortável que aquela."],
      ["It's the [best|better|goodest] pizza in town.", "É a melhor pizza da cidade."],
      ["My phone is [worse|badder|worst] than yours.", "Meu celular é pior que o seu."],
      ["She is taller [than|that|then] her brother.", "Ela é mais alta que o irmão."],
      ["This is the [most beautiful|beautifullest|more beautiful] building in the city.", "Este é o prédio mais bonito da cidade."],
      ["The train is [faster|more fast|fastest] than the bus.", "O trem é mais rápido que o ônibus."],
      ["I'm as tall [as|than|like] my mother.", "Sou tão alta quanto minha mãe."]
    ],
    writing: "Compare duas cidades, dois lugares ou dois objetos que você conhece (use comparativos e superlativos)."
  },
  {
    id: 13, level: "A2", title: "Plans for the future", titlePt: "Going to",
    goal: "Falar de planos e intenções.",
    grammar: [
      ["Going to = planos e intenções: am/is/are + going to + verbo.", "I'm going to travel in July."],
      ["Também para previsões com evidência.", "Look at the clouds! It's going to rain."],
      ["Negativa e pergunta: I'm not going to... / Are you going to...?", "Are you going to come?"],
      ["Na fala, going to costuma soar como 'gonna'.", "I'm gonna call her."]
    ],
    vocab: [["trip", "viagem"], ["flight", "voo"], ["ticket", "passagem, ingresso"], ["book", "reservar"], ["pack", "fazer as malas"], ["abroad", "no exterior"], ["passport", "passaporte"], ["luggage", "bagagem"], ["sightseeing", "passeio turístico"], ["beach", "praia"]],
    sentences: [
      ["I'm [going to|go to|going] travel abroad next year.", "Vou viajar para o exterior no ano que vem."],
      ["She [is going to|are going to|going to] book a hotel.", "Ela vai reservar um hotel."],
      ["Look at the sky! It's going to [rain|rains|raining].", "Olha o céu! Vai chover."],
      ["[Are|Is|Do] you going to visit your parents?", "Você vai visitar seus pais?"],
      ["We [aren't|isn't|don't] going to stay long.", "Não vamos ficar muito tempo."],
      ["What are you going to [do|doing|does] tonight?", "O que você vai fazer hoje à noite?"],
      ["They're going to [pack|packing|packed] tonight.", "Eles vão fazer as malas hoje à noite."],
      ["I'm not going to [take|takes|took] much luggage.", "Não vou levar muita bagagem."]
    ],
    writing: "Descreva seus planos para as próximas férias ou para o próximo ano (use going to)."
  },
  {
    id: 14, level: "A2", title: "I'll help you", titlePt: "Will e decisões na hora",
    goal: "Fazer promessas, ofertas e previsões.",
    grammar: [
      ["Will = decisões na hora, promessas e ofertas.", "I'll help you! I'll call you later."],
      ["Também para previsões e opiniões sobre o futuro.", "I think it will be hot tomorrow."],
      ["Negativa: won't (will not).", "Don't worry, I won't forget."],
      ["Going to é plano já decidido; will é decisão do momento.", "I'm going to study tonight. / Oh, the phone! I'll answer it."]
    ],
    vocab: [["promise", "prometer"], ["forget", "esquecer"], ["call", "ligar"], ["remember", "lembrar"], ["maybe", "talvez"], ["probably", "provavelmente"], ["future", "futuro"], ["soon", "em breve"], ["later", "mais tarde"], ["worry", "preocupar-se"]],
    sentences: [
      ["It's cold. I [will|am|going] close the window.", "Está frio. Vou fechar a janela."],
      ["I promise I [won't|don't|willn't] be late.", "Prometo que não vou me atrasar."],
      ["I think it [will|is|does] rain tomorrow.", "Acho que vai chover amanhã."],
      ["[Will|Do|Are] you help me with this box?", "Você me ajuda com esta caixa?"],
      ["Don't worry, I'll [remember|remembers|to remember].", "Não se preocupe, vou lembrar."],
      ["She'll probably [call|calls|calling] you later.", "Ela provavelmente vai te ligar mais tarde."],
      ["Maybe we [will|are|do] travel together someday.", "Talvez a gente viaje junto algum dia."],
      ["I'll [have|having|has] the chicken, please.", "Vou querer o frango, por favor."]
    ],
    writing: "Escreva 5 previsões sobre como será sua vida daqui a 10 anos (use will e won't)."
  },
  {
    id: 15, level: "A2", title: "Have you ever...?", titlePt: "Present perfect para experiências",
    goal: "Falar de experiências de vida.",
    grammar: [
      ["Present perfect = have/has + particípio.", "I have visited Rio. She has seen that film."],
      ["Para experiências de vida, sem dizer quando.", "Have you ever been to Europe?"],
      ["Ever (alguma vez) em perguntas, never (nunca) em afirmativas.", "I've never eaten sushi."],
      ["Particípios irregulares comuns: been, seen, eaten, done, written, met, won.", "Have you done your homework?"]
    ],
    vocab: [["once", "uma vez"], ["twice", "duas vezes"], ["been", "estado, ido (be)"], ["seen", "visto (see)"], ["tried", "experimentado (try)"], ["met", "conhecido (meet)"], ["climbed", "escalado (climb)"], ["won", "ganhado (win)"], ["lost", "perdido (lose)"], ["experience", "experiência"]],
    sentences: [
      ["Have you ever [been|went|go] to Europe?", "Você já foi à Europa?"],
      ["I've never [eaten|ate|eat] sushi.", "Nunca comi sushi."],
      ["She [has|have|is] seen that movie twice.", "Ela já viu esse filme duas vezes."],
      ["[Have|Has|Did] they ever met a famous person?", "Eles já conheceram alguém famoso?"],
      ["We [have|has|are] visited Rio once.", "Já visitamos o Rio uma vez."],
      ["He has never [tried|try|tryed] Indian food.", "Ele nunca experimentou comida indiana."],
      ["Have you [done|did|do] your homework?", "Você fez a lição de casa?"],
      ["She has [written|wrote|writed] three books.", "Ela já escreveu três livros."]
    ],
    writing: "Escreva sobre 3 experiências que você já teve e 3 que nunca teve (use ever e never)."
  },
  {
    id: 16, level: "A2", title: "You should rest", titlePt: "Should, must e have to",
    goal: "Dar conselhos e falar de obrigações.",
    grammar: [
      ["Should = conselho (deveria).", "You should drink more water."],
      ["Must = obrigação forte ou regra, muitas vezes vinda de quem fala.", "I must finish this today."],
      ["Have to = obrigação externa. Don't have to = não precisa.", "I have to work on Saturday. You don't have to come."],
      ["Mustn't = proibido. Cuidado: mustn't é diferente de don't have to.", "You mustn't smoke here."]
    ],
    vocab: [["headache", "dor de cabeça"], ["fever", "febre"], ["cold", "resfriado"], ["rest", "descansar"], ["medicine", "remédio"], ["doctor", "médico"], ["appointment", "consulta, compromisso"], ["healthy", "saudável"], ["exercise", "exercício"], ["advice", "conselho"]],
    sentences: [
      ["You [should|should to|shoulds] see a doctor.", "Você deveria ir ao médico."],
      ["I [have to|has to|must to] work on Saturday.", "Tenho que trabalhar no sábado."],
      ["She has a fever. She [should|shouldn't|have] stay in bed.", "Ela está com febre. Deveria ficar na cama."],
      ["You [mustn't|don't have to|haven't] smoke in the hospital.", "Você não pode fumar no hospital."],
      ["Tomorrow is Sunday, so I [don't have to|mustn't|haven't to] wake up early.", "Amanhã é domingo, então não preciso acordar cedo."],
      ["What [should|must to|shoulds] I do?", "O que eu deveria fazer?"],
      ["He [has to|have to|must to] wear a uniform.", "Ele tem que usar uniforme."],
      ["You should [drink|to drink|drinks] more water.", "Você deveria beber mais água."]
    ],
    writing: "Uma amiga está muito estressada com a faculdade. Escreva conselhos para ela (use should, have to e don't have to)."
  },

  // ---------------- B1 ----------------
  {
    id: 17, level: "B1", title: "Just, already, yet", titlePt: "Present perfect × passado, for/since",
    goal: "Ligar passado e presente e falar de duração.",
    grammar: [
      ["Past simple = momento terminado e definido. Present perfect = ligação com o agora.", "I lost my keys yesterday. / I've lost my keys (e ainda não achei)."],
      ["Just (acabou de), already (já), yet (já/ainda, em perguntas e negativas).", "I've just arrived. Have you finished yet? Not yet."],
      ["For = duração. Since = ponto de início.", "for five years · since 2021"],
      ["'Moro aqui há 5 anos' em inglês usa present perfect, não o presente.", "I've lived here for 5 years. (não: I live here for 5 years)"]
    ],
    vocab: [["just", "acabou de"], ["already", "já"], ["yet", "já, ainda (pergunta/negativa)"], ["since", "desde"], ["for", "por, há (duração)"], ["recently", "recentemente"], ["so far", "até agora"], ["lately", "ultimamente"], ["graduate", "formar-se"], ["move", "mudar-se"]],
    sentences: [
      ["I've lived here [for|since|during] five years.", "Moro aqui há cinco anos."],
      ["She has worked there [since|for|from] 2021.", "Ela trabalha lá desde 2021."],
      ["I [lost|have lost|lose] my keys yesterday.", "Perdi minhas chaves ontem."],
      ["Have you finished the project [yet|already|just]?", "Você já terminou o projeto?"],
      ["We've [just|yet|since] arrived.", "Acabamos de chegar."],
      ["He [has already|already have|has yet] eaten.", "Ele já comeu."],
      ["I [haven't|didn't|don't] seen him lately.", "Não o tenho visto ultimamente."],
      ["When [did you move|have you moved|you moved] to São Paulo?", "Quando você se mudou para São Paulo?"]
    ],
    writing: "Fale de mudanças na sua vida: há quanto tempo você mora, estuda ou trabalha onde está, e o que já fez (ou ainda não fez) este ano."
  },
  {
    id: 18, level: "B1", title: "While I was walking...", titlePt: "Past continuous",
    goal: "Contar histórias com ações em andamento no passado.",
    grammar: [
      ["Past continuous = ação em andamento no passado: was/were + -ing.", "At 8 p.m. I was having dinner."],
      ["A ação longa (was doing) é interrompida pela curta (did).", "I was walking home when it started to rain."],
      ["While + ação longa; when + ação curta.", "While she was cooking, the phone rang."],
      ["Verbos de estado (know, like, want, need) não costumam ir para o -ing.", "I knew the answer. (não: I was knowing)"]
    ],
    vocab: [["while", "enquanto"], ["suddenly", "de repente"], ["rang", "tocou (ring)"], ["happen", "acontecer"], ["fell", "caiu (fall)"], ["break", "quebrar"], ["notice", "perceber"], ["accident", "acidente"], ["arrive", "chegar"], ["strange", "estranho"]],
    sentences: [
      ["I [was walking|walked|am walking] home when it started to rain.", "Eu estava andando para casa quando começou a chover."],
      ["While she was cooking, the phone [rang|was ring|rings].", "Enquanto ela cozinhava, o telefone tocou."],
      ["What [were|was|did] you doing at 10 p.m.?", "O que você estava fazendo às 10 da noite?"],
      ["They [weren't|wasn't|didn't] sleeping when I arrived.", "Eles não estavam dormindo quando cheguei."],
      ["He fell while he [was running|ran|runs].", "Ele caiu enquanto corria."],
      ["We were watching TV [when|while|during] the lights went out.", "Estávamos vendo TV quando a luz acabou."],
      ["I [knew|was knowing|know] the answer.", "Eu sabia a resposta."],
      ["Suddenly, I [noticed|was noticing|notice] something strange.", "De repente, percebi algo estranho."]
    ],
    writing: "Conte uma pequena história ou algo inesperado que aconteceu com você (use past continuous e past simple)."
  },
  {
    id: 19, level: "B1", title: "If it rains...", titlePt: "Primeira condicional",
    goal: "Falar de situações possíveis e suas consequências.",
    grammar: [
      ["First conditional = situação possível: If + presente, will + verbo.", "If it rains, I'll stay home."],
      ["Nunca use will logo depois de if.", "If it rains (não: if it will rain)"],
      ["Unless = a menos que. As soon as = assim que (também sem will).", "I won't go unless you come. As soon as I arrive, I'll call."],
      ["A ordem pode inverter; sem vírgula quando if vem no meio.", "I'll call you if I have time."]
    ],
    vocab: [["unless", "a menos que"], ["as soon as", "assim que"], ["miss", "perder (ônibus, aula)"], ["save", "economizar, salvar"], ["pass", "passar (em prova)"], ["fail", "reprovar, falhar"], ["hurry", "apressar-se"], ["deadline", "prazo"], ["chance", "chance"], ["succeed", "ter sucesso"]],
    sentences: [
      ["If it [rains|will rain|rained], we'll stay home.", "Se chover, vamos ficar em casa."],
      ["If you study, you [will pass|pass will|would passed] the test.", "Se você estudar, vai passar na prova."],
      ["I'll call you if I [have|will have|had] time.", "Vou te ligar se tiver tempo."],
      ["You'll miss the bus [unless|if|when] you hurry.", "Você vai perder o ônibus a menos que se apresse."],
      ["If she [doesn't|won't|isn't] finish today, she'll miss the deadline.", "Se ela não terminar hoje, vai perder o prazo."],
      ["What will you do if you [don't|won't|aren't] get the job?", "O que você vai fazer se não conseguir o emprego?"],
      ["As soon as I [arrive|will arrive|arrived], I'll text you.", "Assim que eu chegar, te mando mensagem."],
      ["We [will save|save will|would to save] money if we cook at home.", "Vamos economizar se cozinharmos em casa."]
    ],
    writing: "Escreva 5 frases sobre o que vai acontecer se você fizer (ou não fizer) certas coisas este mês."
  },
  {
    id: 20, level: "B1", title: "If I were you...", titlePt: "Segunda condicional e wish",
    goal: "Imaginar situações e dar conselhos.",
    grammar: [
      ["Second conditional = situação imaginária: If + passado, would + verbo.", "If I had more time, I would travel more."],
      ["Com to be, use were para todas as pessoas.", "If I were you, I'd rest."],
      ["Would é o '-ia' do português: viajaria = would travel. I'd = I would.", "She would love it."],
      ["Wish + passado para desejos sobre o presente.", "I wish I spoke English fluently."]
    ],
    vocab: [["rich", "rico"], ["lottery", "loteria"], ["wish", "desejar"], ["imagine", "imaginar"], ["if I were you", "se eu fosse você"], ["fluently", "fluentemente"], ["dream", "sonho"], ["afford", "ter dinheiro para"], ["island", "ilha"], ["quit", "largar, pedir demissão"]],
    sentences: [
      ["If I [had|have|would have] more money, I would buy a house.", "Se eu tivesse mais dinheiro, compraria uma casa."],
      ["If I were you, I [would|will|am] accept the offer.", "Se eu fosse você, aceitaria a proposta."],
      ["If she [were|was being|is] here, she would help us.", "Se ela estivesse aqui, nos ajudaria."],
      ["What would you do if you [won|win|would win] the lottery?", "O que você faria se ganhasse na loteria?"],
      ["I wish I [spoke|speak|would speaking] English fluently.", "Queria falar inglês fluentemente."],
      ["They [would|will|did] travel more if they had time.", "Eles viajariam mais se tivessem tempo."],
      ["If I could live anywhere, I [would|will|can] live near the beach.", "Se pudesse morar em qualquer lugar, moraria perto da praia."],
      ["I can't afford it. I wish it [were|is|will be] cheaper.", "Não tenho dinheiro para isso. Queria que fosse mais barato."]
    ],
    writing: "Imagine: se você pudesse morar em qualquer lugar do mundo e trabalhar com qualquer coisa, o que faria? (use would)"
  },
  {
    id: 21, level: "B1", title: "It was built in 1950", titlePt: "Voz passiva",
    goal: "Descrever processos, obras e acontecimentos.",
    grammar: [
      ["Voz passiva: o foco é no que acontece com a coisa. be + particípio.", "This house was built in 1950."],
      ["Presente: is/are + particípio. Passado: was/were + particípio.", "English is spoken here. The bridge was designed in 1890."],
      ["By indica quem fez, só quando isso importa.", "The museum was designed by Oscar Niemeyer."],
      ["Muito usada em textos técnicos, relatórios e notícias.", "The project will be finished next month."]
    ],
    vocab: [["build", "construir (built)"], ["design", "projetar"], ["building", "prédio"], ["bridge", "ponte"], ["project", "projeto"], ["floor plan", "planta baixa"], ["steel", "aço"], ["concrete", "concreto"], ["wood", "madeira"], ["glass", "vidro"]],
    sentences: [
      ["This building [was built|built|was build] in 1950.", "Este prédio foi construído em 1950."],
      ["English [is spoken|speaks|is speak] all over the world.", "O inglês é falado no mundo todo."],
      ["The museum was designed [by|for|from] Oscar Niemeyer.", "O museu foi projetado por Oscar Niemeyer."],
      ["The windows [are made|make|are make] of glass.", "As janelas são feitas de vidro."],
      ["The project [will be finished|will finish|is finish] next month.", "O projeto será concluído no mês que vem."],
      ["These houses [were built|built|was built] in the 1920s.", "Estas casas foram construídas nos anos 1920."],
      ["The bridge [is being repaired|is repairing|repairs] now.", "A ponte está sendo reformada agora."],
      ["My phone [was stolen|stole|was steal] last week.", "Meu celular foi roubado semana passada."]
    ],
    writing: "Descreva um prédio ou lugar famoso da sua cidade: quando e por quem foi construído e de que é feito (use a voz passiva)."
  },
  {
    id: 22, level: "B1", title: "The person who...", titlePt: "Orações relativas",
    goal: "Dar detalhes sobre pessoas, coisas e lugares.",
    grammar: [
      ["Who para pessoas.", "The woman who called is my boss."],
      ["Which para coisas e animais.", "The book which I bought is great."],
      ["That pode substituir who ou which, principalmente na fala.", "The car that I like is red."],
      ["Where para lugares; whose para posse (cujo).", "The city where I was born. The man whose car was stolen."]
    ],
    vocab: [["boss", "chefe"], ["coworker", "colega de trabalho"], ["neighbor", "vizinho"], ["owner", "dono"], ["born", "nascido"], ["recommend", "recomendar"], ["lend", "emprestar"], ["app", "aplicativo"], ["place", "lugar"], ["author", "autor"]],
    sentences: [
      ["The woman [who|which|where] called you is my boss.", "A mulher que te ligou é minha chefe."],
      ["This is the app [which|who|where] I use every day.", "Este é o aplicativo que eu uso todo dia."],
      ["That's the restaurant [where|which|who] we met.", "Aquele é o restaurante onde nos conhecemos."],
      ["I have a neighbor [whose|who's|which] dog barks all night.", "Tenho um vizinho cujo cachorro late a noite toda."],
      ["The city [where|which|who] I was born is small.", "A cidade onde nasci é pequena."],
      ["Do you know anyone [who|which|whose] speaks German?", "Você conhece alguém que fale alemão?"],
      ["The book [that|who|where] you lent me was amazing.", "O livro que você me emprestou foi incrível."],
      ["He's the author [whose|who|which] book I recommended.", "Ele é o autor cujo livro eu recomendei."]
    ],
    writing: "Descreva 3 pessoas e 2 lugares importantes para você usando who, which, that e where."
  },
  {
    id: 23, level: "B1", title: "She said that...", titlePt: "Discurso indireto",
    goal: "Contar o que outras pessoas disseram e perguntaram.",
    grammar: [
      ["Ao contar o que alguém disse, o verbo geralmente volta um tempo.", "'I am tired.' → She said (that) she was tired."],
      ["Say something; tell someone something.", "He said he was late. He told me he was late."],
      ["Mudanças comuns: will → would, can → could, is → was, have done → had done.", "'I'll help.' → He said he would help."],
      ["Perguntas viram frases normais, sem do/did.", "'Where do you live?' → She asked where I lived."]
    ],
    vocab: [["say", "dizer (said)"], ["tell", "contar, dizer a alguém (told)"], ["ask", "perguntar, pedir"], ["explain", "explicar"], ["answer", "responder"], ["mention", "mencionar"], ["complain", "reclamar"], ["agree", "concordar"], ["suggest", "sugerir"], ["admit", "admitir"]],
    sentences: [
      ["She said that she [was|is|were] tired.", "Ela disse que estava cansada."],
      ["He [told|said|say] me he was busy.", "Ele me disse que estava ocupado."],
      ["They said they [would|will|are] come later.", "Eles disseram que viriam mais tarde."],
      ["She [said|told|asked] that she loved the gift.", "Ela disse que amou o presente."],
      ["He asked me where I [lived|do live|live did].", "Ele me perguntou onde eu morava."],
      ["Ana said she [could|can|cans] help us.", "A Ana disse que podia nos ajudar."],
      ["My boss asked if I [had finished|have finish|finished did] the report.", "Meu chefe perguntou se eu tinha terminado o relatório."],
      ["Can you tell [me|to me|for me] what happened?", "Você pode me contar o que aconteceu?"]
    ],
    writing: "Pense numa conversa recente com alguém e conte o que a pessoa disse e perguntou (use reported speech)."
  },
  {
    id: 24, level: "B1", title: "Get up, give up", titlePt: "Phrasal verbs essenciais",
    goal: "Usar os phrasal verbs mais comuns do dia a dia.",
    grammar: [
      ["Phrasal verb = verbo + partícula (up, out, on, off...). O sentido muda.", "give = dar · give up = desistir"],
      ["Com pronome, alguns se separam: o pronome fica no meio.", "Turn it off. (não: turn off it)"],
      ["Os mais usados: get up, wake up, find out, look for, look after, turn on/off, put on, take off, give up, run out of.", "I ran out of milk."],
      ["Aprenda em frases, não em listas soltas: é assim que eles aparecem nas conversas.", "Don't give up!"]
    ],
    vocab: [["give up", "desistir"], ["find out", "descobrir"], ["look for", "procurar"], ["look after", "cuidar de"], ["turn off", "desligar"], ["put on", "vestir, colocar"], ["take off", "tirar (roupa), decolar"], ["run out of", "ficar sem"], ["figure out", "entender, resolver"], ["catch up", "pôr em dia"]],
    sentences: [
      ["Don't give [up|in|off]! You can do it.", "Não desista! Você consegue."],
      ["I'm looking [for|after|out] my keys.", "Estou procurando minhas chaves."],
      ["Can you turn [it off|off it|it out]?", "Pode desligar isso?"],
      ["We ran [out of|out|off] coffee.", "Ficamos sem café."],
      ["She looks [after|for|up] her little brother.", "Ela cuida do irmão mais novo."],
      ["I just found [out|up|off] the truth.", "Acabei de descobrir a verdade."],
      ["Put [on|in|off] your jacket, it's cold.", "Coloque a jaqueta, está frio."],
      ["I need to catch [up|out|off] on my emails.", "Preciso pôr meus e-mails em dia."]
    ],
    writing: "Escreva sobre sua semana usando pelo menos 5 phrasal verbs desta unidade."
  }
];

const PLACEMENT = [
  { q: "Hello! How ___ you?", options: ["is", "are", "am", "be"], answer: 1, why: "Com you, o verbo to be é are." },
  { q: "I ___ from Brazil.", options: ["is", "are", "am", "be"], answer: 2, why: "Com I, o verbo to be é am." },
  { q: "She ___ coffee every morning.", options: ["drink", "drinking", "drinks", "is drink"], answer: 2, why: "No presente, he/she/it ganha -s: she drinks." },
  { q: "___ you like pizza?", options: ["Are", "Do", "Does", "Is"], answer: 1, why: "Perguntas no presente usam do (ou does com he/she/it)." },
  { q: "Yesterday I ___ to the beach.", options: ["go", "went", "goes", "gone"], answer: 1, why: "Yesterday pede passado: go vira went." },
  { q: "There ___ many people at the party.", options: ["is", "are", "has", "be"], answer: 1, why: "Many people é plural: there are." },
  { q: "This phone is ___ than my old one.", options: ["more good", "best", "better", "gooder"], answer: 2, why: "Good é irregular: good → better → the best." },
  { q: "I've never ___ to London.", options: ["went", "been", "go", "going"], answer: 1, why: "Com have/has usa-se o particípio: I've never been." },
  { q: "If it rains tomorrow, we ___ stay at home.", options: ["would", "did", "will", "are"], answer: 2, why: "Situação possível no futuro: if + presente, will + verbo." },
  { q: "I've lived here ___ 2019.", options: ["for", "since", "from", "in"], answer: 1, why: "Since indica o ponto de início; for indica duração." },
  { q: "If I ___ more time, I would learn Japanese.", options: ["have", "will have", "had", "would have"], answer: 2, why: "Situação imaginária: if + passado, would + verbo." },
  { q: "This bridge ___ in 1890.", options: ["built", "was built", "is building", "has built"], answer: 1, why: "Voz passiva no passado: was/were + particípio." },
  { q: "She told me she ___ busy.", options: ["is", "were", "was", "be"], answer: 2, why: "No discurso indireto o verbo volta um tempo: is → was." },
  { q: "The man ___ car was stolen called the police.", options: ["who", "whose", "which", "that"], answer: 1, why: "Whose indica posse: o homem cujo carro foi roubado." },
  { q: "By the time we arrived, the film ___.", options: ["started", "has started", "had started", "starts"], answer: 2, why: "Ação anterior a outra no passado: past perfect (had + particípio)." },
  { q: "I'm used to ___ up early.", options: ["wake", "waking", "woke", "be waking"], answer: 1, why: "Be used to + verbo com -ing = estar acostumado a." }
];

// Pontuação do teste → unidade inicial recomendada.
function placementResult(score) {
  if (score >= 10) return { level: "B1", start: 17 };
  if (score >= 6) return { level: "A2", start: 9 };
  return { level: "A1", start: 1 };
}

// Conversas com o professor IA.
const TOPICS = [
  { id: "intro", name: "Apresentações", icon: "hand", scene: "You just met the learner at a friendly language exchange meetup. Get to know them." },
  { id: "routine", name: "Rotina", icon: "sun", scene: "Chat with the learner about their daily routine and habits." },
  { id: "work", name: "Trabalho e estudos", icon: "briefcase", scene: "Chat with the learner about their work, studies and career plans." },
  { id: "design", name: "Arquitetura e design", icon: "ruler", scene: "Chat with the learner about architecture, buildings, interiors and design they like." },
  { id: "travel", name: "Viagens", icon: "plane", scene: "Chat with the learner about trips they took and places they want to visit." },
  { id: "food", name: "Comida", icon: "cup", scene: "Chat with the learner about food, cooking and restaurants." },
  { id: "movies", name: "Filmes e séries", icon: "play", scene: "Chat with the learner about movies, TV series and music they enjoy." },
  { id: "restaurant", name: "No restaurante", icon: "cup", scene: "Role-play: you are a waiter at a restaurant and the learner is a customer." },
  { id: "interview", name: "Entrevista de emprego", icon: "briefcase", scene: "Role-play: you are a friendly interviewer for a design job and the learner is the candidate." }
];

if (typeof module !== "undefined") module.exports = { LEVELS, UNITS, PLACEMENT, placementResult, TOPICS };
