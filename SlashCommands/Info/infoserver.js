const Discord = require("discord.js")


module.exports = {
  name: "info-server",
  description: "La información del servidor en el que ejecutas el comando",
  execute: async(client, int) => {

    const presenceonline = int.guild.members.cache.filter(m => ! m.user.bot).filter(member => member.presence?.status === "online");
    
    const presenceidle = int.guild.members.cache.filter(m => ! m.user.bot).filter(member => member.presence?.status === "idle");

    const presencednd = int.guild.members.cache.filter(m => !m.user.bot).filter(member => member.presence?.status === "dnd");

    const presenceoffline = int.guild.members.cache.filter(m => !m.user.bot).filter(member => member.presence?.status === "offline");

    const presenceonlinebot = int.guild.members.cache.filter(m => m.user.bot).filter(member => member.presence?.status === "online");

    const presenceidlebot = int.guild.members.cache.filter(m => m.user.bot).filter(member => member.presence?.status === "idle");

    const presencedndbot = int.guild.members.cache.filter(m => m.user.bot).filter(member => member.presence?.status === "dnd");

    const presenceofflinebot = int.guild.members.cache.filter(m => m.user.bot).filter(member => member.presence?.status === "offline");

    
    if(int.guild.channels.cache.filter(c => c.type === "GUILD_CATEGORY").size === 1){
      var categorias = "categoria"
    }else{
      var categorias = "categorias"
    }

    if(int.guild.channels.cache.filter(ch => ch.type === "GUILD_TEXT").size === 1){
      var texto = "canal"
    }else{
      var texto = "canales"
    }

    if(int.guild.channels.cache.filter(ch => ch.type === "GUILD_VOICE").size === 1){
      var voz = "canal"
    }else {
      var voz = "canales"
    }

    if(int.guild.channels.cache.size === 1){
      var canales = "canal"
    }else{
      var canales = "canales"
    }

    if(int.guild.members.cache.filter(m => m.user.bot).size === 1){
      var bots = "bot"
    }else{
      var bots = "bots"
    }

    if(presenceonline.size === 1){
      var miembrosonline = "miembro"
    }else{
      var miembrosonline = "miembros"
    }
    

    if(presenceidle.size === 1){
      var miembrosidle = "miembro ausente"
    }else{
      var miembrosidle = "miembros ausentes"
    }

    if(presencednd.size === 1){
      var miembrosdnd = "miembro"
    }else{
      var miembrosdnd = "miembros"
    }

    if(presenceoffline.size === 1){
      var miembrosoffline = "miembro desconectado o invisible"
    }else{
      var miembrosoffline = "miembros desconectados o invisibles"
    }

      if(presenceonlinebot.size === 1){
      var miembrosonlinebot = "bot"
    }else{
      var miembrosonlinebot = "bots"
    }
    

    if(presenceidlebot.size === 1){
      var miembrosidlebot = "bot ausente"
    }else{
      var miembrosidlebot = "bots ausentes"
    }

    if(presencedndbot.size === 1){
      var miembrosdndbot = "bot"
    }else{
      var miembrosdndbot = "bots"
    }

    if(presenceofflinebot.size === 1){
      var miembrosofflinebot = "bot desconectado o invisible"
    }else{
      var miembrosofflinebot = "bots desconectados o invisibles"
    }




    if(int.guild.members.cache.filter(m => !m.user.bot).size === 1){
      var miembros = "miembro"
    }else{
      var miembros = "miembros" 
    }

    if(int.guild.emojis.cache.size === 1){
      var emojis = "emoji"
    }else{
      var emojis = "emojis"
    }


    
      const embed = new Discord.MessageEmbed()
      .setColor(0x00AE86)
      .setThumbnail(int.guild.iconURL({ dynamic: true }))
      .setTitle(`Esta es la información de ${int.guild.name}`)
      .setFooter(` ${int.guild.name}`)
      .addFields(
        {
          name: ":crown: Propietario: ",
          value: `<@${int.guild.ownerId}>`,
          inline: true
        },
        {
          name: "👥 Miembros: ",
          value: `Hay ${int.guild.members.cache.filter(m => ! m.user.bot).size} ${miembros} en este servidor`,
          inline: true
        },
        {
          name: "🟢 Miembros en línea: ",
          value: `Hay ${presenceonline.size} ${miembrosonline} en línea`,
          inline: true
        },
        {
          name: ":yellow_circle: Miembros ausentes:",
          value: `Hay ${presenceidle.size} ${miembrosidle}`,
          inline: true
        },
        {
          name: ":red_circle: Miembros en no molestar:",
          value: `Hay ${presencednd.size} ${miembrosdnd} en no molestar`,
          inline: true
        },
        {
          name: ":white_circle: Miembros desconectados o invisibles:",
          value: `Hay ${presenceoffline.size} ${miembrosoffline}`,
          inline: true
        },
        {
          name: "🤖 BOTS: ",
          value: `Hay ${int.guild.members.cache.filter(m => m.user.bot).size} ${bots} en el servidor`,
          inline: true
        },
        {
          name: "🟢 Bots en línea:",
          value: `Hay ${presenceonlinebot.size} ${miembrosonlinebot} en línea`,
          inline: true
        },
        {
          name: ":yellow_circle: Bots ausentes:",
          value: `Hay ${presenceidlebot.size} ${miembrosidlebot}`,
          inline: true
        },
        {
          name: ":red_circle: Bots en no molestar:",
          value: `Hay ${presencedndbot.size} ${miembrosdndbot} en no molestar`,
          inline: true
        },
        {
          name: ":white_circle: Bots desconectados o invisibles:",
          value: `Hay ${presenceofflinebot.size} ${miembrosofflinebot}`,
          inline: true
        },
        {
          name: "📅 Fecha de creación: ",
          value: int.guild.createdAt.toLocaleDateString("es"),
          inline: true
        },
        {
          name: "🔢 Número de roles: ",
          value: `Hay ${int.guild.roles.cache.size} roles en este servidor.`,
          inline: true,
        },
        {
          name: ":newspaper: Canales:",
          value: `Hay ${int.guild.channels.cache.size} ${canales} en este servidor`,
          inline: true,
        },
        {
          name: ":pencil2: Canales de texto:",
          value: `Hay ${int.guild.channels.cache.filter(ch => ch.type === "GUILD_TEXT").size} ${texto} de texto en este servidor`,
          inline: true
        },
        {
          name: ":lips: Canales de voz:",
          value: `Hay ${int.guild.channels.cache.filter(ch => ch.type === "GUILD_VOICE").size} ${voz} de voz en este servidor`,
          inline: true
        },
        {
          name: ":file_folder: Categorias:",
          value: `Hay ${int.guild.channels.cache.filter(c => c.type === "GUILD_CATEGORY").size} ${categorias} en este servidor`,
          inline: true
        },
      
        {
          name: `✅ Verificado: `,
          value: int.guild.verified ? 'El servidor esta verficado.' : `El servidor no esta verficado.`,
          inline: true
        },
        {
          name: '🔮 Boosters: ',
          value: int.guild.premiumSubscriptionCount >= 1 ? `Hay ${int.guild.premiumSubscriptionCount} de usuarios mejorando el servidor` : `No hay nadie mejorando el servidor`,
          inline: true
        },
        {
          name: "🤨 Emojis: ",
          value: int.guild.emojis.cache.size >= 1 ? `Hay ${int.guild.emojis.cache.size} ${emojis} en este servidor` : 'No hay emojis en este servidor',
          inline: true
        }
      )
           
           
      int.reply({embeds: [embed] })
     
    
    
    
  }
}