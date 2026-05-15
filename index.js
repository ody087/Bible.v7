const { Client, GatewayIntentBits, Events } = require('discord.js');
const axios = require('axios');
const tmi = require('tmi.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const psaumes = [
  {
    text: "✨ Soyez encouragé, car Dieu est proche de vous même dans la douleur.\n\n📖 Dans Psaume 34:18, il est écrit :\n\n« L’Éternel est près de ceux qui ont le cœur brisé. »"
  },
  {
    text: "✨ Recevez aujourd’hui la paix et la guérison que Dieu vous donne.\n\n📖 Dans Psaume 147:3, il est écrit :\n\n« Il guérit ceux qui ont le cœur brisé, et il panse leurs blessures. »"
  },
  {
    text: "✨ Soyez fort, car Dieu combat pour vous et vous donne la victoire.\n\n📖 Dans Psaume 18:2, il est écrit :\n\n« L’Éternel est mon rocher, ma forteresse et mon libérateur. »"
  },
  {
    text: "✨ N’ayez pas peur, Dieu veille sur vous jour et nuit.\n\n📖 Dans Psaume 91:1-2, il est écrit :\n\n« Celui qui demeure sous l’abri du Très-Haut repose à l’ombre du Tout-Puissant. »"
  },
  {
    text: "✨ Que la paix de Dieu remplisse votre cœur aujourd’hui.\n\n📖 Dans Psaume 4:9, il est écrit :\n\n« Je me couche et je m’endors en paix, car toi seul, ô Éternel, tu me donnes la sécurité. »"
  },
  {
    text: "✨ Prenez courage, Dieu est votre lumière et votre salut.\n\n📖 Dans Psaume 27:1, il est écrit :\n\n« L’Éternel est ma lumière et mon salut : de qui aurais-je crainte ? »"
  },
  {
    text: "✨ Gardez espoir, votre secours vient de Dieu.\n\n📖 Dans Psaume 121:1-2, il est écrit :\n\n« Je lève mes yeux vers les montagnes… D’où me viendra le secours ? Le secours me vient de l’Éternel. »"
  }
];

const devotions = [
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Proverbes 3:5-6**\n« Confie-toi en l’Éternel de tout ton cœur, et ne t’appuie pas sur ta sagesse ; reconnais-le dans toutes tes voies, et il aplanira tes sentiers. »\n\n🙏 Aujourd’hui, faites confiance à Dieu même quand vous ne comprenez pas encore le chemin."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Ésaïe 41:10**\n« Ne crains rien, car je suis avec toi ; ne promène pas des regards inquiets, car je suis ton Dieu. »\n\n🙏 Dieu est avec vous. Ne laissez pas la peur diriger votre journée."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Psaume 27:1**\n« L’Éternel est ma lumière et mon salut : de qui aurais-je crainte ? »\n\n🙏 Quand Dieu est votre lumière, les ténèbres ne peuvent pas vous dominer."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Philippiens 4:6**\n« Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications. »\n\n🙏 Remettez vos inquiétudes entre les mains de Dieu dans la prière."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Jérémie 29:11**\n« Car je connais les projets que j’ai formés sur vous, dit l’Éternel. »\n\n🙏 Dieu connaît votre avenir. Continuez à marcher avec foi."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Psaume 46:2**\n« Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse. »\n\n🙏 Dans les moments difficiles, Dieu reste votre refuge."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Jean 14:27**\n« Je vous laisse la paix, je vous donne ma paix. »\n\n🙏 Recevez la paix de Jésus, une paix que le monde ne peut pas donner."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Romains 8:28**\n« Toutes choses concourent au bien de ceux qui aiment Dieu. »\n\n🙏 Dieu peut transformer même les épreuves en bénédiction."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Psaume 121:1-2**\n« Le secours me vient de l’Éternel, qui a fait les cieux et la terre. »\n\n🙏 Votre secours vient de Dieu. Levez les yeux vers lui."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Matthieu 11:28**\n« Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos. »\n\n🙏 Jésus invite les cœurs fatigués à trouver le repos en lui."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Josué 1:9**\n« Fortifie-toi et prends courage. »\n\n🙏 Avancez avec courage, car Dieu marche avec vous."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Psaume 23:1**\n« L’Éternel est mon berger : je ne manquerai de rien. »\n\n🙏 Quand Dieu vous conduit, il sait comment prendre soin de vous."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Galates 6:9**\n« Ne nous lassons pas de faire le bien. »\n\n🙏 Continuez à faire le bien, même quand personne ne semble le voir."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **1 Pierre 5:7**\n« Déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous. »\n\n🙏 Dieu prend soin de vous. Déposez vos fardeaux devant lui."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Psaume 91:11**\n« Car il ordonnera à ses anges de te garder dans toutes tes voies. »\n\n🙏 Dieu veille sur vous, même quand vous ne voyez pas son action."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Hébreux 11:1**\n« Or la foi est une ferme assurance des choses qu’on espère. »\n\n🙏 La foi vous aide à tenir ferme avant même de voir la réponse."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Jean 16:33**\n« Prenez courage, j’ai vaincu le monde. »\n\n🙏 Votre courage vient de Jésus, celui qui a déjà vaincu."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Psaume 34:9**\n« Sentez et voyez combien l’Éternel est bon ! »\n\n🙏 Prenez le temps de reconnaître la bonté de Dieu aujourd’hui."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Luc 1:37**\n« Car rien n’est impossible à Dieu. »\n\n🙏 Ne limitez pas Dieu. Ce qui semble impossible pour vous ne l’est pas pour lui."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Romains 12:12**\n« Réjouissez-vous en espérance. Soyez patients dans l’affliction. Persévérez dans la prière. »\n\n🙏 Continuez à prier. Dieu agit même quand la réponse tarde."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Psaume 37:5**\n« Recommande ton sort à l’Éternel, mets en lui ta confiance, et il agira. »\n\n🙏 Remettez votre chemin à Dieu et laissez-le agir."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **2 Corinthiens 5:7**\n« Car nous marchons par la foi et non par la vue. »\n\n🙏 Ne vous fiez pas seulement à ce que vous voyez. Marchez par la foi."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Jean 8:12**\n« Je suis la lumière du monde. »\n\n🙏 Jésus peut éclairer les endroits sombres de votre vie."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Psaume 55:23**\n« Remets ton sort à l’Éternel, et il te soutiendra. »\n\n🙏 Dieu peut vous soutenir là où vos forces sont limitées."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Éphésiens 6:10**\n« Fortifiez-vous dans le Seigneur, et par sa force toute-puissante. »\n\n🙏 Votre force spirituelle vient du Seigneur."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Matthieu 6:33**\n« Cherchez premièrement le royaume et la justice de Dieu. »\n\n🙏 Mettez Dieu en premier, et laissez-le guider le reste."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Psaume 119:105**\n« Ta parole est une lampe à mes pieds, et une lumière sur mon sentier. »\n\n🙏 La Parole de Dieu éclaire vos décisions."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Apocalypse 3:20**\n« Voici, je me tiens à la porte, et je frappe. »\n\n🙏 Jésus désire entrer plus profondément dans votre vie."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Nahum 1:7**\n« L’Éternel est bon, il est un refuge au jour de la détresse. »\n\n🙏 Dieu reste bon et fidèle dans les jours difficiles."
  },
  {
    text: "✨ **Dévotion du jour**\n\n📖 **Psaume 150:6**\n« Que tout ce qui respire loue l’Éternel ! »\n\n🙏 Aujourd’hui, prenez un moment pour louer Dieu avec gratitude."
  }
];

const quizzes = [
  { question: "Que doit faire une personne pour être sauvée ?", options: ["Respecter les 10 commandements", "Ne jamais pécher", "Être né dans une famille chrétienne", "Recevoir la grâce de Dieu par la foi en Jésus-Christ"], answer: "Recevoir la grâce de Dieu par la foi en Jésus-Christ", reference: "Éphésiens 2:8-9" },
  { question: "Qui a construit l’arche ?", options: ["Moïse", "Noé", "David", "Paul"], answer: "Noé", reference: "Genèse 6:13-22" },
  { question: "Qui a ouvert la mer Rouge ?", options: ["Élie", "Moïse", "Josué", "Aaron"], answer: "Moïse", reference: "Exode 14:21" },
  { question: "Qui a trahi Jésus ?", options: ["Pierre", "Jean", "Judas", "Thomas"], answer: "Judas", reference: "Matthieu 26:14-16" },
  { question: "Qui a vaincu Goliath ?", options: ["Saül", "David", "Samuel", "Salomon"], answer: "David", reference: "1 Samuel 17:49-50" },
  { question: "Combien de disciples Jésus avait-il ?", options: ["7", "10", "12", "40"], answer: "12", reference: "Matthieu 10:1-4" },
  { question: "Qui a été avalé par un grand poisson ?", options: ["Jonas", "Élie", "Daniel", "Noé"], answer: "Jonas", reference: "Jonas 1:17" },
  { question: "Quel est le premier livre de la Bible ?", options: ["Exode", "Genèse", "Psaumes", "Matthieu"], answer: "Genèse", reference: "Genèse 1:1" },
  { question: "Quel est le dernier livre de la Bible ?", options: ["Jude", "Apocalypse", "Actes", "Romains"], answer: "Apocalypse", reference: "Apocalypse 1:1" },
  { question: "Qui était dans la fosse aux lions ?", options: ["Joseph", "Daniel", "Moïse", "Paul"], answer: "Daniel", reference: "Daniel 6:16-22" },
  { question: "Qui a reçu les dix commandements ?", options: ["Abraham", "Moïse", "David", "Élie"], answer: "Moïse", reference: "Exode 20:1-17" },
  { question: "Qui était la mère de Jésus ?", options: ["Marie", "Marthe", "Élisabeth", "Anne"], answer: "Marie", reference: "Luc 1:30-31" },
  { question: "Dans quelle ville Jésus est-il né ?", options: ["Nazareth", "Jérusalem", "Bethléem", "Capernaüm"], answer: "Bethléem", reference: "Matthieu 2:1" },
  { question: "Qui a baptisé Jésus ?", options: ["Pierre", "Jean-Baptiste", "Paul", "Jacques"], answer: "Jean-Baptiste", reference: "Matthieu 3:13-17" },
  { question: "Quel disciple a marché sur l’eau avec Jésus ?", options: ["Jean", "Pierre", "Thomas", "André"], answer: "Pierre", reference: "Matthieu 14:28-29" },
  { question: "Qui était connu pour sa grande sagesse ?", options: ["Saül", "Salomon", "Samson", "Absalom"], answer: "Salomon", reference: "1 Rois 3:12" },
  { question: "Combien de jours Jésus a-t-il jeûné dans le désert ?", options: ["7", "21", "40", "50"], answer: "40", reference: "Matthieu 4:1-2" },
  { question: "Quel homme était fort et lié à ses cheveux ?", options: ["Samson", "David", "Gédéon", "Ésaü"], answer: "Samson", reference: "Juges 16:17" },
  { question: "Qui a interprété les rêves en Égypte ?", options: ["Joseph", "Moïse", "Aaron", "Josué"], answer: "Joseph", reference: "Genèse 41:15-16" },
  { question: "Quel prophète a fait descendre le feu du ciel ?", options: ["Élie", "Élisée", "Samuel", "Nathan"], answer: "Élie", reference: "1 Rois 18:36-39" },
  { question: "Qui a écrit beaucoup de psaumes ?", options: ["David", "Paul", "Moïse", "Luc"], answer: "David", reference: "Psaume 3:1" },
  { question: "Quel apôtre était collecteur d’impôts ?", options: ["Pierre", "Matthieu", "Jean", "Thomas"], answer: "Matthieu", reference: "Matthieu 9:9" },
  { question: "Qui a renié Jésus trois fois ?", options: ["Pierre", "Judas", "Jean", "Jacques"], answer: "Pierre", reference: "Luc 22:61" },
  { question: "Qui a vu Jésus ressuscité près du tombeau ?", options: ["Marie-Madeleine", "Marthe", "Élisabeth", "Marie mère de Jésus"], answer: "Marie-Madeleine", reference: "Jean 20:14-18" },
  { question: "Combien de jours Dieu a-t-il pris pour créer le monde ?", options: ["3", "6", "7", "10"], answer: "6", reference: "Genèse 1:31" },
  { question: "Quel jour Dieu s’est-il reposé ?", options: ["Le troisième jour", "Le sixième jour", "Le septième jour", "Le premier jour"], answer: "Le septième jour", reference: "Genèse 2:2" },
  { question: "Qui était le premier homme ?", options: ["Abel", "Adam", "Noé", "Seth"], answer: "Adam", reference: "Genèse 2:7" },
  { question: "Qui était la première femme ?", options: ["Sarah", "Ève", "Rébecca", "Rachel"], answer: "Ève", reference: "Genèse 3:20" },
  { question: "Qui a tué Abel ?", options: ["Caïn", "Ésaü", "Lémec", "Nimrod"], answer: "Caïn", reference: "Genèse 4:8" },
  { question: "Qui a vendu son droit d’aînesse pour un plat ?", options: ["Jacob", "Ésaü", "Joseph", "Ruben"], answer: "Ésaü", reference: "Genèse 25:29-34" },
  { question: "Qui a lutté avec Dieu ?", options: ["Jacob", "Joseph", "Moïse", "Aaron"], answer: "Jacob", reference: "Genèse 32:24-30" },
  { question: "Quelle reine a aidé à sauver son peuple ?", options: ["Jézabel", "Esther", "Vasthi", "Marie"], answer: "Esther", reference: "Esther 4:14" },
  { question: "Qui a écrit l’Apocalypse ?", options: ["Paul", "Pierre", "Jean", "Luc"], answer: "Jean", reference: "Apocalypse 1:1-2" },
  { question: "Quel disciple a douté de la résurrection ?", options: ["Thomas", "Pierre", "André", "Philippe"], answer: "Thomas", reference: "Jean 20:24-29" },
  { question: "Qui a remplacé Judas parmi les apôtres ?", options: ["Barnabas", "Matthias", "Silas", "Marc"], answer: "Matthias", reference: "Actes 1:26" },
  { question: "Quel apôtre a été aveuglé sur le chemin de Damas ?", options: ["Paul", "Pierre", "Jean", "Jacques"], answer: "Paul", reference: "Actes 9:3-9" },
  { question: "Quel est le plus court verset connu de la Bible ?", options: ["Jésus pleura", "Dieu est amour", "Priez sans cesse", "Soyez saints"], answer: "Jésus pleura", reference: "Jean 11:35" },
  { question: "Qui était le père de Jean-Baptiste ?", options: ["Joseph", "Zacharie", "Siméon", "Éli"], answer: "Zacharie", reference: "Luc 1:13" },
  { question: "Qui a reçu la sagesse de Dieu dans un rêve ?", options: ["David", "Salomon", "Samuel", "Saül"], answer: "Salomon", reference: "1 Rois 3:5-12" },
  { question: "Quel livre est connu pour les proverbes de sagesse ?", options: ["Proverbes", "Job", "Ruth", "Actes"], answer: "Proverbes", reference: "Proverbes 1:1-7" },
  { question: "Quel prophète est monté au ciel dans un tourbillon ?", options: ["Élie", "Élisée", "Ésaïe", "Jérémie"], answer: "Élie", reference: "2 Rois 2:11" },
  { question: "Qui a interprété l’écriture sur le mur ?", options: ["Daniel", "Joseph", "Moïse", "Esdras"], answer: "Daniel", reference: "Daniel 5:25-28" },
  { question: "Qui était appelé le disciple que Jésus aimait ?", options: ["Jean", "Pierre", "Thomas", "Jacques"], answer: "Jean", reference: "Jean 21:20" },
  { question: "Qui a porté la croix de Jésus ?", options: ["Simon de Cyrène", "Pierre", "Jean", "Joseph"], answer: "Simon de Cyrène", reference: "Luc 23:26" },
  { question: "Qui a demandé le corps de Jésus après sa mort ?", options: ["Nicodème", "Joseph d’Arimathée", "Pierre", "Pilate"], answer: "Joseph d’Arimathée", reference: "Marc 15:43-46" },
  { question: "Quel fruit de l’Esprit est cité en premier ?", options: ["La paix", "La joie", "L’amour", "La patience"], answer: "L’amour", reference: "Galates 5:22" },
  { question: "Quel auteur biblique était médecin ?", options: ["Luc", "Paul", "Marc", "Matthieu"], answer: "Luc", reference: "Colossiens 4:14" },
  { question: "Quel livre raconte la création du monde ?", options: ["Genèse", "Exode", "Jean", "Apocalypse"], answer: "Genèse", reference: "Genèse 1:1" },
  { question: "Sur quelle montagne Moïse a-t-il reçu la loi ?", options: ["Sinaï", "Carmel", "Sion", "Morija"], answer: "Sinaï", reference: "Exode 19:20" },
  { question: "Quel commandement parle d’honorer ses parents ?", options: ["Le premier", "Le troisième", "Le cinquième", "Le dixième"], answer: "Le cinquième", reference: "Exode 20:12" },
  { question: "Qui a dit : Me voici, envoie-moi ?", options: ["Ésaïe", "Jonas", "Moïse", "Jérémie"], answer: "Ésaïe", reference: "Ésaïe 6:8" },
  { question: "Quel prophète a fui à Tarsis ?", options: ["Jonas", "Amos", "Osée", "Nahum"], answer: "Jonas", reference: "Jonas 1:3" },
  { question: "Qui a conduit Israël après Moïse ?", options: ["Aaron", "Josué", "Caleb", "Samuel"], answer: "Josué", reference: "Josué 1:1-2" },
  { question: "Quelle femme a caché les espions à Jéricho ?", options: ["Rahab", "Déborah", "Ruth", "Anne"], answer: "Rahab", reference: "Josué 2:1-6" },
  { question: "Qui était la belle-mère de Ruth ?", options: ["Naomi", "Marie", "Anne", "Léa"], answer: "Naomi", reference: "Ruth 1:16" },
  { question: "Qui a oint David comme roi ?", options: ["Samuel", "Nathan", "Élie", "Moïse"], answer: "Samuel", reference: "1 Samuel 16:13" },
  { question: "Qui a prié et Dieu lui a donné Samuel ?", options: ["Anne", "Sarah", "Rachel", "Rébecca"], answer: "Anne", reference: "1 Samuel 1:10-20" },
  { question: "Qui a demandé à Jésus : Que dois-je faire pour hériter la vie éternelle ?", options: ["Un jeune homme riche", "Pilate", "Zachée", "Nicodème"], answer: "Un jeune homme riche", reference: "Matthieu 19:16" },
  { question: "Qui est monté sur un sycomore pour voir Jésus ?", options: ["Zachée", "Bartimée", "Nicodème", "Lazare"], answer: "Zachée", reference: "Luc 19:1-6" },
  { question: "Qui Jésus a-t-il ressuscité après quatre jours dans le tombeau ?", options: ["Lazare", "Étienne", "Jean-Baptiste", "Jairus"], answer: "Lazare", reference: "Jean 11:38-44" }
];

let lastPsalmIndex = -1;
let messageCount = 0;
let quizAutomatiqueActif = false;

function getRandomPsalm() {
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * psaumes.length);
  } while (randomIndex === lastPsalmIndex);

  lastPsalmIndex = randomIndex;
  return psaumes[randomIndex].text;
}

function guideMessage() {
  return (
    "📌 **Guide Bible.v7**\n\n" +
    "`!guide` ou `/guide` — Voir le guide des commandes\n" +
    "`!bonjour` — Message de bénédiction\n" +
    "`!psaume` ou `/psaume` — Recevoir un psaume aléatoire\n" +
    "`!verset Jean 14:6` ou `/verset` — Rechercher un verset biblique\n" +
    "`!priere` ou `/priere` — Recevoir une courte prière\n" +
    "`!jesus` ou `/jesus` — Recevoir le message du salut\n" +
    "`!aide` ou `/aide` — Recevoir de l’aide et du soutien spirituel\n" +
    "`!suivi` — Demander un accompagnement spirituel\n" +
    "`!temoignage` — Partager un témoignage\n" +
    "`!devotion` ou `/devotion` — Recevoir une dévotion avec un verset\n" +
    "`/quiz` — Répondre à une question biblique"
  );
}

function priereMessage() {
  return (
    "🙏 **Prière**\n\n" +
    "Seigneur Jésus, couvrez cette personne de votre paix, guidez ses pas, fortifiez sa foi et remplissez son cœur de votre présence. Amen."
  );
}

function jesusMessage() {
  return (
    "✝️ **L'ABC du SALUT**\n\n" +

    "Le salut est simple et accessible à tous, mais c’est aussi un engagement sacré devant Dieu.\n\n" +

    "**A — Admets que tu es un pécheur**\n" +
    "Nous avons tous péché et nous avons besoin du pardon de Dieu.\n\n" +

    "📖 Il est écrit dans **Romains 3:23** :\n" +
    "« Car tous ont péché et sont privés de la gloire de Dieu. »\n\n" +

    "**B — Crois en Jésus-Christ**\n" +
    "Dieu vous aime. Jésus est mort pour vos péchés et il est ressuscité afin de vous donner la vie éternelle.\n\n" +

    "📖 Il est écrit dans **Jean 3:16** :\n" +
    "« Car Dieu a tant aimé le monde qu’il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu’il ait la vie éternelle. »\n\n" +

    "**C — Confesse que Jésus est Seigneur**\n" +
    "Confessez Jésus-Christ comme Seigneur et Sauveur de votre vie.\n\n" +

    "📖 Il est écrit dans **Romains 10:9** :\n" +
    "« Si tu confesses de ta bouche le Seigneur Jésus et si tu crois dans ton cœur qu’il est ressuscité, tu seras sauvé. »\n\n" +

    "🙏 **Prière à répéter à haute voix**\n\n" +

    "Seigneur Jésus, je viens à vous aujourd’hui. Je reconnais que je suis pécheur et que j’ai besoin de votre pardon. Je crois que vous êtes mort pour mes péchés, que vous êtes ressuscité et que vous vivez éternellement. Je vous ouvre mon cœur. Pardonnez-moi, purifiez-moi, sauvez-moi et conduisez ma vie. Aujourd’hui, je confesse que Jésus-Christ est mon Seigneur et mon Sauveur. Amen.\n\n" +

    "🤝 Si vous avez fait cette prière avec foi, écrivez `!suivi` afin que nous puissions vous accompagner spirituellement."
  );
}

function aideMessage() {
  return (
    "🙏 **Aide et soutien spirituel**\n\n" +
    "Nous sommes là pour vous écouter, prier avec vous et vous encourager dans votre marche avec Dieu.\n\n" +
    "🙏 Vous pouvez aussi écrire `!suivi` si vous souhaitez être accompagné spirituellement."
  );
}

function suiviMessage() {
  return (
    "🤝 **Demande de suivi spirituel reçue**\n\n" +
    "Merci d’avoir fait cette démarche. Un membre de l’équipe pourra vous accompagner, prier avec vous et vous aider à grandir dans votre marche avec Dieu.\n\n" +
    "🙏 Vous pouvez aussi écrire un message privé à un responsable du serveur."
  );
}

function temoignageMessage() {
  return (
    "🙌 **Témoignage**\n\n" +
    "Si Dieu a fait quelque chose dans votre vie, vous pouvez le partager ici pour encourager la communauté.\n\n" +
    "Votre témoignage peut fortifier la foi de quelqu’un d’autre. ✨"
  );
}

function devotionMessage() {
  const randomDevotion =
    devotions[Math.floor(Math.random() * devotions.length)];

  return randomDevotion.text;
}

async function getVerse(reference) {
  const response = await axios.get(
    `https://bible-api.com/${encodeURIComponent(reference)}?translation=lsg`
  );

  return `📖 **${reference}**\n\n${response.data.text.trim()}`;
}

function getBonnesReponses(random) {
  return [
    random.answer.toLowerCase(),
    random.options.indexOf(random.answer) === 0 ? "a" : "",
    random.options.indexOf(random.answer) === 1 ? "b" : "",
    random.options.indexOf(random.answer) === 2 ? "c" : "",
    random.options.indexOf(random.answer) === 3 ? "d" : ""
  ].filter(Boolean);
}

async function quizMessage(interaction) {
  const random = quizzes[Math.floor(Math.random() * quizzes.length)];

  await interaction.reply(
    `📖 **Quiz Biblique**\n\n` +
    `❓ ${random.question}\n\n` +
    `🇦 ${random.options[0]}\n` +
    `🇧 ${random.options[1]}\n` +
    `🇨 ${random.options[2]}\n` +
    `🇩 ${random.options[3]}\n\n` +
    `⏳ Vous avez 30 secondes pour répondre.\n` +
    `Répondez avec **A, B, C, D** ou avec la réponse.`
  );

  const bonnesReponses = getBonnesReponses(random);

  const collected = await interaction.channel.awaitMessages({
    filter: m => !m.author.bot,
    max: 1,
    time: 30000
  });

  if (!collected.size) {
    return interaction.followUp(
      `⏰ Temps écoulé.\n\n✅ **Réponse :** ${random.answer}\n📖 **Référence :** ${random.reference}`
    );
  }

  const response = collected.first().content.trim().toLowerCase();

  if (bonnesReponses.some(rep => response.includes(rep))) {
    return interaction.followUp(
      `✅ Bonne réponse !\n\n📖 **Référence :** ${random.reference}`
    );
  }

  return interaction.followUp(
    `❌ Mauvaise réponse.\n\n✅ **Réponse :** ${random.answer}\n📖 **Référence :** ${random.reference}`
  );
}

async function lancerQuizAutomatique(channel) {
  quizAutomatiqueActif = true;

  const random = quizzes[Math.floor(Math.random() * quizzes.length)];

  await channel.send(
    `📖 **Quiz Biblique Automatique**\n\n` +
    `❓ ${random.question}\n\n` +
    `🇦 ${random.options[0]}\n` +
    `🇧 ${random.options[1]}\n` +
    `🇨 ${random.options[2]}\n` +
    `🇩 ${random.options[3]}\n\n` +
    `⏳ Vous avez 30 secondes pour répondre.\n` +
    `Répondez avec **A, B, C, D** ou avec la réponse.`
  );

  const bonnesReponses = getBonnesReponses(random);

  const collected = await channel.awaitMessages({
    filter: m => !m.author.bot,
    max: 1,
    time: 30000
  });

  if (!collected.size) {
    await channel.send(
      `⏰ Temps écoulé.\n\n✅ **Réponse :** ${random.answer}\n📖 **Référence :** ${random.reference}`
    );

    quizAutomatiqueActif = false;
    return;
  }

  const response = collected.first().content.trim().toLowerCase();

  if (bonnesReponses.some(rep => response.includes(rep))) {
    await channel.send(
      `✅ Bonne réponse !\n\n📖 **Référence :** ${random.reference}`
    );
  } else {
    await channel.send(
      `❌ Mauvaise réponse.\n\n✅ **Réponse :** ${random.answer}\n📖 **Référence :** ${random.reference}`
    );
  }

  quizAutomatiqueActif = false;
}

client.once(Events.ClientReady, () => {
  console.log(`Bible.v7 est connecté en tant que ${client.user.tag}`);
});

// ANCIENS COMMANDS AVEC !
client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

  if (!quizAutomatiqueActif) {
    messageCount++;

    if (messageCount >= 5) {
      messageCount = 0;
      lancerQuizAutomatique(message.channel);
    }
  }

  if (msg === '!bonjour') {
    message.reply('Bonjour 👋 Que Dieu vous bénisse.');
  }

  if (msg === '!guide') {
    message.reply(guideMessage());
  }

  if (msg === '!psaume') {
    message.reply(getRandomPsalm());
  }

  if (msg.startsWith('!verset ')) {
    const reference = message.content.slice(8).trim();

    try {
      message.reply(await getVerse(reference));
    } catch (error) {
      message.reply(
        "🙏 Le verset demandé est introuvable.\n\n📖 Exemple : `!verset Jean 14:6`"
      );
    }
  }

  if (msg === '!priere') {
    message.reply(priereMessage());
  }

  if (msg === '!jesus') {
    message.reply(jesusMessage());
  }

  if (msg === '!aide') {
    message.reply(aideMessage());
  }

  if (msg === '!suivi') {
    message.reply(suiviMessage());
  }

  if (msg === '!temoignage') {
    message.reply(temoignageMessage());
  }

  if (msg === '!devotion') {
    message.reply(devotionMessage());
  }
});

// NOUVO SLASH COMMANDS AVEC /
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const commandName = interaction.commandName;

  if (commandName === 'guide') {
    await interaction.reply(guideMessage());
  }

  if (commandName === 'psaume') {
    await interaction.reply(getRandomPsalm());
  }

  if (commandName === 'priere') {
    await interaction.reply(priereMessage());
  }

  if (commandName === 'jesus') {
    await interaction.reply(jesusMessage());
  }

  if (commandName === 'aide') {
    await interaction.reply(aideMessage());
  }

  if (commandName === 'devotion') {
    await interaction.reply(devotionMessage());
  }

  if (commandName === 'quiz') {
    await quizMessage(interaction);
  }

  if (commandName === 'verset') {
    const reference = interaction.options.getString('reference');

    try {
      await interaction.reply(await getVerse(reference));
    } catch (error) {
      await interaction.reply(
        "🙏 Le verset demandé est introuvable.\n\n📖 Exemple : `Jean 14:6`"
      );
    }
  }
});
client.login(process.env.DISCORD_TOKEN);

let twitchMessageCount = 0;
let twitchQuizActif = false;
let twitchScores = {};

const twitchClient = new tmi.Client({
  options: { debug: true },
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: [process.env.TWITCH_CHANNEL]
});

twitchClient.connect();

function cleanTwitch(text) {
  return text.replace(/\n/g, ' ').slice(0, 450);
}

function lancerQuizTwitch(channel) {
  if (twitchQuizActif) return;

  twitchQuizActif = true;

  const random = quizzes[Math.floor(Math.random() * quizzes.length)];

  const bonnesReponses = [
    random.answer.toLowerCase(),
    random.options.indexOf(random.answer) === 0 ? "a" : "",
    random.options.indexOf(random.answer) === 1 ? "b" : "",
    random.options.indexOf(random.answer) === 2 ? "c" : "",
    random.options.indexOf(random.answer) === 3 ? "d" : ""
  ].filter(Boolean);

  twitchClient.say(
    channel,
    `📖 Quiz Biblique : ${random.question} | A: ${random.options[0]} | B: ${random.options[1]} | C: ${random.options[2]} | D: ${random.options[3]} | Vous avez 30 secondes.`
  );

  const quizListener = (quizChannel, tags, userMessage, self) => {
    if (self) return;
    if (quizChannel !== channel) return;
    if (userMessage.startsWith('!')) return;

    const response = userMessage.trim().toLowerCase();

if (!response.startsWith('rep:')) return;

const rep = response.replace('rep:', '').trim();

 if (bonnesReponses.includes(rep)) {

  const user = tags.username;

  if (!twitchScores[user]) {
    twitchScores[user] = 0;
  }

  twitchScores[user]++;

  twitchClient.say(
    channel,
    `✅ Yes, bonne réponse @${user} ! (${twitchScores[user]}/10) 📖 Référence : ${random.reference}`
  );

  if (twitchScores[user] >= 10) {

    twitchClient.say(
      channel,
      `👑 Félicitations @${user} ! Tu viens d’atteindre 10 bonnes réponses bibliques !! 🎉🔥 Que Dieu te bénisse 🙏📖`
    );

    twitchScores[user] = 0;
  }

} else {

  twitchClient.say(
    channel,
    `❌ Mauvaise réponse @${tags.username}. ✅ Réponse : ${random.answer} | 📖 Référence : ${random.reference}`
  );
}

clearTimeout(timer);

twitchClient.removeListener('message', quizListener);

twitchQuizActif = false;
};

twitchClient.on('message', quizListener);

  const timer = setTimeout(() => {
    if (twitchQuizActif) {
      twitchClient.say(
        channel,
        `⏰ Temps écoulé. ✅ Réponse : ${random.answer} | 📖 Référence : ${random.reference}`
      );

      twitchClient.removeListener('message', quizListener);
      twitchQuizActif = false;
    }
  }, 30000);
}

twitchClient.on('message', async (channel, tags, message, self) => {
if (self) return;

if (tags.username === 'streamelements') return;
if (tags.username === 'botrixofficial') return;
if (tags.username === 'forgebiblebot') return;
if (tags.username === 'wizebot') return;
if (tags.username === 'nightbot') return;

const msg = message.toLowerCase();

  if (msg === '!bonjour') {
    return twitchClient.say(channel, 'Bonjour 👋 Que Dieu vous bénisse.');
  }

  if (msg === '!guide') {
    return twitchClient.say(channel, '📌 Commandes Bible.v7 : !bonjour, !guide, !psaume, !priere, !jesus, !aide, !suivi, !temoignage, !devotion, !verset Jean 3:16, !quiz');
  }

  if (msg === '!psaume') {
    return twitchClient.say(channel, cleanTwitch(getRandomPsalm()));
  }

  if (msg === '!priere') {
    return twitchClient.say(channel, cleanTwitch(priereMessage()));
  }

  if (msg === '!jesus') {
  const salut = jesusMessage().split('\n\n');

  salut.forEach((part, index) => {
    setTimeout(() => {
      twitchClient.say(channel, cleanTwitch(part));
    }, index * 1800);
  });

  return;
}

  if (msg === '!aide') {
    return twitchClient.say(channel, cleanTwitch(aideMessage()));
  }

  if (msg === '!suivi') {
    return twitchClient.say(channel, cleanTwitch(suiviMessage()));
  }

  if (msg === '!temoignage') {
    return twitchClient.say(channel, cleanTwitch(temoignageMessage()));
  }

  if (msg === '!devotion') {
    return twitchClient.say(channel, cleanTwitch(devotionMessage()));
  }

  if (msg.startsWith('!verset ')) {
    const reference = message.slice(8).trim();

    try {
      const verse = await getVerse(reference);
      return twitchClient.say(channel, cleanTwitch(verse));
    } catch (error) {
      return twitchClient.say(channel, '🙏 Verset introuvable. Exemple : !verset Jean 14:6');
    }
  }

  if (msg === '!quiz') {
    return lancerQuizTwitch(channel);
  }

  twitchMessageCount++;

  if (twitchMessageCount >= 5 && !twitchQuizActif) {
    twitchMessageCount = 0;
    lancerQuizTwitch(channel);
  }
});
