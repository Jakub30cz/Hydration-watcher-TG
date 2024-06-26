const axios = require('axios');

module.exports = {
    data: {
        name: 'stats',
        description: 'Get the latest stats of Hydration platform'
    },
    async execute(ctx) {
        try {
            await ctx.reply('Processing your request...');

            const [tvlResult, volumeResult, allTimeVolumeResult] = await Promise.all([
                axios.get('https://hydradx-api-app-2u5klwxkrq-ey.a.run.app/hydradx-ui/v1/stats/tvl', {
                    headers: { 'accept': 'application/json' }
                }),
                axios.get('https://hydradx-api-app-2u5klwxkrq-ey.a.run.app/hydradx-ui/v1/stats/volume', {
                    headers: { 'accept': 'application/json' }
                }),
                axios.get('https://hydradx-api-app-2u5klwxkrq-ey.a.run.app/hydradx-ui/v1/stats/volume/alltime', {
                    headers: { 'accept': 'application/json' }
                })
            ]);

            // Extracting data from responses
            const tvl = tvlResult.data[0].tvl_usd.toLocaleString('cs-CZ');
            const volume = volumeResult.data[0].volume_usd.toLocaleString('cs-CZ');
            const allTimeVolume = allTimeVolumeResult.data[0].volume_usd.toLocaleString('cs-CZ');

            const statsMessage = `
<b><u>Hydration Stats 📊</u></b>
<a href="https://app.hydration.net/stats/overview">https://app.hydration.net/stats/overview</a>

<b>Total Value Locked 🔒:</b> $${tvl}

<b>24h Volume ⌚:</b> $${volume}

<b>All Time Volume 📈:</b> $${allTimeVolume}

            `;

            await ctx.replyWithHTML(statsMessage);

        } catch (error) {
            console.error(error);
            await ctx.reply('Something went wrong. Please try again later.');
        }
    }
};
