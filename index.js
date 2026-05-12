const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const cron = require('node-cron');

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

const livres = [
  "Genèse","Exode","Lévitique","Nombres","Deutéronome",
  "Josué","Juges","Ruth","1 Samuel","2 Samuel",
  "1 Rois","2 Rois","1 Chroniques","2 Chroniques",
  "Esdras","Néhémie","Esther","Job","Psaume",
  "Proverbes","Ecclésiaste","Cantique","Ésaïe","Jérémie",
  "Lamentations","Ézéchiel","Daniel","Osée","Joël",
  "Amos","Abdias","Jonas","Michée","Nahum",
  "Habacuc","Sophonie","Aggée","Zacharie","Malachie",
  "Matthieu","Marc","Luc","Jean","Actes",
  "Romains","1 Corinthiens","2 Corinthiens","Galates",
  "Éphésiens","Philippiens","Colossiens",
  "1 Thessaloniciens","2 Thessaloniciens",
  "1 Timothée","2 Timothée","Tite","Philémon",
  "Hébreux","Jacques","1 Pierre","2 Pierre",
  "1 Jean","2 Jean","3 Jean","Jude","Apocalypse"
];

let lastPsalmIndex = -1;

async function obtenirVersetAleatoire() {
  while (true) {
    try {
      const livre = livres[Math.floor(Math.random() * livres.length)];
      const chapitre = Math.floor(Math.random() * 50) + 1;
      const verset = Math.floor(Math.random() * 30) + 1;

      const reference = `${livre} ${chapitre}:${verset}`;

      const response = await axios.get(
        `https://bible-api.com/${encodeURIComponent(reference)}?translation=lsg`
      );

      if (response.data && response.data.text) {
        return {
          reference,
          texte: response.data.text.trim()
        };
      }

    } catch (error) {
      // retry automatiquement
    }
  }
}

async function envoyerVersetDuJour() {
  const channelId = process.env.DAILY_VERSE_CHANNEL_ID;

  const channel = await client.channels.fetch(channelId);

  const verset = await obtenirVersetAleatoire();

  await channel.send(
    `🌅 **Verset du jour**\n\n` +
    `📖 **${verset.reference}**\n\n` +
    `${verset.texte}\n\n` +
    `🙏 Que cette Parole fortifie votre journée.`
  );
}

client.once('ready', () => {
  console.log(`Bible.v7 est connecté en tant que ${client.user.tag}`);

  cron.schedule('0 6 * * *', async () => {
    try {
      await envoyerVersetDuJour();
      console.log("Verset du jour envoyé.");
    } catch (error) {
      console.error(error);
    }
  }, {
    timezone: "America/New_York"
  });
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

  if (msg === '!bonjour') {
    message.reply('Bonjour 👋 Que Dieu vous bénisse.');
  }

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
      "`!devotion` — Recevoir une courte dévotion\n" +
      "`!testversetdujour` — Tester le verset du jour"
    );
  }

  if (msg === '!testversetdujour') {
    try {
      await envoyerVersetDuJour();
      message.reply("✅ Verset du jour envoyé.");
    } catch (error) {
      console.error(error);
      message.reply("❌ Impossible d’envoyer le verset du jour.");
    }
  }

  if (msg === '!psaume') {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * psaumes.length);
    } while (randomIndex === lastPsalmIndex);

    lastPsalmIndex = randomIndex;

    message.reply(psaumes[randomIndex].text);
  }

  if (msg.startsWith('!verset ')) {
    const reference = message.content.slice(8).trim();

    try {
      const response = await axios.get(
        `https://bible-api.com/${encodeURIComponent(reference)}?translation=lsg`
      );

      message.reply(
        `📖 **${reference}**\n\n${response.data.text.trim()}`
      );

    } catch (error) {
      message.reply(
        "🙏 Le verset demandé est introuvable.\n\n📖 Exemple : `!verset Jean 14:6`"
      );
    }
  }

  if (msg === '!priere') {
    message.reply(
      "🙏 Seigneur Jésus, couvrez cette personne de votre paix et fortifiez sa foi. Amen."
    );
  }

  if (msg === '!aide') {
    message.reply(
      "🙏 **Aide et soutien spirituel**\n\n" +
      "Nous sommes là pour vous écouter, prier avec vous et vous encourager.\n\n" +
      "🤝 Écrivez `!suivi` si vous souhaitez être accompagné."
    );
  }

  if (msg === '!suivi') {
    message.reply(
      "🤝 Votre demande de suivi a été reçue.\n\n" +
      "Un responsable pourra vous accompagner spirituellement."
    );
  }

  if (msg === '!temoignage') {
    message.reply(
      "🙌 Partagez votre témoignage pour encourager la communauté."
    );
  }

  if (msg === '!devotion') {
    message.reply(
      "✨ Aujourd’hui, avançons avec foi. Dieu marche devant nous."
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
