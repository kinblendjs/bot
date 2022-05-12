const mongoose = require("mongoose");
require("colors");

module.exports = async () => {
    const { MONGO_URI } = process.env;

    try {
        await mongoose.connect(MONGO_URI);
        console.log(`[✔️] Database Connected Successfully!`.green);
    } catch (error) {
        console.log(`[🔴] Database Failed to connect :\n`.red, error);
    }
};