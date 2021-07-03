const express = require("express"); //importa il server express
const { Sequelize, Model, DataTypes, INTEGER } = require('sequelize'); //importa sequelize per accedere al DB

const sequelize = new Sequelize("sqlite:mensa_api_server_mockup.sql3"); //inizializza l'accesso al DB
let app = express(); //inizializza il server express per esporre l'API

//inizializza il modello per la tabella anagrafica e prenotazioni
class Anagrafica extends Model {}
class Prenotazioni extends Model {}

Anagrafica.init({
    Cognome: DataTypes.STRING,
    Nome: DataTypes.STRING,
    NomeClasse: DataTypes.STRING,
    Credenziali: DataTypes.INTEGER
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
async function GetAllUtenti() {
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
async function GetAllPrenotazioni() {
    let prenotazioni = []; //array che contiene la lista di tutte le prenotazioni
    let _prenotazioni = await Prenotazioni.findAll(); //query al DB

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
                    GetAllUtenti().then(utenti => res.send(utenti));
                    break;
                //http://localhost:3000/api?Command=GetAlreadyEatElseWhere
                case "GetAlreadyEatElseWhere":
                    console.log("OK processing GetAlreadyEatElseWhere");
                    GetAllPrenotazioni().then(prenotazioni => res.send(prenotazioni));
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