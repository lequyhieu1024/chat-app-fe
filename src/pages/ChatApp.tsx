import React, { useState, useEffect, useRef } from 'react';
import { Layout } from 'antd';
import '../../public/ChatApp.css';
import Sidebar from "../components/ChatApp/Sidebar.tsx";
import MessageContent from "../components/ChatApp/MessageContent.tsx";
import API from "../utils/axios.ts";
import type {IMessage} from "../interfaces/message.ts";
import type {IConversation} from "../interfaces/conversation.ts";


const ChatApp: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messageInput, setMessageInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const sidebarRefreshRef = useRef<() => void>();

  const [conversations, setConversations] = useState<IConversation[]>([]);

  const handleRefreshSidebar = (refreshFn: () => void) => {
    sidebarRefreshRef.current = refreshFn;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getUsersAndLastMessage = async () => {
    try {
      const response = await API.get('/conversations');
      setConversations(response.data.conversations);
    } catch (e) {
      console.log((e as Error).message)
    }
  }

  useEffect(() => {
    scrollToBottom();
    getUsersAndLastMessage();
  }, [messages]);

  return (
      <Layout className="chat-app">
        <Sidebar
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            handleRefreshSidebar={handleRefreshSidebar}
        />
        <MessageContent
            selectedConversation={selectedConversation}
            messages={messages}
            setMessages={setMessages}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            conversations={conversations}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            messagesEndRef={messagesEndRef}
            onEmitReceivedMessage={ sidebarRefreshRef.current }
        />
      </Layout>
  );
};

export default ChatApp;