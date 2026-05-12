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
    text: "✨ **Soyez encouragé, car Dieu est proche de vous même dans la douleur.**\n\n🙏 Dieu dit dans **Psaume 34:18** :\n\n📖 « L’Éternel est près de ceux qui ont le cœur brisé. »"
  },
  {
    text: "✨ **Recevez aujourd’hui la paix et la guérison que Dieu vous donne.**\n\n🙏 Dieu dit dans **Psaume 147:3** :\n\n📖 « Il guérit ceux qui ont le cœur brisé, et il panse leurs blessures. »"
  },
  {
    text: "✨ **Soyez fort, car Dieu combat pour vous et vous donne la victoire.**\n\n🙏 Dieu dit dans **Psaume 18:2** :\n\n📖 « L’Éternel est mon rocher, ma forteresse et mon libérateur. »"
  },
  {
    text: "✨ **N’ayez pas peur, Dieu veille sur vous jour et nuit.**\n\n🙏 Dieu dit dans **Psaume 91:1-2** :\n\n📖 « Celui qui demeure sous l’abri du Très-Haut repose à l’ombre du Tout-Puissant. »"
  },
  {
    text: "✨ **Que la paix de Dieu remplisse votre cœur aujourd’hui.**\n\n🙏 Dieu dit dans **Psaume 4:9** :\n\n📖 « Je me couche et je m’endors en paix, car toi seul, ô Éternel, tu me donnes la sécurité. »"
  },
  {
    text: "✨ **Prenez courage, Dieu est votre lumière et votre salut.**\n\n🙏 Dieu dit dans **Psaume 27:1** :\n\n📖 « L’Éternel est ma lumière et mon salut : de qui aurais-je crainte ? »"
  },
  {
    text: "✨ **Gardez espoir, votre secours vient de Dieu.**\n\n🙏 Dieu dit dans **Psaume 121:1-2** :\n\n📖 « Je lève mes yeux vers les montagnes… D’où me viendra le secours ? Le secours me vient de l’Éternel. »"
  }
];

let lastPsalmIndex = -1;

client.once('ready', () => {
  console.log(`Bible.v7 est connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async message => {

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
      "`!verset Jean 14:6` — Rechercher un verset biblique\n" +
      "`!priere` — Recevoir une courte prière\n" +
      "`!jesus` — Message pour accepter Jésus-Christ\n" +
      "`!aide` — Recevoir de l’aide et du soutien spirituel\n" +
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

    message.reply(psaume.text);
  }

  if (msg.startsWith('!verset ')) {

    const reference = message.content.slice(8).trim();

    try {

      const response = await axios.get(
        `https://bible-api.com/${encodeURIComponent(reference)}?translation=lsg`
      );

      const verseText = response.data.text;

      message.reply(
        `📖 **${reference}**\n\n${verseText}`
      );

    } catch (error) {

      message.reply(
        "🙏 Le verset demandé est introuvable. Veuillez vérifier la référence biblique et réessayer.\n\n📖 Exemple : `!verset Jean 14:6`"
      );

    }
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
      "🙏 Dieu dit dans **Jean 14:6** :\n\n" +
      "📖 « Jésus lui dit : Je suis le chemin, la vérité et la vie. Nul ne vient au Père que par moi. »\n\n" +
      "🙏 Si vous avez fait cette prière avec foi, écrivez `!suivi` pour recevoir un accompagnement spirituel."
    );
  }

  if (msg === '!aide') {
    message.reply(
      "🙏 **Aide et soutien spirituel**\n\n" +
      "Nous sommes là pour vous écouter, prier avec vous et vous encourager dans votre marche avec Dieu.\n\n" +
      "🙏 Vous pouvez aussi écrire `!suivi` si vous souhaitez être accompagné spirituellement."
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
