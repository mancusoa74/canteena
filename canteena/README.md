# canteena.js bot

## Testing

Il testing del bot canteena è molto facile.

Per prima cosa è necessario creare il DB di canteena. E' stato sviluppato e fornito un tool per raggiungere questo scopo. Il tool è presente nella directoery *db_utils* e si chiama *crea_canteena_db.js*.

Quindi per creare il DB eseguire i seguenti comandi:
```
cd db_utils
node crea_canteena_db.js
```

Per accedere alle API del server mensa è necessario specificare un token, tramite una variabiel d'ambiente chiamata **API_TOKEN**.

Se tutto è andato bene, questo tool creerà un file (DB sqllite) nella directory canettena chiamato *canteena.db*

Ora per iniziare il test del bot, basta eseguire i seguenti comandi:

```
cd canteena
node canteena.js
```

Per accedere al vostro bot di test, specificare tramite variabile d'ambiente **BOT_TOKEN** il token rilasciato da bot father al vostro bot.

Qualsiasi problema deve essere riportato aprendo una issue in github in cui si specifica esattamente qual'è l'errore e si spiega come riprodurlo.

Buon Testing!!!