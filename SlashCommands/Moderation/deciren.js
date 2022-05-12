const Discord = require("discord.js");

module.exports = {
    name: "deciren",
    description: "El bot dice lo que pongas en en el canal que digas",

options: [
      {
      name: 'mensaje',
      description: "Pon el mensaje que quieres que el bot diga",
      required: true,
      type: 3
      },
      {
        name: "canal",
        description: "Elige el canal donde quieres que se envie el mensaje",
        required: true,
        type: 7
      }
  ],

    execute: async (client, int) => {
    const perms = int.member.permissions.has("MANAGE_MESSAGES")
    const texto = int.options.getString("mensaje")
    const canal = int.options.getChannel("canal")
      function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if(regexp.test(str)) {
    return true;
  } else {
    return false;
  }
  
}
    
    

    if(is_url(texto) === true) {
      
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: No puedes decir que ponga un enlace")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({ embeds: [embed]})
    }
      if(!(canal.type === "GUILD_TEXT")){
        const embed = new Discord.MessageEmbed()
.setTitle(":x: Este canal no es un canal de texto")
.setColor("RED") .setFooter({text: ""})
.setTimestamp()

    return int.reply({embeds: [embed]})

             }
      if(!(canal.permissionsFor(int.guild.me).has("VIEW_CHANNEL"))){
  const embed = new Discord.MessageEmbed()
  .setTitle(`:x: No tengo el permiso \`VER CANAL\` en el canal seleccionado con lo cual no puedo enviar el mensaje seleccionado`)
  .setColor("RED")
  .setFooter({text: ""})
  .setTimestamp()
  return int.reply({embeds: [embed]})
}

if(!(canal.permissionsFor(int.guild.me).has("SEND_MESSAGES"))){
  const embed = new Discord.MessageEmbed()
  .setTitle(`:x: No tengo el permiso \`ENVIAR MENSAJES\` en el canal seleccionado con lo cual no puedo enviar el mensaje seleccionado`)
  .setColor("RED")
  .setFooter({text: ""})
  .setTimestamp()

  return int.reply({ embeds: [embed]})
}
    const embed = new Discord.MessageEmbed() 
    .setTitle("El Bot de Pablo dice:")
    .setColor(0x00AE86)
    .setAuthor(int.user.username, int.user.avatarURL)
    .setDescription(`**${texto}**`)
    .setFooter ("")
    .setTimestamp()
    if(!perms) return int.reply({ content: `No tienes permsios para ejecutar este comando`, fetchReply: true }).then(m => setTimeout(() => m.delete(), 1200))
    int.reply({ content: `Se ha enviado el mensaje correctamente`, fetchReply: true }).then(m => setTimeout(() => m.delete(), 1200))
  
    canal.send({embeds: [embed] })
    
    
  }
}