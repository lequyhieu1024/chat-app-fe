import React, {useEffect, useState} from 'react';
import { Layout, Input, Button, Avatar, List, Typography, Space, Badge, Tooltip } from 'antd';
import { SendOutlined, PhoneOutlined, VideoCameraOutlined, MoreOutlined, SmileOutlined, PaperClipOutlined } from '@ant-design/icons';
import '../../../public/ChatApp.css';
import TypingIndicator from "../TypingIndicator.tsx";
import type {IMessage} from "../../interfaces/message.ts";
import type {IConversation} from "../../interfaces/conversation.ts";
import API from "../../utils/axios.ts";
import {formatDate} from "../../helpers/common.ts";
import socket from "../../utils/socket.ts";

const { Header, Content } = Layout;
const { Text } = Typography;

interface MessageContentProps {
    selectedConversation: string;
    messages: IMessage[];
    setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
    messageInput: string;
    setMessageInput: React.Dispatch<React.SetStateAction<string>>;
    isTyping: boolean;
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
    conversations: IConversation[];
    messagesEndRef: React.RefObject<HTMLDivElement>;
    onEmitReceivedMessage: any
}

const MessageContent: React.FC<MessageContentProps> = ({
                                                           selectedConversation,
                                                           messages,
                                                           setMessages,
                                                           messageInput,
                                                           setMessageInput,
                                                           isTyping,
                                                           setIsTyping,
                                                           conversations,
                                                           messagesEndRef,
                                                           onEmitReceivedMessage
                                                       }) => {
    const selectedConv = conversations.find(conv => conv.id === selectedConversation);

    const [currentUserId, setCurrentUserId] = useState(null);

    const [isGroup, setIsGroup] = useState<boolean>(false);

    const audio = new Audio("/sounds/msg_received.mp3");

    const getCurrentUser = async () => {
        try {
            const res = await API.get('/auth/me');
            setCurrentUserId(res.data.user.id || null)
        } catch (e) {
            console.log(e)
        }
    }

    const handleSendMessage = async () => {
        let newMessage: IMessage;
        if (messageInput.trim()) {
            newMessage = {
                id: Date.now().toString(),
                content: messageInput,
                senderId: currentUserId,
                sentAt: new Date(),
            };
        }

        const data = {
            content: messageInput,
            conversationId: selectedConversation,
            senderId: currentUserId,
        }

        try {
            const res = await API.post(`/messages/${selectedConversation}`, data);
            if (res.data.success) {
                setMessages(prev => [...prev, newMessage]);
                setMessageInput('');
                socket.emit('send_message', res.data.messages)
                onEmitReceivedMessage()
            }
        } catch (e) {
            console.log(e)
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const getMessages = async () => {
        try {
            const response = await API.get(`/messages/${selectedConversation}`);
            setMessages(response.data.messages)
            setIsGroup(response.data.isGroup)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        socket.connect();

        const handleReceivedMessage = (data: IMessage) => {
            setMessages(prev => [...prev, data]);
            onEmitReceivedMessage();
            audio.play();
        };

        socket.on('received_message', handleReceivedMessage);

        return () => {
            socket.off('received_message', handleReceivedMessage);
            socket.disconnect();
        };
    }, [selectedConversation]);

    useEffect(() => {
        getMessages();
        getCurrentUser();
        const timer = setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 3000);
        }, 2000);
        return () => clearTimeout(timer);
    }, [selectedConversation, setIsTyping]);

    return (
        <Layout className="chat-main">
            {selectedConv ? (
                <>
                    <Header className="chat-header">
                        <div className="chat-header-content">
                            <div className="chat-user-info">
                                <Badge dot={selectedConv.isOnline} offset={[-5, 5]}>
                                    <Avatar size={40} src={selectedConv.avatar} />
                                </Badge>
                                <div className="user-details">
                                    <Text strong className="user-name">{selectedConv.title}</Text>
                                    <Text type="secondary" className="user-status">
                                        {selectedConv.isOnline ? 'Online' : 'Offline'}
                                    </Text>
                                </div>
                            </div>
                            <Space>
                                <Tooltip title="Call">
                                    <Button type="text" icon={<PhoneOutlined />} />
                                </Tooltip>
                                <Tooltip title="Video Call">
                                    <Button type="text" icon={<VideoCameraOutlined />} />
                                </Tooltip>
                                <Tooltip title="More">
                                    <Button type="text" icon={<MoreOutlined />} />
                                </Tooltip>
                            </Space>
                        </div>
                    </Header>

                    <Content className="chat-content">
                        <div className="messages-container">
                            {
                                isGroup ? (
                                    <List
                                        dataSource={messages}
                                        renderItem={(message) => (
                                            <div
                                                className={`message-item ${message.senderId == currentUserId ? 'own-message' : 'other-message'}`}>
                                                {message.senderId != currentUserId && (
                                                    <p className="sender-name">{message.sender.name }</p>
                                                )}
                                                <div
                                                    className={`message-bubble ${message.senderId == currentUserId ? 'own' : 'other'}`}>
                                                    <Text className="message-content">{message.content}</Text>
                                                    <Text type="secondary" className="message-time">
                                                        {formatDate(message.sentAt)}
                                                    </Text>
                                                </div>
                                            </div>
                                        )}
                                    />
                                ) : (
                                    <List
                                        dataSource={messages}
                                        renderItem={(message) => (
                                            <div
                                                className={`message-item ${message.senderId == currentUserId ? 'own-message' : 'other-message'}`}>
                                                <div className={`message-bubble ${message.senderId == currentUserId ? 'own' : 'other'}`}>
                                                    <Text className="message-content">{message.content}</Text>
                                                    <Text type="secondary" className="message-time">
                                                        {formatDate(message.sentAt)}
                                                    </Text>
                                                </div>
                                            </div>
                                        )}
                                    />
                                )
                            }
                            <TypingIndicator isTyping={isTyping} userName={selectedConv.title} />
                            <div ref={messagesEndRef} />
                        </div>
                    </Content>

                    <div className="message-input-container">
                        <div className="message-input-wrapper">
                            <Tooltip title="Đính kèm tệp">
                                <Button
                                    style={{ marginBottom: "10px"}}
                                    type="text"
                                    icon={
                                        <span style={{ fontSize: '20px' }}>
                                            <PaperClipOutlined />
                                        </span>
                                    }
                                    className="input-action-button"
                                />
                            </Tooltip>
                            <Tooltip title="Emoji">
                                <Button
                                    style={{ marginBottom: "10px"}}
                                    type="text"
                                    icon={
                                        <span style={{fontSize: '20px'}}>
                                            <SmileOutlined/>
                                        </span>
                                    }
                                    className="input-action-button"
                                />
                            </Tooltip>
                            <Input.TextArea
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Soạn tin nhắn..."
                                autoSize={{ minRows: 1, maxRows: 10 }}
                                className="message-input"
                            />
                            <Button
                                type="primary"
                                icon={
                                    <span style={{fontSize: '15px', marginLeft: '5px'}}>
                                        <SendOutlined/>
                                    </span>
                                }
                                onClick={handleSendMessage}
                                disabled={!messageInput.trim()}
                                className="send-button"
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="no-conversation">
                    <Text type="secondary">Chọn 1 hội thoại để bắt đầu chat</Text>
                </div>
            )}
        </Layout>
    );
};

export default MessageContent;