const { Client, Interaction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Unmute Someone",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "User To Unmute",
      type: 6,
      required: true,
    },
  ],
  permissions: ["MANAGE_ROLES"],
  botPerms: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  execute: async (client, interaction) => {
    try {
      const options = interaction.options._hoistedOptions;

      const user = options.find((e) => e.name === "user");

      const embed = new MessageEmbed().setColor("GREEN");

      let MutedRole = interaction.guild.roles.cache.find((r) => r.name === "Muted");

      if (!MutedRole) {
        embed.setColor("RED").setDescription(`:x: No Muted Role Found, Use Mute to Create One`);
        return await interaction.reply({ embeds: [embed] });
      }

      if (!user.member.roles.cache.find((e) => e.name === "Muted")) {
        embed.setColor("RED").setDescription(`:x: User Is Not Muted`);
        return await interaction.reply({ embeds: [embed] });
      }

      await user.member.roles.remove(MutedRole);
      embed.setDescription(`:white_check_mark: ${user.member.toString()} ***Unmuted Successfully***`);
      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.log(`Error => `, err);
    }
  },
};