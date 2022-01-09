const { Client, Intents, Collection } = require("discord.js");
const voiceDiscord = require("@discordjs/voice");
const dotenv = require("dotenv");
const express = require("express");
const extra = require("./data.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
var fs = require("fs");
var GUILD_ID = "921765232517480528";
var files = fs.readdirSync("./audio");

dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS,
  ],
});

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

client.on("ready", () => {
  console.log("The bot is ready");
  const CLIENT_ID = client.user.id;
  const rest = new REST({
    version: "9",
  }).setToken(process.env.TOKEN);

  (async () => {
    try {
      if (process.env.ENV === "production") {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        });
        console.log("Succesfully registered commands globally");
      } else {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
          body: commands,
        });
        console.log("Succesfully registered commands locally");
      }
    } catch (err) {
      if (err) console.error(err);
    }
  })();

  client.user.setActivity('over Emily', { type: "WATCHING" });

});

client.on("messageCreate", async (message) => {
  console.log(`${message.author.username} : ${message.content}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    if (err) console.error(err);

    await interaction.reply({
      content: "An error occured with the command",
      ephemeral: true,
    });
  }
});

client.setMaxListeners(2);

client.on("voiceStateUpdate", (oldState, newState) => {
  if (
    newState.member.id == "218027442357534721" &&
    oldState.channelId === null
  ) {
    var chosenFile = files[Math.floor(Math.random() * files.length)];
    console.log(chosenFile);
    var player = voiceDiscord.createAudioPlayer();
    var resource = voiceDiscord.createAudioResource("audio/" + chosenFile);
    var connection = voiceDiscord.joinVoiceChannel({
      channelId: newState.channelId,
      guildId: newState.guild.id,
      adapterCreator: newState.guild.voiceAdapterCreator,
    });
    player.play(resource);
    player.on("error", console.error);
    console.log("the beast has arrived");
    connection.subscribe(player);
    player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
      connection.destroy();
      var chosenFile = files[Math.floor(Math.random() * files.length)];
      console.log(chosenFile);
    });
  }
});

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
  let chance = Math.random() <= 0.5;
  if(chance < 0.5){
    interaction.reply("You have caught a **Rare** Emily!")
  }else if(chance > 0.5){
    interaction.reply("The poor bastard, " + interaction.user.username + " didnt catch Emily, he has been timed out for 60 seconds");
    // interaction.user.timeout(60 * 1000, 'Didnt catch Emily')
    // .then(console.log("OWNED A BOZO HAHAHA"))
    // .catch(console.error);
  }
});

client.login(process.env.TOKEN);
