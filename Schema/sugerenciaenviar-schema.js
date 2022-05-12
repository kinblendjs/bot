const {Schema, model} = require("mongoose")


const sugerenciaenviar = new Schema({
  sugerencia : {
    type: String,
    required: true
  },
  messageID: {
    type: String,
    required: true
  },
  positivos: {
    type: Number,
    required: true
  },
  negativos: {
    type: Number,
    required: true
  }
})


module.exports = model("sugerenciaenviar", sugerenciaenviar)