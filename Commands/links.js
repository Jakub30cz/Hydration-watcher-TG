module.exports = {
    data: {
        name: 'links',
        description: 'Display important links related to our services'
    },
    execute(ctx) {
        const linksMessage = `
<b><u>Important Links: 🔗</u></b>
<b>Website 🗺️</b> - <a href="https://hydration.net/">https://hydration.net/</a>
<b>Application 📱</b> - <a href="https://app.hydration.net/">https://app.hydration.net/</a>
<b>News 📰</b> - <a href="https://hydration.substack.com/">https://hydration.substack.com/</a>
<b>Governance 🗳️</b> - <a href="https://hydration.subsquare.io/">https://hydration.subsquare.io/</a>
<b>Discord 🎮</b> - <a href="https://discord.gg/kkmY35UxAG">https://discord.gg/kkmY35UxAG</a>
<b>X (Twitter) 🐦</b> - <a href="https://x.com/hydration_net">https://x.com/hydration_net</a>
<b>Telegram 📡</b> - <a href="https://t.me/hydration_net">https://t.me/hydration_net</a>
<b>GitHub 🐙</b> - <a href="https://github.com/galacticcouncil">https://github.com/galacticcouncil</a>
<b>Docs 📚</b> - <a href="https://docs.hydration.net/">https://docs.hydration.net/</a>
        `;
        ctx.replyWithHTML(linksMessage);
    }
};
