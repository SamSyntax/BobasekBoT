// const {SlashCommandBuilder} = require('discord.js');

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data:new SlashCommandBuilder()
    .setName('play')
    .setDescription('Gra muzyczkę 😎')
    .addStringOption(option => option.setName('song_name').setDescription('Wprowadź nazwę pioseneczki').setRequired(true)),
    async execute(client, interaction){
     const song_name = interaction.options.getString('song_name');
    
     if(!interaction.member.voice.channel) return interaction.reply({content: 'Musisz być na kanale głosowym żeby puścić muzykę garnuchu', ephemeral:true})


     let player = client.manager.players.get(interaction.guild.id);

     if(!player) player = client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channel.id,
     })


     const songs = await client.manager.search(song_name);

     player.connect();

     player.queue.add(songs.tracks[0]);

     if(!player.playing) player.play();


     interaction.reply(`Puszczamy ${songs.tracks[0].title}`)
    }


}

