const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const verses = [
  "📖 **Psaume 91:1-2**\n\nCelui qui demeure sous l’abri du Très-Haut\nRepose à l’ombre du Tout-Puissant.\n\nJe dis à l’Éternel : Mon refuge et ma forteresse,\nMon Dieu en qui je me confie !"
];

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
      "`!verset` — Recevoir un verset biblique\n" +
      "`!psaume91` — Lire Psaume 91:1-2\n" +
      "`!priere` — Recevoir une courte prière\n" +
      "`!devotion` — Recevoir une courte dévotion"
    );
  }

  if (msg === '!verset') {
    const verse = verses[Math.floor(Math.random() * verses.length)];
    message.reply(verse);
  }

  if (msg === '!psaume91') {
    message.reply(
      "📖 **Psaume 91:1-2**\n\n" +
      "Celui qui demeure sous l’abri du Très-Haut\n" +
      "Repose à l’ombre du Tout-Puissant.\n\n" +
      "Je dis à l’Éternel : Mon refuge et ma forteresse,\n" +
      "Mon Dieu en qui je me confie !"
    );
  }

  if (msg === '!priere') {
    message.reply(
      "🙏 Seigneur Jésus, couvre cette personne de votre paix, guidez ses pas, fortifiez sa foi et remplissez son cœur de votre présence. Amen."
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
