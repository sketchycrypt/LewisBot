const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName("catch").setDescription("Emily! Come here Emily!"),
  async execute(interaction) {
      const button1 = new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('Catch!')
          .setCustomId('primary')

      const row = new MessageActionRow()
      .addComponents(
        button1
      );

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('You have just caught a rare Emily!')
            .setDescription('If you dont catch Emily here... you are donzo')

    interaction.reply({ embeds: [embed], components: [row]})

  },
};
