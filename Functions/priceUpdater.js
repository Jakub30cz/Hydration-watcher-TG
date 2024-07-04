const { query } = require("./db");
const { TradeRouter, PoolService } = require('@galacticcouncil/sdk');

async function priceUpdater(client) {

     // Initialize Trade Router
     const poolService = new PoolService(client.api);
     const tradeRouter = new TradeRouter(poolService);

     // Subscribe to new block headers
     client.api.rpc.chain.subscribeNewHeads(async (lastHeader) => {
          console.log(`New block: #${lastHeader.number}`);
          if (lastHeader.number % 2 == 0) {
               const tokens = client.tokens;
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

               client.prices = prices;

               const followers = await query(`SELECT id, CAST(user_id AS CHAR) AS user_id, token_id, target_price, default_price FROM trackers `, []);
               for (const follower of followers) {
                    const priceResult = prices.find(price => price.token_id == follower.token_id);
                    const price = priceResult.price;
                    const symbol = priceResult.token_symbol;
                    const name = priceResult.token_name;
                    //console.log("Price: " + price + " Target: " + follower.target_price + " Default: " + follower.default_price + " Token: " + name + " Symbol: " + symbol)
                    if (parseFloat(follower.target_price) <= parseFloat(follower.default_price)) {
                         if (follower.target_price >= price) {
                              const user = await client.users.fetch(follower.user_id);
                              console.log("Target price reached: Target: " + follower.target_price + " Now: " + price);
                              if(user) {
                                   try {
                                        const embed = buildEmbed(name, follower.target_price, follower.token_id);
                                        await user.send({content: `Price tracking alert on ${name}!` ,
                                             embeds: [embed], files: [
                                                 { attachment: './Assets/' + symbol + '.png', name: 'thumbnail.png' },
                                                 { attachment: client.config.hydration_logo, name: 'logo.png' }
                                             ], ephemeral: true
                                         });
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
                              const user = await client.users.fetch(follower.user_id);
                              console.log("Target price reached: Target: " + follower.target_price + " Now: " + price);
                              if(user) {
                                   try {
                                        const embed = buildEmbed(name, follower.target_price, follower.token_id);
                                        await user.send({content: `Price tracking alert on ${name}!` ,
                                             embeds: [embed], files: [
                                                 { attachment: './Assets/' + symbol + '.png', name: 'thumbnail.png' },
                                                 { attachment: client.config.hydration_logo, name: 'logo.png' }
                                             ], ephemeral: true
                                         });
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

               function buildEmbed(name, target_price, token_id) {
                    return embed = new EmbedBuilder()
                    .setTitle(`${name} price has reached your target price of $${parseFloat(target_price)} **USD**.`)
                    .setURL(`https://app.hydration.net/trade/swap/?assetOut=${token_id}&assetIn=10`)
                    .setDescription(`*Click on the title to trade ${name} on Hydration platform.*\n \u200B`)
                    .setColor('#0000FF')
                    .setTimestamp()
                    .setThumbnail('attachment://thumbnail.png')
                    .setFooter({ text: "Hydration Watcher", iconURL: 'attachment://logo.png' });
               }
          }});
}

module.exports = { priceUpdater };
