# API client

Spesso nello sviluppo di un'applicazione è necessario utilizzare uno o più servizi che espongono un API [REST](https://it.wikipedia.org/wiki/Representational_State_Transfer).

Vediamo come fare una chiamata ad un API da un client JavaScript. Useremo come back-end json-server già visto nella precedente lezione.

## Installiamo i moduli necessari

Per realizzare il client di accesso al API, abbiamo bisogno di un paio di moduli

- node-fetch: per poter utilizzare la funzione *fetch* per fare un GET verso il back-end server
- prettytable: per visualizzare in formato tabellare dei dati

Per installare questi moduli, come al solito usiamo npm
```
npm install node-fetch prettytable
```
semplice, umh? :)

## API client front-end

Il client API è implementato nel file *api_client.js*.
Il file è completamente commentato ed auto esplicativo


## Test back-enb e front-end

Ora che abbiamo tutti i componenti a disposizione, esegui in due finestre distinte il json-sever e API client.

Per il json-sever, esegui:
```
json-server --watch utenti.json
```


mentre per API client
```
node api_client.js
```

Se tutto ha funzionato correttamente otterrai un risultato simile a questo:
```
[
  { id: 123, nome: 'Mario', cognome: 'Rossi', classe: '2A' },
  { id: 456, nome: 'Giuseppe', cognome: 'Verdi', classe: '2A' },
  { id: 789, nome: 'Piero', cognome: 'Bianchi', classe: '3C' },
  { id: 101112, nome: 'Tullio', cognome: 'Prisco', classe: '4D' }
]

Lista di tutti gli utenti
=========================
+--------+----------+---------+--------+
| id     | Nome     | Cognome | Classe | 
+--------+----------+---------+--------+
| 123    | Mario    | Rossi   | 2A     | 
| 456    | Giuseppe | Verdi   | 2A     | 
| 789    | Piero    | Bianchi | 3C     | 
| 101112 | Tullio   | Prisco  | 4D     | 
+--------+----------+---------+--------+
```

Ora se modifichi il file del DB *utenti.json* e riesegui il client l'API restuirà anche il nuovo utente aggiunto al DB.

**Buona sperimentazione**