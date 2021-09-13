// importa la libreria telegraf
import { Telegraf } from 'telegraf'

// prende il controllo del bot tramite il TOKEN fornito da BotFather
const bot = new Telegraf('1888767090:AAEx4KLKMEbInYh4DXlyAJ2pWlgRegDhcqA')

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

bot.command('origine', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Salve', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Voglio saperla', callback_data: 'one' }
                ]
            ]
        }
    })
})
bot.action('one', ctx => {
    ctx.answerCbQuery('Ciao');
    ctx.reply('Sono stato creato da Pierpaolo Quijada Gomez');
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