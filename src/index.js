const { Client, IntentsBitField, messageLink, Message, Collection } = require('discord.js');
// const { config } = require('dotenv');
const { REST, Routes } = require('discord.js');
const config = require('./Data/config.json');
// const { Routes } = require('discord-api-types/v9');
const { Manager } = require('erela.js');
const fs = require('node:fs');
// require('dotenv').config();

const token = config.token;
const clientId = config.clientId;
const guildId = config.guildId;

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildVoiceStates
    ],
});

client.login(config.token);

client.commands = new Collection();






const commands = [];

const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}


const rest = new REST({version: `10`}).setToken(token);


(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error){
        console.error(error);
    }
})();

// Bot events


client.once('ready', () => {
    console.log(`${client.user.tag} has logged in`);
    client.manager.init(client.user.id);
});

client.on('interactionCreate', (interaction) => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName)
    if(!command) return;

    try {
        command.execute(client, interaction);
    } catch (error) {
        interaction.reply({content: 'There was an error exexcuting this command', ephemeral:true});
    }
});

// music

const nodes = [
        {
        host: "node1.kartadharta.xyz",
        password: "kdlavalink",
        port: 443,
        secure: true,
    }
];

client.manager = new Manager({
    nodes,

    send:(id,payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    }
});


client.manager.on('nodeConnect', node => {
    console.log(`Node "${node.options.identifier}" connected`);
});

client.manager.on('nodeError', (node, error) => {
    console.log(`Node "${node.options.identifier}" encountered an error ${error.message}`);
});

client.on('raw', d => client.manager.updateVoiceState(d));






