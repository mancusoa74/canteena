# client API da command line

Per chi (come me) preferisce la linea di comando rispetto a PSOTMAN, vediamo come invocare una GET ad un API server.

Fate girare il server mock-up della mensa ed eseguite il seguente comando

```
curl -H "AUTHENTICATION:pippo" http://localhost:3000/api?Command=GetAlreadyEatElseWhere | python -m json.tool
```

dovreste ottenre un risultato simile a questo:

```
{
    "Status": 0,
    "Result": [
         {
            "id": 8,
            "IDAnagrafica": 911,
            "IDMetodo": 0,
            "OraConsumazione": "2021-07-03 23:14:41"
        },
        {
            "id": 9,
            "IDAnagrafica": 111,
            "IDMetodo": 0,
            "OraConsumazione": "2021-07-03 23:14:52"
        },
        {
            "id": 10,
            "IDAnagrafica": 115,
            "IDMetodo": 0,
            "OraConsumazione": "2021-07-03 23:14:55"
        },
        {
            "id": 11,
            "IDAnagrafica": 175,
            "IDMetodo": 0,
            "OraConsumazione": "2021-07-03 23:14:57"
        },
        {
            "id": 12,
            "IDAnagrafica": 242,
            "IDMetodo": 0,
            "OraConsumazione": "2021-07-03 23:14:59"
        },
        {
            "id": 13,
            "IDAnagrafica": 567,
            "IDMetodo": 0,
            "OraConsumazione": "2021-07-04 18:53:28"
        },
        {
            "id": 14,
            "IDAnagrafica": 55,
            "IDMetodo": 0,
            "OraConsumazione": "2021-07-08 11:07:07"
        },
        {
            "id": 15,
            "IDAnagrafica": 55,
            "IDMetodo": 0,
            "OraConsumazione": "2021-07-08 11:07:27"
        }
    ]
}
```

