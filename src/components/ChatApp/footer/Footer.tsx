import React from 'react';
import { Layout, Typography } from 'antd';
import '../../../../public/ChatApp.css';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer: React.FC = () => {
    return (
        <AntFooter className="site-footer">
            <Text type="secondary">
                © {new Date().getFullYear()} Chat Application. All rights reserved.
            </Text>
        </AntFooter>
    );
};

export default Footer;