import React from 'react';
import { Typography } from 'antd';
import './TypingIndicator.css';

const { Text } = Typography;

interface TypingIndicatorProps {
  isTyping: boolean;
  userName: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isTyping, userName }) => {
  if (!isTyping) return null;

  return (
    <div className="typing-indicator">
      <div className="typing-bubble">
        <div className="typing-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <Text type="secondary" className="typing-text">
          {userName} is typing...
        </Text>
      </div>
    </div>
  );
};

export default TypingIndicator; 