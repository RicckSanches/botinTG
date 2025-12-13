
import { Context } from "grammy";
import { user } from "../database/user";
import { Client } from "../types/client";
import { ClientBotContext } from "../types/clientContext";
import { User } from "../types/user";
import { spawn } from "child_process";
import { Conversation } from "@grammyjs/conversations";
import { Keyboard } from "grammy";


export async function registration(ctx:ClientBotContext, conversation) {
    const userId = String(ctx.from!.id);
        
    if (user[userId]) {
    await ctx.reply('Вы уже зарегистрированы.');
    return;
    }

    await ctx.reply('Введите Ваше имя');
    const {message: NameMsg} = await conversation.wait();
    const name = NameMsg.text;

    await ctx.reply('Откройте ваш контакт', {
        reply_markup: new Keyboard()
        .requestContact('Поделиться контаком')
        .oneTime()
        .resized()
    });

    const {message} = await conversation.wait();

    let phone;

    if(message.contact && message.contact.phone_number){

        phone = message.contact.phone_number;
    
    } else if (message.text) {

        phone = message.text;

    } else {

        await ctx.reply('Пожалуйста введите номер телефона или отправьте контакт для продолжения регистрации');

    }


    await ctx.reply('Введите ')








    


        

    
    

    
}