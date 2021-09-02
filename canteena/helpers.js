/*
 * Agnelli Tech Shop
 * All rights reserved (c) 2021
 * 
 * AUTHOR: Antonio Mancuso
 * DATE:   July 2021
 * 
 * Helpers function to the Canteena bot behavior 
 * 
 * HISTORY:
 * 
  * 2021-07-30 - Antonio Mancuso - Initial version
 *  
*/

const { logger } = require('./logger.js');
const { mensa_get_iscritti, mensa_get_prenotati, mensa_get_serviti } = require('./mensa_client.js');
const { find_db_user, find_db_user_by_id, update_db_user_tid, update_db_user_serve, reset_db_users_serve, find_db_user_unserved } = require('./db.js');


async function _user_exist(last_name, first_name) {
    return find_db_user(last_name, first_name).status;
}

function _ctx_to_user_info(ctx) {
    return {tid: ctx.update.message.from.id,
            last_name: ctx.update.message.from.last_name,
            first_name: ctx.update.message.from.first_name};
}

function _email_to_name(email) {
    logger.debug("_email_to_name START");
    
    var name = email.split('@')[0];
    logger.debug(`email registrazione ${name}`);
    
    if (name.split('.').length != 2)
        return {success: false};
    else
        return {success: true,
                last_name: name.split('.')[1].toLowerCase(),
                first_name: name.split('.')[0].toLowerCase()};
}

function handle_start(ctx) {
    logger.debug("handle_start START");
    var first_name = _ctx_to_user_info(ctx).first_name;
    var last_name = _ctx_to_user_info(ctx).last_name;

    logger.debug(first_name);
    logger.debug(last_name);
    if (_user_exist(last_name, first_name)) {
        logger.info(`Utente Telegram [${ctx.update.message.from.id}] ` +
                `${ctx.update.message.from.last_name} ` +
                `${ctx.update.message.from.first_name} ` +
                `si è unito al bot canteena`);
        ctx.reply(`Ciao ${ctx.update.message.from.last_name} ` +
                  `${ctx.update.message.from.first_name}, ` +
                  `benvenuto su Canteena!!`);
    } else {
        logger.error(`Utente [${ctx.update.message.from.id}] ` +
                `${ctx.update.message.from.last_name} ` +
                `${ctx.update.message.from.first_name} ` +
                `è invalido`);
        ctx.reply(`L'utente ${ctx.update.message.from.last_name} ` +
                  `${ctx.update.message.from.first_name} ` +
                  `non è valido o sconosciuto. Registrarsi in segreteria!`);
    }
    logger.debug("handle_start END");
}

async function handle_help(ctx) {
    logger.debug("handle_help START");
    ctx.reply("handle_help");
    logger.debug("handle_help END");
}

async function handle_registra(ctx) {
    logger.debug("handle_registra START");
    
    var { tid, last_name, first_name } = _ctx_to_user_info(ctx);
    logger.info(`Utente Telegram [${tid}] ${last_name} ${first_name} ha richiesto la registrazione`);
    ctx.reply("Registrazione in corso...");
    
    var command = ctx.update.message.text.split(' ');
    logger.debug(command);

    if (command.length != 2) {
        logger.error(`Registrazione non valida. Comando [${ctx.update.message.text}] errato!!`)
        ctx.reply("Registrazione non valida!!");
    } else {
        var { success, last_name, first_name } = _email_to_name(command[1]);
        if (!success) {
            logger.error(`Registrazione non valida. Email ${command[1]} errata!!`)
            ctx.reply("Registrazione non valida!!");
        } else {
            logger.info(`Inizio registrazione per utente [${id}] ${last_name} ${first_name}`);
            var { status, id } = await find_db_user(last_name, first_name);
            if (status) {
                update_db_user_tid(id, tid);
                logger.info("Registrazione completata!!");
                ctx.reply("Registrazione completata!!");
            } else {
                if (id == 0) {
                    logger.error(`Impossibile terminare la registrazione, verifica l'indirizzo email (${command[1]}) o contatta l'amministratore`);
                    ctx.reply(`Impossibile terminare la registrazione, verifica l'indirizzo email (${command[1]}) o contatta l'amministratore`);
                } else {
                    logger.error(`Impossibile terminare la registrazione, utente già registrato. Contatta l'amministratore`);
                    ctx.reply(`Impossibile terminare la registrazione, utente già registrato. Contatta l'amministratore`);
                }
            }
        }
    }
    logger.debug("handle_registra END");
}

async function reset_user_service_status() {
    logger.debug("reset_user_service_status START");
        await reset_db_users_serve();
    logger.debug("reset_user_service_status END");
}

async function schedule_users_for_service() {
    logger.debug("schedule_user_for_service START");
    var prenotati = await mensa_get_prenotati();
    if (prenotati.Status == 0 && prenotati.Result.length > 0) {
        prenotati.Result.forEach(prenotato => {
            update_db_user_serve(prenotato.IDAnagrafica, true);
            logger.info(`Inserimento prenotazione pasto per utente [${prenotato.IDAnagrafica}]`);
        })
    } else {
        if(prenotati.Result.length == 0)
            logger.info("Non ci sono (più) utenti prpenotati per il servizio mensa.");
        else
            logger.error("ERRORE: impossibile recuperare la lista degli utenti prenotati al servizio mensa");
    }
    logger.debug("schedule_user_for_service END");
}

async function unschedule_users_for_service() {
    logger.debug("unschedule_users_for_service START");
    var serviti = await mensa_get_serviti();
    if(serviti.Status ==  0 && serviti.Result.length > 0) {
        serviti.Result.forEach(servito => {
            update_db_user_serve(servito.IDAnagrafica, false);
            logger.info(`Rimozione prenotazione pasto per utente [${servito.IDAnagrafica}]`);
        })
    } else {
        if(serviti.Result.length == 0)
            logger.info("Non ci sono (più) utenti serviti dal servizio mensa.");
        else
            logger.error("ERRORE: impossibile recuperare la lista degli utenti serviti dal servizio mensa");
    }
    logger.debug("unschedule_users_for_service END");
}

async function _notify_canteena_user(bot, id) {
    logger.debug("_notify_canteena_use START");
    var user = await find_db_user_by_id(id);
    if (user.status == false) {
        logger.error(`ERRORE: Non posso trovare e notificare utente id[${id}]`);
    } else {
        logger.info(`Notifica dell'utente ${user.user.Cognome} ${user.user.Nome} con tid[${user.user.tid}]`);
        bot.telegram.sendMessage(user.user.tid, `Ciao ${user.user.Cognome}, è il tuo turno per la mensa.Mettiti in coda ora e sarai servito a breve. Buon Appetito!!!`);
    }
    logger.debug("_notify_canteena_use END");
}

async function notify_unserved_users(bot, limit) {
    logger.debug("notify_unserved_users START");
    var daservire = await find_db_user_unserved(limit);
    if (daservire.status == true && daservire.users.length > 0) {
        daservire.users.forEach(user => {
            logger.info(`Notifica telegram utente [${user.dataValues.id}]`);
            _notify_canteena_user(bot, user.dataValues.id);
        })
    } else {
        if(daservire.users.length == 0)
            logger.info("Non ci sono più utenti da servire");
        else
            log.error("ERRORE: impossibile recuperare la lista degli utenti schedulati dal DB");
    }
    logger.debug("notify_unserved_users END");
}

async function import_scheduled_user_from_mensa() {
    logger.debug("import_scheduled_user_from_mensa START");
    await reset_user_service_status();
    await schedule_users_for_service();
    logger.debug("import_scheduled_user_from_mensa END");
}

async function daily_canteen_notification_cycle(bot, max_users, iterations, period) {
    var counter = iterations;
    var timer_id = setInterval(async () => {
        logger.info(`Inizio ciclo giornaliero di notifica utenti - iterazione [${counter}]`);
        await unschedule_users_for_service();
        await notify_unserved_users(bot, max_users);
        counter--;
        if (counter == 0)
            clearInterval(timer_id);  
    }, period*1000);
}

module.exports = {
    handle_start: handle_start,
    handle_help: handle_help,
    handle_registra: handle_registra,
    import_scheduled_user_from_mensa: import_scheduled_user_from_mensa,
    daily_canteen_notification_cycle: daily_canteen_notification_cycle
};