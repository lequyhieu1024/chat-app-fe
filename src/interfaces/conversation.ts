import type {IMessage} from "./message.ts";

export interface IConversation {
    id: string;
    isGroup: boolean;
    title: string;
    avatar: string;
    lastMessage: IMessage;
    participants: any,
    unreadCount: number;
    isOnline: boolean;
}
