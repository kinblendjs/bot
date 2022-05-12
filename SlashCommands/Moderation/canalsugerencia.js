const Discord = require("discord.js")
const sugerencias = require("../../Schema/sugerenciascanal-schema")

module.exports ={
  name: "canalsugerencias",
  description: "El canal donde las sugerencias se mandarán",

  options:[
    {
     name: "canal",
     description: "El canal donde las sugerencias se mandarán",
     required: true,
     type: 7
    }
  ],
  execute: async(client, int) =>{

    const canal = int.options.getChannel("canal")


    var perms = int.member.permissions.has("ADMINISTRATOR")
    if(!perms){
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: No tienes los permisos necesarios para poder ejecutar esta acción, necesitas el permiso de `ADMINISTRADOR`")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({ embeds: [embed]})
    }

    if(!(canal.type === "GUILD_TEXT")) return int.reply({ content: "Este canal no es un canal de texto", ephemeral: true})


    if(!(canal.permissionsFor(int.guild.me).has("VIEW_CHANNEL")))return int.reply({ content: "No tengo los permisos necesarios para enviar sugerencias, necesito los permisos de \`Ver canal\` y \`Enviar mensajes\` para poder establecer el canal de sugerencias verifica si me falta alguno", ephemeral: true})

    if(!(canal.permissionsFor(int.guild.me).has("SEND_MESSAGES")))return int.reply({ content: "No tengo los permisos necesarios para enviar sugerencias, necesito los permisos de \`Ver canal\` y \`Enviar mensajes\` para poder establecer el canal de sugerencias verifica si me falta alguno", ephemeral: true})


   


    let datos = await sugerencias.findOne({ serverID: int.guild.id})

    if(!datos){
    let datosnuevos = new sugerencias({
      serverID: int.guild.id,
      channelID: canal.id
    })

    await datosnuevos.save()

    }

    await sugerencias.findOneAndUpdate({ serverID: int.guild.id, channelID: canal.id})

    const embed = new Discord.MessageEmbed()
    .setTitle(`:white_check_mark: El canal de sugerencias se ha establecido en ${canal.name} correctamente`)
    .setColor("GREEN")
    .setFooter({text: ""})
    .setTimestamp()
    
    int.reply({ embeds: [embed]})


    let everyone = int.guild.roles.cache.find(r => r.name == "@everyone")

    canal.permissionOverwrites.create(everyone.id, {
      SEND_MESSAGES: false
    })
  }
}