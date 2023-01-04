const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data:new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Wznawia puszczone gówno.'),

    async execute(client, interaction) {
        const player = client.manager.players.get(interaction.guild.id);

        if(!player) return interaction.reply('Nie gram na tym serwerze');

        if(!player.playing) return interaction.reply('Zostaw mnie kurwa, przecież mnie tu nie ma');

        player.play();

        interaction.reply('Dobra, już wznawiam kurewko');


    }

}