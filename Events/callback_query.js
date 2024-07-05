const { query } = require('./../Functions/db');

module.exports = {
    name: 'callback_query', // Název eventu
    once: false, // True pro jednorázové eventy, False pro opakující se
    async execute(ctx, bot) {
        const userId = ctx.callbackQuery.from.id;
        const data = ctx.callbackQuery.data;

        if (data.startsWith('untrack_')) {
            const [_, tokenId, targetPrice] = data.split('_');

            try {
                await query(`DELETE FROM trackers WHERE user_id = ? AND token_id = ? AND target_price = ?`, [userId, tokenId, targetPrice]);
                ctx.answerCbQuery('Token successfully untracked.');
            } catch (error) {
                console.error('Error untracking token:', error);
                ctx.answerCbQuery('An error occurred while untracking the token. Please try again later.');
            }
        }
    },
};