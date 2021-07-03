#! /bin/bash

#$1 è ID dell'utente che è stato badgato (ha preso il pasto)

sqlite3 mensa_api_server_mockup.sql3 "INSERT INTO prenotazioni(IDAnagrafica, IDMetodo, OraConsumazione) VALUES($1,0, datetime('now'));"
sqlite3 mensa_api_server_mockup.sql3 "SELECT * from prenotazioni;"
