const { MessageEmbed } = require("discord.js");

const Schema = require("../../Models/GuildConfig")

module.exports = {
    name: "prefix",
    description: "Check and set custom prefix for guild!",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @param {String} PREFIX 
     */
    execute: async (client, message, args, PREFIX) => {

        const guildConfig = await Schema.findOne({ GuildID: message.guildId });

        const embed = new MessageEmbed().setColor("WHITE");

        if (!args.length) {
            embed.setDescription(`Prefix for **${message.guild.name}** is **${guildConfig?.Prefix ?? PREFIX}**`);

            return await message.channel.send({ embeds: [embed ] });
        }

         if (args[0] === "set") {
            const newPrefix = args[1];

            if (newPrefix.length > 5) {
                embed.setDescription(`Prefix length must be less than 5!`);

                return await message.channel.send({ embeds: [embed ] });
            }

            if (!newPrefix) {
              embed.setDescription(`Must provide new prefix to set! \`${guildConfig?.Prefix ?? PREFIX}prefix set <Prefix>\``);

              return await message.channel.send({ embeds: [embed ] });
            }

            await Schema.findOneAndUpdate({ GuildID: message.guildId }, { Prefix: newPrefix }, { upsert: true });
            embed.setDescription(`Custom prefix selected as **${newPrefix}**`);

            return await message.channel.send({ embeds: [embed ] });
         }
        // console.log(args);
    },
};