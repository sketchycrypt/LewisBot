const { Client, Intents } = require('discord.js');
const voiceDiscord = require('@discordjs/voice');
const dotenv = require('dotenv');
const express = require('express');
var fs = require('fs');
var files = fs.readdirSync('./audio')



dotenv.config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
    ]
})

client.on('ready', () =>{
    console.log("The bot is ready")
})


client.on('messageCreate', (message)=>{
    
   switch(message.content){
       case 'ping':
        message.reply("hello there, my name is lewis bot");
       break;

       case 'vc':
        message.reply("depcrated bozo");
       break;

       case 'phenomenal':
           message.channel.send("Simnply henomoenal");
        break;
        
        case 'happy':
            message.channel.send("you mean bappy, right?");
        break;
   }
})

client.setMaxListeners(2);

client.on("voiceStateUpdate", (oldState, newState) => {
    if (newState.member.id == "218027442357534721" && oldState.channelId === null) {
        var chosenFile = files[Math.floor(Math.random() * files.length)] 
        console.log(chosenFile);
        var player = voiceDiscord.createAudioPlayer();
        var resource = voiceDiscord.createAudioResource('audio/' + chosenFile);
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
            var chosenFile = files[Math.floor(Math.random() * files.length)] 
            console.log(chosenFile);
        });
    }
});


client.login(process.env.TOKEN)