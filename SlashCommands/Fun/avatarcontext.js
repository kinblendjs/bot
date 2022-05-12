const Discord = require("discord.js")

module.exports ={
  name: "Avatar",
  type: 2,

  execute: async(client, int) =>{

    let user = await int.guild.members.fetch(int.targetId)

    const embed = new Discord.MessageEmbed()
    .setTitle(`Avatar de ${user.user.username}`)
    .setColor(0x00AE86)
    .setImage(user.user.displayAvatarURL({size: 2048, dynamic: true}))
    .setFooter({text: ""})
    .setTimestamp()

    int.reply({embeds: [embed]})
  }
}