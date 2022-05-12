const Discord = require("discord.js")


module.exports = {
  name: "nuke",
  description: "Borras todos los mensajes de un canal",
  options: [
    {
      name: "canal",
      description: "El canal afectado por el nuke",
      required: true,
      type: 7
    }
  ],
  execute: async(client, int) => {

    const canal = int.options.getChannel("canal")
    var position = canal.position

    canal.clone().then(clone => {
      canal.delete()
      
      clone.setPosition(position)
       
     
      int.reply({content: "El canal ha sido nuckeado con éxito",ephemeral: true})

      const embed = new Discord.MessageEmbed()
      .setTitle("ESTE CANAL HA SIDO NUCKEADO")
      .setColor(0X00AE86)
      .setImage("https://media.giphy.com/media/HhTXt43pk1I1W/giphy.gif")
      .setFooter({text: ""})
      .setTimestamp()

      clone.send({embeds: [embed]})
      
    })
  }
}