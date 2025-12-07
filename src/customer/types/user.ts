export interface TelegramUser {
    id:number;
    telegramUd:number;
    username: string;
    name:string;
    phone:string;
    registered: boolean;

}

export interface RegistrationData  {
    name: string;
    phone: string;
}

