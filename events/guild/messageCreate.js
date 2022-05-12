const { Client, Message } = require("discord.js");

const Schema = require("../../Models/GuildConfig")

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @returns 
 */

module.exports = async (client, message) => {
     const guildConfig = await Schema.findOne({ GuildID: message.guildId });

     let PREFIX = "!";

     if (guildConfig && guildConfig?.Prefix) { 
          PREFIX = guildConfig?.Prefix;
     }

     if (!message.content.startsWith(PREFIX) || message.author.bot) return;
 
     const args = message.content.slice(PREFIX.length).split(/[ ]+/);
     const command = args.shift().toLowerCase();
     if (!command.length) return;

     const cmd = client.commands.get(command);
     if (!cmd) return;

     cmd.execute(client, message, args, PREFIX);
}