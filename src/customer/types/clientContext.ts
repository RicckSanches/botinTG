import { Context, SessionFlavor } from "grammy";
import { SessionData } from "./sessionData"; 
import { Client } from "./client";

export interface ClientBotContext extends Context  {

    session: SessionData;
    client?: Client;
    role: "client";

}
