const Discord = require("discord.js")
const sugerenciascanal = require("../../Schema/sugerenciascanal-schema")
const autor = require("../../Schema/autorsugerencia-schema")
const sugerenciaenviar = require("../../Schema/sugerenciaenviar-schema")


module.exports = {
  name: "sugerencia-decision",
  description: "Decides si aceptas o rechazas la sugerencia a través de su id",
  options:[
  {
    name: "id",
    description: "El id de la sugerencia",
    required: true,
    type: 3
  },
  {
  name: "acción",
  description: "La accion que llevarás a cabo con la sugerencia especificada",
  choices: [
    {
      name: "aceptar",
      value: "aceptar"
    },
    {
      name: "rechazar",
      value: "rechazar"
    }
  ],
  required: true,
  type: 3
  },
  {
    name: "motivo",
    description: "El motivo por el que acepat/rechazar la sugerencia",
    required: true,
    type: 3
  }
  ],

  execute: async(client, int) =>{

  var perms = int.member.permissions.has("ADMINISTRATOR")


  if(!perms){
  const embed = new Discord.MessageEmbed()
  .setTitle(":x: No tienes los suficientes permisos para relizar esta acción")
  .setColor("RED")
  .setFooter(`Intentado por${int.user.username}`)
  .setTimestamp()
  return int.reply({embeds: [embed]})
  }

  const accion = int.options.getString("acción")
  const mensaje = int.options.getString("id")
  
  let datos = await sugerenciascanal.findOne({ serverID: int.guild.id})

  if(!datos) return int.reply({ content: "No hay ningún canal de sugerencias establecido estblece un canal para poder decidir las sugerencias", ephemeral: true})

  
if(isNaN(mensaje))return int.reply({ content:"Esta no es una id posible recuerda que la id solo contiene números", ephemeral: true})




 

  let datossugerencia = await sugerenciaenviar.findOne({ messageID: mensaje})
  if(!datossugerencia) return int.reply({content: "No he encontrado ninguna sugerencia con esa id", ephemeral: true})





  let datosautor = await autor.findOne({menssageID: mensaje})

  const persona = datosautor.autorID

  const usuario = int.guild.members.resolve(persona)

  const user = client.users.cache.get(persona)

  if(!usuario) return int.reply({ content: "No he encontrado el usuario de la sugerencia", ephemeral: true})



  const content = datossugerencia.sugerencia

  const motivo = int.options.getString("motivo")
    const canal = datos.channelID
    
    const finalchannel = await int.guild.channels.fetch(canal)
    
    
    
    
  
    const sugerencia = await finalchannel.messages.fetch(mensaje)
    
   
  
  if(accion === "aceptar"){
    const embed = new Discord.MessageEmbed()
    .setTitle(`Sugerencia aceptada`)
    .setDescription(`**Sugerencia de ${user.tag}:**\n${content}\n\n**Motivo de ${int.user.tag}:**\n${motivo}`)
    .setFooter(`Aceptada por ${int.user.username}`)
    .setTimestamp()
    .setColor("GREEN")
    .setThumbnail(user.displayAvatarURL({ size: 1024, dynamic: true}))
    


  sugerencia.edit({ embeds: [embed]})
  sugerencia.reactions.removeAll()
  await sugerenciaenviar.findOneAndDelete({sugerencia: content})


  int.reply({content: "La sugerencia ha sido aceptada éxitosamente", ephemeral: true})
  }


  
 if(accion === "rechazar"){
   const embed = new Discord.MessageEmbed()
   .setTitle(`Sugerencia rechazada`)
   .setDescription(`**Sugerencia de ${user.tag}:**\n${content}\n\n**Motivo ${int.user.tag}:**\n${motivo}`)
   .setFooter(`Rechazada por ${int.user.username}`)
   .setTimestamp()
   .setThumbnail(user.displayAvatarURL({ size : 1024, dynamic: true}))
   .setColor("RED")

   int.reply({content: "La sugerencia ha sido rechazada éxitosamente", ephemeral: true})

   sugerencia.edit({embeds: [embed]})
   sugerencia.reactions.removeAll()
   sugerenciaenviar.findOneAndDelete({messageID: mensaje})

  
 }










  }
}