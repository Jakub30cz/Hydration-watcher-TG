require('dotenv').config();
const { Telegraf } = require('telegraf');
const { loadCommands } = require('./Handlers/commandHandler');
const { loadEvents } = require('./Handlers/eventHandler');
const { priceUpdater } = require('./Functions/priceUpdater');
const { getAllTokens } = require('./Functions/getAllTokens');
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { query } = require('./Functions/db');

// Telegram bot token
const TELEGRAM_TOKEN = '7427703326:AAFmXQJFVB4RXMJu9HR34GoLtiy1IobTQBM';

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.config = {
    hostname: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    graphics_source: process.env.GRAPHICS_SOURCE,
    hydration_logo: process.env.HYDRATION_LOGO
};


bot.use((ctx, next) => {
    if (ctx.updateType === 'message' && ctx.message.text && ctx.message.text.startsWith('/')) {
        ctx.message.text = ctx.message.text.toLowerCase();
    }
    return next();
});

loadCommands(bot).then(async () => {

    await loadEvents(bot);
    const provider = new WsProvider('wss://rpc.hydradx.cloud');
    const api = await ApiPromise.create({ provider });

    bot.api = api;
    bot.tokens = await getAllTokens(bot);
    
    bot.launch();
    priceUpdater(bot);
});


// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));