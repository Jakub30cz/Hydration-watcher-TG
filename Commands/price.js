const { getUSDTSpotPrice } = require('./../Functions/getUSDTSpotPrice.js');
const { formatPrice } = require('./../Functions/formatPrice.js');

module.exports = {
    data: {
        name: 'price',
        description: 'Get the current price of a token'
    },
    async execute(ctx, bot) {
        const messageText = ctx.message.text;
        const args = messageText.split(' ');

        // verify that the user has provided a token name or symbol
        if (args.length < 2) {
            return ctx.reply('Please provide a token name or symbol. Example: /price HDX');
        }

        const tokenNameOrSymbol = args[1];

        if (typeof tokenNameOrSymbol !== 'string' || tokenNameOrSymbol.trim() === '') {
            return ctx.reply('Name or symbol of the token is required. Example: /price HDX');
        }

        const token = bot.tokens.find(token =>
            token.name.toLowerCase() === tokenNameOrSymbol.toLowerCase() ||
            token.symbol.toLowerCase() === tokenNameOrSymbol.toLowerCase()
        );

        if (!token || token.id == '10') {
            return ctx.reply('Token name or symbol not found.');
        }

        try {
            const priceResult = await getUSDTSpotPrice(token.id, bot);
            const currentPrice = priceResult.amount / (10 ** priceResult.decimals);
            const formattedPrice = formatPrice(currentPrice);

            ctx.replyWithHTML(`<b>${token.name}</b> (${token.symbol}) 🪙
<b>Current Price:</b> $${formattedPrice} 🏷️`);
        } catch (error) {
            console.error('Error fetching token price:', error);
            ctx.reply('An error occurred while fetching the token price. Please try again later.');
        }
    }
};
