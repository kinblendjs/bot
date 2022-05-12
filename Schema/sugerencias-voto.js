const { Emoji } = require("discord.js")
const {Schema , model} = require("mongoose")

const votos = new Schema({
    messageID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    emoji: {
   type: String,
   required: true
    }
})

module.exports = model("sugvotos", votos)