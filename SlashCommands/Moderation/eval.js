const Discord = require("discord.js")
const {inspect} = require("util")


module.exports ={
name: "eval",
description: "Evaluas tú codigo",
options:[
  {
    name: "código",
    description: "El código al que voy a evaluar",
    required: true,
    type: 3
  }
],
execute: async(client, int) =>{

  if(int.user.id !== "781680561428496384") return int.reply("No puedes usar este comando")

  const command = int.options.getString("código")

  try {
    const evaled = eval(command)
    let palabras = ["token","destroy"]
    if(palabras.some(word => command.toLowerCase().includes(word))){
      return int.reply("Esas palabras no estan permitidas")
    }
    const embed = new Discord.MessageEmbed()
    .setTitle("Evaluado correctamente")
    .setColor("GREEN")
    .addField(`Tipo:`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
    .addField("Evaluado en:", `\`\`\`yaml\n${Date.now() - int.createdTimestamp}ms\`\`\``, true)
    .addField("Entrada:", `\`\`\`js\n${command}\`\`\``)
    .addField("Salida:", `\`\`\`js\n${inspect(evaled, {depth: 0})}\`\`\``)


   return int.reply({ embeds: [embed]})
  } catch (error){
    const embedfallo = new Discord.MessageEmbed()
    .setColor("RED")
    .addField("Entrada:", `\`\`\`js\n${command}\`\`\``)
    .addField("Error:", `\`\`\`js\n${error}\`\`\``)
    
    return int.reply({ embeds: [embedfallo]})
  }
}
}