const Discord = require("discord.js")
const sugerencia = require("../../Schema/sugerenciaenviar-schema")
const autor = require("../../Schema/autorsugerencia-schema")
const canalsugerencias = require("../../Schema/sugerenciascanal-schema")

module.exports = {
  name: "sugerencia-editar",
  description: "Editas tú sugerencia si aún no esta decidida",
  options:[
   {
     name: "id",
     description: "La id de la sugerencia que vas a editar",
     required: true,
     type :3
   },
   {
     name: "sugerencia",
     description: "La nueva sugerencia que pondrás",
     required: true,
     type: 3
   }
  ],

 execute: async(client, int) => {

    let id = int.options.getString("id")
    let sugerencianueva = int.options.getString("sugerencia")
    
    if(isNaN(id)){
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: Esto parece que no es una id de una sugerencia prueba a quitarle las letras si tiene")
      .setColor("RED")
      .setFooter({text: ""})
      return int.reply({ embeds: [embed]})
    }

    let datos = await sugerencia.findOne({messageID: id})

    if(!datos){
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: No hay ninguna id de una sugerencia que coincida con la id proporcionada")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({embeds: [embed]})
    
    }
 
   let autordatos = await autor.findOne({messageID: id})
   let canalsugerencia = await canalsugerencias.findOne({serverID: int.guild.id})


   let autorsugerencia = autordatos.autorID
   let canal = canalsugerencia.channelID


  if(autorsugerencia !== `${int.user.id}`){
    const embed = new Discord.MessageEmbed()
    .setTitle(":x: Esta sugerencia no la has creado tú por lo que no puedes editarla")
    .setColor("RED")
    .setFooter({text: ""})
    .setTimestamp()

    return int.reply({embeds: [embed]})
  }

  let sugerenciamensaje = await client.channels.cache.get(canal).messages.fetch(id)
  if(datos.positivos === 0 && datos.negativos === 0){
    const embed = new Discord.MessageEmbed()
    .setTitle("Nueva sugerencia")
    .setDescription(`${sugerencianueva}\n\n(Editada)`)
    .setThumbnail(int.user.displayAvatarURL({ size: 1024, dynamic: true}))
    .setFooter(`Sugerencia realizada por ${int.user.username} | ID: ${id}`)
    .setTimestamp()
    .setColor("ORANGE")

     sugerenciamensaje.edit({embeds: [embed]})
    await sugerencia.findOneAndUpdate({messageID: id}, {sugerencia: sugerencianueva})
    return int.reply({content: "La sugerencia ha sido editada con èxito", ephemeral: true})

  }
  const embed = new Discord.MessageEmbed()
    .setTitle("Nueva sugerencia")
    .setDescription(`${sugerencianueva}\n\n(Editada)\n\nVotos positivos: \`${(datos.positivos )/(datos.positivos  + datos.negativos ) * 100}%\`\n\nVotos negativos: \`${(datos.negativos)/(datos.positivos  + datos.negativos) * 100}%\``)
    .setThumbnail(int.user.displayAvatarURL({ size: 1024, dynamic: true}))
    .setFooter(`Sugerencia realizada por ${int.user.username} | ID: ${id}`)
    .setTimestamp()
    .setColor("ORANGE")

    sugerenciamensaje.edit({embeds: [embed]})
    await sugerencia.findOneAndUpdate({messageID: id}, {sugerencia: sugerencianueva})
    return int.reply({content: "La sugerencia ha sido editada con èxito", ephemeral: true})
    
  }

}