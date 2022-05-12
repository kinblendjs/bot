const Discord = require("discord.js")


module.exports ={
  name: "remove_role",
  description: "Quita el rol que indiques al usuario que indiques",
  options: [
    {
      name: "rol",
      description: "El rol que quitarás al miemro que indiques",
      required: true,
      type: 8
    },
    {
      name: "usuario",
      description: "El usuario al que vas a dar el rol",
      required: true,
      type: 6
    }
  ],
    execute: async(client, int) => {

    let rol = int.options.getRole("rol")
    let user = int.options.getMember("usuario")

    if(!int.member.permissions.has("MANAGE_ROLES")){
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: No tienes los permisos para ejecutar esta acción")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({embeds: [embed]})
    }

    if(!user.roles.cache.has(rol.id)){
      const embed =  new Discord.MessageEmbed()
      .setTitle(":x: Este usuario no tiene el rol que le has querido quitar")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({embeds: [embed]})
    }

    if(int.member.roles.highest.comparePositionTo(user.roles.highest)<= 0){
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: Tienes menos poder que el usuario al que quieres quitar un rol")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({embeds: [embed]})
    }
        if(int.guild.me.roles.highest.comparePositionTo(user.roles.highest)<= 0){
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: Tengo menos poder que el usuario al que quieres quitar un rol")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({embeds: [embed]})
    }

    if(int.guild.me.roles.highest.comparePositionTo(rol) <= 0){
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: No puedo quitar este rol porque mi rol más alto esta por debajo de este rol")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({embeds: [embed]})
    }

    user.roles.remove(rol.id)
    const embed = new Discord.MessageEmbed()
    .setTitle(`:white_check_mark: Se quitó el rol ${rol.name} a ${user.user.username} éxitosamente`)
    .setColor("GREEN")
    .setFooter({text: ""})
    .setTimestamp()

    return int.reply({embeds: [embed]})
    } 
  
}