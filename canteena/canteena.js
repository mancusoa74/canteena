/*
 * Agnelli Tech Shop
 * All rights reserved (c) 2021
 * 
 * AUTHOR: Antonio Mancuso
 * DATE:   July 2021
 * 
 * Canteena is a telegram bot application which sends notifications
 * to students registred to the canteen service. 
 * Main goal is to notify students on the right time to queue up 
 * to the canteen service to increas social distance due to COVID-19 
 * 
 * HISTORY:
 * 
 * 2021-07-30 - Antonio Mancuso - Initial version
 *  
*/

const VERSION = "1.0";
const { Telegraf } = require('telegraf');
const { logger } = require('./logger.js');
const { show_banner } = require('./banner.js');
const { handle_start, handle_help, handle_registra } = require('./helpers.js');

//const bot = new Telegraf('1791005859:AAGmbl_aC2MNVzID63z7DbsXnwjWosIwMfI');
const bot = new Telegraf(process.env.BOT_TOKEN);
show_banner(VERSION);

// catch all runtime errors
bot.catch((err, ctx) => {
    logger.error(`UNEXPECTED ERROR: ${ctx.updateType}`, err);
  })

// on /start command verify whether user is valid or not
bot.start((ctx) => {
    handle_start(ctx);
})

// on /help command sends help information to user
bot.help((ctx) => {
    handle_help(ctx);
})

// register a valid user to the canteena system
bot.command('registra', (ctx) => {
    handle_registra(ctx);
  })
  
// gestisce un generico messaggio (non un comando)
bot.on('message', (ctx) => {
    logger.info("Handling message...");
    logger.debug(`Ciao ${ctx.message.chat.first_name}, hai scritto ${ctx.message.text}`);
    ctx.reply(`Ciao ${ctx.message.chat.first_name}, hai scritto ${ctx.message.text}`);
})

// Ciclo principale del bot
bot.launch()

// Gestisce lo shutdown del bot con ^C
process.once('SIGINT', () => {
    logger.info("SIGINT: stop Bot");
    bot.stop('SIGINT');
})
