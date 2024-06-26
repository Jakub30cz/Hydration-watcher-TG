module.exports = {
    data: {
        name: 'h2o',
        description: 'Learn about the H2O token and single-sided liquidity provisioning'
    },
    execute(ctx) {
        const h2oMessage = `
<b><u>H2O 🚰</u></b>

<b>Single-Sided Liquidity Provisioning</b>
The Hydration Omnipool allows anyone to provide liquidity for just one asset, up to the TVL cap. This eliminates the need for liquidity providers to deposit pairs of assets in equivalent value, as required by standard AMMs.

<b>Concentrated Liquidity</b>
Providing liquidity in the Hydration Omnipool gives you instant exposure to all other assets in the pool, avoiding liquidity fragmentation.

<b>The Hub Token H2O</b>
Single-sided liquidity is enabled by the hub token, H2O. When liquidity is added, H2O is minted to keep the pool balanced, and it is burnt when liquidity is removed. This ensures the value of H2O remains stable.

<b>Synthetic Liquidity Pools</b>
Each asset in the Omnipool can be seen as a synthetic 50/50 pool with H2O. This design uses H2O to represent the value locked in the Omnipool, including trading activity and price fluctuations.

<b><u>Useful links:</u></b>
- https://www.youtube.com/watch?v=i2kifk7Wb2U
        `;
        ctx.replyWithHTML(h2oMessage);
    }
};
