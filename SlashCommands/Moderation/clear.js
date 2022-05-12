const Discord = require("discord.js"); //definimos discord
const ms = require("ms") //instalamos y definimos ms una npm que ayuda a manejar el tiempo de una manera más sencilla

module.exports = {
    name: "clear",
    description: "Puedes limpiar el exceso de mensajes", //hacemos el slash IMPORTANTE si teneís discord builders hacerlo como lo haceís habitualmente

options: [
      {
      name: 'cantidad',
      description: "Pon el numero de mensajes que quieres borrar",
      required: true,
      type: 4
      }
  ],

    execute: async (client, int) => { //yo utilizo int que es abreviado a interaction usar como tengais puesto el parametro

    

      const cantidad = int.options.getInteger("cantidad") //definimos la opcion de un numero entero que será el número de mensajes que nos dice el usuario

      let permiso = int.member.permissions.has("MANAGE_MESSAGES") //los permisos, si el ususario no tiene el permiso de administrar mensajes que retorne embed
      if(!permiso){
        const embed = new Discord.MessageEmbed() 
.setTitle(":x: No tienes los permisos suficientes para realizar esta acción")
.setColor("RED") 
.setFooter({text: ""})
.setTimestamp()
    return int.reply({embeds: [embed]})
      }
 if(!(int.guild.me.permissions.has("MANAGE_MESSAGES"))){ //si el bot no tiene permisos de administrar mensajes que retorne un embed
    const embed = new Discord.MessageEmbed()
.setTitle(":x: No tengo el permiso de `GESTIONAR MENSAJES`")
.setColor("RED")  
.setFooter({text: ""})
.setTimestamp()

    return int.reply({embeds : [embed]})}

      if(cantidad <= "0"){ //si la cantidad es menor o igual a 0 que retorne mensaje
    const embed = new Discord.MessageEmbed()
     .setTitle(":x: La cantidad no puede ser menor o igual a 0")
    .setColor("RED") 
    .setFooter({text: ""})
    .setTimestamp()

    return int.reply({embeds : [embed]})  
      }
        
      if(cantidad >= "100"){ //si la cantidad es mayor o igual a 100 que retorne ya que no podemos borrar más de 99 mensajes de una
        const embed = new Discord.MessageEmbed()

    .setTitle(":x: La cantidad no puede ser mayor o igual a 100")
    .setColor("RED")  
    .setFooter({text: ""})
    .setTimestamp()

        return int.reply({embeds: [embed]})
           }

      
      const messages = await int.channel.messages.fetch({ limit: cantidad}) //ojo esto es muy IMPORTANTE; aqui hacemos un fetch a los mensajes del canal con un limite de el número de mensajes que el usuario quiere que borremos
      const filtered = messages.filter((msg) => Date.now() - msg.createdTimestamp < ms("14 days")) //filtramos los mensajes que hemos hecho el fetch como mensajes que hayan sido enviados antes de 14 días
      const days = messages.filter((msg) => Date.now() - msg.createdTimestamp > ms("14 days")) //filtramos los mensajes que no se podrían borrar porque tiene mas de 14 días

      


      

      let mensaje; //hacemos esto solo para que quede más estetico y si solo ponemos que borre un mensaje que diga solo mensaje
      if (filtered.size  <= 1) {
        mensaje = "mensaje"
      } else if (filtered.size  >= 1) {
        mensaje = "mensajes"
      }
      
      
     
          if(days.size === 0){ //si no hay ningun mensaje de más de 14 días borramos todos los mensajes dichos por el usuario y enviamos mensaje
     await int.channel.bulkDelete(filtered.size
      ).then(() => {
        return int.reply({content:`Se han borrado ${filtered.size} ${mensaje}`, ephemeral: true})
      })
          }
      
         
       if(filtered.size === 0){ //si todos los mensajes son de más de 14 días envia un mensaje diciendo que todos los mensajes son de 14 días y no ha podidio borrar ninguno
          return int.reply({content:"No he podido borrar ningun mensaje de este canal porque todos los mensajes se crearon hace más de 14 días", ephemeral: true})
       }
         if(days.size >= 1){ //si hay al menos 1 mensaje que no se haya podido borrar que retorne un mensaje de que se han podido borrar x mensajes pero que no todos 
         await int.channel.bulkDelete(filtered.size ).then(() => {
           return int.reply({content: `Se han borrado ${filtered.size} ${mensaje} porque algunos de los mensajes que has seleccionado tienen más de 14 días y no los puedo borrar`, ephemeral: true})
         })
        }
      




    }
}
