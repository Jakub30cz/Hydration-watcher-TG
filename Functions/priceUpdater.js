const { query } = require("./db");
const { TradeRouter, PoolService } = require('@galacticcouncil/sdk');

async function priceUpdater(bot) {

     // Import the API and create a provider


     // Initialize Trade Router
     const poolService = new PoolService(bot.api);
     const tradeRouter = new TradeRouter(poolService);

     // Subscribe to new block headers
     bot.api.rpc.chain.subscribeNewHeads(async (lastHeader) => {
          console.log(`New block: #${lastHeader.number}`);
          if (lastHeader.number % 2 == 0) {
               const tokens = bot.tokens;
               const prices = [];
               for (const token of tokens) {
                    try {
                         if (token.id === '10') {
                              prices.push({ token_id: token.id, token_symbol: token.symbol, token_name: token.name, price: 1, decimals: 6 });
                              continue;
                         } else {
                              const price = await tradeRouter.getBestSpotPrice(token.id, '10');
                              prices.push({ token_id: token.id, token_symbol: token.symbol, token_name: token.name, price: price.amount / (10 ** 6), decimals: token.decimals });
                         }
                    } catch (error) {
                         console.error(error);
                    }
               }

               bot.prices = prices;

               const followers = await query(`SELECT id, CAST(user_id AS CHAR) AS user_id, token_id, target_price, default_price FROM trackers `, []);
               
               for (const follower of followers) {

                    const priceResult = prices.find(price => price.token_id == follower.token_id);
                    const price = priceResult.price;
                    const symbol = priceResult.token_symbol;
                    const name = priceResult.token_name;

                    if (parseFloat(follower.target_price) <= parseFloat(follower.default_price)) {
                         if (follower.target_price >= price) {
                              const user = follower.user_id;
                              //console.log("Target price reached: Target: " + follower.target_price + " Now: " + price);
                              if(user) {
                                   try {
                                        const message = buildResponse(name, follower.target_price, follower.token_id);

                                        await bot.telegram.sendMessage(user, message, { parse_mode: 'HTML' });

                                        await deleteFromTrackers(follower.user_id, follower.token_id, follower.target_price);

                                   } catch (error) {
                                        console.error(error);
                                   }    
                              }
                         } else {
                              console.log("Target price not reached: Target: " + follower.target_price + " Now: " + price);                         
                         }
                    }
                    if (parseFloat(follower.target_price) >= parseFloat(follower.default_price)) {
                         if (follower.target_price <= price) {
                              const user = follower.user_id;
                              console.log("Target price reached: Target: " + follower.target_price + " Now: " + price);
                              if(user) {
                                   try {
                                        const message = buildResponse(name, follower.target_price, follower.token_id);

                                        await bot.telegram.sendMessage(user, message, { parse_mode: 'HTML' });
                                        
                                        await deleteFromTrackers(follower.user_id, follower.token_id, follower.target_price);
                                   } catch (error) {
                                        console.error(error);
                                   }
                              }
                         }
                         else {
                              console.log("Target price not reached: Target: " + follower.target_price + " Now: " + price);
                         }
                    }
               }

               async function deleteFromTrackers(user_id, token_id, target_price) {
                    await query(`DELETE FROM trackers WHERE user_id = ? AND token_id = ? AND target_price = ?`, [user_id, token_id, target_price]);
               }

               function buildResponse(name, target_price, token_id) {
                    return response = `
<u><b>Target price of ${name} reached! 🎯</b></u>

Price has reached your <b>target price of <i>$${parseFloat(target_price)} 🪙</i></b>.

<a href="https://app.hydration.net/trade/swap/?assetOut=${token_id}&assetIn=10">Click here to trade ${name} on Hydration platform 🔗</a>
`;
               }
          }});
}

module.exports = { priceUpdater };
