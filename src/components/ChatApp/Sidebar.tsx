import React, {useEffect, useState} from 'react';
import {Input, Button, Avatar, List, Typography, Badge, Modal, Form, Upload, Drawer} from 'antd';
import {SearchOutlined, LogoutOutlined, FormOutlined, UploadOutlined, UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons';
import '../../../public/ChatApp.css';
import Sider from "antd/es/layout/Sider";
import type {IConversation} from "../../interfaces/conversation.ts";
import API from "../../utils/axios.ts";
import {formatDate} from "../../helpers/common.ts";
import axios from "../../utils/axios.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import FriendSuggestions from "../FriendSuggestions.tsx";

const { Text } = Typography;

interface SidebarProps {
    selectedConversation: string;
    setSelectedConversation: (id: string) => void;
    handleRefreshSidebar?: (func: () => void) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedConversation, setSelectedConversation, handleRefreshSidebar }) => {

    const [conversations, setConversations] = useState<IConversation[]>([])
    const [keyword, setKeyword] = useState<string>("");

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const [form] = Form.useForm();

    const [open, setOpen] = useState(false);

    const [isDrawerAcceptOpen, setIsDrawerAcceptOpen] = useState(false)

    const filterConversation = async (kw?: string) => {
        try {
            const response = await API.get('/conversations', {
                params: {name: kw}
            });
            setConversations(response.data.conversations);
        } catch (e) {
            console.log((e as Error).message)
        }
    }

    const onChangeKeyword = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }

    const onClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (datas: any) => {
        const formData = new FormData();

        Object.entries(datas).forEach(([key, value]) => {
            formData.append(key, value as any);
        });

        try {
            const res = await API.post('/auth/update-profile', formData)
            if (res) {
                toast.success('Cập nhật thành công');
                setIsOpenModal(false);
            } else {
                toast.error('Cập nhật thất bại !')
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (handleRefreshSidebar) {
            handleRefreshSidebar(filterConversation);
        }
    }, [handleRefreshSidebar]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (keyword) {
                filterConversation(keyword);
            } else {
                filterConversation();
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [keyword]);
    const navigate = useNavigate();

    return (
        <>
            <Sider width={350} className="chat-sidebar relative">
                <div className="sidebar-header">
                    <div className={`flex gap-10`}>
                        <div
                            className="border border-white rounded-xl p-2 flex items-center gap-2 bg-white/20 backdrop-blur-sm shadow-md">
                            <img
                                src={String(localStorage.getItem('avatar'))}
                                className="w-14 h-14 rounded-full object-cover border border-white shadow"
                                alt={String(localStorage.getItem('name'))}
                            />
                            <h2 className="text-white font-semibold text-lg">
                                {String(localStorage.getItem('name'))}
                            </h2>
                        </div>
                        <div>
                            <div className={`flex gap-10`}>
                                <Button
                                    type={'text'}
                                    onClick={() => {
                                        setOpen(true)
                                    }}
                                    icon={<UserAddOutlined style={{fontSize: '32px'}}/>}
                                    title={'Thêm bạn bè'}
                                    style={{color: '#fff'}}>
                                </Button>
                                <Button
                                    type={'text'}
                                    onClick={() =>{setIsDrawerAcceptOpen(true)}}
                                    icon={<UserSwitchOutlined style={{ fontSize: '32px' }}/>}
                                    title={'Lời mời kết bạn'}
                                    style={{ color: '#fff' }}>
                                </Button>
                            </div>
                            <div className={`flex gap-10 mt-4`}>
                                <Button
                                    type={'text'}
                                    onClick={() => {
                                        setIsOpenModal(true)
                                    }}
                                    icon={<FormOutlined style={{ fontSize: '32px' }}/>}
                                    title={'Cập nhật thông tin'}
                                    style={{ color: '#fff' }}>
                                </Button>
                                <Button type="text" icon={<LogoutOutlined style={{ fontSize: '32px' }}/>} title={`Đăng xuất`} style={{ color: '#fff' }} onClick={ async () => {
                                    const res = await axios.post('/auth/logout');
                                    if (res.data.success) {
                                        navigate('/login');
                                        toast.success('Đăng xuất thành công');
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="search-container">
                    <Input
                        placeholder="Nhập tên người dùng..."
                        prefix={<SearchOutlined />}
                        size="large"
                        className="search-input"
                        onChange={onChangeKeyword}
                        value={keyword}
                    />
                </div>

                <div className="conversations-list">
                    <List
                        dataSource={conversations}
                        renderItem={(conversation) => (
                            <List.Item
                                className={`conversation-item ${selectedConversation === conversation.id ? 'selected' : ''}`}
                                onClick={() => setSelectedConversation(conversation.id)}
                            >
                                <div className="conversation-content">
                                    <Badge dot={conversation.isOnline} offset={[-5, 5]}>
                                        <Avatar size={50} src={conversation.avatar} />
                                    </Badge>
                                    <div className="conversation-info">
                                        <div className="conversation-header">
                                            <Text strong className="conversation-name">{conversation.title}</Text>
                                            <Text type="secondary" className="conversation-time">
                                                {conversation.lastMessage && formatDate(conversation.lastMessage.sentAt)}
                                            </Text>
                                        </div>
                                        <div className="conversation-footer">
                                            <Text type="secondary" ellipsis className="last-message">
                                                {conversation.lastMessage && (conversation.lastMessage.content)}
                                            </Text>
                                            {conversation.unreadCount > 0 && (
                                                <Badge count={conversation.unreadCount} size="small" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </Sider>
            <Modal
                title="Cập nhật thông tin"
                open={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Tên người dùng"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                    >
                        <Input placeholder="Nhập tên mới" />
                    </Form.Item>

                    <Form.Item
                        label="Avatar"
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) return e;
                            return e?.fileList;
                        }}
                        rules={[{ required: true, message: 'Vui lòng chọn ảnh avatar' }]}
                    >
                        <Upload
                            beforeUpload={() => false}
                            listType="picture"
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Drawer
                title="Gợi ý kết bạn"
                placement={'right'}
                closable={false}
                onClose={onClose}
                open={open}
                key={'right'}
                size="large"
            >
                <FriendSuggestions type={`friend`}/>
            </Drawer>
            <Drawer
                title="Lời mời kết bạn"
                placement={'right'}
                closable={false}
                onClose={() =>setIsDrawerAcceptOpen(false)}
                open={isDrawerAcceptOpen}
                key={'right'}
                size="large"
            >
                <FriendSuggestions type={'friendRequest'}/>
            </Drawer>
        </>
    );
};

export default Sidebar;