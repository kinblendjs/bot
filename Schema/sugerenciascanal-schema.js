const { Schema, model} = require("mongoose")


const sugerenciascanal = new Schema({
  serverID: {
    type: String,
    required: true
  },
  channelID: {
    type: String,
    required: true
  }
})



module.exports = model("sugerenciascanal", sugerenciascanal)