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
 * 2021-08-01 - Antonio Mancuso - Aggiunto deny messaggi e comandi generici 
 * 2021-08-06 - Antonio Mancuso - Aggiunta gestione prenotazioni e notifiche utenti
*/

const VERSION = "1.1.0";
const NOTIFY_MAX_USER = 3;
const NOTIFICATION_PERIOD = 3;
const NOTIFICATION_ITERATIONS = 20;
const { Telegraf } = require('telegraf');
const cron = require('node-cron');
const { logger } = require('./logger.js');
const { show_banner } = require('./banner.js');
const { handle_start, 
        handle_help, 
        handle_registra, 
        import_scheduled_user_from_mensa,
        daily_canteen_notification_cycle } = require('./helpers.js');

const bot = new Telegraf(process.env.BOT_TOKEN);

// catch all bot runtime errors
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
    logger.error(`ERRORE: utente tid[${ctx.update.message.from.id}] ha inviato un messaggio o un comando non valido`);
    ctx.reply("ERRORE: questo bot non è interattivo. Non sono ammessi messaggi o comandi diversi da /registra");
})

// avvia processo di notifica tutti i giorni alle 13.50 dal Lun al Ven
//  
// Ciclo principale del bot
bot.launch()

// Gestisce lo shutdown del bot con ^C
process.once('SIGINT', () => {
    logger.info("SIGINT: stop Bot");
    bot.stop('SIGINT');
})

show_banner(VERSION);

//schedula i task principali di canteena
logger.info("Installa crontab per prelievo giornaliero ore 13:40 lista utenti prenotati al servizio mensa");
cron.schedule('40 13 * * 1-5', () => {
    logger.info("Canttena Bot: Preparazione al servizio mensa giornaliero");
    import_scheduled_user_from_mensa();
  });

logger.info("Installa crontab per esecuzione ciclo giornaliero ore 13:50 di canteen");
cron.schedule('50 13 * * 1-5', () => {
    logger.info("Canttena Bot: Esecuzione del servizio mensa giornaliero");
    daily_canteen_notification_cycle(bot, NOTIFY_MAX_USER, NOTIFICATION_ITERATIONS, NOTIFICATION_PERIOD);
  });

