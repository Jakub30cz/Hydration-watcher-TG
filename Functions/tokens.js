const { getAllTokens } = require("./getAllTokens");

async function reloadTokens(bot) {
    try {
        console.log("Tokens will be reloaded every hour.");
        setInterval(async ()=> {
            bot.tokens = await getAllTokens(bot);
            console.log(bot.tokens.length + " tokens loaded.");
        }, 1000 * 60 * 60);

    } catch (error) {
        console.error('Error loading commands and images:', error);
    }
}

module.exports = { reloadTokens };