# mensa_api_server_mockup

Nelle lezioni precedenti abbiamo implementato un server API REST in maniera facile tramite *json-server*.

Tuttavia il server di back-end dell'applicazione attuale della mensa, non implementa un API REST.

Pertanto l'uso di json-server, per quanto accettabile, non ci permette di avere a disposizione un back-end il più simile possibile al back-ebnd finale.

Pertanto, già dalle fasi iniziali di sviluppo e testing è  utile avere un server che "emuli" in tutto e per tutto il server finalle.

Per tale motivo, non abbiamo alternativa che scriverci da noi tale server.

## API

Il server della mensa espone un'API non REST, di tipo tradizionale (ed ormai in progressivo disuso).

Nello specifico il server risponde a sole richieste GET a questo URL:

*https://mensa.agnelli.it/mensa/api?Command=XXX*

dove *XXX* è un comando valido tra:

- **GetAlunniList**: Ottiene la lista degli alunni della scuola
- **GetTime**: Ottiene il timestamp (data e ora) del server
- **GetIscritti**: Ottiene gli ID delle persone prenotate
- **GetResClose**: Restituisce lo stato delle prenotazioni (confermate dalla segreteria oppure no)
- **GetAlreadyEatElseWhere**: Ottiene l'elenco delle persone passate in mensa (ritirato il pasto)

Pertanto le seguenti chiamate sono valide:
- https://mensa.agnelli.it/mensa/api?Command=GetAlunniList
- https://mensa.agnelli.it/mensa/api?Command=GetResClose
- https://mensa.agnelli.it/mensa/api?Command=GetAlreadyEatElseWhere


Come si può notare ciò è parecchio diverso rispetto all'API REST messa a disposizione da json-server.

## mensa_api_server_mockup

Il file [mensa_api_server_mockup.js](https://github.com/mancusoa74/canteena/blob/main/mensa_api_server_mockup.js) contiene l'implementazione di un API server che si comporta (emula) esattamente il server della mensa.

In questo modo possiamo sviluppare la nostra applicazione e fare gli unit test senza dover accedere al server della mensa.

Nella fase finale di integrazione, testeremo il nostro codice con il server finale della mensa ed andremo a fare minime modifiche laddove necessario.

In questo modo lo sviluppo ed il testing è efficiente e svincolato dalla disponibilità del server della mensa (nel periodo rstivo la mensa è chiusa).

## Preparazione per lo sviluppo

Per poter sviluppare ed eseguire il server ci servono alcuni moduli e software.
Il server, per rispondere alle GET delle query, leggerà i dati da un DB relazionale chiamato **sqlite**.

sqlite è un RDBMS a tutti gli effetti e perfetto per l'uso in piccoli progetti, con DB fino a 20 tabelle e con 1000/10000 linee per tabella.

La caratteristica principale di sqlite è che tutto il DB è contenuto in un solo file.

**sqlite** si installa tramite `sudo apt install sqlite3`

Ora per sviluppare il server API abbiamo bisogno di 3 pacchetti, installabili in questo modo

```
npm install express
npm install sequelize
npm install sqlite3
```
- **express**: server web molto leggero e di facile utilizzo per node.js
- **sequelize**: è un ORM (Object Relational Mapper) che supporta i principali DB (myaql, postgresql, ...)
- **sqlite3**: è il driver per interagire con il DB sqlite


## Creazione del DB

Come detto il server API accede ad un DB SQL.
Per creare il DB è sufficiente eseguire il seguente comando

```
sqlite3 mensa_api_server_mockup.sql3 < create_mensa_db.sql
```

Questo comando crea un DB,nella directory corrente, chiamato **mensa_api_server_mockup.sql3** implementando i comandi contenuti nel file [create_mensa_db.sql](https://github.com/mancusoa74/canteena/blob/main/create_mensa_db.sql)


In questo modo avremo un DB con una tabella contenente tutti gli studenti dell'Agnelli e una tabella che conterrà le prenotazioni dei singoli utenti alla mensa per un dato giorno.

## Fare una prenotazione

Per effettuare una prenotazione ho fornito un semplice script [alunno_badge.sh](https://github.com/mancusoa74/canteena/blob/main/alunno_badge.sh)

Basta invocarlo con un parametro che rappresenta l'ID di uno studente. Questo creerà una prenotazione nel DB che poi sarà disponibile via API attraverso il nostro server di mock-up.

```
./alunno_prenota.sh 567
```
Otterete in output il print della tabella delle prenotazioni, inclusiva della prenotazione appena aggiunta (ultima linea)
```
1|20|0|2021-07-03 23:01:31
2|20|0|2021-07-03 23:02:30
3|40|0|2021-07-03 23:03:45
4|34|0|2021-07-03 23:03:50
5|843|0|2021-07-03 23:04:00
6|421|0|2021-07-03 23:07:22
7|904|0|2021-07-03 23:14:38
8|911|0|2021-07-03 23:14:41
9|111|0|2021-07-03 23:14:52
10|115|0|2021-07-03 23:14:55
11|175|0|2021-07-03 23:14:57
12|242|0|2021-07-03 23:14:59
13|567|0|2021-07-04 18:53:28

```

## Run del server

A questo punto ppossiamo far partire il nostro server, tramite

```
node mensa_api_server_mockup.js 
```

se tutto ha funzionato correttamente dovresti vedere un output simile a questo

```
DataBase inizializzato correttamente
Executing (default): CREATE TABLE IF NOT EXISTS `anagrafica` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `Cognome` VARCHAR(255), `Nome` VARCHAR(255), `NomeClasse` VARCHAR(255), `Credenziali` INTEGER);
Executing (default): PRAGMA INDEX_LIST(`anagrafica`)
Executing (default): CREATE TABLE IF NOT EXISTS `prenotazioni` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `IDAnagrafica` INTEGER, `IDMetodo` INTEGER, `OraConsumazione` DATETIME);
Executing (default): PRAGMA INDEX_LIST(`prenotazioni`)

```

*NOTA: il server è disponibile sulla porta 3000 sul proprio PC*

## Chiamate API

Potete interagire con il server usando POSTMAN.
La cosa importante è aggiungere un header di autencicazione.

Nello specifico è necessario aggiungere una coppia chiave-valore all'header della richiesta GET con i seguenti valori

- chiave: **AUTHENTICATION**
- valore: **7COFX3lLmvyY0nx8oUSiOVRW2OGC4ltcO7nx0DLrt5LG5q79FfkopflK6xV6Wqnk**


A questo punto avete tutti gli elementi per implementare il server API che emula quello della mensa e sperimentare con POSTMAN facendo delle chiamate alle due API disponibili:

- GetAlunniList
- GetAlreadyEatElseWhere


**Buona sperimentazione**
