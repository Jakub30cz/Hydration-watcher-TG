const { ApiPromise, WsProvider } = require('@polkadot/api');
const { TradeRouter, PoolService } = require('@galacticcouncil/sdk');

async function getAllTokens(bot) {
    let api;
    try {
        // Initialize Trade Router
        const poolService = new PoolService(bot.api);
        const tradeRouter = new TradeRouter(poolService);

        return await tradeRouter.getAllAssets();
    } catch (error) {
        console.error('Error fetching assets:', error);
        return [];
    }
}

module.exports = { getAllTokens };
