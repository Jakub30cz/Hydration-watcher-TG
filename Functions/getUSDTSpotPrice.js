const { TradeRouter, PoolService } = require('@galacticcouncil/sdk');

async function getUSDTSpotPrice(tokenId, bot) {
    try {
        // Initialize Trade Router
        const poolService = new PoolService(bot.api);
        const tradeRouter = new TradeRouter(poolService);

        return await tradeRouter.getBestSpotPrice(tokenId, '10');
    } catch (error) {
        console.error('Error fetching USDT spot price:', error); // Return default values or handle error
        return;
    }
}

module.exports = { getUSDTSpotPrice };
