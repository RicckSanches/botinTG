import { user } from "./customer/database/user";
import { ClientBotContext } from "./customer/types/clientContext";

require('dotenv').config();
const { Bot, session, keyboard, } = require('grammy');
const { conversations, createConversation } = require('@grammyjs/conversations');
const { registration } = require('./customer/features/registration');

const bot = new Bot(process.env.BOT_TOKEN_API);


bot.use(session({ initial: () => ({}) }));


bot.use(conversations());

bot.use(createConversation(registration, 'registration'));


bot.api.setMyCommands([
    {
        command: 'start',
        description: 'Запуск бота'
    },
    {
        command: 'help',
        description: 'Инструкции'
    },
    {
        command: 'commands',
        description: 'Команды бота'
    },
]);

bot.command('start', async (ctx) => {
    const userId = String(ctx.from!.id);
    if(!user[userId]) {
        await ctx.conversation.enter('registration'); 
    } 
});


bot.catch((err) => {
    console.error('Ошибка:', err);
});


console.log('Бот запускается...');
bot.start();

