#! /bin/bash

#AUTHOR: Ruggieri Dario
#DATE: 01/08/2021
#Cancella l'alunno prenotato con id $1

sqlite3 mensa_api_server_mockup.sql3 "DELETE FROM prenotazioni WHERE IDAnagrafica = $1;"