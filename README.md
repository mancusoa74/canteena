# canteena : mensa 2.0

## Introduzione
Durante l'anno scolastico 2020/2021, in piena emergenza COVID-19, è stato necessario modificare e razionalizzare l'accesso alla mensa scolastica da parte degli studenti, al fine di garantire il necessario distanziamento sociale tra gli studenti e tra il personale della mensa stesso.

Pertanto il flusso degli studenti, in ingresso alla mensa scolastica, è stato regolato manualmente dal personale scolastico. Ciò ha permesso il corretto controllo del flusso degli studenti; tuttavia ha richiesto l'impiego di personale scolastico che è quindi stato distratto da altre attività pianificate.
 
Per tale motivo per l'anno scolastico **2021/2021** si vuole dotare la scuola di un sistema di gestione dell'accesso alla mensa dell'istituto E. Agnelli, in modo da garantire il distanziamento sociale, razionalizzare gli accessi, ridurre le code e impiegare meno personale a supporto delle operazioni.

## Requisiti del sistema

I requisiti iniziali del sistema in oggetto sono i seguenti:

| ID  | Descrizione Requisito                                                                                                           | Priorità |
| --- | ------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | Gli studenti per accedere alla mensa devono essere preventivamente registrati tramite https://mensa.agnelli.it                  | MUST     |
| 2   | Il sistema deve gestire in modo autonomo l'accesso alla mensa da parte degli studenti registrati                                | MUST     |
| 3   | Gli studenti non registrati non saranno gestiti dal sistema in oggetto                                                          | MUST     |
| 4   | Nell'orario di apertura della mensa, il sistema notifica ogni singolo studente sull'orario previsto di accesso alla mensa       | MUST     |
| 5   | In caso in cui lo studente non si presentasse alla mensa, viene notificato per 3 volte consecutive con intervallo configurabile | MUST     |
| 6   | Il sistema effettua le chiamate gestendo delle priorità amministrative per classe                                               | COULD    |
| 7   | Gli studenti ricevono la notiifca dal sistema tramnite smartphone                                                               | MUST     |
| 8   | Il sistema supporta i dispositivi Android e iOS degli studenti                                                                  | MUST     |
| 9   | Il sistema deve possedere un portale che fornisce la documentazione completa delle operazioni e del funzionamento del sistema   | MUST     |
| 10  | I nuovi componenti del sistema devono essere sviluppati esclusivamente con tecnologie web                                       | MUST     |
| 11  | Il sistema supporta messaggi multi-lingua in funzionew delle preferenze dell'utente                                             | COULD    |
| 12  | Il sistema si interfaccia all'applicazione esistente                                                                            | MUST     |
| 13  | Non sono richieste modifiche al sistema esistente                                                                               | MUST     |

## Documentazione


NPM package per le API, maggiori informazioni su NPM (https://www.npmjs.com/)

- [Telegram bot tutorial con Node.js](https://www.html.it/pag/398730/telegram-bot-in-node-js/)

- [Telegram bot tutorial con Node.js su Linux (Ubuntu)](https://www.cloud.it/tutorial/come-creare-un-bot-per-telegram-con-nodejs-su-ubuntu-18-04.aspx)

- [Funzioni aggiuntive, immagini risposte etc + tutorial base ](https://www.section.io/engineering-education/telegram-bot-in-nodejs/)

- [Repository "Node.js Telegram Bot API"](https://github.com/yagop/node-telegram-bot-api/blob/master/README.md)

- [Alcuni bot esitenti in JavaScript ](https://core.telegram.org/bots/samples#node-js)

- [Informazioni generali sui Bot di Telegram](https://core.telegram.org/)

## Architettura


## Progetto di dettaglio
