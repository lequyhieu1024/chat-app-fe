export interface IMessage {
    id: string;
    content: string;
    senderId: number | string | null;
    sender?: any;
    sentAt: Date;
}