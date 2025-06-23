import { Button, Card, Typography, Space } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <Card style={{ 
                width: 400, 
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                borderRadius: '16px'
            }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                        <MessageOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
                        <Title level={2}>Chat App</Title>
                        <Paragraph type="secondary">
                            Welcome to our Messenger-style chat application built with React and Ant Design
                        </Paragraph>
                    </div>
                    
                    <Button 
                        type="primary" 
                        size="large" 
                        icon={<MessageOutlined />}
                        onClick={() => navigate('/login')}
                        style={{ 
                            height: '48px', 
                            borderRadius: '24px',
                            fontSize: '16px',
                            fontWeight: '600'
                        }}
                    >
                        Start Chatting
                    </Button>
                </Space>
            </Card>
        </div>
    );
};