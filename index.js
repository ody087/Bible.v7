const { Client, GatewayIntentBits, Events } = require('discord.js');
const axios = require('axios');

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

let lastPsalmIndex = -1;

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
    "`!devotion` ou `/devotion` — Recevoir une dévotion avec un verset"
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

client.once(Events.ClientReady, () => {
  console.log(`Bible.v7 est connecté en tant que ${client.user.tag}`);
});

// ANCIENS COMMANDS AVEC !
client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

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
