// Conteúdo da plataforma: situações de viagem, frases e teste de nível.
// Para adicionar uma situação, copie um bloco e mude o código (3 letras).

const SITUATIONS = [
  {
    code: "AIR", color: "sky", name: "Aeroporto", icon: "plane",
    role: "a friendly airline check-in agent at an international airport",
    roleLabel: "Atendente",
    scene: "The learner arrives at the check-in counter with one suitcase and a backpack for an international flight.",
    phrases: [
      { en: "Where is the check-in counter for this airline?", pt: "Onde fica o balcão de check-in desta companhia?" },
      { en: "I'd like a window seat, please.", pt: "Eu gostaria de um assento na janela, por favor.", tip: "I'd = I would. Para corredor, diga aisle seat (o 's' é mudo: 'ail')." },
      { en: "Can I take this bag on board?", pt: "Posso levar esta mala a bordo?" },
      { en: "What time does boarding start?", pt: "Que horas começa o embarque?" },
      { en: "Which gate is it?", pt: "Qual é o portão?" },
      { en: "My flight was delayed.", pt: "Meu voo atrasou." },
      { en: "I missed my connection.", pt: "Perdi minha conexão." },
      { en: "My luggage didn't arrive.", pt: "Minha bagagem não chegou.", tip: "Luggage e baggage não têm plural: nunca 'luggages'." }
    ]
  },
  {
    code: "IMM", color: "lilac", name: "Imigração", icon: "passport",
    role: "a calm but direct immigration officer at passport control",
    roleLabel: "Oficial",
    scene: "The learner has just landed and is at the passport control booth.",
    phrases: [
      { en: "Here is my passport.", pt: "Aqui está meu passaporte." },
      { en: "I'm here on vacation.", pt: "Estou aqui de férias.", tip: "No Reino Unido também se diz on holiday." },
      { en: "I'm staying for ten days.", pt: "Vou ficar dez dias." },
      { en: "I'm staying at a hotel downtown.", pt: "Vou ficar num hotel no centro." },
      { en: "This is my return ticket.", pt: "Esta é minha passagem de volta." },
      { en: "I'm traveling alone.", pt: "Estou viajando sozinha." },
      { en: "Nothing to declare.", pt: "Nada a declarar." },
      { en: "Could you repeat that more slowly, please?", pt: "Pode repetir mais devagar, por favor?", tip: "Frase salva-vidas. Use sempre que não entender alguma coisa." }
    ]
  },
  {
    code: "HTL", color: "peach", name: "Hotel", icon: "bed",
    role: "a polite hotel front desk receptionist",
    roleLabel: "Recepção",
    scene: "The learner arrives at the hotel in the evening to check in.",
    phrases: [
      { en: "I have a reservation under the name Vieira.", pt: "Tenho uma reserva no nome Vieira." },
      { en: "What time is check-out?", pt: "Que horas é o check-out?" },
      { en: "Is breakfast included?", pt: "O café da manhã está incluso?" },
      { en: "What's the Wi-Fi password?", pt: "Qual é a senha do Wi-Fi?", tip: "Em inglês se fala 'uai-fai'." },
      { en: "Can I leave my bags here after check-out?", pt: "Posso deixar minhas malas aqui depois do check-out?" },
      { en: "The air conditioning isn't working.", pt: "O ar-condicionado não está funcionando." },
      { en: "Could I have an extra towel?", pt: "Poderia me dar uma toalha extra?" },
      { en: "Could you call a taxi for me?", pt: "Poderia chamar um táxi para mim?" }
    ]
  },
  {
    code: "FOO", color: "pink", name: "Restaurante", icon: "fork",
    role: "a cheerful waiter at a casual restaurant",
    roleLabel: "Garçom",
    scene: "The learner walks into the restaurant for dinner.",
    phrases: [
      { en: "A table for two, please.", pt: "Uma mesa para dois, por favor." },
      { en: "Can I see the menu?", pt: "Posso ver o cardápio?" },
      { en: "What do you recommend?", pt: "O que você recomenda?" },
      { en: "I'll have the chicken, please.", pt: "Vou querer o frango, por favor.", tip: "I'll have... é o jeito mais natural de pedir comida." },
      { en: "Does this have nuts?", pt: "Isso tem castanhas ou nozes?" },
      { en: "Can I have some water, please?", pt: "Pode me trazer água, por favor?" },
      { en: "Could we have the check, please?", pt: "Pode trazer a conta, por favor?", tip: "Nos EUA é check; no Reino Unido, bill." },
      { en: "Is the tip included?", pt: "A gorjeta está incluída?" }
    ]
  },
  {
    code: "TRN", color: "mint", name: "Transporte", icon: "train",
    role: "a helpful ticket office clerk at a train station",
    roleLabel: "Bilheteria",
    scene: "The learner is at the station ticket office and wants to get somewhere in the city.",
    phrases: [
      { en: "How do I get to the city center?", pt: "Como chego ao centro da cidade?" },
      { en: "Which line goes to the airport?", pt: "Qual linha vai para o aeroporto?" },
      { en: "A one-way ticket, please.", pt: "Uma passagem só de ida, por favor.", tip: "Ida e volta é round-trip (EUA) ou return (Reino Unido)." },
      { en: "Does this bus stop at Central Station?", pt: "Este ônibus para na Estação Central?" },
      { en: "How long does it take?", pt: "Quanto tempo demora?" },
      { en: "Is it far from here?", pt: "É longe daqui?" },
      { en: "Can you take me to this address?", pt: "Pode me levar a este endereço?" },
      { en: "I'm lost. Can you help me?", pt: "Estou perdida. Pode me ajudar?" }
    ]
  },
  {
    code: "SHP", color: "butter", name: "Compras", icon: "bag",
    role: "a shop assistant at a clothing store",
    roleLabel: "Vendedora",
    scene: "The learner is browsing in a clothing store.",
    phrases: [
      { en: "I'm just looking, thanks.", pt: "Só estou olhando, obrigada." },
      { en: "How much is this?", pt: "Quanto custa isto?" },
      { en: "Do you have this in a smaller size?", pt: "Tem isto num tamanho menor?" },
      { en: "Can I try it on?", pt: "Posso experimentar?", tip: "Provador é fitting room." },
      { en: "It's a bit expensive.", pt: "Está um pouco caro." },
      { en: "Do you take credit cards?", pt: "Vocês aceitam cartão de crédito?" },
      { en: "Can I get a receipt?", pt: "Pode me dar o recibo?", tip: "O 'p' é mudo: 'ri-sít'." },
      { en: "I'll take it.", pt: "Vou levar." }
    ]
  }
];

const LEVEL_TEST = [
  { q: "Hello! How ___ you?", options: ["is", "are", "am", "be"], answer: 1, why: "Com you, o verbo to be é are." },
  { q: "I ___ from Brazil.", options: ["is", "are", "am", "be"], answer: 2, why: "Com I, o verbo to be é am." },
  { q: "Como se pergunta \"Onde fica o banheiro?\"", options: ["Where the bathroom is?", "Where is the bathroom?", "Where are the bathroom?", "What is the bathroom?"], answer: 1, why: "Em perguntas, o verbo vem antes do sujeito: Where is the bathroom?" },
  { q: "She ___ coffee every morning.", options: ["drink", "drinking", "drinks", "is drink"], answer: 2, why: "No presente, he/she/it ganha -s: she drinks." },
  { q: "Yesterday I ___ to the beach.", options: ["go", "went", "goes", "gone"], answer: 1, why: "Yesterday pede passado: go vira went." },
  { q: "There ___ many people at the airport.", options: ["is", "are", "has", "be"], answer: 1, why: "Many people é plural: there are." },
  { q: "O garçom pergunta: \"Are you ready to order?\" Qual a melhor resposta?", options: ["Yes, I am soup.", "Yes, give soup.", "Yes, I'd like the soup, please.", "Yes, I like soup."], answer: 2, why: "I'd like... é o jeito educado de pedir. I like soup quer dizer que você gosta de sopa em geral." },
  { q: "I've never ___ to London.", options: ["went", "been", "go", "going"], answer: 1, why: "Com have/has, usa-se o particípio: I've never been." },
  { q: "If it rains tomorrow, we ___ stay at the hotel.", options: ["would", "did", "will", "are"], answer: 2, why: "Para algo possível no futuro: if + presente, will + verbo." },
  { q: "Could you tell me where the station ___?", options: ["is it", "is", "are", "be"], answer: 1, why: "Dentro de uma pergunta indireta, a ordem volta ao normal: where the station is." }
];

const LEVELS = {
  A1: { name: "A1 · Iniciante", note: "Você reconhece o básico. Foque nas frases prontas de cada situação e repita em voz alta." },
  A2: { name: "A2 · Básico", note: "Você já se vira em situações simples. Treine as conversas para ganhar agilidade." },
  B1: { name: "B1 · Intermediário", note: "Boa base. Use as conversas para soltar a fala e corrigir detalhes." }
};

function levelFromScore(score) {
  if (score >= 8) return "B1";
  if (score >= 5) return "A2";
  return "A1";
}

if (typeof module !== "undefined") module.exports = { SITUATIONS, LEVEL_TEST, LEVELS, levelFromScore };
