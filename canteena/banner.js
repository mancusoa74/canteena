/*
 * Agnelli Tech Shop
 * All rights reserved (c) 2021
 * 
 * AUTHOR: Antonio Mancuso
 * DATE:   July 2021
 * 
 * Canteena banner - just for fun
 * 
 * HISTORY:
 * 
  * 2021-07-30 - Antonio Mancuso - Initial version
 *  
*/

const { logger } = require('./logger.js');

function banner(version) {
    logger.info("+-----------------------------------------------------------------------+");
    logger.info("|                                                                       |");
    logger.info("|   ██████  █████  ███    ██ ████████ ███████ ███████ ███    ██  █████  |"); 
    logger.info("|  ██      ██   ██ ████   ██    ██    ██      ██      ████   ██ ██   ██ |"); 
    logger.info("|  ██      ███████ ██ ██  ██    ██    █████   █████   ██ ██  ██ ███████ |");
    logger.info("|  ██      ██   ██ ██  ██ ██    ██    ██      ██      ██  ██ ██ ██   ██ |"); 
    logger.info("|   ██████ ██   ██ ██   ████    ██    ███████ ███████ ██   ████ ██   ██ |"); 
    logger.info("|                                                                       |");
    logger.info("|                                                                       |");
    logger.info("|                   ███████    ██     ██████████████████                |"); 
    logger.info("|                   ██   ███  ██     ██   ██ ██  ██                     |");
    logger.info("|                   ██████ ████      ███████ ██  ███████                |"); 
    logger.info("|                   ██   ██ ██       ██   ██ ██       ██                |"); 
    logger.info("|                   ██████  ██       ██   ██ ██  ███████                |");
    logger.info("|                                                                       |");
    logger.info("|                                                                       |");
    logger.info("|                  CANTTENA BOT Version " + version + " RUNNING                     |");
    logger.info("|                                                                       |");
    logger.info("+-----------------------------------------------------------------------+");
    logger.info();
    logger.info("Canteena BOT listening...");
}

module.exports = {
   show_banner: banner
};