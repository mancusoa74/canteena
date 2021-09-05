// importa la libreria telegraf
import { Telegraf } from 'telegraf'

// prende il controllo del bot tramite il TOKEN fornito da BotFather
const bot = new Telegraf('1969626145:AAFDUxkv1JMuydzcWWYph5xR00nIbVE7DfM')

console.log("Bot Telegram inizializzato");

// gestisce lo start/avvio del bot da parte dell'utente
bot.start((ctx) => {
    console.log("Bot inizializzato da un utente");
    ctx.reply('Benvenuto nel mio bot! Comandi: /help, /saluta. Prova a scrivere "numero".');
})

// gestisce il comando telegram /help
bot.help((ctx) => {
    console.log("Comando /help");
    ctx.reply('Il comando help non è ancora in funzione');
})

// gestisce un comando custom /saluta
bot.command('saluta', (ctx) => {
    console.log("Comando /saluta");
    ctx.reply('Ciao!! Hello!!');
  })
// richiesta del numero di telefono
  bot.hears('numero', (ctx, next) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Posso avere il tuo numero di telefono?', requestPhoneKeyboard);

})

  const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "Si! Voglio darti il mio numero",
                request_contact: true,
                one_time_keyboard: true
            }],
            ["No,non voglio"]
        ]
    }
};

bot.hears("posizione", (ctx) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Posso vedere dove abiti?', requestLocationKeyboard);
})

const requestLocationKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "Certo! Comprami pure casa",
                request_location: true,
                one_time_keyboard: true
            }],
            ["No, meglio di no"]
        ]
    }
}

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
