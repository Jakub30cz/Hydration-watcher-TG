const { Telegraf } = require('telegraf');
const { loadCommands } = require('./Handlers/commandHandler');

// Telegram bot token
const TELEGRAM_TOKEN = '7427703326:AAFmXQJFVB4RXMJu9HR34GoLtiy1IobTQBM';

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.use((ctx, next) => {
    if (ctx.updateType === 'message' && ctx.message.text && ctx.message.text.startsWith('/')) {
        ctx.message.text = ctx.message.text.toLowerCase();
    }
    return next();
});

loadCommands(bot).then(() => {
    bot.launch();
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));