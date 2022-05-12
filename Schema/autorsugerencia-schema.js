const {Schema, model} = require("mongoose")


const autor = new Schema({
  autorID : {
    type: String,
    required: true
  },
  messageID: {
    type: String,
    required: true
  }
})


module.exports = model("autor", autor)