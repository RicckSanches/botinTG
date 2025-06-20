const { createConversation } = require('@grammyjs/conversations');
const { users } = require('../config/database');
const { Keyboard } = require('grammy');

async function registrationConversation(conversation, ctx) {
    const userId = ctx.from.id;
    if (users[userId]) {
        await ctx.reply('Вы уже зарегистрированы.');
        return;
    }

    await ctx.reply('Введите ваше имя:');
    const { message: nameMsg } = await conversation.wait();
    const name = nameMsg.text;

    await ctx.reply('Откройте ваш контакт', {
        reply_markup: new Keyboard()
        .requestContact('Поделиться контактом')
        .oneTime()
        .resized()
        }
    );
    
    const { message } = await conversation.wait()

    let phone;
    if (message.contact && message.contact.phone_number) {
    phone = message.contact.phone_number;
    } else if (message.text) {
    phone = message.text;
    }

    if (!phone) {
    await ctx.reply("Пожалуйста, отправьте телефон или нажмите кнопку «Поделиться контактом».");
    return; // или повторить запрос
    }

    await ctx.reply('Выберите роль:', {
        reply_markup: {
            keyboard: [
                [{ text: 'Я заказчик' }],
                [{ text: 'Я исполнитель' }]
            ],
            one_time_keyboard: true,
            resize_keyboard: true
        }
    });

    let role;
    while (true) {
        const { message: roleMsg } = await conversation.wait();
        if (roleMsg.text === 'Я заказчик') {
            role = 'customer';
            break;
        }
        if (roleMsg.text === 'Я исполнитель') {
            role = 'worker';
            break;
        }
        await ctx.reply('Пожалуйста, выберите роль с помощью кнопок.');
    }

    users[userId] = { name, phone, role };
    await ctx.reply(
        `Регистрация завершена!\nИмя: ${name}\nТелефон: ${phone}\nРоль: ${role === 'customer' ? 'заказчик' : 'исполнитель'}`,
        { reply_markup: { remove_keyboard: true } }
    );

};
module.exports = createConversation(registrationConversation, 'registrationConversation');