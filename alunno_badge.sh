#! /bin/bash

#$1 è ID dell'utente che è stato badgato (ha preso il pasto)

sqlite3 mensa_api_server_mockup.sql3 "UPDATE prenotazioni SET OraConsumazione = datetime('now') where IDAnagrafica = $1;"
sqlite3 mensa_api_server_mockup.sql3 "SELECT * from prenotazioni;"
