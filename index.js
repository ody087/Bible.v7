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
text:
"✨ **Dévotion du jour**\n\n📖 **Proverbes 3:5-6**\n« Confie-toi en l’Éternel de tout ton cœur. »\n\n🙏 Bondye konnen chemen an menm lè ou pa wè l."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Ésaïe 41:10**\n« Ne crains rien, car je suis avec toi. »\n\n🙏 Bondye avèk ou menm nan moman difisil yo."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Psaume 27:1**\n« L’Éternel est ma lumière et mon salut. »\n\n🙏 Pa kite laperèz domine w. Bondye se limyè w."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Philippiens 4:6**\n« Ne vous inquiétez de rien. »\n\n🙏 Lage tout sousi ou yo nan men Bondye."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Jérémie 29:11**\n« Car je connais les projets que j’ai formés sur vous. »\n\n🙏 Bondye gen yon plan beni pou lavi ou."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Psaume 46:2**\n« Dieu est pour nous un refuge et un appui. »\n\n🙏 Lè lavi difisil, Bondye rete refij ou."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Jean 14:27**\n« Je vous laisse la paix. »\n\n🙏 Lapè Bondye pi fò pase tout konfizyon."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Romains 8:28**\n« Toutes choses concourent au bien de ceux qui aiment Dieu. »\n\n🙏 Bondye ka sèvi menm doulè w pou fè byen."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Psaume 121:1-2**\n« Mon secours vient de l’Éternel. »\n\n🙏 Èd ou pap soti nan moun sèlman, men nan Bondye."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Matthieu 11:28**\n« Venez à moi, vous tous qui êtes fatigués. »\n\n🙏 Jezi vle ba ou repo pou nanm ou."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Josué 1:9**\n« Fortifie-toi et prends courage. »\n\n🙏 Bondye mande w mache avèk fòs ak lafwa."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Psaume 23:1**\n« L’Éternel est mon berger. »\n\n🙏 Lè Bondye ap gide w, ou pap manke anyen."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Galates 6:9**\n« Ne nous lassons pas de faire le bien. »\n\n🙏 Kontinye fè byen menm lè moun pa wè efò ou."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **1 Pierre 5:7**\n« Déchargez-vous sur lui de tous vos soucis. »\n\n🙏 Bondye sousye de sa k ap fè w mal la."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Psaume 91:11**\n« Il ordonnera à ses anges de te garder. »\n\n🙏 Bondye ap pwoteje w menm lè ou pa wè li."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Hébreux 11:1**\n« La foi est une ferme assurance. »\n\n🙏 Lafwa se kwè menm avan ou wè."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Jean 16:33**\n« Prenez courage, j’ai vaincu le monde. »\n\n🙏 Viktwa ou deja nan Jezi-Christ."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Psaume 34:9**\n« Goûtez et voyez combien l’Éternel est bon. »\n\n🙏 Bondye toujou bon menm nan eprèv yo."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Luc 1:37**\n« Rien n’est impossible à Dieu. »\n\n🙏 Pa limite sa Bondye kapab fè."
},

{
text:
"✨ **Dévotion du jour**\n\n📖 **Romains 12:12**\n« Persévérez dans la prière. »\n\n🙏 Pa sispann priye menm lè repons lan pran tan."
}

];

if (commandName === 'devotion') {

const randomDevotion =
devotions[Math.floor(Math.random() * devotions.length)];

await interaction.reply(randomDevotion.text);

}
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
    "`!devotion` ou `/devotion` — Recevoir une courte dévotion"
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
  return (
    "✨ **Dévotion du jour**\n\n" +
    "Aujourd’hui, avançons avec foi. Même si nous ne voyons pas encore le chemin, Dieu marche devant nous. Faisons-lui confiance."
  );
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
