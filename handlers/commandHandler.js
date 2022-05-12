const fs = require("fs");
const ascii = require("ascii-table");

let table = new ascii("Commands")
table.setHeading("Command", "Load status")

module.exports = (client) => {
    const cmdFolders = fs.readdirSync("./commands");

    cmdFolders.forEach(cmdFolder => {
        const cmdFiles = fs.readdirSync(`./commands/${cmdFolder}`).filter(f => f.endsWith(".js"));

        cmdFiles.forEach(file => {
            const command = require(`../commands/${cmdFolder}/${file}`)

            if (command.name && command.execute) {
                client.commands.set(command.name, command);
                table.addRow(file, "✔️")
            }else {
                table.addRow(file, "🔴")
            }
        })
    })

    console.log(table.toString())
}