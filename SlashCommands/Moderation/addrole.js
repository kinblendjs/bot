const Discord = require("discord.js") //definimos discord :)


module.exports ={
  //definis las opciones del slash del modo que lo hagais
  name: "add_role",
  description: "Añade el rol que indiques al usuario que indiques",
  options: [
    {
      name: "rol",
      description: "El rol que darás al miembro que indiques",
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
    //yo para interaction uso int pero si usais interaction poneis interaction en vez de int

    let rol = int.options.getRole("rol")// definimos la constante como el rol que hemos elegido en los slash
    let user = int.options.getMember("usuario")// definimos la constante como el usuario de la opcion del slash

    if(!int.member.permissions.has("MANAGE_ROLES")){ // si el ususario no tiene permisos que retorne un embed
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: No tienes los permisos para ejecutar esta acción")
      .setColor("RED")
      .setFooter({text: ""}) //podeis poner vuestro nombre o quitar el footer si quiereis
      .setTimestamp()

      return int.reply({embeds: [embed]})
    }

    if(rol.managed){
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: No puedo dar este rol ya que es un rol manejado por el sistema")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({embeds: [embed]})
    }
    
    if(user.roles.cache.has(rol.id)){// si el usuario que hemos definido en user tiene ya ese rol
      const embed =  new Discord.MessageEmbed()
      .setTitle(":x: Este usuario ya tiene el rol que le has querido añadir")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({embeds: [embed]})
    }

  

    if(int.member.roles.highest.comparePositionTo(user.roles.highest)<= 0){//si el usuario tiene menos poder que el objetivo del comando que retorne un embed
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: Tienes menos poder que el usuario al que quieres poner un rol")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({embeds: [embed]})
    }
        if(int.guild.me.roles.highest.comparePositionTo(user.roles.highest)<= 0){ //si el bot tiene menos poder que el objetivo que retorne asi no saldrá el error Mising  Permissions
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: Tengo menos poder que el usuario al que quieres poner un rol")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({embeds: [embed]})
    }

    if(int.guild.me.roles.highest.comparePositionTo(rol) <= 0){// si el rol que intento dat es mayor que mi mayor rol
      const embed = new Discord.MessageEmbed()
      .setTitle(":x: No puedo añadir este rol porque mi rol más alto esta por debajo de este rol")
      .setColor("RED")
      .setFooter({text: ""})
      .setTimestamp()

      return int.reply({embeds: [embed]})
    }

    user.roles.add(rol.id)// añade el rol al usuario y manda embed de respuesta
    const embed = new Discord.MessageEmbed()
    .setTitle(`:white_check_mark: Se añadio el rol ${rol.name} a ${user.user.username} éxitosamente`)
    .setColor("GREEN")
    .setFooter({text: ""})
    .setTimestamp()

    return int.reply({embeds: [embed]})
    } 
  
}