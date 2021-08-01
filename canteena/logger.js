/*
 * Agnelli Tech Shop
 * All rights reserved (c) 2021
 * 
 * AUTHOR: Antonio Mancuso
 * DATE:   July 2021
 * 
 * Logging facility module 
 * 
 * HISTORY:
 * 
  * 2021-07-30 - Antonio Mancuso - Initial version
 *  
*/

const winston = require('winston');

// custom colors for logging messages
const logger_colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'cyan'
  };

// custom format of the logging message
const logger_format = winston.format.combine(
    winston.format.timestamp({
        format:"YYYY-MM-DDTHH:mm:ss"
    }),
    winston.format.printf(
        message => `${message.timestamp} [${message.level.padStart(5)}]: ${message.message}`
    )
);

// environment variable DEBUG controls the level of debugging
// it defaulst to info level
const logger = winston.createLogger({
    level: process.env.DEBUG || 'info', 
    transports: [
        new winston.transports.File({ filename: 'canteena.log', format: logger_format}),
        new winston.transports.Console({format: winston.format.combine(logger_format, winston.format.colorize({all:true}))})
      ]
});
winston.addColors(logger_colors);

module.exports = {
    logger: logger
};
