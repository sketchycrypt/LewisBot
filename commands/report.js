const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report")
        .setDescription("reports lewis for having eyes, how dare"),
    async execute(interaction) {
        interaction.reply("how dare lewis have eyes, thank you for your report");
    }
}