const Discord = require("discord.js")
const sugerenciascanal = require("../../Schema/sugerenciascanal-schema")
const autor = require("../../Schema/autorsugerencia-schema")
const sugerenciaenviar = require("../../Schema/sugerenciaenviar-schema")



module.exports ={
  name: "sugerir",
  description: "Envias una sugerencia",
  options:[
    {
      name: "sugerencia",
      description: "La sugerencia que vas a enviar",
      required: true,
      type: 3
    }
  ],

  execute: async(client, int) =>{

    
    
    const usuario = int.user
    const sugerencia = int.options.getString("sugerencia")
    let datos = await sugerenciascanal.findOne({ serverID: int.guild.id})

    

    
    if(!datos) return int.reply({ content: "No hay ningún canal de sugerencias establecido contacta con algun administrador del servidor para que defina algún canal", ephemeral: true})

    let canal = datos.channelID
    
    let canals = client.channels.cache.get(canal)

    if(!canals){
      await sugerenciascanal.findOneAndDelete({serverID: int.guild.id})
      return int.reply({content: "No hay ningún canal de sugerencias establecido contacta con algun administrador del servidor para que defina algún canal", ephemeral: true})
    }



    if(!(canals.permissionsFor(int.guild.me).has("VIEW_CHANNEL")))return int.reply({ content: "No tengo los permisos necesarios para enviar sugerencias, necesito los permisos de \`Ver canal\` y \`Enviar mensajes\`", ephemeral: true})

    if(!(canals.permissionsFor(int.guild.me).has("SEND_MESSAGES")))return int.reply({ content: "No tengo los permisos necesarios para enviar sugerencias, necesito los permisos de \`Ver canal\` y \`Enviar mensajes\`", ephemeral: true})

   
    
    const embed = new Discord.MessageEmbed()
    .setTitle("Nueva sugerencia")
    .setDescription(`${sugerencia}`)
    .setThumbnail(usuario.displayAvatarURL({ size: 1024, dynamic: true}))
    .setFooter(`Sugerencia realizada por ${usuario.username}`)
    .setTimestamp()
    .setColor("ORANGE")


    int.reply({ content: "Tu sugerencia a sido enviada correctamente", ephemeral: true})

    client.channels.cache.get(canal).send({ embeds: [embed]}).then(async msg => {
      


    const embed1 = new Discord.MessageEmbed()
    .setTitle("Nueva sugerencia")
    .setDescription(`${sugerencia}`)
    .setThumbnail(usuario.displayAvatarURL({ size: 1024, dynamic: true}))
    .setFooter(`Sugerencia realizada por ${usuario.username}`)
    .setTimestamp()
    .setColor("ORANGE")
      msg.edit({embeds: [embed1]})


      msg.react("✅")
      msg.react("❌")

      
     let autors = new autor({
       autorID: usuario.id,
       messageID: msg.id
     })

      await autors.save()


     let sugerencias = new sugerenciaenviar({
       sugerencia: sugerencia,
       messageID: msg.id,
       positivos: 0,
       negativos: 0
     })

     await sugerencias.save()
    })


    

    


  }
}
