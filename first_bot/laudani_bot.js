// importa la libreria telegraf
import { Telegraf } from 'telegraf'

// prende il controllo del bot tramite il TOKEN fornito da BotFather
const bot = new Telegraf('1974387274:AAEruPyAMbcKN1bQjoZybjnzbhXpHIlwFHc')

console.log("Bot Telegram inizializzato correttamente!!!");

// gestisce lo start/avvio del bot da parte dell'utente
bot.start((ctx) => {
    console.log("Handling bot start...");
    ctx.reply('Benvenuto sul tuo nuovo bot telegram!!');
})

// gestisce il comando telegram /help
bot.help((ctx) => {
    console.log("Handling bot help...");
    ctx.reply('Al momento il tuo bot non può aiutarti!!');
})

// manda la foto di un gatto scelto da lui
bot.command('/gatto', (ctx) => {
    console.log("Handling bot command gatto...");
    ctx.replyWithPhoto('http://thecatapi.com/api/images/get');
})

// manda la foto di un gatto cosmico
bot.command('/gattocosmico', (ctx) => {
    console.log("Handling bot command gatto cosmico...");
    ctx.replyWithPhoto('https://i.imgur.com/XLZlyqm.jpeg');
})

  // gestisce un comando custom /saluta
bot.command('saluta', (ctx) => {
    console.log("Handling bot command saluta...");
    ctx.reply('Ciao!! Hello!!');
  })

// Ciclo principale del bot
bot.launch()

// Gestisce lo shutdown del bot con ^C
process.once('SIGINT', () => {
    console.log("SIGINT: stop Bot");
    bot.stop('SIGINT');
})