const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('guide')
    .setDescription('Afficher le guide Bible.v7'),

  new SlashCommandBuilder()
    .setName('psaume')
    .setDescription('Recevoir un psaume'),

  new SlashCommandBuilder()
    .setName('priere')
    .setDescription('Recevoir une prière'),

  new SlashCommandBuilder()
    .setName('jesus')
    .setDescription('Recevoir le message du salut'),

  new SlashCommandBuilder()
    .setName('aide')
    .setDescription('Recevoir du soutien spirituel'),

  new SlashCommandBuilder()
    .setName('devotion')
    .setDescription('Recevoir une dévotion'),

  new SlashCommandBuilder()
    .setName('verset')
    .setDescription('Rechercher un verset')
    .addStringOption(option =>
      option
        .setName('reference')
        .setDescription('Exemple : Jean 3:16')
        .setRequired(true)
    ),
]
.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Déploiement des slash commands...');

    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      { body: commands },
    );

    console.log('Slash commands déployées avec succès.');
  } catch (error) {
    console.error(error);
  }
})();
