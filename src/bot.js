require('dotenv').config();
const { Bot, session, GrammyError, HttpError,Keyboard, InlineKeyboard  } = require('grammy');
const { conversations, createConversation } = require('@grammyjs/conversations');
const registrationConversation = require('./common/registration');
const setupMenu = require('./common/menu');
const { users, orders } = require('./config/database');
const createOrderConversation = require('./common/createOrderConversation');


const bot = new Bot(process.env.NEW_TOKEN_BOT);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.use(registrationConversation);
bot.use(createOrderConversation);

bot.api.setMyCommands([
    {
        command:'start',
        description: 'Запуск бота'
    },
    {
        command: 'help',
        description: 'Инструкции'
    },
    {
        command:'commands',
        description: 'Команды бота'
    },


])

bot.command('start', async (ctx) => {
    await ctx.conversation.enter('registrationConversation');
});

setupMenu(bot);

bot.command('commands', async (ctx) => {
    const userId = ctx.from.id;

    if (!users[userId]) {
        await ctx.reply('Вы не зарегистрированы. Пожалуйста, сначала пройдите регистрацию.');
        return;
    }

    if (users[userId].role === 'worker') {
        await ctx.reply('Для вас есть следующие команды', {
            reply_markup: {
                keyboard: [
                    [{ text: 'Найти заказы' }],
                    [{ text: 'Статус заказов' }],
                    [{ text: 'Информация о себе' }]
                ],
                one_time_keyboard: true,
                resize_keyboard: true
            }
        });
    } else if (users[userId].role === 'customer') {
        await ctx.reply('Для вас есть следующие команды', {
            reply_markup: {
                keyboard: [
                    [{ text: 'Создать заказ' }],
                    [{ text: 'Статус заказов' }],
                    [{ text: 'Информация о себе' }]
                ],
                one_time_keyboard: true,
                resize_keyboard: true
            }
        });
    } else {
        await ctx.reply('Ваша роль не определена. Пожалуйста, обратитесь к администратору.');
    }
});


bot.on('message', async (ctx) => {
    await ctx.reply('Нет такой команды, попробуйте другую')
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Ошибка в запросе:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Не удалось связаться с Telegram:", e);
    } else {
        console.error("Неизвестная ошибка:", e);
    }
});


bot.start();