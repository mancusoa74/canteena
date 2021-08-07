/*
 * Agnelli Tech Shop
 * All rights reserved (c) 2021
 * 
 * AUTHOR: Antonio Mancuso
 * DATE:   July 2021
 * 
 * Client API to access mensa API service 
 * 
 * HISTORY:
 * 
 * 2021-08-06 - Antonio Mancuso - Initial version
*/

const API_TOKEN = process.env.API_TOKEN;
const { logger } = require('./logger.js');
const fetch = require('node-fetch');

//const MENSA_API_URL = "https://mensa.agnelli.it/mensa/api/?Command=";
const MENSA_API_URL = "http://localhost:3000/api/?Command=";

const COMMAND_GET_UTENTI_ISCRITTI = "GetAlunniList";
const COMMAND_GET_UTENTI_PRENOTATI = "GetResClose";
const COMMAND_GET_UTENTI_SERVITI = "GetAlreadyEatElseWhere";

async function mensa_api_get(command) {
    logger.debug("mensa_api_get START");
    logger.debug(`Accessing API[GET]:${command}`);
    var result;

    await fetch(MENSA_API_URL + command, {headers: {'AUTHENTICATION': API_TOKEN}})
    .then(res_api => res_api.json())
    .then(api_result => {
        if (api_result.Status != 0)
            logger.error(`ERRORE nella richiesta API[GET]:${command}`);
        else 
            logger.debug(`SUCCESSO nella richiesta API[GET]:${command}`);
        result = api_result;
    });
    return result;
    logger.debug("mensa_api_get END");
}

async function mensa_get_iscritti() {
    return await mensa_api_get(COMMAND_GET_UTENTI_ISCRITTI);
}

async function mensa_get_prenotati() {
    return await mensa_api_get(COMMAND_GET_UTENTI_PRENOTATI);
}

async function mensa_get_serviti() {
    return await mensa_api_get(COMMAND_GET_UTENTI_SERVITI);
}

module.exports = {
    mensa_get_iscritti: mensa_get_iscritti,
    mensa_get_prenotati: mensa_get_prenotati,
    mensa_get_serviti: mensa_get_serviti
 };