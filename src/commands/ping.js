const { SlashCommandBuilder, Client, IntentsBitField, messageLink, Message, Collection } = require("discord.js");

module.exports = {
    data:new SlashCommandBuilder()
    .setName("major")
    .setDescription("InterMajor"),

    async execute(client, interaction) {
        interaction.reply(`${client.ws.ping}`)
    }
}