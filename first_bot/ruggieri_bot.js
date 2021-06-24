// importa la libreria telegraf
//NOME BOT: provaruggebot
import { Telegraf } from 'telegraf'

// prende il controllo del bot tramite il TOKEN fornito da BotFather
const bot = new Telegraf('1589088873:AAGPXi9b3Mes8odf5N4B4ajlRROEy7GWzOE')

console.log("Bot Telegram inizializzato correttamente!!!");

// gestisce lo start/avvio del bot da parte dell'utente
bot.start((ctx) => {
    console.log("Handling bot start...");
    ctx.reply(`Benvenuto ${ctx.message.from.first_name} ${ctx.message.from.last_name} sul ${ctx.botInfo.first_name} bot!!\n\nDi seguito i comandi che puoi utilizzare:
/help: Se non ti ricordi i comandi, usa /help per avere una lista\n/saluta\n/come_stai\n/data`);
    console.log(ctx); //ctx viene è il cosidetto contesto. Contiene una serie di informazioni che Telegram ti fornisce(id utente, id bot, data, messaggio...)
})


// gestisce il comando telegram /help
bot.help((ctx) => {
    console.log("Handling bot help...");
    ctx.reply('Di seguito i comandi che puoi utilizzare:\n/help: Se non ti ricordi i comandi, usa /help per avere una lista\n/saluta\n/come_stai\n/data');
})

bot.command('come_stai', (ctx) => {
    console.log("Handling bot command come_stai...");
    ctx.reply('Sto bene grazie e tu?');

})

// gestisce un comando custom /saluta
bot.command('saluta', (ctx) => {
    console.log("Handling bot command saluta...");
    ctx.reply('Ciao!! Hello!!');
  })

  bot.command('data', (ctx) => {
    console.log("Handling bot command data...");
    console.log(`Data ${Date(ctx.message.date)}`);
    ctx.reply(`Data: ${Date(ctx.message.date)}`)
})

// gestisce un generico messaggio (non un comando)
bot.on('message', (ctx) => {
    console.log("Handling message...");
    if(ctx.message.text == 'Bene'){
        ctx.reply('Sono contento!');
    }
    else{
        console.log(`Ciao ${ctx.message.chat.first_name}, hai scritto ${ctx.message.text}`);
        ctx.reply(`Ciao ${ctx.message.chat.first_name}, hai scritto ${ctx.message.text}`);
    }        
})


// Ciclo principale del bot
bot.launch()

// Gestisce lo shutdown del bot con ^C
process.once('SIGINT', () => {
    console.log("SIGINT: stop Bot");
    bot.stop('SIGINT');
})