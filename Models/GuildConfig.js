const { Schema, model } = require("mongoose");

const PrefixSchema = new Schema({
    GuildID: {
        type: String,
        unique: true,
        require: true,
    },
    Prefix: {
        type: String,
        require: false,
    }
});

module.exports = model("guildConfigs", PrefixSchema);