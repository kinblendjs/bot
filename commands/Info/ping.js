module.exports = {
    name: "ping",
    description: "Replies with Pong!",
    execute: async (client, message, args, PREFIX) => {
        message.channel.send("Pong!");
    },
};