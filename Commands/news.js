module.exports = {
    data: {
        name: 'news',
        description: 'Get the latest news about Hydration'
    },
    execute(ctx) {
        const newsMessage = `
<b><u>Substack Hydration News 📰</u></b>
<a href="https://hydration.substack.com/">https://hydration.substack.com/</a>
        `;
        ctx.replyWithHTML(newsMessage);
    }
};
