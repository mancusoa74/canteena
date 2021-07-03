import fetch from 'node-fetch'; //importa il modulo node-fetch per fare richieste http al API server
import prettytable  from 'prettytable'; //importa il modulo prettytable per stampare i risultati in forma tabellare

let url = "http://localhost:3000/utenti"; //URL del json-server

let tabella = new prettytable(); //creo una nuova tabella per output       
let table_headers = ["id", "Nome", "Cognome", "Classe"]; //definisco l'intestazione della tabella
tabella.fieldNames(table_headers); //importa l'intestazione della tabella
        
fetch(url) //eseguo un HTTP GET verso API end-point (json-server)
    .then(res_api => res_api.json()) //converto il risultato del API in JSON
    .then(utenti => { //processo il risultato che contiene la lista degli utenti
        console.log(utenti); //stampa su console l'oggetto JSON contenente un array di utenti
        console.log("\nLista di tutti gli utenti");
        console.log("=========================");
        
        utenti.forEach(utente => { //processo i singoli utenti presenti nella risposta dell'API
            tabella.addRow([ //aggiungo una nuova linea alla tabella contenente i dati dell'utente
                            utente['id'], 
                            utente['nome'], 
                            utente['cognome'], 
                            utente['classe']
                          ]);
        });//fine della funzione anonima che processa il risultato del API
        tabella.print(); //stamp la tabella sulla console
    });