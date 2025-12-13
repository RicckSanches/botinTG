export interface Application {

    id:string;
    OrderId: string;
    userId: string;
    comment?: string;
    price?: number;
    status: "pending" | "accepted" | "rejected";
    createdAt: string;

}