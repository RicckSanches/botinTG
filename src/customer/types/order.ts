export interface Order {

    id: string;
    clientId: string;
    title: string;
    description?:string;
    status: "open" | "in_progress" | "completeted" | "completed" | "canselled";
    assignedUserId?: string;
    price?: number;
    createdAt: string;
    updatedAt?: string;

}