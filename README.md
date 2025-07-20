# 🤖 ChitChat - AI-Powered Real-time Chat Application

![ChitChat Demo](/frontend/public/screenshot-for-readme.png)

A modern, full-stack real-time chat application with integrated AI chatbot capabilities. Chat with friends and AI assistants powered by multiple Large Language Models (LLMs) in one seamless platform.

## ✨ Features

### 💬 Real-time Chat
- **User-to-User Messaging** - Send messages, images, and emojis in real-time
- **Socket.io Integration** - Instant message delivery and online status
- **Message History** - Persistent conversation storage with MongoDB
- **Media Uploads** - Image sharing via Cloudinary integration

### 🤖 AI Chatbot Integration
- **Multi-LLM Support** - Gemini, GPT-4o, Mistral, DeepSeek
- **Personal AI Assistants** - Create custom chatbots with your own API keys
- **Default System Bot** - Pre-configured Gemini assistant available to all users
- **Conversation Context** - AI maintains context across conversation history
- **Secure API Key Storage** - AES-256-GCM encryption for user credentials

### 🔐 Security & Authentication
- **JWT Authentication** - Secure user sessions with HTTP-only cookies
- **Password Encryption** - bcrypt hashing for user passwords
- **API Key Encryption** - Military-grade encryption for LLM API keys
- **Input Validation** - Comprehensive data sanitization and validation
- **CORS Protection** - Configured cross-origin resource sharing

### 🎨 Modern UI/UX
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Themes** - Multiple theme options with DaisyUI
- **Real-time Indicators** - Online status and typing indicators
- **Smooth Animations** - Polished user experience with micro-interactions
- **Accessibility** - WCAG compliant design patterns

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - Server and API framework
- **MongoDB** + **Mongoose** - Database and ODM
- **Socket.io** - Real-time bidirectional communication
- **JWT** - Authentication and authorization
- **Cloudinary** - Media storage and processing
- **Crypto** - AES-256-GCM encryption for sensitive data

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library

### AI Integration
- **Google Gemini** - Advanced conversational AI
- **OpenAI GPT-4o** - Powerful language understanding
- **Mistral AI** - Efficient and capable language model
- **DeepSeek** - Specialized AI model support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB database (local or Atlas)
- API keys for desired LLM providers (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/PTCuong-1102/ChitChat_Realtime_Chat.git
cd ChitChat_Realtime_Chat
```

2. **Install dependencies**
```bash
# Install all dependencies (root, backend, frontend)
npm install

# Or install individually
npm install --prefix backend
npm install --prefix frontend
```

3. **Environment Setup**

Create `backend/.env` file:
```env
# Database
MONGODB_URI=mongodb+srv://your-connection-string
PORT=5002

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# AI Chatbot Configuration
ENCRYPTION_SECRET_KEY=your-64-character-hex-encryption-key
DEFAULT_GEMINI_API_KEY=your-gemini-api-key-for-default-bot

# Environment
NODE_ENV=development
```

4. **Generate Encryption Key**
```bash
# Generate a secure encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Development

1. **Start Backend Server**
```bash
cd backend
npm run dev
```

2. **Start Frontend Development Server**
```bash
cd frontend
npm run dev
```

3. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5002

### Production Build

```bash
# Build frontend for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
ChitChat/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── lib/             # Utilities and configs
│   │   └── services/        # External service integrations
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route components
│   │   ├── store/           # Zustand state management
│   │   ├── lib/             # Utilities and configs
│   │   └── constants/       # App constants
│   └── package.json
└── package.json
```

## 🤖 AI Chatbot Usage

### Default Chatbot
- Available to all users immediately after registration
- Powered by Gemini API with developer-provided credentials
- Access via the "Chatbots" tab in the sidebar

### Personal Chatbots
1. Navigate to `/chatbots` page
2. Click "Add Chatbot"
3. Provide:
   - **Name** - Custom name for your AI assistant
   - **Model** - Choose from supported LLM providers
   - **API Key** - Your personal API key (encrypted and stored securely)
4. Start chatting with your personalized AI assistant

### Supported Models
- **Gemini 2.0 Flash** - Google's latest conversational AI
- **GPT-4o** - OpenAI's advanced language model
- **Mistral Large** - Efficient European AI model
- **DeepSeek Chat** - Specialized reasoning model

## 🔒 Security Features

- **API Key Encryption** - AES-256-GCM encryption for all user API keys
- **Secure Authentication** - JWT tokens with HTTP-only cookies
- **Input Validation** - Comprehensive sanitization of all user inputs
- **Environment Isolation** - Secure environment variable management
- **CORS Protection** - Configured for production security

## 🌐 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-db-url
JWT_SECRET=your-production-jwt-secret
# ... other production configs
```

### Deployment Platforms
- **Vercel** - Automatic deployments with GitHub integration
- **Heroku** - Container-based deployment
- **Railway** - Modern deployment platform
- **DigitalOcean** - VPS deployment with Docker

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Socket.io community for real-time communication
- The React team for the amazing framework
- Tailwind CSS and DaisyUI for beautiful styling
- All LLM providers for making AI accessible
- Open source community for inspiration and tools

## 📞 Support

For support, email your-email@example.com or create an issue in this repository.

---

**Built with ❤️ by [PTCuong-1102](https://github.com/PTCuong-1102)**

*ChitChat - Where conversations meet artificial intelligence*