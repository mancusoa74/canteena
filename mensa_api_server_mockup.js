const express = require("express"); //importa il server express
const { Sequelize, Op, Model, DataTypes, INTEGER } = require('sequelize'); //importa sequelize per accedere al DB

const sequelize = new Sequelize("sqlite:mensa_api_server_mockup.sql3"); //inizializza l'accesso al DB
let app = express(); //inizializza il server express per esporre l'API

//inizializza il modello per la tabella anagrafica e prenotazioni
class Anagrafica extends Model {}
class Prenotazioni extends Model {}

Anagrafica.init({
    tid: DataTypes.INTEGER,
    Cognome: DataTypes.STRING,
    Nome: DataTypes.STRING,
    NomeClasse: DataTypes.STRING,
    Credenziali: DataTypes.INTEGER,
    daservire: DataTypes.BOOLEAN
}, { sequelize, modelName: 'anagrafica', 
     tableName: 'anagrafica', 
     createdAt: false, 
     updatedAt: false
   });

Prenotazioni.init({
    IDAnagrafica: DataTypes.INTEGER, 
    IDMetodo: DataTypes.INTEGER,
    OraConsumazione: DataTypes.DATE
}, { sequelize, modelName: 'prenotazioni', 
     tableName: 'prenotazioni', 
     createdAt: false, 
     updatedAt: false
   });

sequelize.sync(); //sincronizza il modello con il DB
console.log("DataBase inizializzato correttamente");

//query al DB per ottenere la lista di tutti gli utenti
async function GetAllAlunni() {
    let users = []; //array che contiene la lista di tutti gli utenti
    let utenti = await Anagrafica.findAll(); //query al DB

    utenti.forEach(utente => {
        users.push(utente.dataValues);//aggiunge ogni utente all'array users
    });
    let jobj = {
        "Status": 0,
        "Result": users
    }
    return(JSON.stringify(jobj));
}

//query al DB per ottenere la lista di tutte le prenotazioni
async function GetAllPrenotati() {
    let prenotazioni = []; //array che contiene la lista di tutte le prenotazioni
    let _prenotazioni = await Prenotazioni.findAll({
        where: {OraConsumazione: 0}
    }); //query al DB

    _prenotazioni.forEach(prenotazione => {
        prenotazione.dataValues['OraConsumazione'] = 0;
        prenotazioni.push(prenotazione.dataValues);//aggiunge ogni utente all'array users
    });
    let jobj = {
        "Status": 0,
        "Result": prenotazioni
    }
    return(JSON.stringify(jobj));
}

//query al DB per ottenere la lista di tutte le prenotazioni
async function GetAllServiti() {
    let prenotazioni = []; //array che contiene la lista di tutte le prenotazioni
    let _prenotazioni = await Prenotazioni.findAll({
        where: {
            OraConsumazione: {
                [Op.ne]: 0
            }
        }
    }); //query al DB

    _prenotazioni.forEach(prenotazione => {
        prenotazioni.push(prenotazione.dataValues);//aggiunge ogni utente all'array users
    });
    let jobj = {
        "Status": 0,
        "Result": prenotazioni
    }
    return(JSON.stringify(jobj));
}

//gestisce la chiamata ad api http://localhost:3000/api?Command=XXX
app.get('/api', function(req, res){
    //l'header della richiesta deve contenere il campo AUTHENTICATION
    //questo viene usato come semplice meccanismo di autenticazione e sicurezza
    if ("authentication" in req.headers == false) {
        console.log("ERROR: AUTHENTICATION assente nell'header HTTP");
        res.send('{"Status": 2}');
    } else {
        //verifica che sia presente la query Command
        if ("Command" in req.query) {
            let command = req.query['Command'];
            //gestisce i comandi dell'API
            switch(command) {
                //http://localhost:3000/api?Command=GetAlunniList
                case "GetAlunniList":
                    console.log("OK processing GetAlunniList"); 
                    GetAllAlunni().then(utenti => res.send(utenti));
                    break;
                //http://localhost:3000/api?Command=GetResClose
                case "GetResClose":
                    console.log("OK processing GetResClose");
                    GetAllPrenotati().then(prenotazioni => res.send(prenotazioni));
                    break;
                //http://localhost:3000/api?Command=GetAlreadyEatElseWhere
                case "GetAlreadyEatElseWhere":
                    console.log("OK processing GetAlreadyEatElseWhere");
                    GetAllServiti().then(serviti => res.send(serviti));
                    break;
                default:
                    console.log("ERROR: comando non valido");
                    res.send('{"Status": 5}');    
                    break;
            }
        }
        else {
            console.log("ERROR: Command non presente nella query string");
            res.send('{"Status": 5}');
        }
    }
});

app.listen(3000);