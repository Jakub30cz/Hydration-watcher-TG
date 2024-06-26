module.exports = {
    data: {
        name: 'omnipool',
        description: 'Learn about the Hydration Omnipool'
    },
    execute(ctx) {
        const omnipoolMessage = `
<b><u>Meet Omnipool 🏊</u></b>

Hydration is a next-gen DeFi protocol designed to bring an ocean of liquidity to Polkadot. The Hydration Omnipool is an innovative Automated Market Maker (AMM) that combines all assets in a single trading pool.

<b>Key Features:</b>
- <b>Efficient Trading</b>: Lower slippage and fewer hops for better capital efficiency.
- <b>Single-Sided Liquidity</b>: Provide liquidity for any asset you want, and the Omnipool handles the rest.
- <b>Incentives</b>: Additional rewards through Hydrated Farms on top of trading fees.
- <b>Security</b>: Multiple audits, bug bounty program, liquidity caps, protocol fees, and circuit breakers.
- <b>Reduced Impermanent Loss</b>: Non-inflationary measures to minimize impermanent loss.

<i>Stay hydrated, not liquidated.</i>
        `;
        ctx.replyWithHTML(omnipoolMessage);
    }
};
