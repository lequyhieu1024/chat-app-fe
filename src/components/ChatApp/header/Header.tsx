import React from 'react';
import { Layout, Typography, Space, Button } from 'antd';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import '../../../../public/ChatApp.css';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
    return (
        <AntHeader className="site-header">
            <div className="header-content" style={{ display: 'flex' }}>
                <Title level={3} style={{ color: '#fff' }}>
                    Chat Application
                </Title>
                <Space>
                    <Button type="text" icon={<UserOutlined />} style={{ color: '#fff' }}>
                        Profile
                    </Button>
                    <Button type="text" icon={<SettingOutlined />} style={{ color: '#fff' }}>
                        Settings
                    </Button>
                </Space>
            </div>
        </AntHeader>
    );
};

export default Header;