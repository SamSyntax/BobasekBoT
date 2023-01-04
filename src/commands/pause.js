const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data:new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Wstrzymuje puszczone gówno.'),

    async execute(client, interaction) {
        const player = client.manager.players.get(interaction.guild.id);

        if(!player) return interaction.reply('Nie gram na tym serwerze');

        if(!player.playing) return interaction.reply('Zostaw mnie kurwa, przecież mnie tu nie ma');

        player.pause(true);

        interaction.reply('Dobra, już wstrzymuję kurewko');


    }

}