/*
 * Agnelli Tech Shop
 * All rights reserved (c) 2021
 * 
 * AUTHOR: Antonio Mancuso
 * DATE:   July 2021
 * 
 * Provides function to access canteena DB 
 * 
 * HISTORY:
 * 
 * 2021-08-01 - Antonio Mancuso - Initial version
 *  
*/

const { logger } = require('./logger.js');
const { Op, Sequelize, Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = new Sequelize("sqlite:canteena.db");

// define the anagrafica table
class Anagrafica extends Model {}
Anagrafica.init({
    id: { type: DataTypes.INTEGER, primaryKey: true },
    tid: DataTypes.INTEGER,
    Cognome: DataTypes.STRING(64),
    Nome: DataTypes.STRING(64),
    NomeClasse: DataTypes.STRING(64),
    Credenziali: DataTypes.INTEGER
}, 
{ sequelize, modelName: 'anagrafica', 
     tableName: 'anagrafica', 
     createdAt: false, 
     updatedAt: false
});

sequelize.sync();// synch the model with DB
logger.info("DataBase inizializzato correttamente");

//select * from anagrafica where LOWER(Cognome) = 'adinolfi' and LOWER('Nome') = 'giada';
async function find_db_user(last_name, first_name) {
    logger.debug("find_db_user START");
    var user = await Anagrafica.findAll({
        where: {
            [Op.and]: [
                sequelize.where(
                    sequelize.fn('lower', sequelize.col('Cognome')), 
                    last_name),
                sequelize.where(
                    sequelize.fn('lower', sequelize.col('Nome')), 
                    first_name),
            ]
        } 
    });
    if (user.length == 0) {
        logger.error(`Utente [${last_name} ${first_name}] non trovato nel DB`);
        return { status: false,
                 id: 0
        }
    } else {
        if (user[0].dataValues.tid == 0) {
            logger.info(`Utente [${last_name} ${first_name}] presente e non registrato`);
            return { status: true,
                id: user[0].dataValues.id
            }
        } else {
            logger.error(`Utente [${last_name} ${first_name}] presente e già registrato`);
            return { status: false,
                id: user[0].dataValues.id
            }
        }
    }
    logger.debug("find_db_user END");
}

async function register_db_user(id, tid) {
    logger.debug("register_db_user START");
    await Anagrafica.update(
        {
            tid: tid
        },
        { where: {
            id: id
        }
    });
    logger.info(`Update tid[${tid}] per utente[${id}]`);
    logger.debug("register_db_user END");
}

module.exports = {
    find_db_user: find_db_user,
    register_db_user: register_db_user
};