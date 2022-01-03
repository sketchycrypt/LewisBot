const { SlashCommandBuilder } = require("@discordjs/builders");
const extra = require('../data.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("phenomenal")
        .setDescription("say the line bart"),
    async execute(interaction) {
        interaction.reply(extra.gif);
    }
}