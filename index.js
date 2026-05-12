const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const psaumes = [
  {
    category: "Réconfort",
    text: "📖 **Psaume 34:18**\n\nL’Éternel est près de ceux qui ont le cœur brisé."
  },
  {
    category: "Guérison",
    text: "📖 **Psaume 147:3**\n\nIl guérit ceux qui ont le cœur brisé, et il panse leurs blessures."
  },
  {
    category: "Victoire",
    text: "📖 **Psaume 18:2**\n\nL’Éternel est mon rocher, ma forteresse et mon libérateur."
  },
  {
    category: "Protection",
    text: "📖 **Psaume 91:1-2**\n\nCelui qui demeure sous l’abri du Très-Haut\nRepose à l’ombre du Tout-Puissant."
  },
  {
    category: "Paix",
    text: "📖 **Psaume 4:9**\n\nJe me couche et je m’endors en paix, car toi seul, ô Éternel, tu me donnes la sécurité."
  },
  {
    category: "Force",
    text: "📖 **Psaume 27:1**\n\nL’Éternel est ma lumière et mon salut : de qui aurais-je crainte ?"
  },
  {
    category: "Espoir",
    text: "📖 **Psaume 121:1-2**\n\nJe lève mes yeux vers les montagnes… D’où me viendra le secours ?"
  }
];

let lastPsalmIndex = -1;

client.once('ready', () => {
  console.log(`Bible.v7 est connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

  if (msg === '!bonjour') {
    message.reply('Bonjour 👋 Que Dieu vous bénisse.');
  }

  if (msg === '!aide') {
    message.reply(
      "📌 **Commandes Bible.v7**\n\n" +
      "`!bonjour` — Message de bénédiction\n" +
      "`!psaume` — Recevoir un psaume aléatoire\n" +
      "`!priere` — Recevoir une courte prière\n" +
      "`!jesus` — Message pour accepter Jésus-Christ\n" +
      "`!besoin` — Demander de l’aide ou du soutien spirituel\n" +
      "`!suivi` — Demander un accompagnement spirituel\n" +
      "`!temoignage` — Partager un témoignage\n" +
      "`!devotion` — Recevoir une courte dévotion"
    );
  }

  if (msg === '!psaume') {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * psaumes.length);
    } while (randomIndex === lastPsalmIndex);

    lastPsalmIndex = randomIndex;

    const psaume = psaumes[randomIndex];

    message.reply(
      `✨ **Psaume du jour — ${psaume.category}**\n\n${psaume.text}`
    );
  }

  if (msg === '!priere') {
    message.reply(
      "🙏 **Prière**\n\n" +
      "Seigneur Jésus, couvrez cette personne de votre paix, guidez ses pas, fortifiez sa foi et remplissez son cœur de votre présence. Amen."
    );
  }

  if (msg === '!jesus') {
    message.reply(
      "✝️ **Recevoir Jésus-Christ**\n\n" +
      "Si vous voulez donner votre vie à Jésus-Christ, vous pouvez prier avec sincérité :\n\n" +
      "Seigneur Jésus, je viens à vous aujourd’hui. Je reconnais que j’ai besoin de vous. Je crois que vous êtes mort pour mes péchés et que Dieu vous a ressuscité. Pardonnez-moi, purifiez mon cœur et conduisez ma vie. Aujourd’hui, je vous accepte comme mon Seigneur et mon Sauveur. Amen.\n\n" +
      "🙏 Si vous avez fait cette prière avec foi, écrivez `!suivi` pour recevoir un accompagnement spirituel."
    );
  }

  if (msg === '!besoin') {
    message.reply(
      "🙏 **Besoin de prière ou d’aide spirituelle**\n\n" +
      "Nous sommes là pour vous écouter et prier avec vous.\n\n" +
      "Vous pouvez partager votre demande dans le salon de prière ou écrire `!suivi` si vous souhaitez qu’un membre de l’équipe vous accompagne."
    );
  }

  if (msg === '!suivi') {
    message.reply(
      "🤝 **Demande de suivi spirituel reçue**\n\n" +
      "Merci d’avoir fait cette démarche. Un membre de l’équipe pourra vous accompagner, prier avec vous et vous aider à grandir dans votre marche avec Dieu.\n\n" +
      "🙏 Vous pouvez aussi écrire un message privé à un responsable du serveur."
    );
  }

  if (msg === '!temoignage') {
    message.reply(
      "🙌 **Témoignage**\n\n" +
      "Si Dieu a fait quelque chose dans votre vie, vous pouvez le partager ici pour encourager la communauté.\n\n" +
      "Votre témoignage peut fortifier la foi de quelqu’un d’autre. ✨"
    );
  }

  if (msg === '!devotion') {
    message.reply(
      "✨ **Dévotion du jour**\n\n" +
      "Aujourd’hui, avançons avec foi. Même si nous ne voyons pas encore le chemin, Dieu marche devant nous. Faisons-lui confiance."
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
