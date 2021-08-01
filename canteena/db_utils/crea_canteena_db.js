/*
 * Agnelli Tech Shop
 * All rights reserved (c) 2021
 * 
 * AUTHOR: Antonio Mancuso
 * DATE:   July 2021
 * 
 * Create the canteena DB by querying mensa API server
 * and populate a local DB. It also modify the anagrafica table
 * by adding additional columns needed by canteena bot
 * 
 * HISTORY:
 * 
  * 2021-07-31 - Antonio Mancuso - Initial version
 *  
*/

const mensa_alunni_url = "https://mensa.agnelli.it/mensa/api?Command=GetAlunniList";
const { logger } = require('../logger.js');
const fetch = require('node-fetch');
const { Sequelize, Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = new Sequelize("sqlite:../canteena.db");
const API_TOKEN = process.env.API_TOKEN;

// API_TOKEN must be provided
if (!API_TOKEN) {
    logger.error("API_TOKEN non specificato");
    process.exit(1);
}

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

logger.info("crea_canteena_db.js v.1.0 running...");
sequelize.sync();// synch the model with DB
logger.info("DataBase inizializzato correttamente");

// query the mensa GetAlunniList API and populate local anagrafica table 
(async () => {
    await fetch(mensa_alunni_url, {headers: {'AUTHENTICATION': API_TOKEN}})
    .then(res_api => res_api.json())
    .then(users => {
        logger.debug(`Status: ${users.Status}`);
        if (users.Status != 0) {
            logger.error("Errore di access al server API della mensa");
            logger.error("Verifica il TOKEN o la connettività");
            process.exit(1);
        }
        users.Result.forEach(async user => {
            await Anagrafica.create({
                id: user.ID,
                tid: 0,
                Cognome: user.Cognome,
                Nome: user.Nome,
                NomeClasse: user.NomeClasse,
                Credenziali: user.Credenziali
            });
            logger.info(`Inserting user ${user.Cognome} ${user.Nome} [${user.ID}]`);
        }); 
    });
})();
