const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName("catch").setDescription("Who are you gonna catch?"),
  async execute(interaction) {
      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId('primary')
        .setLabel('Click')
        .setStyle('PRIMARY'),
      );

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('You have just caught a rare Emily!')
            .setDescription('If you dont catch Emily here... you are donzo')

    interaction.reply({ embeds: [embed], components: [row]})

  },
};
