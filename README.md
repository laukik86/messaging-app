
A real-time messaging application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring AI chat simulation and a clean, responsive UI designed with TailwindCSS.

📌 Features

Uploading Vite + React and 3 more pages - Person 1 - Microsoft​ Edge 2025-03-23 22-37-24.mp4…



### UI/UX
- Clean, responsive design with dark mode support

- Dashboard with contact list showing:
  - Online/offline status indicators
  - Unread message counters
- Feature-rich chat window with:
  - Message timestamps
  - Smooth scrolling
  - Visual distinction between sent and received messages

 Real-Time Messaging
- Live chat functionality using Socket.io
- Typing indicators
- Read receipts
- Persistent message history stored in MongoDB

 AI Chat Simulation
- Pattern-matching algorithm for AI responses
- 10+ conversational prompts creating a realistic chatbot experience
- No external API dependencies

### Additional Features
- Message search functionality
- Unread message indicators
- Real-time online status updates
- Comprehensive error handling
- Group chat support
- File sharing capabilities
- Emoji reactions
- Browser notifications

 🛠️ Tech Stack

 Frontend
- React.js
- TailwindCSS for styling
- Context API for state management

 Backend
- Node.js
- Express.js
- JWT for authentication

 Database
- MongoDB
- Mongoose ODM

 Real-Time Communication
- Socket.io

 🚀 Getting Started

 Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- MongoDB (local or Atlas URI)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/modern-messaging-dashboard.git
cd modern-messaging-dashboard
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Create .env files

For the server (in the server directory):
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

For the client (in the client directory):
```
REACT_APP_API_URL=http://localhost:5000
```

5. Start the development servers

In the server directory:
```bash
npm run dev
```

In the client directory:
```bash
npm start
```

6. Open your browser and navigate to http://localhost:3000

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user info

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get a specific contact
- `POST /api/contacts` - Add a new contact

### Messages
- `GET /api/messages/:contactId` - Get messages with a specific contact
- `POST /api/messages` - Send a new message

## 🔌 Socket Events

### Client Events
- `connection` - Client connects to the server
- `join` - Client joins a chat room
- `message` - Client sends a message
- `typing` - Client is typing
- `read` - Client has read messages

### Server Events
- `users` - Server sends online users list
- `message` - Server sends a new message
- `typing` - Server notifies that a user is typing
- `read` - Server confirms messages were read

## 🧠 AI Simulation Logic

The AI chatbot uses a simple pattern-matching algorithm to respond to user messages:

- Regular expressions match user input patterns
- Responses are selected from predefined options
- Basic context awareness for natural conversation flow

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Socket.io Documentation](https://socket.io/docs/v4)
