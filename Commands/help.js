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

        `;
        ctx.replyWithHTML(helpMessage);
    }
};
