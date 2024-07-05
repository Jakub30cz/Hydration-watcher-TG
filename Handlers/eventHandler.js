const { loadFiles } = require('./../Functions/fileLoader');
const ascii = require('ascii-table');

async function loadEvents(bot) {
    const table = new ascii().setHeading("Events", "Status");
    const Files = await loadFiles('Events');

    Files.forEach((file) => {
        const event = require(file);
        if (event.once) {
            bot.once(event.name, (...args) => event.execute(...args, bot));
        } else {
            bot.on(event.name, (...args) => event.execute(...args, bot));
        }
        table.addRow(event.name, "✅");
    });

    console.log(table.toString(), "\nEvents loaded and bot is running.");
    return true;
}

module.exports = { loadEvents };
