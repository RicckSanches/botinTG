const { conversations } = require('@grammyjs/conversations');
const { users, orders } = require('../config/database');

// Логика создания заказа

function setupMenu(bot) {

        bot.hears('Создать заказ', async (ctx) => {
        await ctx.conversation.enter('createOrderConversation');
    });


    

    //Найти заказ

    bot.hears('Найти заказы', async (ctx) => {
        const userId = ctx.from.id;
        if (!users[userId] || users[userId].role !== 'worker') {
            await ctx.reply('Только исполнитель может искать заказы.');
            return;
        }
        if (orders.length === 0) {
            await ctx.reply('Пока нет заказов.');
            return;
        }
        for (const order of orders) {
            await ctx.reply(`Заказ #${order.id}: ${order.text}`);
        }
    });

    //Статус заказов

    bot.hears('Статус заказов', async (ctx) => {
        const userId = ctx.from.id;
        if (!users[userId]) {
            await ctx.reply('Сначала выберите роль через /start.');
            return;
        }
        if (users[userId].role === 'customer') {
            const myOrders = orders.filter(o => o.customerId === userId);
            if (myOrders.length === 0) {
                await ctx.reply('У вас нет заказов.');
            } else {
                for (const order of myOrders) {
                    await ctx.reply(`Ваш заказ #${order.id}: ${order.text}`);
                }
            }
        } else {
            await ctx.reply('Пока нет информации о ваших заказах.');
        }
    });

    //Информация о клиенте

    bot.hears('Информация о себе', async (ctx) => {
        const userId = ctx.from.id;
        if (!users[userId]) {
            await ctx.reply('Сначала выберите роль через /start.');
            return;
        }
        const role = users[userId].role === 'customer' ? 'Заказчик' : 'Исполнитель';
        await ctx.reply(`Ваша роль: ${role}\nВаш ID: ${userId}\nУ вас ${orders.length} активных заказов`);
    });

};

module.exports = setupMenu;