# Chat App - Messenger Style Interface

A modern chat application built with React, TypeScript, and Ant Design that mimics the Messenger interface.

## Features

- **Messenger-like Interface**: Clean and modern UI similar to Facebook Messenger
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Conversation List**: Sidebar with conversation history and online status
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Ant Design components
- **TypeScript**: Full type safety and better development experience

## Screenshots

The app features:
- Left sidebar with conversation list
- Main chat area with message bubbles
- Typing indicators
- Online/offline status
- Message timestamps
- Search functionality
- Call and video call buttons (UI only)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Home Page**: Click "Start Chatting" to enter the chat interface
2. **Conversation List**: Select a conversation from the left sidebar
3. **Send Messages**: Type in the input field and press Enter or click the send button
4. **Features**: 
   - Click on different conversations to switch between chats
   - Use the search bar to find conversations
   - See typing indicators when others are typing
   - View online/offline status of users

## Project Structure

```
src/
├── components/
│   ├── TypingIndicator.tsx    # Typing indicator component
│   └── TypingIndicator.css    # Styling for typing indicator
├── pages/
│   ├── ChatApp.tsx           # Main chat application
│   ├── ChatApp.css           # Chat app styling
│   └── home.tsx              # Home page
├── layouts/
│   └── layout.tsx            # Main layout component
└── App.tsx                   # Main app component with routing
```

## Technologies Used

- **React 19**: Latest version of React with new features
- **TypeScript**: Type-safe JavaScript
- **Ant Design**: UI component library
- **React Router**: Client-side routing
- **Vite**: Fast build tool and development server

## Customization

### Adding New Features

1. **Emoji Picker**: Implement emoji selection functionality
2. **File Upload**: Add file attachment capabilities
3. **Voice Messages**: Integrate voice recording
4. **Video Calls**: Connect with WebRTC for video calls
5. **Backend Integration**: Connect to a real-time backend (Socket.io, WebSocket)

### Styling

The app uses CSS modules and Ant Design's theming system. You can customize:
- Colors in `ChatApp.css`
- Component styles in individual CSS files
- Ant Design theme variables

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint for code linting and follows TypeScript best practices.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Ant Design for the beautiful UI components
- React team for the amazing framework
- Vite for the fast development experience
