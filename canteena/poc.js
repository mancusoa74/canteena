
const cron = require('node-cron');
const { logger } = require('./logger.js');
const { Op, Sequelize, Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = new Sequelize("sqlite:canteena.db");
const { mensa_get_iscritti, mensa_get_prenotati, mensa_get_serviti } = require('./mensa_client.js');
const { find_db_user, find_db_user_by_id, register_db_user, update_user_service_status, serve_all_user, find_db_user_unserved } = require('./db.js');
const { Console } = require('winston/lib/winston/transports');


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

async function get_user_to_serve(limit_users) {
    logger.debug("get_user_to_serve START");
    var users = await Anagrafica.findAll({
        where: {
            //tid: 0,
            daservire: true
        },
        limit: limit_users
    });
    console.log(users);
    if (users.length == 0) {
        logger.info(`Non ci sono utenti da servire`);
        return { nuser: 0,
                 users: []
        }
    } else {
        logger.info(`Ci sono ${users.length} utenti da servire`);
        return { nuser: 1,
                users: users.dataValues
        }
    }
    logger.debug("get_user_to_serve END");
}


async function notify_canteena_user(ids) {
    console.log(ids);
    ids.forEach(async id => {
        console.log(id);
        var user = await find_db_user_by_id(id);
        console.log(user);
        if (user.status == false) {
            console.log("Utente NON trovato. Impossibile notificare");
        } else {
            console.log(`Notifica dell'utente ${user.user.Cognome} ${user.user.Nome} con tid[${user.user.tid}]`);
        }
    })
}

// var counter = 100;
// var timer_id = setInterval(async () => {
//     console.log(await get_user_to_serve(5));
//     console.log(`tick[${counter}]`);
//     counter--;
//     if (counter == 0)
//         clearInterval(timer_id);
// }, 5000);

//(async () => {
    //console.log(await find_db_user_by_id(4218));
    //notify_canteena_user([4871, 4872, 4873, 4874, 4875 ,4876, 542332]);
//    console.log(get_user_to_serve(4));
//})();

//const COMMAND_GET_UTENTI_ISCRITTI = "GetIscritti";
//const COMMAND_GET_UTENTI_PRENOTATI = "GetResClose";
//const COMMAND_GET_UTENTI_SERVITI = "GetAlreadyEatElseWhere




(async () => {
    logger.debug("POC START");


    // await update_db2(16, true);
    // await mensa_get_iscritti();
    //await mensa_get_prenotati();
    // await mensa_get_serviti();
    // update_user_service_status(1, true);
    // update_user_service_status(3, true);
    // update_user_service_status(5, true);
    // update_user_service_status(7, true);
    // update_user_service_status(9, true);
    // update_user_service_status(11, true);
    
    //RUNTIME 1 - START (da portare in helpers o in runtime)
    // serve_all_user();
    // var iscritti = await mensa_get_prenotati();
    // if (iscritti.Status == 0 && iscritti.Result.length > 0) {
    //     iscritti.Result.forEach(iscritto => {
    //         logger.info(`Inserimento prenotazione pasto per utente [${iscritto.IDAnagrafica}]`);
    //         update_user_service_status(iscritto.IDAnagrafica, true);
    //     })
    // } else {
    //     logger.error("ERRORE: impossibile recuperare la lista degli utenti prenotati al servizio mensa");
    // }
    //RUNTIME 1 - END

    //RUNTIME 2 -START

    //lista utenti serviti
    // var serviti = await mensa_get_serviti();
    // console.log(serviti);
    // if(serviti.Status ==  0 && serviti.Result.length > 0) {
    //     serviti.Result.forEach(servito => {
    //         update_user_service_status(servito.IDAnagrafica, false);
    //     })
    // }

    // var daservire = await find_db_user_unserved(2);
    // if (daservire.status == true && daservire.users.length > 0) {
    //     daservire.users.forEach(iscritto => {
    //         logger.info(`Inserimento prenotazione pasto per utente [${iscritto.dataValues.id}]`);
    //     })
    // } else {
    //     logger.info("Non ci sono più utenti da servire");
    // }

    //RUNTIME 2 - END    


    logger.debug("POC END");
})();

