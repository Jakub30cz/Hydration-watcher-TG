const { loadFiles } = require('./../Functions/fileLoader');
const ascii = require('ascii-table');

async function loadCommands(bot) {
    const table = new ascii().setHeading("Commands", "Status");
    const Files = await loadFiles('Commands');

    Files.forEach((file) => {
        const command = require(file);
        const commandData = command.data;
        bot.command(commandData.name, (ctx) => command.execute(ctx, bot));
        table.addRow(commandData.name, "✅");
    });

    console.log(table.toString(), "\nCommands loaded.");
    return true;
}

module.exports = { loadCommands };