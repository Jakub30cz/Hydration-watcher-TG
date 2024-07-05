const { query } = require('./../Functions/db.js');
const { getUSDTSpotPrice } = require('./../Functions/getUSDTSpotPrice.js');
const { formatPrice } = require('./../Functions/formatPrice.js');

module.exports = {
    data: {
        name: 'untrack',
        description: 'Show the list of tracked currencies with ability to untrack them.'
    },
    async execute(ctx, bot) {
        const userId = ctx.message.from.id;

        if (ctx.chat.type !== 'private') {
            return;
        }

        try {
            const check = await query(`SELECT * FROM trackers WHERE user_id = ?`, [userId]);

            if (check.length === 0) {
                return ctx.reply('You are not tracking any token.');
            }

            // Vytvoření mapy tokenů pro rychlejší přístup
            const tokenMap = bot.tokens.reduce((map, token) => {
                map[token.id] = token;
                return map;
            }, {});

            // Seskupení trackerů podle tokenů
            const groupedTrackers = check.reduce((group, tracker) => {
                const token = tokenMap[tracker.token_id];
                if (token) {
                    if (!group[token.symbol]) {
                        group[token.symbol] = {
                            name: token.name,
                            symbol: token.symbol,
                            trackers: []
                        };
                    }
                    group[token.symbol].trackers.push(tracker);
                } else {
                    console.log(`Token with id ${tracker.token_id} not found in bot tokens.`);
                }
                return group;
            }, {});

            let message = 'List of tracked tokens:\n\n';
            const inlineKeyboard = [];

            for (const symbol in groupedTrackers) {
                const tokenData = groupedTrackers[symbol];
                message += `<b>${tokenData.name}</b> (${tokenData.symbol})\n`;
                tokenData.trackers.forEach(tracker => {
                    message += `Target price: <b>$${parseFloat(tracker.target_price)}</b> 🎯\n`;
                    inlineKeyboard.push([{
                        text: `Untrack ${tokenData.name} at $${parseFloat(tracker.target_price)}`,
                        callback_data: `untrack_${tracker.token_id}_${tracker.target_price}`
                    }]);
                });
                message += '\n';
            }

            // Zkontroluj počet tlačítek a rozděl je na více zpráv, pokud překračují limit
            const chunkSize = 100; // Telegram limit je 100 tlačítek na inline klávesnici
            for (let i = 0; i < inlineKeyboard.length; i += chunkSize) {
                const chunk = inlineKeyboard.slice(i, i + chunkSize);
                await ctx.reply(message, {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: chunk
                    }
                });
                // Reset zprávy po první iteraci, aby se nepletly předchozí texty
                message = '';
            }
        } catch (error) {
            console.error('Error executing untrack command:', error);
            return ctx.reply('An error occurred while fetching your tracked tokens. Please try again later.');
        }
    }
};