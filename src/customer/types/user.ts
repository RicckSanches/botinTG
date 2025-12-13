import { user } from "../database/user";
import { ClientBotContext } from "../types/clientContext";
import { Context } from "grammy";
export interface User {

    id: string;
    username?: string;
    fullName?: string;
    skills?: string[];
    rating?: number;
    createdAt: string;

}




