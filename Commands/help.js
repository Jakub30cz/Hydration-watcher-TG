module.exports = {
    data: {
        name: 'help',
        description: 'Display help information'
    },
    execute(ctx) {
        const helpMessage = `
<b><u>Available Commands: 🆘</u></b>

<b>/H2O</b> - <i>Get detailed information about the H2O token.</i>

<b>/omnipool</b> - <i>Learn about the Omnipool functionality and usage.</i>

<b>/HDX</b> - <i>Access the latest HDX statistics and performance.</i>

<b>/deposit</b> - <i>Start the deposit process to add funds to your account.</i>

<b>/stats</b> - <i>See overall statistics and metrics.</i>

<b>/links</b> - <i>Get important links related to our services.</i>

<b>/news</b> - <i>Receive the latest news and updates.</i>

<b>/help</b> - <i>Display this help message with all available commands.</i>

<b>/price [token_name/token_symbol]</b> - <i>Get the current price of a token.</i>

<b>/track [token_name/token_symbol] [price]</b> - <i>Track the price of a currency.</i>

<b>/untrack</b> - <i>Stop tracking the price of a currency.</i>


        `;
        ctx.replyWithHTML(helpMessage);
    }
};
