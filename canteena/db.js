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
//const sequelize = new Sequelize("sqlite:canteena.db");
const sequelize = new Sequelize("sqlite:../mensa_api_server_mockup.sql3");


// define the anagrafica table
class Anagrafica extends Model {}
Anagrafica.init({
    id: { type: DataTypes.INTEGER, primaryKey: true },
    tid: DataTypes.INTEGER,
    Cognome: DataTypes.STRING(64),
    Nome: DataTypes.STRING(64),
    NomeClasse: DataTypes.STRING(64),
    Credenziali: DataTypes.INTEGER,
    daservire: DataTypes.BOOLEAN
}, 
{ sequelize, modelName: 'anagrafica', 
     tableName: 'anagrafica', 
     createdAt: false, 
     updatedAt: false
});

sequelize.sync();// synch the model with DB
logger.info("DataBase inizializzato correttamente");

//find user by last and first name
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

//find user by id
async function find_db_user_by_id(id) {
    logger.debug("find_db_user_by_id START");
    var user = await Anagrafica.findAll({
        where: {
            id: id
        } 
    });
    if (user.length == 0) {
        logger.error(`Utente [${id}] non trovato nel DB`);
        return { status: false,
                 id: 0
        }
    } else {
        logger.info(`Utente [${user[0].dataValues.Cognome} ${user[0].dataValues.Nome}] presente nel DB`);
        return { status: true,
            user: user[0].dataValues
        }
    }
    logger.debug("find_db_user_by_id END");
}

//update user telegram id
async function update_db_user_tid(id, tid) {
    logger.debug("update_db_user_tid START");
    await Anagrafica.update(
        {
            tid: tid
        },
        { where: 
            {
                id: id
            }
        }
    );
    logger.info(`Update tid[${tid}] per utente[${id}]`);
    logger.debug("update_db_user_tid END");
}

//update user service status for a given id
async function update_db_user_serve(id, status) {
    logger.debug("update_db_user_serv START");
    await Anagrafica.update(
        {
            daservire: status
        },
        { where: 
            {
                id: id
            }
        }
    );
    logger.debug("update_db_user_serv END");
}

//reset all users service status
async function reset_db_users_serve() {
    logger.debug("update_db_user_serve START");
    await Anagrafica.update(
        {
            daservire: false
        },
        { where: {}}
    );
    logger.debug("update_db_user_serve END");
}

//find user not yet served
async function find_db_user_unserved(limit) {
    logger.debug("find_db_user_unserved START");
    var users = await Anagrafica.findAll({
        where: {
            daservire: true
        },
        limit: limit 
    });
    if (users.length == 0) {
        logger.warn(`Utenti da servire non trovati nel DB`);
        return { status: false,
                 users: []
        }
    } else {
        logger.info(`Trovati nel DB ${users.length} utenti da servire`);
            return { status: true,
                users: users
            }
        }
    logger.debug("find_db_user_unserved END");
}

module.exports = {
    find_db_user: find_db_user,
    find_db_user_by_id: find_db_user_by_id,
    update_db_user_tid: update_db_user_tid,
    update_db_user_serve: update_db_user_serve,
    reset_db_users_serve: reset_db_users_serve,
    find_db_user_unserved: find_db_user_unserved,
};