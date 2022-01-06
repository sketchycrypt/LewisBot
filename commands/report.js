const { SlashCommandBuilder } = require("@discordjs/builders");
const { User } = require("discord.js");
const extra = require('../data.json');
const index = require('../index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("reports lewis for having eyes, how dare")
    .addSubcommand(subcommand =>
		subcommand
			.setName('user')
			.setDescription('Info about a user')
			.addUserOption(option => option.setName('target').setDescription('User'))),
  async execute(interaction) {
    var reported = interaction.options.getUser('target');

    if(reported.username = "Chef"){
        interaction.reply("How dare he have eyes")
    }else {
        interaction.reply("Thanks for reporting" + reported);
    }
  },
};
