// Nível B1 · Temporada 3: "A Bia no comando"

const UNITS_B1 = [
  {
    id: 17, level: "B1", title: "One year in New York", titlePt: "Passado + agora · for, since, just, yet",
    goal: "Ligar passado e presente e dizer há quanto tempo.",
    episode: {
      title: "Um ano depois", scene: "Faz um ano que a Bia chegou. A Olivia chama a Bia na sala dela.",
      lines: [
        ["Olivia", "Bia, you've worked here for a year!", "Bia, você trabalha aqui há um ano!"],
        ["Bia", "Really? Time flies! I moved here last October.", "Sério? O tempo voa! Me mudei para cá em outubro passado."],
        ["Olivia", "And you've already finished six projects.", "E você já terminou seis projetos."],
        ["Bia", "Seven! I've just sent the last one.", "Sete! Acabei de mandar o último."],
        ["Olivia", "Have you seen the client's answer yet?", "Você já viu a resposta do cliente?"],
        ["Bia", "Not yet. Is it good news?", "Ainda não. São boas notícias?"],
        ["Olivia", "Very good. They want you to lead the next project.", "Muito boas. Eles querem que você lidere o próximo projeto."],
        ["Bia", "I've wanted this since I arrived!", "Eu quero isso desde que cheguei!"]
      ],
      questions: [["Há quanto tempo a Bia trabalha no estúdio?", ["Um ano", "Seis meses", "Dois anos"], 0], ["Qual é a boa notícia?", ["Ela vai liderar o próximo projeto", "Ela vai tirar férias", "Ela ganhou um prêmio"], 0]]
    },
    vocab: [["just", "acabou de", "DJÂST"], ["already", "já", "ól-RÉ-di"], ["yet", "já, ainda (pergunta/negativa)", "IÉT"], ["since", "desde", "SÍNS"], ["for", "há, por (duração)", "FÓR"], ["recently", "recentemente", "RÍ-sent-li"], ["so far", "até agora", "sôu FÁR"], ["lately", "ultimamente", "LÊIT-li"], ["graduate", "formar-se", "GRÉ-dju-êit"], ["move", "mudar-se", "MÚV"]],
    lesson: {
      why: "Agora vamos juntar passado e presente. Esta é uma das partes que mais confundem brasileiros, mas com estes truques fica simples.",
      parts: [
        ["Tem data e acabou? Passado simples", "Se você diz QUANDO foi (ontem, em 2020, mês passado), use o passado.", [["I lost my keys yesterday.", "Perdi minhas chaves ontem."], ["She moved in 2021.", "Ela se mudou em 2021."]]],
        ["Ainda vale agora? have + 3ª forma", "Se o resultado ainda importa agora, use o present perfect.", [["I've lost my keys.", "Perdi minhas chaves (e continuo sem elas)."], ["She's finished the project.", "Ela terminou o projeto (está pronto)."]]],
        ["Just, already e yet", "Just = acabou de. Already = já. Yet = já (em perguntas) e ainda (em negativas), sempre no final da frase.", [["I've just arrived.", "Acabei de chegar."], ["Have you finished yet? Not yet.", "Você já terminou? Ainda não."]]],
        ["Há quanto tempo: for e since", "Em português dizemos 'moro aqui há 5 anos', no presente. Em inglês, usamos o present perfect. For = quanto tempo (5 anos). Since = desde quando (desde 2020).", [["I've lived here for five years.", "Moro aqui há cinco anos."], ["I've worked here since 2020.", "Trabalho aqui desde 2020."]]]
      ],
      mistakes: [["I live here for 5 years.", "I've lived here for 5 years.", "'Há X anos' até hoje usa have + 3ª forma."], ["I've seen him yesterday.", "I saw him yesterday.", "Com 'ontem', use o passado simples."], ["since 5 years", "for 5 years", "Quantidade de tempo usa for."]],
      tip: "FOR = quanto tempo (for 2 hours). SINCE = desde quando (since Monday)."
    },
    sentences: [
      ["I've lived here [for|since|during] five years.", "Moro aqui há cinco anos."], ["She has worked there [since|for|from] 2021.", "Ela trabalha lá desde 2021."],
      ["I [lost|have lost|lose] my keys yesterday.", "Perdi minhas chaves ontem."], ["Have you finished the project [yet|already|just]?", "Você já terminou o projeto?"],
      ["We've [just|yet|since] arrived.", "Acabamos de chegar."], ["He [has already|already have|has yet] eaten.", "Ele já comeu."],
      ["I [haven't|didn't|don't] seen him lately.", "Não tenho visto ele ultimamente."], ["When [did you move|have you moved|you moved] to New York?", "Quando você se mudou para Nova York?"]
    ],
    mission: {
      goal: "Conte à Olivia o que mudou na sua vida e o que você já fez (ou ainda não fez) este ano.",
      roleplay: "You are Olivia, the learner's boss, in a friendly one-year review. Ask how long she has lived, studied and worked where she is, what she has already done this year and what she hasn't done yet.",
      writing: "Fale de mudanças na sua vida: há quanto tempo você mora, estuda ou trabalha onde está, e o que já fez (ou ainda não fez) este ano.",
      model: "I've lived in Santo André since I was born. I've studied architecture for almost five years. This year I've finished two big projects. I haven't traveled abroad yet."
    }
  },
  {
    id: 18, level: "B1", title: "While I was walking...", titlePt: "Contar histórias · was + ING",
    goal: "Contar o que estava acontecendo quando algo aconteceu.",
    episode: {
      title: "O apagão", scene: "Ontem à noite faltou luz em metade de Nova York. Hoje todo mundo tem uma história.",
      lines: [
        ["Leo", "Where were you during the blackout last night?", "Onde você estava durante o apagão ontem à noite?"],
        ["Bia", "I was taking the subway when the lights went out!", "Eu estava no metrô quando a luz acabou!"],
        ["Leo", "No way! What happened?", "Não acredito! O que aconteceu?"],
        ["Bia", "The train stopped. Everyone was talking, and a man was playing the guitar.", "O trem parou. Todo mundo estava conversando, e um homem estava tocando violão."],
        ["Leo", "That's very New York.", "Isso é muito Nova York."],
        ["Bia", "And you? What were you doing?", "E você? O que você estava fazendo?"],
        ["Leo", "I was cooking dinner. While I was looking for candles, I broke a glass.", "Eu estava fazendo o jantar. Enquanto procurava velas, quebrei um copo."],
        ["Bia", "Oh, Leo!", "Ai, Leo!"]
      ],
      questions: [["Onde a Bia estava quando a luz acabou?", ["No metrô", "Em casa", "No estúdio"], 0], ["O que o Leo quebrou?", ["Um copo", "O violão", "O celular"], 0]]
    },
    vocab: [["while", "enquanto", "UÁIL"], ["suddenly", "de repente", "SÂ-den-li"], ["rang", "tocou (ring)", "RÉNG"], ["happen", "acontecer", "RÉ-pen"], ["fell", "caiu (fall)", "FÉL"], ["break", "quebrar", "BRÊIK"], ["notice", "perceber", "NÔU-ris"], ["accident", "acidente", "ÉK-si-dent"], ["arrive", "chegar", "a-RÁIV"], ["strange", "estranho", "STRÊINDJ"]],
    lesson: {
      why: "O past continuous é o 'estava fazendo'. Ele é ótimo para contar histórias: o que estava acontecendo quando alguma coisa aconteceu.",
      parts: [
        ["Estava + -ando, -endo", "was/were + verbo com ING = estava fazendo.", [["I was sleeping.", "Eu estava dormindo."], ["They were watching TV.", "Eles estavam vendo TV."]]],
        ["Uma coisa interrompe a outra", "A ação longa usa was + ING. A ação curta, que interrompe, usa o passado simples.", [["I was cooking when the phone rang.", "Eu estava cozinhando quando o telefone tocou."], ["She was walking when it started to rain.", "Ela estava andando quando começou a chover."]]],
        ["While e when", "While (enquanto) vai com a ação longa. When (quando) vai com a ação curta.", [["While I was working, she called.", "Enquanto eu trabalhava, ela ligou."], ["He arrived when we were eating.", "Ele chegou quando estávamos comendo."]]],
        ["Sentimentos não usam ING", "know, like, love, want e need quase nunca ficam no ING.", [["I knew the answer.", "Eu sabia a resposta."], ["She wanted a coffee.", "Ela queria um café."]]]
      ],
      mistakes: [["I was cook.", "I was cooking.", "Depois de was, use ING."], ["They was sleeping.", "They were sleeping.", "Com they, use were."], ["I was knowing.", "I knew.", "Know não usa ING."]],
      tip: "Pense num filme: o was + ING é a cena de fundo. O passado simples é o susto que acontece no meio dela."
    },
    sentences: [
      ["I [was walking|walked|am walking] home when it started to rain.", "Eu estava andando para casa quando começou a chover."], ["While she was cooking, the phone [rang|was ring|rings].", "Enquanto ela cozinhava, o telefone tocou."],
      ["What [were|was|did] you doing at 10 p.m.?", "O que você estava fazendo às 10 da noite?"], ["They [weren't|wasn't|didn't] sleeping when I arrived.", "Eles não estavam dormindo quando cheguei."],
      ["He fell while he [was running|ran|runs].", "Ele caiu enquanto corria."], ["We were watching TV [when|while|during] the lights went out.", "Estávamos vendo TV quando a luz acabou."],
      ["I [knew|was knowing|know] the answer.", "Eu sabia a resposta."], ["Suddenly, I [noticed|was noticing|notice] something strange.", "De repente, percebi algo estranho."]
    ],
    mission: {
      goal: "Conte ao Leo uma história inesperada que aconteceu com você.",
      roleplay: "You are Leo. Ask the learner to tell you a surprising or funny story from her life. Ask what she was doing when it happened, where she was and what happened next.",
      writing: "Conte uma pequena história ou algo inesperado que aconteceu com você (use past continuous e past simple).",
      model: "Last week I was walking home when it started to rain. I didn't have an umbrella! While I was running, I saw my friend in a café. She was drinking coffee, so I went in and we talked for an hour."
    }
  },
  {
    id: 19, level: "B1", title: "If we finish today...", titlePt: "Se isso, então aquilo · primeira condicional",
    goal: "Falar de situações possíveis e suas consequências.",
    episode: {
      title: "O prazo", scene: "Véspera da apresentação de um projeto enorme. A maquete ainda não está pronta.",
      lines: [
        ["Olivia", "If we finish the model today, we'll present it tomorrow.", "Se terminarmos a maquete hoje, apresentamos amanhã."],
        ["Bia", "And if we don't finish?", "E se a gente não terminar?"],
        ["Olivia", "We'll miss the deadline, and the client won't be happy.", "Vamos perder o prazo, e o cliente não vai ficar feliz."],
        ["Leo", "I'll stay late if you need me.", "Eu fico até mais tarde se vocês precisarem."],
        ["Bia", "Me too. As soon as the materials arrive, I'll start the roof.", "Eu também. Assim que o material chegar, começo o telhado."],
        ["Olivia", "You're amazing. If we win this project, I'll take you all to dinner.", "Vocês são incríveis. Se ganharmos esse projeto, levo todos para jantar."],
        ["Leo", "Unless you forget again!", "A menos que você esqueça de novo!"],
        ["Olivia", "I won't forget, I promise!", "Não vou esquecer, prometo!"]
      ],
      questions: [["O que acontece se não terminarem hoje?", ["Vão perder o prazo", "Vão apresentar amanhã", "Vão jantar fora"], 0], ["O que a Olivia promete se ganharem?", ["Levar todos para jantar", "Dar férias", "Comprar material novo"], 0]]
    },
    vocab: [["unless", "a menos que", "ân-LÉS"], ["as soon as", "assim que", "éz SÚN éz"], ["miss", "perder (prazo, ônibus)", "MÍS"], ["save", "economizar, salvar", "SÊIV"], ["pass", "passar (em prova)", "PÉS"], ["fail", "falhar, reprovar", "FÊIL"], ["hurry", "apressar-se", "RÂ-ri"], ["deadline", "prazo", "DÉD-lain"], ["chance", "chance", "TCHÉNS"], ["succeed", "ter sucesso", "sâk-SÍD"]],
    lesson: {
      why: "A primeira condicional fala de coisas que podem mesmo acontecer: SE isso acontecer, ENTÃO vai acontecer aquilo.",
      parts: [
        ["A fórmula", "If + presente, will + verbo. Em português: se chover, vou ficar em casa.", [["If it rains, I'll stay home.", "Se chover, vou ficar em casa."], ["If you study, you'll pass.", "Se você estudar, vai passar."]]],
        ["Depois de IF não vem WILL", "Em português dizemos 'se chover' (que parece futuro). Em inglês, depois de if, usamos o presente: if it rains.", [["If I have time, I'll call you.", "Se eu tiver tempo, te ligo."], ["If she comes, we'll go out.", "Se ela vier, vamos sair."]]],
        ["Unless e as soon as", "Unless = a menos que. As soon as = assim que. Os dois funcionam como o if: presente depois deles.", [["I won't go unless you come.", "Não vou a menos que você venha."], ["As soon as I arrive, I'll text you.", "Assim que eu chegar, te mando mensagem."]]],
        ["A ordem pode trocar", "A parte do if pode ir no começo ou no fim. No começo, use vírgula.", [["I'll call you if I have time.", "Te ligo se tiver tempo."], ["If I have time, I'll call you.", "Se tiver tempo, te ligo."]]]
      ],
      mistakes: [["If it will rain...", "If it rains...", "Depois de if, use o presente."], ["If you study, you pass will.", "If you study, you will pass.", "Will vem antes do verbo."], ["As soon as I will arrive", "As soon as I arrive", "As soon as funciona como if: sem will."]],
      tip: "IF e WILL nunca ficam na mesma metade da frase."
    },
    sentences: [
      ["If it [rains|will rain|rained], we'll stay home.", "Se chover, vamos ficar em casa."], ["If you study, you [will pass|pass will|would passed] the test.", "Se você estudar, vai passar na prova."],
      ["I'll call you if I [have|will have|had] time.", "Vou te ligar se tiver tempo."], ["You'll miss the bus [unless|if|when] you hurry.", "Você vai perder o ônibus a menos que se apresse."],
      ["If she [doesn't|won't|isn't] finish today, she'll miss the deadline.", "Se ela não terminar hoje, vai perder o prazo."], ["What will you do if you [don't|won't|aren't] get the job?", "O que você vai fazer se não conseguir o emprego?"],
      ["As soon as I [arrive|will arrive|arrived], I'll text you.", "Assim que eu chegar, te mando mensagem."], ["We [will save|save will|would to save] money if we cook at home.", "Vamos economizar se cozinharmos em casa."]
    ],
    mission: {
      goal: "Planeje com a Olivia o que fazer em cada situação possível.",
      roleplay: "You are Olivia the day before a big deadline. Discuss possible situations with the learner (if the materials are late, if the client changes the plan, if we finish early). Use first conditional naturally and ask what she will do.",
      writing: "Escreva 5 frases sobre o que vai acontecer se você fizer (ou não fizer) certas coisas este mês.",
      model: "If I study every day, I will speak better. If I don't sleep well, I will be tired. If I save money, I will travel in July. I won't finish my project unless I focus."
    }
  },
  {
    id: 20, level: "B1", title: "If I won the lottery...", titlePt: "Imaginar · segunda condicional e wish",
    goal: "Imaginar situações, sonhar e dar conselhos.",
    episode: {
      title: "Sonhando acordado", scene: "Domingo preguiçoso. Bia e Sam conversam no sofá sobre sonhos.",
      lines: [
        ["Sam", "What would you do if you won the lottery?", "O que você faria se ganhasse na loteria?"],
        ["Bia", "I'd open my own studio. In Lisbon, maybe!", "Eu abriria meu próprio estúdio. Em Lisboa, talvez!"],
        ["Sam", "Lisbon? You wouldn't stay in New York?", "Lisboa? Você não ficaria em Nova York?"],
        ["Bia", "I don't know. If I were rich, I'd live in two cities!", "Não sei. Se eu fosse rica, moraria em duas cidades!"],
        ["Sam", "I'd buy a house on an island and quit my job.", "Eu compraria uma casa numa ilha e largaria meu emprego."],
        ["Bia", "You'd get bored in a week.", "Você ficaria entediado em uma semana."],
        ["Sam", "True. I wish I had your energy.", "Verdade. Queria ter a sua energia."],
        ["Bia", "And I wish I spoke English like you!", "E eu queria falar inglês como você!"]
      ],
      questions: [["O que a Bia faria com o dinheiro?", ["Abriria o próprio estúdio", "Compraria uma ilha", "Pararia de trabalhar"], 0], ["O que o Sam faria?", ["Compraria uma casa numa ilha", "Abriria um estúdio", "Iria para Lisboa"], 0]]
    },
    vocab: [["rich", "rico", "RÍTCH"], ["lottery", "loteria", "LÁ-re-ri"], ["wish", "desejar, queria que", "UÍX"], ["imagine", "imaginar", "i-MÉ-djin"], ["if I were you", "se eu fosse você", "if ái uêr IÚ"], ["fluently", "fluentemente", "FLÚ-ent-li"], ["dream", "sonho, sonhar", "DRÍM"], ["afford", "ter dinheiro para", "a-FÓRD"], ["island", "ilha", "ÁI-lend"], ["quit", "largar, pedir demissão", "KUÍT"]],
    lesson: {
      why: "A segunda condicional é para imaginar e sonhar: SE eu tivesse, SE eu fosse... Coisas que não são reais agora.",
      parts: [
        ["Se eu tivesse... eu faria", "If + passado, would + verbo. É o nosso 'se eu tivesse, eu compraria'.", [["If I had money, I would travel.", "Se eu tivesse dinheiro, eu viajaria."], ["If she lived here, she would help.", "Se ela morasse aqui, ajudaria."]]],
        ["Would = o '-ria' do português", "Viajaria = would travel. Compraria = would buy. I'd = I would.", [["I'd love a coffee.", "Eu adoraria um café."], ["Would you like some water?", "Você gostaria de água?"]]],
        ["If I were you", "Para dar conselho: If I were you (se eu fosse você). Use were para todo mundo, até para I e she.", [["If I were you, I'd rest.", "Se eu fosse você, descansaria."], ["If she were here, she'd laugh.", "Se ela estivesse aqui, ia rir."]]],
        ["I wish = queria que", "I wish + passado = queria que fosse diferente agora.", [["I wish I spoke English.", "Queria falar inglês."], ["I wish I had more time.", "Queria ter mais tempo."]]]
      ],
      mistakes: [["If I have money, I would travel.", "If I had money, I would travel.", "Situação imaginária: if + passado."], ["If I would have...", "If I had...", "Would nunca vai logo depois de if."], ["I wish I speak English.", "I wish I spoke English.", "Depois de wish, use o passado."]],
      tip: "Primeira condicional = pode acontecer (if it rains... will). Segunda = só imaginando (if I had... would)."
    },
    sentences: [
      ["If I [had|have|would have] more money, I would buy a house.", "Se eu tivesse mais dinheiro, compraria uma casa."], ["If I were you, I [would|will|am] accept the offer.", "Se eu fosse você, aceitaria a proposta."],
      ["If she [were|was being|is] here, she would help us.", "Se ela estivesse aqui, nos ajudaria."], ["What would you do if you [won|win|would win] the lottery?", "O que você faria se ganhasse na loteria?"],
      ["I wish I [spoke|speak|would speaking] English fluently.", "Queria falar inglês fluentemente."], ["They [would|will|did] travel more if they had time.", "Eles viajariam mais se tivessem tempo."],
      ["If I could live anywhere, I [would|will|can] live near the beach.", "Se pudesse morar em qualquer lugar, moraria perto da praia."], ["I can't afford it. I wish it [were|is|will be] cheaper.", "Não tenho dinheiro para isso. Queria que fosse mais barato."]
    ],
    mission: {
      goal: "Imagine com o Sam: o que vocês fariam se a vida fosse diferente?",
      roleplay: "You are Sam on a lazy Sunday. Ask the learner imaginative questions (if you won the lottery, if you could live anywhere, if you were the president) and share your own answers. Use second conditional and wish.",
      writing: "Imagine: se você pudesse morar em qualquer lugar do mundo e trabalhar com qualquer coisa, o que faria? (use would)",
      model: "If I could live anywhere, I would live in Lisbon. I would have a small studio near the river. I would design houses and I would travel every weekend. It would be perfect!"
    }
  },
  {
    id: 21, level: "B1", title: "It was built in 1902", titlePt: "Voz passiva · foi feito, é feito",
    goal: "Descrever obras, processos e acontecimentos.",
    episode: {
      title: "Tour de arquitetura", scene: "A Olivia leva a Bia para um passeio pelos prédios famosos de Manhattan.",
      lines: [
        ["Olivia", "This is the Flatiron Building. It was built in 1902.", "Este é o Flatiron Building. Foi construído em 1902."],
        ["Bia", "It's so thin! Who was it designed by?", "É tão fino! Quem projetou?"],
        ["Olivia", "It was designed by Daniel Burnham.", "Foi projetado por Daniel Burnham."],
        ["Bia", "And what is it made of?", "E é feito de quê?"],
        ["Olivia", "The structure is made of steel, and the facade is covered with stone.", "A estrutura é de aço, e a fachada é coberta de pedra."],
        ["Bia", "Is it being renovated now?", "Ele está sendo reformado agora?"],
        ["Olivia", "Yes, it's being turned into apartments.", "Sim, está sendo transformado em apartamentos."],
        ["Bia", "Every architect should see this building!", "Todo arquiteto deveria ver este prédio!"]
      ],
      questions: [["Quando o Flatiron foi construído?", ["Em 1902", "Em 1950", "Em 2002"], 0], ["De que é feita a estrutura?", ["Aço", "Madeira", "Vidro"], 0]]
    },
    vocab: [["build", "construir (built)", "BÍLD"], ["design", "projetar", "di-ZÁIN"], ["building", "prédio", "BÍL-ding"], ["bridge", "ponte", "BRÍDJ"], ["project", "projeto", "PRÁ-djekt"], ["floor plan", "planta baixa", "FLÓR plén"], ["steel", "aço", "STÍL"], ["concrete", "concreto", "KÁN-krit"], ["wood", "madeira", "UÚD"], ["glass", "vidro", "GLÉS"]],
    lesson: {
      why: "Na voz passiva, o importante é a coisa, não quem fez. Ela é muito usada em arquitetura, notícias e textos técnicos.",
      parts: [
        ["Ativa × passiva", "Ativa: Burnham designed the building (o foco é quem fez). Passiva: The building was designed by Burnham (o foco é o prédio).", [["They built the house in 1950.", "Eles construíram a casa em 1950."], ["The house was built in 1950.", "A casa foi construída em 1950."]]],
        ["A fórmula", "be (is, are, was, were) + 3ª forma do verbo. Foi construído = was built. É feito = is made.", [["Coffee is grown in Brazil.", "Café é plantado no Brasil."], ["The windows were cleaned.", "As janelas foram limpas."]]],
        ["By = por quem", "Só diga quem fez se isso for importante.", [["It was designed by Lina Bo Bardi.", "Foi projetado por Lina Bo Bardi."], ["The book was written by a Brazilian.", "O livro foi escrito por um brasileiro."]]],
        ["Em outros tempos", "Futuro: will be + 3ª forma. Acontecendo agora: is being + 3ª forma.", [["It will be finished next month.", "Vai ficar pronto no mês que vem."], ["The bridge is being repaired.", "A ponte está sendo reformada."]]]
      ],
      mistakes: [["The house built in 1950.", "The house was built in 1950.", "A passiva precisa do be (was)."], ["It was build.", "It was built.", "Use a 3ª forma: built."], ["English is speak here.", "English is spoken here.", "A 3ª forma de speak é spoken."]],
      tip: "Se em português dá para dizer 'foi feito', 'é feito' ou 'será feito', é voz passiva."
    },
    sentences: [
      ["This building [was built|built|was build] in 1950.", "Este prédio foi construído em 1950."], ["English [is spoken|speaks|is speak] all over the world.", "O inglês é falado no mundo todo."],
      ["The museum was designed [by|for|from] Oscar Niemeyer.", "O museu foi projetado por Oscar Niemeyer."], ["The windows [are made|make|are make] of glass.", "As janelas são feitas de vidro."],
      ["The project [will be finished|will finish|is finish] next month.", "O projeto será concluído no mês que vem."], ["These houses [were built|built|was built] in the 1920s.", "Estas casas foram construídas nos anos 1920."],
      ["The bridge [is being repaired|is repairing|repairs] now.", "A ponte está sendo reformada agora."], ["My phone [was stolen|stole|was steal] last week.", "Meu celular foi roubado semana passada."]
    ],
    mission: {
      goal: "Seja a guia: apresente um prédio ou lugar famoso da sua cidade.",
      roleplay: "You are a curious tourist. The learner is your architecture guide in her city. Ask when and by whom a building was built, what it is made of and how it is used today, so she answers with the passive voice.",
      writing: "Descreva um prédio ou lugar famoso da sua cidade: quando e por quem foi construído e de que é feito (use a voz passiva).",
      model: "The Copan building is in São Paulo. It was designed by Oscar Niemeyer. It was built in the 1950s and 1960s. It is made of concrete. It is visited by many tourists."
    }
  },
  {
    id: 22, level: "B1", title: "The person who...", titlePt: "Explicar quem e o quê · who, which, where",
    goal: "Dar detalhes sobre pessoas, coisas e lugares numa frase só.",
    episode: {
      title: "A estagiária nova", scene: "Uma estagiária nova chegou ao estúdio. Em casa, a Bia conta para o Sam.",
      lines: [
        ["Bia", "The new intern started today. She's the girl who sits next to Leo.", "A estagiária nova começou hoje. É a moça que senta ao lado do Leo."],
        ["Sam", "The one who was at the party?", "Aquela que estava na festa?"],
        ["Bia", "No. The intern is the one whose sketches are on the wall.", "Não. A estagiária é aquela cujos desenhos estão na parede."],
        ["Sam", "Oh, the sketches which look like comics!", "Ah, os desenhos que parecem quadrinhos!"],
        ["Bia", "Exactly. She's from Mexico City, where Olivia studied.", "Exatamente. Ela é da Cidade do México, onde a Olivia estudou."],
        ["Sam", "Small world!", "Mundo pequeno!"],
        ["Bia", "And she recommended a restaurant that serves real tacos.", "E ela recomendou um restaurante que serve tacos de verdade."],
        ["Sam", "Now that's someone I want to meet.", "Agora sim, essa é uma pessoa que eu quero conhecer."]
      ],
      questions: [["Onde a estagiária senta?", ["Ao lado do Leo", "Ao lado da Olivia", "Na recepção"], 0], ["O que ela recomendou?", ["Um restaurante de tacos", "Um museu", "Um livro"], 0]]
    },
    vocab: [["boss", "chefe", "BÓS"], ["coworker", "colega de trabalho", "KÔU-uâr-ker"], ["intern", "estagiário", "ÍN-târn"], ["neighbor", "vizinho", "NÊI-ber"], ["owner", "dono", "ÔU-ner"], ["born", "nascido", "BÓRN"], ["recommend", "recomendar", "ré-ko-MÉND"], ["lend", "emprestar", "LÉND"], ["place", "lugar", "PLÊIS"], ["author", "autor", "Ó-ther"]],
    lesson: {
      why: "As orações relativas servem para explicar de quem ou do que você está falando, sem precisar fazer duas frases.",
      parts: [
        ["WHO para pessoas", "A mulher QUE ligou → The woman WHO called.", [["The woman who called is my boss.", "A mulher que ligou é minha chefe."], ["I have a friend who lives in London.", "Tenho uma amiga que mora em Londres."]]],
        ["WHICH para coisas", "O livro QUE comprei → The book WHICH I bought.", [["The app which I use is free.", "O app que eu uso é grátis."], ["I lost the bag which you gave me.", "Perdi a bolsa que você me deu."]]],
        ["THAT serve para os dois", "Na conversa, that substitui who e which. É o mais fácil de usar.", [["The man that helped me was kind.", "O homem que me ajudou foi gentil."], ["The car that I want is red.", "O carro que eu quero é vermelho."]]],
        ["WHERE para lugares, WHOSE para posse", "Where = onde. Whose = cujo, de quem.", [["The city where I was born is small.", "A cidade onde nasci é pequena."], ["The man whose car was stolen called the police.", "O homem cujo carro foi roubado chamou a polícia."]]]
      ],
      mistakes: [["The woman which called", "The woman who called", "Pessoa usa who."], ["The city which I was born", "The city where I was born", "Lugar onde: where."], ["The man who his car...", "The man whose car...", "Posse: whose."]],
      tip: "WHO = quem (gente). WHICH = qual (coisa). WHERE = onde (lugar)."
    },
    sentences: [
      ["The woman [who|which|where] called you is my boss.", "A mulher que te ligou é minha chefe."], ["This is the app [which|who|where] I use every day.", "Este é o aplicativo que eu uso todo dia."],
      ["That's the restaurant [where|which|who] we met.", "Aquele é o restaurante onde nos conhecemos."], ["I have a neighbor [whose|who's|which] dog barks all night.", "Tenho um vizinho cujo cachorro late a noite toda."],
      ["The city [where|which|who] I was born is small.", "A cidade onde nasci é pequena."], ["Do you know anyone [who|which|whose] speaks German?", "Você conhece alguém que fale alemão?"],
      ["The book [that|who|where] you lent me was amazing.", "O livro que você me emprestou foi incrível."], ["He's the author [whose|who|which] book I recommended.", "Ele é o autor cujo livro eu recomendei."]
    ],
    mission: {
      goal: "Apresente as pessoas e os lugares importantes da sua vida.",
      roleplay: "You are Sam. Ask the learner about important people and places in her life (a friend who..., a place where..., a thing which...). Encourage her to describe them with relative clauses.",
      writing: "Descreva 3 pessoas e 2 lugares importantes para você usando who, which, that e where.",
      model: "My mother is the person who helps me the most. Ana is a friend that always makes me laugh. My teacher is a woman who loves architecture. My favorite place is the park where I walk. My room is the place where I relax."
    }
  },
  {
    id: 23, level: "B1", title: "She said that...", titlePt: "Contar o que disseram · discurso indireto",
    goal: "Contar o que outras pessoas disseram e perguntaram.",
    episode: {
      title: "Fofoca no estúdio", scene: "O Leo chega correndo com uma novidade sobre a Olivia.",
      lines: [
        ["Leo", "Did you hear? Olivia said she was leaving for two months!", "Ficou sabendo? A Olivia disse que ia sair por dois meses!"],
        ["Bia", "What? She told me she would travel, but only for a week.", "O quê? Ela me disse que ia viajar, mas só por uma semana."],
        ["Leo", "She said she had a big project in Tokyo.", "Ela disse que tinha um projeto grande em Tóquio."],
        ["Bia", "And who will lead the studio?", "E quem vai comandar o estúdio?"],
        ["Leo", "She asked if you could do it.", "Ela perguntou se você podia fazer isso."],
        ["Bia", "Me?! Why didn't she ask me directly?", "Eu?! Por que ela não me perguntou direto?"],
        ["Leo", "She said she wanted to talk to you tomorrow. Act surprised!", "Ela disse que queria falar com você amanhã. Finja surpresa!"],
        ["Bia", "I'll try!", "Vou tentar!"]
      ],
      questions: [["Para onde a Olivia vai?", ["Tóquio", "Londres", "Lisboa"], 0], ["O que a Olivia perguntou?", ["Se a Bia podia comandar o estúdio", "Se a Bia queria ir junto", "Se o Leo podia viajar"], 0]]
    },
    vocab: [["say", "dizer (said)", "SÊI"], ["tell", "contar, dizer a alguém (told)", "TÉL"], ["ask", "perguntar, pedir", "ÉSK"], ["explain", "explicar", "iks-PLÊIN"], ["answer", "responder", "ÉN-ser"], ["mention", "mencionar", "MÉN-xen"], ["complain", "reclamar", "kom-PLÊIN"], ["agree", "concordar", "a-GRÍ"], ["suggest", "sugerir", "sâg-DJÉST"], ["admit", "admitir", "ad-MÍT"]],
    lesson: {
      why: "O discurso indireto serve para contar o que outra pessoa disse: 'ela disse que estava cansada'. Você faz isso o tempo todo em português.",
      parts: [
        ["O verbo dá um passo para trás", "A pessoa disse 'I am tired'. Você conta: She said she WAS tired. Igualzinho ao português: 'estou' vira 'estava'.", [["'I am busy.' → He said he was busy.", "'Estou ocupado.' → Ele disse que estava ocupado."], ["'I like it.' → She said she liked it.", "'Gosto disso.' → Ela disse que gostava."]]],
        ["Say ou tell?", "Say = dizer, sem falar para quem. Tell = dizer PARA alguém: tell + pessoa.", [["She said she was late.", "Ela disse que estava atrasada."], ["She told me she was late.", "Ela me disse que estava atrasada."]]],
        ["Will e can também mudam", "will → would · can → could.", [["'I will help.' → He said he would help.", "'Vou ajudar.' → Ele disse que ajudaria."], ["'I can come.' → She said she could come.", "'Posso vir.' → Ela disse que podia vir."]]],
        ["Contando perguntas", "Use asked e escreva como frase normal, sem do e did.", [["She asked where I lived.", "Ela perguntou onde eu morava."], ["He asked if I was OK.", "Ele perguntou se eu estava bem."]]]
      ],
      mistakes: [["She said me...", "She told me...", "Com a pessoa, use tell."], ["He asked where did I live.", "He asked where I lived.", "Pergunta contada vira frase normal."], ["She said she is tired. (falando de ontem)", "She said she was tired.", "O verbo volta um tempo."]],
      tip: "TELL tem alvo: tell ME, tell HER. SAY não precisa de ninguém."
    },
    sentences: [
      ["She said that she [was|is|were] tired.", "Ela disse que estava cansada."], ["He [told|said|say] me he was busy.", "Ele me disse que estava ocupado."],
      ["They said they [would|will|are] come later.", "Eles disseram que viriam mais tarde."], ["She [said|told|asked] that she loved the gift.", "Ela disse que amou o presente."],
      ["He asked me where I [lived|do live|live did].", "Ele me perguntou onde eu morava."], ["Ana said she [could|can|cans] help us.", "A Ana disse que podia nos ajudar."],
      ["My boss asked if I [had finished|have finish|finished did] the report.", "Meu chefe perguntou se eu tinha terminado o relatório."], ["Can you tell [me|to me|for me] what happened?", "Você pode me contar o que aconteceu?"]
    ],
    mission: {
      goal: "Conte ao Leo o que alguém te disse e perguntou recentemente.",
      roleplay: "You are Leo, curious about news. Ask the learner about a recent conversation she had with someone: what the person said, told her and asked. Encourage reported speech and react to the news.",
      writing: "Pense numa conversa recente com alguém e conte o que a pessoa disse e perguntou (use reported speech).",
      model: "Yesterday I talked to my friend. She said she was very tired. She told me she had a lot of work. She asked if I wanted to go to the movies. I said I couldn't because I had to study."
    }
  },
  {
    id: 24, level: "B1", title: "Don't give up!", titlePt: "Phrasal verbs do dia a dia",
    goal: "Usar os phrasal verbs que os nativos falam o tempo todo.",
    episode: {
      title: "Final da temporada", scene: "A Bia agora comanda o estúdio. Primeira noite depois do novo cargo.",
      lines: [
        ["Sam", "So you're the boss now! How do you feel?", "Então agora você é a chefe! Como se sente?"],
        ["Bia", "Nervous! Yesterday I almost gave up.", "Nervosa! Ontem eu quase desisti."],
        ["Sam", "Come on, you always figure things out.", "Que isso, você sempre dá um jeito."],
        ["Bia", "Thanks. I need to catch up on so many emails...", "Valeu. Preciso pôr em dia tantos e-mails..."],
        ["Sam", "First, take off your shoes and relax. I'll look after dinner.", "Primeiro, tira os sapatos e relaxa. Eu cuido do jantar."],
        ["Bia", "You? Cooking? We'll run out of food!", "Você? Cozinhando? Vamos ficar sem comida!"],
        ["Sam", "Ha ha. Turn on the TV, it's the last episode of the season.", "Haha. Liga a TV, é o último episódio da temporada."],
        ["Bia", "Like our season. I loved it.", "Como a nossa temporada. Eu amei."]
      ],
      questions: [["Como a Bia se sente?", ["Nervosa", "Entediada", "Triste"], 0], ["O que o Sam diz que vai fazer?", ["Cuidar do jantar", "Responder os e-mails", "Desligar a TV"], 0]]
    },
    vocab: [["give up", "desistir", "guiv ÂP"], ["find out", "descobrir", "fáin-DÁUT"], ["look for", "procurar", "luk FÓR"], ["look after", "cuidar de", "luk ÉF-ter"], ["turn off", "desligar", "târn ÓF"], ["put on", "vestir, colocar", "pu-RÓN"], ["take off", "tirar (roupa), decolar", "têik ÓF"], ["run out of", "ficar sem", "rân ÁUT ov"], ["figure out", "entender, dar um jeito", "fí-guer ÁUT"], ["catch up", "pôr em dia", "két-TCHÂP"]],
    lesson: {
      why: "Phrasal verbs são verbos com uma palavrinha grudada (up, out, off...) que muda o sentido. Os nativos usam o tempo todo: aprender os principais faz você entender muito mais séries e conversas.",
      parts: [
        ["A palavrinha muda tudo", "give = dar, mas give up = desistir. look = olhar, mas look for = procurar. Aprenda cada um como se fosse uma palavra nova.", [["Don't give up!", "Não desista!"], ["I'm looking for my phone.", "Estou procurando meu celular."]]],
        ["Os de casa e de roupa", "turn on/off = ligar/desligar · put on = vestir · take off = tirar (roupa).", [["Turn off the light.", "Desliga a luz."], ["Put on your jacket.", "Coloca a jaqueta."]]],
        ["Com pronome, ele fica no meio", "Com it, them, her, o pronome vai no meio: turn it off, e não turn off it.", [["Turn it off, please.", "Desliga isso, por favor."], ["Put them on.", "Coloca eles."]]],
        ["Os do dia a dia", "find out = descobrir · run out of = ficar sem · look after = cuidar · catch up = pôr em dia · figure out = entender, resolver.", [["We ran out of milk.", "Ficamos sem leite."], ["I need to catch up on my sleep.", "Preciso pôr meu sono em dia."]]]
      ],
      mistakes: [["Turn off it.", "Turn it off.", "O pronome fica no meio."], ["I look for my mother. (querendo dizer 'cuidar')", "I look after my mother.", "Cuidar é look after. Look for é procurar."], ["We ran out milk.", "We ran out of milk.", "Não esqueça o of."]],
      tip: "Crie uma frase SUA com cada phrasal verb, sobre a sua vida. Fica muito mais fácil lembrar."
    },
    sentences: [
      ["Don't give [up|in|off]! You can do it.", "Não desista! Você consegue."], ["I'm looking [for|after|out] my keys.", "Estou procurando minhas chaves."],
      ["Can you turn [it off|off it|it out]?", "Pode desligar isso?"], ["We ran [out of|out|off] coffee.", "Ficamos sem café."],
      ["She looks [after|for|up] her little brother.", "Ela cuida do irmão mais novo."], ["I just found [out|up|off] the truth.", "Acabei de descobrir a verdade."],
      ["Put [on|in|off] your jacket, it's cold.", "Coloca a jaqueta, está frio."], ["I need to catch [up|out|off] on my emails.", "Preciso pôr meus e-mails em dia."]
    ],
    mission: {
      goal: "Converse com o Sam sobre a sua semana usando phrasal verbs.",
      roleplay: "You are Sam at home in the evening. Chat with the learner about her week, problems and plans, and naturally use and encourage phrasal verbs (give up, find out, run out of, look after, catch up, figure out).",
      writing: "Escreva sobre sua semana usando pelo menos 5 phrasal verbs desta unidade.",
      model: "This week I got up early every day. On Monday I ran out of coffee! I looked for my keys for 20 minutes. I found out that my friend is moving. On Sunday I'm going to catch up on my sleep."
    }
  }
];

if (typeof module !== "undefined") module.exports = { UNITS_B1 };
