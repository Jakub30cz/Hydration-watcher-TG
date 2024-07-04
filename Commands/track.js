const { query } = require('./../Functions/db.js');
const { getUSDTSpotPrice } = require('./../Functions/getUSDTSpotPrice.js');
const { formatPrice } = require('./../Functions/formatPrice.js');

module.exports = {
    data: {
        name: 'track',
        description: 'Track the price of a currency'
    },
    async execute(ctx, bot) {
        const messageText = ctx.message.text;
        const args = messageText.split(' ');

        const userId = ctx.message.from.id;

        // verify that the user has provided a currency name and price
        if (args.length < 3) {
            return ctx.reply('Please provide a currency name and price. Example: /track HDX 0.0215');
        }

        const currencyName = args[1];
        let price = args[2];

        if (typeof currencyName !== 'string' || currencyName.trim() === '') {
            return ctx.reply('Name of the currency is required. Example: /track HDX 0.0215');
        }

        price = price.replace(',', '.');

        const priceNumber = parseFloat(price);
        if (isNaN(priceNumber) || priceNumber <= 0) {
            return ctx.reply('Price of the currency must be a number. Example: /track HDX 0.0215');
        }

        //console.log(bot.tokens);

        const token = bot.tokens.find(token => token.name.toLowerCase() === currencyName.toLowerCase() || token.symbol.toLowerCase() === currencyName.toLowerCase());

        if (!token || token.id == '10' || price <= 0) {
            await ctx.reply('Token name or symbol not found.');
        }

        console.log(userId);

        const check = await query(`SELECT * FROM trackers WHERE user_id = ? AND token_id = ? AND target_price = ?`, [userId, token.id, price]);
            
        if (check.length > 0) {
            return ctx.reply('You are already tracking this token with the same target price.');
        }

        const priceResult = await getUSDTSpotPrice(token.id, bot);
        const defaultPrice = priceResult.amount / (10 ** 6);

        const sql = `INSERT INTO trackers (user_id, token_id, target_price, default_price) VALUES (?, ?, ?, ?)`;
        const values = [userId, token.id, price, defaultPrice];
        const result = await query(sql, values);

        if (result === undefined || result.affectedRows === 0) {
            return ctx.reply(`An error occurred, please try again later.`);
        }

        ctx.replyWithHTML(`<b><u>Tracking started!</u></b>
<b>Currency:</b> ${token.name} (${token.symbol}) 🪙
<b>Target Price:</b> $${price} 🎯
<b>Current Price:</b> $${formatPrice(defaultPrice)} 🏷️`);
    }
};
