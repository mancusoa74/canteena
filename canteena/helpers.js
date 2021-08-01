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
const { find_db_user, register_db_user } = require('./db.js');

function _user_exist(last_name, first_name) {
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
                register_db_user(id, tid);
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

module.exports = {
    handle_start: handle_start,
    handle_help: handle_help,
    handle_registra: handle_registra,

};