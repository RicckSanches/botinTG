const { createConversation } = require('@grammyjs/conversations');
const { users, orders } = require('../config/database');

async function createOrderConversation(conversation, ctx) {
    const userId = ctx.from.id;
    if (!users[userId] || users[userId].role !== 'customer') {
        await ctx.reply('Только заказчик может создавать заказы.');
        return;
    }
    await ctx.reply('Опишите ваш заказ одним сообщением:');
    const { message } = await conversation.wait();
    const text = message.text;
    const order = { id: orders.length + 1, customerId: userId, text };
    orders.push(order);
    await ctx.reply('Ваш заказ успешно создан!');
}

module.exports = createConversation(createOrderConversation, 'createOrderConversation');