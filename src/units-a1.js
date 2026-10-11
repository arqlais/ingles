// Nível A1 · Temporada 1: "Chegando em Nova York"
// Formato de cada unidade: veja o comentário no topo de data.js.

const UNITS_A1 = [
  {
    id: 1, level: "A1", title: "Hello! Nice to meet you", titlePt: "Se apresentar · verbo to be",
    goal: "Dizer seu nome, de onde você é, o que faz e como está.",
    episode: {
      title: "O colega de apartamento", scene: "A Bia acabou de chegar em Nova York. Ela toca a campainha do apartamento novo e quem abre a porta é o Sam.",
      lines: [
        ["Sam", "Hi! Are you Bia?", "Oi! Você é a Bia?"],
        ["Bia", "Yes, I am! Nice to meet you.", "Sim, sou eu! Prazer em te conhecer."],
        ["Sam", "Nice to meet you too. I'm Sam. Welcome to New York!", "Prazer também. Eu sou o Sam. Bem-vinda a Nova York!"],
        ["Bia", "Thanks! I'm so happy to be here.", "Obrigada! Estou tão feliz de estar aqui."],
        ["Sam", "Where are you from?", "De onde você é?"],
        ["Bia", "I'm from Brazil. I'm an architect.", "Sou do Brasil. Sou arquiteta."],
        ["Sam", "Cool! Are you tired?", "Legal! Você está cansada?"],
        ["Bia", "Yes, a little. It's a long flight!", "Sim, um pouco. É um voo longo!"]
      ],
      questions: [["De onde a Bia é?", ["Do Brasil", "De Nova York", "De Portugal"], 0], ["Como a Bia está?", ["Um pouco cansada", "Muito triste", "Com fome"], 0]]
    },
    vocab: [["hello", "olá", "rê-LOU"], ["nice to meet you", "prazer em te conhecer", "náis tu MÍT iu"], ["name", "nome", "NÊIM"], ["friend", "amigo, amiga", "FRÉND"], ["country", "país", "KÂN-tri"], ["city", "cidade", "SÍ-ri"], ["student", "estudante", "STÚ-dent"], ["teacher", "professor, professora", "TÍ-tcher"], ["happy", "feliz", "RÉ-pi"], ["tired", "cansado, cansada", "TÁI-erd"]],
    lesson: {
      why: "O verbo to be é o mais importante do inglês. Ele sozinho significa SER e ESTAR. Com ele você diz quem você é, de onde é e como está. Repare: no episódio ele aparece em quase todas as falas.",
      parts: [
        ["Ser e estar são a mesma palavra", "Em português temos 'ser' e 'estar'. Em inglês é tudo to be. Quem mostra o sentido é o resto da frase.", [["I am a student.", "Eu sou estudante."], ["I am tired.", "Eu estou cansada."]]],
        ["Cada pessoa tem a sua forma", "São só 3 formas: AM só com I (eu). IS com uma pessoa ou coisa (he, she, it). ARE com todo o resto (you, we, they).", [["I am from Brazil.", "Eu sou do Brasil."], ["She is my friend.", "Ela é minha amiga."], ["They are at home.", "Eles estão em casa."]]],
        ["O jeito curto de falar", "Na conversa, as palavras se juntam com um apóstrofo: I am → I'm, she is → she's, they are → they're. Significa a mesma coisa, só é mais rápido.", [["I'm happy.", "Estou feliz."], ["We're friends.", "Somos amigos."]]],
        ["Negar e perguntar", "Para negar, coloque NOT depois do verbo (is not = isn't). Para perguntar, troque de lugar: o verbo vai para o começo.", [["He isn't here.", "Ele não está aqui."], ["Are you OK?", "Você está bem?"]]]
      ],
      mistakes: [["I tired.", "I am tired.", "Em inglês o verbo nunca some. Sempre precisa do am, is ou are."], ["She are my sister.", "She is my sister.", "She é uma pessoa só: usa IS."], ["You are tired?", "Are you tired?", "Na pergunta, o verbo vai para a frente."]],
      tip: "Cante como musiquinha: I AM, you ARE, he-she-it IS, we ARE, they ARE."
    },
    sentences: [
      ["I [am|is|are] from Brazil.", "Eu sou do Brasil."], ["She [is|am|are] my friend.", "Ela é minha amiga."],
      ["We [are|is|am] students.", "Nós somos estudantes."], ["[Are|Is|Am] you tired?", "Você está cansado?"],
      ["He [isn't|aren't|am not] a teacher.", "Ele não é professor."], ["My name [is|are|am] Bia.", "Meu nome é Bia."],
      ["They [are|is|am] in New York.", "Eles estão em Nova York."], ["It [is|are|am] a big city.", "É uma cidade grande."]
    ],
    mission: {
      goal: "Apresente-se para o Sam: seu nome, de onde você é, o que faz e como está hoje.",
      roleplay: "You are Sam, Bia's friendly new roommate in New York. The learner just arrived at the apartment. Ask her name, where she is from, what she does and how she feels.",
      writing: "Apresente-se em 3 a 5 frases: seu nome, de onde você é, o que você faz e como está hoje.",
      model: "Hi! My name is Laís. I'm from Santo André, in Brazil. I'm a designer and a student. Today I'm happy, but I'm a little tired."
    }
  },
  {
    id: 2, level: "A1", title: "This is my family", titlePt: "Família · meu, dele, dela · this e that",
    goal: "Mostrar sua família e dizer de quem é cada coisa.",
    episode: {
      title: "Fotos na geladeira", scene: "A Bia colou fotos da família na geladeira. O Sam fica curioso.",
      lines: [
        ["Sam", "Who is this?", "Quem é esta?"],
        ["Bia", "This is my mother. Her name is Rosa.", "Esta é minha mãe. O nome dela é Rosa."],
        ["Sam", "She's beautiful! And this man?", "Ela é linda! E este homem?"],
        ["Bia", "That's my father, João. And these are my brothers.", "Aquele é meu pai, João. E estes são meus irmãos."],
        ["Sam", "What are their names?", "Como eles se chamam?"],
        ["Bia", "Pedro and Lucas. Pedro's dog is in the photo too!", "Pedro e Lucas. O cachorro do Pedro está na foto também!"],
        ["Sam", "Ha! What's his name?", "Haha! Qual é o nome dele?"],
        ["Bia", "His name is Bolinha.", "O nome dele é Bolinha."]
      ],
      questions: [["Como se chama a mãe da Bia?", ["Rosa", "Ana", "Lúcia"], 0], ["Quem é o Bolinha?", ["O cachorro do Pedro", "O irmão da Bia", "O pai da Bia"], 0]]
    },
    vocab: [["mother", "mãe", "MÂ-dher"], ["father", "pai", "FÁ-dher"], ["sister", "irmã", "SÍS-ter"], ["brother", "irmão", "BRÂ-dher"], ["son", "filho", "SÂN"], ["daughter", "filha", "DÓ-ter"], ["husband", "marido", "RÂZ-bend"], ["wife", "esposa", "UÁIF"], ["parents", "pais (pai e mãe)", "PÉ-rents"], ["cousin", "primo, prima", "KÂ-zen"]],
    lesson: {
      why: "Aqui você aprende a dizer de quem é cada coisa (meu, seu, dele, dela) e a apontar para coisas que estão perto ou longe.",
      parts: [
        ["Meu, seu, dele...", "my = meu/minha · your = seu/sua · his = dele · her = dela · our = nosso · their = deles. Eles nunca mudam: my car, my cars, my mother.", [["This is my phone.", "Este é meu celular."], ["Our house is small.", "Nossa casa é pequena."]]],
        ["His ou her? Olhe para o dono", "Igual ao português 'dele' e 'dela': his se o dono é homem, her se a dona é mulher. Não importa a coisa.", [["Pedro and his mother.", "Pedro e a mãe dele."], ["Ana and her brother.", "Ana e o irmão dela."]]],
        ["Perto ou longe", "this = este (perto, um) · these = estes (perto, vários) · that = aquele (longe, um) · those = aqueles (longe, vários).", [["This is my bag.", "Esta é minha bolsa."], ["Those are my keys.", "Aquelas são minhas chaves."]]],
        ["O 's de posse", "Para dizer 'o cachorro do Pedro', o inglês inverte: Pedro's dog. Primeiro o dono com 's, depois a coisa.", [["It's Ana's car.", "É o carro da Ana."], ["My mother's name is Rosa.", "O nome da minha mãe é Rosa."]]]
      ],
      mistakes: [["Ana and his husband.", "Ana and her husband.", "A dona é a Ana (mulher), então é her."], ["The dog of Pedro.", "Pedro's dog.", "Use o 's: dono + 's + coisa."], ["This are my parents.", "These are my parents.", "Para várias coisas perto, use these."]],
      tip: "THIS é 'tá aqui', pertinho. THAT é 'tá lá', longe."
    },
    sentences: [
      ["This is [my|me|I] mother.", "Esta é minha mãe."], ["Ana and [her|his|she] husband live in Brooklyn.", "Ana e o marido dela moram no Brooklyn."],
      ["Pedro is my brother. [His|Her|He] dog is small.", "Pedro é meu irmão. O cachorro dele é pequeno."], ["[These|This|That] are my parents.", "Estes são meus pais."],
      ["Is [that|those|these] your car?", "Aquele é o seu carro?"], ["It's my [sister's|sisters|sister] phone.", "É o celular da minha irmã."],
      ["[Our|We|Us] house is small.", "Nossa casa é pequena."], ["They love [their|there|they] children.", "Eles amam os filhos deles."]
    ],
    mission: {
      goal: "Mostre sua família para o Sam: quem é cada pessoa, como se chama e como ela é.",
      roleplay: "You are Sam. The learner is showing you photos of her family. Ask who each person is, their names and what they are like.",
      writing: "Descreva sua família em 4 a 6 frases: quem são, como se chamam e uma característica de cada um.",
      model: "This is my family. My mother's name is Rosa. She is very kind. My father is João. He is funny. I have one brother. His name is Pedro and he is tall."
    }
  },
  {
    id: 3, level: "A1", title: "What time is it?", titlePt: "Horas e dias · at, on, in",
    goal: "Dizer horários e dias e marcar compromissos.",
    episode: {
      title: "Primeiro dia no estúdio", scene: "A Bia começa a trabalhar no Linea Studio. A chefe, Olivia, explica os horários.",
      lines: [
        ["Olivia", "Welcome to Linea Studio, Bia!", "Bem-vinda ao Linea Studio, Bia!"],
        ["Bia", "Thank you! What time do we start?", "Obrigada! Que horas a gente começa?"],
        ["Olivia", "We start at nine, Monday to Friday.", "Começamos às nove, de segunda a sexta."],
        ["Bia", "And the team meeting?", "E a reunião da equipe?"],
        ["Olivia", "It's on Wednesday, at ten thirty.", "É na quarta, às dez e meia."],
        ["Bia", "Perfect. Is the office open on the weekend?", "Perfeito. O escritório abre no fim de semana?"],
        ["Olivia", "No, it isn't. And in the evening you're free.", "Não. E à noite você está livre."],
        ["Bia", "Great! See you tomorrow morning.", "Ótimo! Até amanhã de manhã."]
      ],
      questions: [["Que horas o trabalho começa?", ["Às nove", "Às dez e meia", "Ao meio-dia"], 0], ["Quando é a reunião da equipe?", ["Quarta, às 10h30", "Segunda, às 9h", "Sexta à noite"], 0]]
    },
    vocab: [["Monday", "segunda-feira", "MÂN-dei"], ["Wednesday", "quarta-feira", "UÉNZ-dei"], ["weekend", "fim de semana", "UÍK-end"], ["morning", "manhã", "MÓR-ning"], ["afternoon", "tarde", "éf-ter-NÚN"], ["evening", "noite (começo)", "ÍV-ning"], ["today", "hoje", "tu-DÊI"], ["tomorrow", "amanhã", "tu-MÁ-rou"], ["early", "cedo", "ÂR-li"], ["late", "tarde, atrasado", "LÊIT"]],
    lesson: {
      why: "Para marcar qualquer coisa você precisa de horas, dias e três palavrinhas: at, on e in. Todas significam 'em', mas cada uma tem a sua vez.",
      parts: [
        ["Dizendo as horas", "O jeito mais fácil: fale os números. 7:30 = seven thirty. 9:15 = nine fifteen. Hora cheia: seven o'clock.", [["It's seven thirty.", "São sete e meia."], ["It's ten o'clock.", "São dez horas."]]],
        ["AT = horário exato", "Use at com horas e momentos bem certinhos.", [["The class is at 7.", "A aula é às 7."], ["I sleep at midnight.", "Eu durmo à meia-noite."]]],
        ["ON = dia", "Use on com dias da semana e datas.", [["I work on Saturday.", "Eu trabalho no sábado."], ["My birthday is on May 5th.", "Meu aniversário é em 5 de maio."]]],
        ["IN = período maior", "Use in com meses, anos e partes do dia.", [["I was born in 1999.", "Eu nasci em 1999."], ["I study in the morning.", "Eu estudo de manhã."]]]
      ],
      mistakes: [["in Monday", "on Monday", "Dia da semana usa on."], ["at the morning", "in the morning", "Parte do dia usa in (a exceção é at night)."], ["It's 7 hours.", "It's 7 o'clock.", "Para dizer as horas, não se usa 'hours'."]],
      tip: "Imagine uma pirâmide: IN é o maior (mês, ano), ON é o do meio (dia), AT é a pontinha (hora exata)."
    },
    sentences: [
      ["The meeting is [at|on|in] 10 o'clock.", "A reunião é às 10 horas."], ["I go to the gym [on|in|at] Mondays.", "Eu vou à academia às segundas."],
      ["My birthday is [in|on|at] March.", "Meu aniversário é em março."], ["I study English [in|on|at] the morning.", "Eu estudo inglês de manhã."],
      ["It's ten [thirty|thirteen|three] now.", "Agora são dez e meia."], ["I'm always [late|early|tomorrow] for class. Sorry!", "Estou sempre atrasada para a aula. Desculpa!"],
      ["What time [is|are|do] it?", "Que horas são?"], ["The store opens [at|in|on] 9 a.m.", "A loja abre às 9 da manhã."]
    ],
    mission: {
      goal: "Combine seus horários com a Olivia usando at, on e in.",
      roleplay: "You are Olivia, Bia's boss at Linea Studio. Explain the work schedule and ask the learner about her availability: which days, what time, morning or afternoon.",
      writing: "Escreva sobre a sua semana: o que você faz em alguns dias e em quais horários (use at, on e in).",
      model: "On Mondays I work from nine to six. On Wednesdays I study English at 8 p.m. On Saturdays I go to the gym in the morning. I sleep late on the weekend."
    }
  },
  {
    id: 4, level: "A1", title: "My daily routine", titlePt: "Rotina · presente simples",
    goal: "Contar o que você faz no dia a dia.",
    episode: {
      title: "A madrugadora", scene: "O Leo, colega britânico do estúdio, não entende como a Bia chega tão cedo.",
      lines: [
        ["Leo", "You always arrive so early!", "Você sempre chega tão cedo!"],
        ["Bia", "I wake up at six. I like the morning.", "Eu acordo às seis. Gosto da manhã."],
        ["Leo", "Six?! That's crazy.", "Seis?! Que loucura."],
        ["Bia", "I take a shower, I have breakfast and I walk to work.", "Tomo banho, tomo café e venho a pé para o trabalho."],
        ["Leo", "Sam says you cook every night too.", "O Sam diz que você cozinha toda noite também."],
        ["Bia", "Yes! Sam watches TV and I cook. It's a good deal.", "Sim! O Sam vê TV e eu cozinho. É um bom acordo."],
        ["Leo", "And he never cooks?", "E ele nunca cozinha?"],
        ["Bia", "Never! But he always washes the dishes.", "Nunca! Mas ele sempre lava a louça."]
      ],
      questions: [["Que horas a Bia acorda?", ["Às seis", "Às nove", "Às sete"], 0], ["O que o Sam sempre faz?", ["Lava a louça", "Cozinha", "Acorda cedo"], 0]]
    },
    vocab: [["wake up", "acordar", "uêik ÂP"], ["get up", "levantar-se", "gué-RÂP"], ["have breakfast", "tomar café da manhã", "rév BRÉK-fâst"], ["go to work", "ir trabalhar", "gôu tu UÂRK"], ["take a shower", "tomar banho", "têik a XÁU-er"], ["cook", "cozinhar", "KUK"], ["watch TV", "ver TV", "uótch ti-VÍ"], ["go to bed", "ir dormir", "gôu tu BÉD"], ["always", "sempre", "ÓL-ueiz"], ["never", "nunca", "NÉ-ver"]],
    lesson: {
      why: "O presente simples é o tempo da rotina: o que você faz sempre, todo dia ou de vez em quando. No episódio, a Bia conta a rotina dela com ele.",
      parts: [
        ["O verbo fica igualzinho", "Com I, you, we e they o verbo não muda nada. É só colocar depois da pessoa.", [["I work every day.", "Eu trabalho todo dia."], ["We live in Brooklyn.", "Nós moramos no Brooklyn."]]],
        ["He, she e it ganham S", "A regra mais importante: quando é ele, ela ou uma coisa, o verbo ganha um S no final.", [["She works at home.", "Ela trabalha em casa."], ["He lives with his parents.", "Ele mora com os pais."]]],
        ["Quando o S vira ES ou IES", "Verbos terminados em o, ch, sh, ss, x ganham ES: go → goes, watch → watches. Consoante + y vira IES: study → studies. E have vira has.", [["He goes to the gym.", "Ele vai à academia."], ["She studies at night.", "Ela estuda à noite."]]],
        ["Com que frequência?", "always (sempre), usually (geralmente), sometimes (às vezes) e never (nunca) ficam ANTES do verbo.", [["I always drink coffee.", "Eu sempre tomo café."], ["She never cooks.", "Ela nunca cozinha."]]]
      ],
      mistakes: [["She work at home.", "She works at home.", "Com she, o verbo ganha S."], ["I works.", "I work.", "O S é só para he, she e it."], ["I drink always coffee.", "I always drink coffee.", "Always vem antes do verbo."]],
      tip: "O S do SHE: he, SHE, it → o verbo ganha S."
    },
    sentences: [
      ["She [works|work|working] from home.", "Ela trabalha de casa."], ["I [wake|wakes|waking] up at 7.", "Eu acordo às 7."],
      ["He [watches|watchs|watch] TV at night.", "Ele vê TV à noite."], ["My brother [studies|studys|study] architecture.", "Meu irmão estuda arquitetura."],
      ["We [have|has|haves] lunch at noon.", "Nós almoçamos ao meio-dia."], ["Bia [goes|gos|go] to the studio every day.", "A Bia vai ao estúdio todo dia."],
      ["I [usually|usual|use] take a shower in the morning.", "Eu geralmente tomo banho de manhã."], ["It [rains|rain|raining] a lot in London.", "Chove muito em Londres."]
    ],
    mission: {
      goal: "Conte sua rotina para o Leo.",
      roleplay: "You are Leo, Bia's friendly British coworker. Ask the learner about her daily routine: what time she wakes up, what she does in the morning, in the evening and on weekends.",
      writing: "Descreva sua rotina num dia normal, da hora em que acorda até a hora em que vai dormir (5 a 8 frases).",
      model: "I wake up at seven. I have breakfast and I take a shower. I work from home in the morning. In the afternoon I study. I usually cook dinner at eight. I go to bed at eleven."
    }
  },
  {
    id: 5, level: "A1", title: "Do you like coffee?", titlePt: "Perguntas e negativas · do e does",
    goal: "Fazer perguntas e dizer do que gosta e do que não gosta.",
    episode: {
      title: "Hora do almoço", scene: "Bia e Leo almoçam numa lanchonete perto do estúdio.",
      lines: [
        ["Leo", "Do you want coffee?", "Você quer café?"],
        ["Bia", "No, thanks. I don't drink coffee after lunch.", "Não, obrigada. Não tomo café depois do almoço."],
        ["Leo", "Really? Do you like tea?", "Sério? Você gosta de chá?"],
        ["Bia", "Yes, I do. Does Olivia eat here?", "Gosto. A Olivia come aqui?"],
        ["Leo", "No, she doesn't. She doesn't eat meat, and this place is all burgers!", "Não. Ela não come carne, e aqui é só hambúrguer!"],
        ["Bia", "What does she eat?", "O que ela come?"],
        ["Leo", "Salads and spicy vegetables. She loves spicy food.", "Saladas e legumes apimentados. Ela ama comida apimentada."],
        ["Bia", "I hate spicy food!", "Eu odeio comida apimentada!"]
      ],
      questions: [["Por que a Olivia não come ali?", ["Ela não come carne", "Ela não gosta de chá", "Ela não tem tempo"], 0], ["A Bia gosta de comida apimentada?", ["Não, ela odeia", "Sim, ela ama", "Às vezes"], 0]]
    },
    vocab: [["like", "gostar", "LÁIK"], ["love", "amar", "LÂV"], ["hate", "odiar", "RÊIT"], ["want", "querer", "UÓNT"], ["coffee", "café", "KÓ-fi"], ["tea", "chá", "TÍ"], ["meat", "carne", "MÍT"], ["vegetables", "legumes, verduras", "VÉDJ-tâ-bols"], ["sweet", "doce", "SUÍT"], ["spicy", "apimentado", "SPÁI-si"]],
    lesson: {
      why: "Para perguntar e negar no presente, o inglês usa um ajudante: DO (ou DOES). Ele não tem tradução. Pense nele como uma peça de montar frase.",
      parts: [
        ["Negar: don't e doesn't", "Coloque don't antes do verbo. Com he, she e it, use doesn't. Quando aparece doesn't, o verbo perde o S, porque o S já foi para o does.", [["I don't like tea.", "Eu não gosto de chá."], ["She doesn't eat meat.", "Ela não come carne."]]],
        ["Perguntar: do e does no começo", "Coloque Do no começo (ou Does com he, she e it). O resto da frase fica igual.", [["Do you like coffee?", "Você gosta de café?"], ["Does he work here?", "Ele trabalha aqui?"]]],
        ["Respostas curtinhas", "Não precisa repetir tudo. Responda com o ajudante: Yes, I do. No, I don't.", [["Do you speak English? Yes, I do.", "Você fala inglês? Falo."], ["Does she drive? No, she doesn't.", "Ela dirige? Não."]]],
        ["O quê, onde, quando", "Coloque a palavra de pergunta antes do do/does: What, Where, When, Why, How.", [["Where do you live?", "Onde você mora?"], ["What does she do?", "O que ela faz (de profissão)?"]]]
      ],
      mistakes: [["You like coffee?", "Do you like coffee?", "Pergunta no presente precisa do Do no começo."], ["She doesn't works.", "She doesn't work.", "Depois de doesn't, o verbo fica sem S."], ["I no like.", "I don't like.", "Para negar, use don't, nunca 'no'."]],
      tip: "O DO é o carimbo da pergunta: sem ele, a frase não vira pergunta."
    },
    sentences: [
      ["I [don't|doesn't|not] like spicy food.", "Eu não gosto de comida apimentada."], ["[Do|Does|Are] you drink coffee?", "Você toma café?"],
      ["She [doesn't|don't|isn't] eat meat.", "Ela não come carne."], ["[Does|Do|Is] he live in New York?", "Ele mora em Nova York?"],
      ["What [do|does|are] you do?", "O que você faz?"], ["Where does she [work|works|working]?", "Onde ela trabalha?"],
      ["Yes, I [do|does|am].", "Sim, gosto."], ["They [don't|doesn't|aren't] like tea.", "Eles não gostam de chá."]
    ],
    mission: {
      goal: "Diga do que você gosta e não gosta e faça perguntas ao Leo.",
      roleplay: "You are Leo at lunch with the learner. Ask what food and drinks she likes and doesn't like, and answer her questions too. Use do and does naturally.",
      writing: "Escreva do que você gosta e não gosta de comer e beber. Faça também 2 perguntas para um amigo.",
      model: "I love coffee, but I don't like tea. I like vegetables and I don't eat much meat. I hate spicy food! Do you like pizza? What do you eat for breakfast?"
    }
  },
  {
    id: 6, level: "A1", title: "Around the neighborhood", titlePt: "There is, there are · onde fica",
    goal: "Dizer o que tem em um lugar e onde as coisas ficam.",
    episode: {
      title: "Explorando o Brooklyn", scene: "No primeiro sábado, o Sam leva a Bia para conhecer o bairro.",
      lines: [
        ["Sam", "So, this is our neighborhood!", "Então, este é o nosso bairro!"],
        ["Bia", "Is there a supermarket near here?", "Tem um supermercado aqui perto?"],
        ["Sam", "Yes, there is. It's next to the bank, on this street.", "Tem sim. Fica ao lado do banco, nesta rua."],
        ["Bia", "And a pharmacy?", "E uma farmácia?"],
        ["Sam", "There are two pharmacies, between the park and the school.", "Tem duas farmácias, entre o parque e a escola."],
        ["Bia", "Great. Are there any good cafés?", "Ótimo. Tem algum café bom?"],
        ["Sam", "The best one is behind our building.", "O melhor fica atrás do nosso prédio."],
        ["Bia", "Behind our building? Perfect!", "Atrás do nosso prédio? Perfeito!"]
      ],
      questions: [["Onde fica o supermercado?", ["Ao lado do banco", "Atrás do prédio", "Entre o parque e a escola"], 0], ["Quantas farmácias tem no bairro?", ["Duas", "Uma", "Nenhuma"], 0]]
    },
    vocab: [["bank", "banco", "BÉNK"], ["pharmacy", "farmácia", "FÁR-ma-si"], ["supermarket", "supermercado", "SÚ-per-már-ket"], ["street", "rua", "STRÍT"], ["park", "parque", "PÁRK"], ["near", "perto", "NÍR"], ["far", "longe", "FÁR"], ["next to", "ao lado de", "NÉKS tu"], ["between", "entre", "bi-TUÍN"], ["behind", "atrás de", "bi-RÁIND"]],
    lesson: {
      why: "There is e there are servem para dizer que alguma coisa EXISTE num lugar. É o nosso 'tem' ou 'há': tem um banco aqui.",
      parts: [
        ["Tem um / tem vários", "There is para uma coisa só. There are para várias.", [["There is a bank here.", "Tem um banco aqui."], ["There are two parks.", "Tem dois parques."]]],
        ["Esse 'tem' não é HAVE", "Em português dizemos 'tem um mercado aqui'. Em inglês, esse 'tem' NÃO é have. Have é para o que é SEU (eu tenho um carro).", [["There is a market near here.", "Tem um mercado aqui perto."], ["I have a car.", "Eu tenho um carro."]]],
        ["Negar e perguntar", "Negar: there isn't / there aren't. Perguntar: Is there...? / Are there...?", [["Is there a pharmacy near here?", "Tem uma farmácia aqui perto?"], ["There aren't any buses today.", "Não tem ônibus hoje."]]],
        ["Onde está?", "in = dentro · on = em cima · under = embaixo · next to = ao lado · between = entre · in front of = na frente · behind = atrás.", [["The keys are on the table.", "As chaves estão em cima da mesa."], ["The bank is next to the park.", "O banco fica ao lado do parque."]]]
      ],
      mistakes: [["Have a bank here.", "There is a bank here.", "Para dizer que existe, use there is."], ["There is two cars.", "There are two cars.", "Mais de uma coisa: there are."], ["The cat is in the table.", "The cat is on the table.", "Em cima de uma superfície é on."]],
      tip: "HAVE = o que é seu. THERE IS = o que existe ali."
    },
    sentences: [
      ["There [is|are|have] a pharmacy on this street.", "Tem uma farmácia nesta rua."], ["There [are|is|has] three bedrooms in my apartment.", "Tem três quartos no meu apartamento."],
      ["[Is|Are|Have] there a supermarket near here?", "Tem um supermercado aqui perto?"], ["The bank is [next|near|between] to the park.", "O banco fica ao lado do parque."],
      ["The cat is [under|between|next] the table.", "O gato está embaixo da mesa."], ["There [aren't|isn't|don't] any parks in my neighborhood.", "Não tem parques no meu bairro."],
      ["My house is [between|next|behind] the school and the church.", "Minha casa fica entre a escola e a igreja."], ["The car is [in front of|in front|front of] the building.", "O carro está na frente do prédio."]
    ],
    mission: {
      goal: "Descreva o que tem perto da sua casa e onde cada coisa fica.",
      roleplay: "You are a friendly neighbor. Ask the learner what there is near her home (shops, parks, transport) and where things are. Use there is/are and prepositions of place.",
      writing: "Descreva seu bairro ou sua casa usando there is, there are e preposições de lugar.",
      model: "I live in a small apartment. There are two bedrooms and there is one bathroom. There is a supermarket next to my building. There aren't any parks near my house, but there is a nice café."
    }
  },
  {
    id: 7, level: "A1", title: "I can do it!", titlePt: "Can e could · habilidades e pedidos",
    goal: "Dizer o que você sabe fazer e pedir ajuda com educação.",
    episode: {
      title: "Noite de talentos", scene: "O estúdio vai fazer uma noite de talentos. O Leo está montando o programa.",
      lines: [
        ["Leo", "Friday is talent night. Can you sing?", "Sexta é a noite de talentos. Você sabe cantar?"],
        ["Bia", "No, I can't! But I can draw very fast.", "Não sei! Mas sei desenhar muito rápido."],
        ["Leo", "Great! You can draw portraits of the team.", "Ótimo! Você pode desenhar retratos da equipe."],
        ["Bia", "And you? What can you do?", "E você? O que você sabe fazer?"],
        ["Leo", "I can play the guitar. And Olivia can dance salsa!", "Eu sei tocar violão. E a Olivia sabe dançar salsa!"],
        ["Bia", "Really? Can I watch the rehearsal?", "Sério? Posso ver o ensaio?"],
        ["Leo", "Of course. Could you bring your pencils?", "Claro. Você poderia trazer seus lápis?"],
        ["Bia", "Sure!", "Claro!"]
      ],
      questions: [["O que a Bia sabe fazer?", ["Desenhar rápido", "Cantar", "Tocar violão"], 0], ["Quem sabe dançar salsa?", ["A Olivia", "O Leo", "O Sam"], 0]]
    },
    vocab: [["swim", "nadar", "SUÍM"], ["drive", "dirigir", "DRÁIV"], ["draw", "desenhar", "DRÓ"], ["sing", "cantar", "SÍNG"], ["dance", "dançar", "DÉNS"], ["speak", "falar (um idioma)", "SPÍK"], ["ride a bike", "andar de bicicleta", "ráid a BÁIK"], ["play the guitar", "tocar violão", "plêi dhe gui-TÁR"], ["help", "ajudar", "RÉLP"], ["borrow", "pegar emprestado", "BÓ-rou"]],
    lesson: {
      why: "Can é uma palavrinha mágica: serve para dizer que você SABE fazer algo, que PODE fazer algo e para PEDIR favores.",
      parts: [
        ["Saber fazer", "can + verbo = sei fazer / consigo fazer.", [["I can swim.", "Eu sei nadar."], ["She can speak Spanish.", "Ela sabe falar espanhol."]]],
        ["Can nunca muda", "Can é igual para todo mundo (nada de 'cans') e o verbo depois dele vem puro: sem TO e sem S.", [["He can draw.", "Ele sabe desenhar."], ["We can help.", "Nós podemos ajudar."]]],
        ["Não sei / não posso", "Negativa: can't. Pergunta: coloque Can no começo.", [["I can't drive.", "Eu não sei dirigir."], ["Can you help me?", "Você pode me ajudar?"]]],
        ["Pedir com educação", "Could é a versão mais educada do can. Use com quem você não conhece.", [["Could you repeat, please?", "Você poderia repetir, por favor?"], ["Could I sit here?", "Eu poderia sentar aqui?"]]]
      ],
      mistakes: [["She cans swim.", "She can swim.", "Can nunca ganha S."], ["I can to go.", "I can go.", "Depois de can, o verbo vem sem to."], ["You can help me?", "Can you help me?", "Na pergunta, can vai para o começo."]],
      tip: "Escute a força: can soa fraquinho, 'ken'. Can't soa forte e comprido, 'KÉNT'. É assim que se percebe o 'não'."
    },
    sentences: [
      ["I [can|cans|can to] speak a little English.", "Eu sei falar um pouco de inglês."], ["She can [draw|draws|to draw] very well.", "Ela desenha muito bem."],
      ["I [can't|don't can|not can] drive.", "Eu não sei dirigir."], ["[Can|Do|Are] you help me, please?", "Você pode me ajudar, por favor?"],
      ["[Can|Does|Is] he play the guitar?", "Ele sabe tocar violão?"], ["Could I [borrow|borrows|to borrow] your pen?", "Posso pegar sua caneta emprestada?"],
      ["We can't [swim|swimming|swims] here.", "Não podemos nadar aqui."], ["My mother can [sing|sings|singing] beautifully.", "Minha mãe canta lindamente."]
    ],
    mission: {
      goal: "Conte ao Leo o que você sabe e não sabe fazer e faça um pedido educado.",
      roleplay: "You are Leo organizing a talent night at the studio. Ask the learner what she can and can't do, and invite her to make polite requests with could.",
      writing: "Escreva 3 coisas que você sabe fazer, 3 que não sabe e 1 coisa que você gostaria de aprender.",
      model: "I can draw and I can speak a little English. I can cook pasta. I can't swim, I can't sing and I can't drive. I would like to learn to dance."
    }
  },
  {
    id: 8, level: "A1", title: "What are you doing?", titlePt: "Agora mesmo · presente contínuo",
    goal: "Contar o que está acontecendo neste momento.",
    episode: {
      title: "Uma ligação na chuva", scene: "Fim do dia. Está chovendo e o Sam liga para a Bia.",
      lines: [
        ["Sam", "Hey Bia! What are you doing?", "Oi Bia! O que você está fazendo?"],
        ["Bia", "I'm waiting for the bus. It's raining a lot!", "Estou esperando o ônibus. Está chovendo muito!"],
        ["Sam", "Are you wearing your jacket?", "Você está de jaqueta?"],
        ["Bia", "Yes, but I'm not carrying an umbrella.", "Sim, mas não estou com guarda-chuva."],
        ["Sam", "I'm cooking pasta right now. Come home fast!", "Estou fazendo macarrão agora. Vem logo!"],
        ["Bia", "You're cooking? You never cook!", "Você está cozinhando? Você nunca cozinha!"],
        ["Sam", "Today is special. Leo and Olivia are coming for dinner.", "Hoje é especial. O Leo e a Olivia vêm jantar."],
        ["Bia", "What?! OK, I'm taking a taxi!", "O quê?! Ok, vou pegar um táxi!"]
      ],
      questions: [["O que a Bia está fazendo?", ["Esperando o ônibus", "Cozinhando", "Trabalhando"], 0], ["Por que hoje é especial?", ["O Leo e a Olivia vêm jantar", "É aniversário do Sam", "Parou de chover"], 0]]
    },
    vocab: [["now", "agora", "NÁU"], ["right now", "agora mesmo", "ráit NÁU"], ["wear", "usar (roupa)", "UÉR"], ["rain", "chover, chuva", "RÊIN"], ["wait", "esperar", "UÊIT"], ["listen", "escutar", "LÍ-sen"], ["look for", "procurar", "LUK for"], ["jacket", "jaqueta", "DJÉ-ket"], ["umbrella", "guarda-chuva", "âm-BRÉ-la"], ["sunny", "ensolarado", "SÂ-ni"]],
    lesson: {
      why: "O presente contínuo é o 'estou fazendo': o que está acontecendo agora. Na ligação, o Sam e a Bia contam o que estão fazendo naquele momento.",
      parts: [
        ["Estou + -ando, -endo, -indo", "Em português: estou estudando. Em inglês: am/is/are + verbo com ING. O ING é o nosso -ando, -endo, -indo.", [["I am studying.", "Eu estou estudando."], ["She is cooking.", "Ela está cozinhando."]]],
        ["Como colocar o ING", "Quase sempre é só juntar: work → working. Se termina em E, tira o E: write → writing. Palavras curtinhas como sit, run e swim dobram a última letra: sitting, running, swimming.", [["He is writing an email.", "Ele está escrevendo um e-mail."], ["They are running.", "Eles estão correndo."]]],
        ["Agora × sempre", "Rotina usa o presente simples (I work). O que está acontecendo agora usa ING (I'm working).", [["I usually walk to work.", "Eu geralmente vou a pé para o trabalho."], ["Today I'm taking the bus.", "Hoje estou pegando o ônibus."]]],
        ["Planos já marcados", "O ING também fala de compromissos combinados para logo.", [["I'm meeting Ana tomorrow.", "Vou encontrar a Ana amanhã."], ["They're coming for dinner.", "Eles vêm jantar."]]]
      ],
      mistakes: [["I studying now.", "I am studying now.", "Não esqueça o am, is ou are."], ["She is write.", "She is writing.", "Depois do is, o verbo precisa do ING."], ["I am work every day.", "I work every day.", "Rotina usa o presente simples, sem ING."]],
      tip: "Se em português dá para dizer 'estou fazendo', provavelmente é ING."
    },
    sentences: [
      ["I [am studying|study|studying] English right now.", "Estou estudando inglês agora."], ["It's [raining|rains|rain] outside.", "Está chovendo lá fora."],
      ["She [is wearing|wears|wearing] a blue jacket today.", "Ela está usando uma jaqueta azul hoje."], ["What [are|is|do] you doing?", "O que você está fazendo?"],
      ["They [aren't|isn't|don't] listening to me.", "Eles não estão me escutando."], ["He [is writing|is writeing|writes] an email at the moment.", "Ele está escrevendo um e-mail no momento."],
      ["[Are|Is|Do] you waiting for the bus?", "Você está esperando o ônibus?"], ["I [am going|go|going] to the dentist tomorrow at 3.", "Vou ao dentista amanhã às 3."]
    ],
    mission: {
      goal: "Conte ao Sam, por telefone, o que está acontecendo agora ao seu redor.",
      roleplay: "You are Sam calling the learner. Ask what she is doing right now, where she is, what she is wearing and what is happening around her.",
      writing: "Olhe ao seu redor e descreva o que está acontecendo agora: o que você e as outras pessoas estão fazendo (5 frases).",
      model: "I'm sitting on the sofa. I'm studying English on my computer. My mother is cooking in the kitchen. It's raining outside. My cat is sleeping next to me."
    }
  }
];

if (typeof module !== "undefined") module.exports = { UNITS_A1 };
