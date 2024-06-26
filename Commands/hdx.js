
module.exports = {
    data: {
        name: 'hdx',
        description: 'Get information about HDX tokenomics and governance'
    },
    async execute(ctx) {
        try {
            const hdxMessage = `
<b><u>HDX Tokenomics 🪙</u></b>

<b>Purpose</b>
The HDX token is a governance token that allows staked token holders to decide the future of the protocol. Our mission with the Hydration DAO is to distribute all decision-making to create a trustless liquidity protocol built around community-growth and self-sustainability.

To have a vote in the Hydration DAO, and to contribute to the determination of any of the topics raised by community members, one must hold the HDX governance token. For more specifically on the governance process, please read our Democracy documentation.

<b>HDX Use Cases</b>
- Setting the base network swap fee (the user may change this to any asset)
- Voting on protocol upgrades
- Voting on topics raised by community members (inclusive of allocation of Protocol-Owned Liquidity)

<b><u>Useful links:</u></b>
- https://docs.hydration.net/tokenomics/supply_breakdown.jpg
- https://docs.hydration.net/tokenomics
`;

            await ctx.replyWithHTML(hdxMessage);

        } catch (error) {
            console.error(error);
            await ctx.reply('Something went wrong. Please try again later.');
        }
    }
};
