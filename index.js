const { Client, GatewayIntentBits } = require('discord.js');
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

let lastPsalmIndex = -1;

client.once('ready', () => {
  console.log(`Bible.v7 est connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async message => {

  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

  // Bonjour
  if (msg === '!bonjour') {
    message.reply('Bonjour 👋 Que Dieu vous bénisse.');
  }

  // Guide
  if (msg === '!guide') {
    message.reply(
      "📌 **Guide Bible.v7**\n\n" +
      "`!guide` — Voir le guide des commandes\n" +
      "`!bonjour` — Message de bénédiction\n" +
      "`!psaume` — Recevoir un psaume aléatoire\n" +
      "`!verset Jean 14:6` — Rechercher un verset biblique\n" +
      "`!priere` — Recevoir une courte prière\n" +
      "`!jesus` — Recevoir le message du salut\n" +
      "`!aide` — Recevoir de l’aide et du soutien spirituel\n" +
      "`!suivi` — Demander un accompagnement spirituel\n" +
      "`!temoignage` — Partager un témoignage\n" +
      "`!devotion` — Recevoir une courte dévotion"
    );
  }

  // Psaume aléatoire
  if (msg === '!psaume') {

    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * psaumes.length);
    } while (randomIndex === lastPsalmIndex);

    lastPsalmIndex = randomIndex;

    const psaume = psaumes[randomIndex];

    message.reply(psaume.text);
  }

  // Recherche de verset
  if (msg.startsWith('!verset ')) {

    const reference = message.content.slice(8).trim();

    try {

      const response = await axios.get(
        `https://bible-api.com/${encodeURIComponent(reference)}?translation=lsg`
      );

      const verseText = response.data.text;

      message.reply(
        `📖 **${reference}**\n\n${verseText.trim()}`
      );

    } catch (error) {

      message.reply(
        "🙏 Le verset demandé est introuvable.\n\n📖 Exemple : `!verset Jean 14:6`"
      );

    }
  }

  // Prière
  if (msg === '!priere') {
    message.reply(
      "🙏 **Prière**\n\n" +
      "Seigneur Jésus, couvrez cette personne de votre paix, guidez ses pas, fortifiez sa foi et remplissez son cœur de votre présence. Amen."
    );
  }

  // Salut
  if (msg === '!jesus') {
    message.reply(
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

  // Aide spirituelle
  if (msg === '!aide') {
    message.reply(
      "🙏 **Aide et soutien spirituel**\n\n" +
      "Nous sommes là pour vous écouter, prier avec vous et vous encourager dans votre marche avec Dieu.\n\n" +
      "🙏 Vous pouvez aussi écrire `!suivi` si vous souhaitez être accompagné spirituellement."
    );
  }

  // Suivi
  if (msg === '!suivi') {
    message.reply(
      "🤝 **Demande de suivi spirituel reçue**\n\n" +
      "Merci d’avoir fait cette démarche. Un membre de l’équipe pourra vous accompagner, prier avec vous et vous aider à grandir dans votre marche avec Dieu.\n\n" +
      "🙏 Vous pouvez aussi écrire un message privé à un responsable du serveur."
    );
  }

  // Témoignage
  if (msg === '!temoignage') {
    message.reply(
      "🙌 **Témoignage**\n\n" +
      "Si Dieu a fait quelque chose dans votre vie, vous pouvez le partager ici pour encourager la communauté.\n\n" +
      "Votre témoignage peut fortifier la foi de quelqu’un d’autre. ✨"
    );
  }

  // Dévotion
  if (msg === '!devotion') {
    message.reply(
      "✨ **Dévotion du jour**\n\n" +
      "Aujourd’hui, avançons avec foi. Même si nous ne voyons pas encore le chemin, Dieu marche devant nous. Faisons-lui confiance."
    );
  }

});

client.login(process.env.DISCORD_TOKEN);
