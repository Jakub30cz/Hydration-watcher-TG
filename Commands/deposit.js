module.exports = {
    data: {
        name: 'deposit',
        description: 'Guide to deposit liquidity in the Hydration Omnipool'
    },
    async execute(ctx) {
        try {
            const depositMessage = `
<b><u>Deposit in the Hydration Omnipool 🌊</u></b>

To deposit in the Hydration Omnipool, follow these steps:

1. <b>Enter the Omnipool:</b> Go to the <a href="https://app.hydration.net/">Hydration Omnipool</a>.
2. <b>Connect Your Wallet:</b> Click on "Connect wallet" and link your preferred Polkadot wallet.
3. <b>Select Your Account:</b> Choose the account you want to use for the deposit.
4. <b>Trade or provide liquidity:</b> Now you can trade tokens or provide liquidity on the platform.
5. <b>Confirm the Transaction:</b> Review the details and confirm the transaction through your wallet.

If you need more detailed instructions, you can refer to the <a href="https://docs.hydration.net/howto_lp/">Hydration Docs on providing liquidity</a>.

<b><u>Useful Links:</u></b>
- <a href="https://docs.hydration.net/howto_trade/">Trade in Omnipool</a>
- <a href="https://docs.hydration.net/howto_lp/">Provide Liquidity</a>
`;
            await ctx.replyWithHTML(depositMessage);

        } catch (error) {
            console.error(error);
            await ctx.reply('Something went wrong. Please try again later.');
        }
    }
};
