// importa la libreria telegraf
import { Telegraf } from "telegraf"

// prende il controllo del bot tramite il TOKEN fornito da BotFather
const bot = new Telegraf('1849220664:AAED164BzvBUOEamRc-BhQzH6pKFF1gQMZ8')

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

// gestisce un comando custom /saluta
bot.command('saluta', (ctx) => {
    console.log("Handling bot command saluta...");
    ctx.reply('Ciao!! Hello!!');
  })
  
  bot.command('how_are_you', (ctx) => {
    console.log( Math.floor(Math.random() * 3 ))     
    console.log("Handling bot command how_are_you...");
    switch(Math.floor(Math.random() * 3 )) {
        case 1:
          ctx.reply('Im fine, thanks');
          break;
        case 2:
            ctx.reply('Im not feeling good, I think Im ill');
            break;
        default:
            ctx.reply('Im fine, thanks for your interest');

      }
  })
// gestisce un generico messaggio (non un comando)
bot.on('message', (ctx) => {
    console.log("Handling message...");
    console.log(`Ciao ${ctx.message.chat.first_name}, hai scritto ${ctx.message.text}`);
    ctx.reply(`Ciao ${ctx.message.chat.first_name}, hai scritto ${ctx.message.text}`);
})

// Ciclo principale del bot
bot.launch()

// Gestisce lo shutdown del bot con ^C
process.once('SIGINT', () => {
    console.log("SIGINT: stop Bot");
    bot.stop('SIGINT');
})
