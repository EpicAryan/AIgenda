# Aigenda

A modern, AI-powered meeting management platform built with Next.js, featuring intelligent agents, video calling capabilities, and automated meeting transcription.

## 🚀 Features

- **AI-Powered Agents**: Create and manage intelligent AI agents for automated meeting assistance
- **Video Calling**: Integrated video calling with real-time communication via Stream Video SDK
- **Meeting Management**: Schedule, track, and manage meetings with automatic status updates
- **Automated Transcription**: AI-powered meeting transcription and summarization
- **Authentication**: Secure user authentication with Better Auth
- **Real-time Updates**: Live data updates with React Query and tRPC
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Database**: PostgreSQL database with Drizzle ORM for efficient data management

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components for accessibility
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

### Backend & API
- **tRPC** - End-to-end typesafe APIs
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **Better Auth** - Authentication library
- **React Query** - Server state management
- **Zod** - Schema validation

### Database & Infrastructure
- **PostgreSQL** - Primary database
- **Vercel** - Deployment platform
- **ngrok** - Webhook testing (development)

### AI & Real-time
- **Stream Video SDK** - Video calling and real-time communication
- **OpenAI Real-time API** - AI-powered features
- **DiceBear** - Avatar generation

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun
- PostgreSQL database

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aigenda.git
   cd aigenda
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your-postgresql-connection-string"

   # Authentication
   BETTER_AUTH_SECRET="your-auth-secret"
   BETTER_AUTH_URL="http://localhost:3000"

   # Stream Video
   STREAM_API_KEY="your-stream-api-key"
   STREAM_API_SECRET="your-stream-api-secret"

   # OpenAI (for transcription/summary)
   OPENAI_API_KEY="your-openai-api-key"

   # Ngrok (for webhook development)
   NGROK_AUTH_TOKEN="your-ngrok-auth-token"
   ```

4. **Set up the database**
   ```bash
   # Push schema changes to database
   npm run db:push

   # Open database studio
   npm run db:studio
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── agents/            # Agent-related components
│   ├── meetings/          # Meeting management components
│   ├── ui/                # Reusable UI components
│   ├── videocall/         # Video calling components
│   └── ...
├── db/                   # Database schema and connection
├── lib/                  # Utility libraries
├── trpc/                 # tRPC setup and routers
└── hooks/                # Custom React hooks
```

## 📖 Usage

### Creating an Agent
1. Navigate to the Agents section in the dashboard
2. Click "Create Agent" and provide a name and instructions
3. Your agent will be ready to assist in meetings

### Scheduling a Meeting
1. Go to the Meetings section
2. Click "Schedule Meeting"
3. Select your AI agent and set the meeting details
4. Start the meeting - your agent will join automatically

### Video Calling
- Meetings automatically enable video calling when started
- Use the provided interface to control the call
- Recordings and transcriptions are available after completion

## 🔧 Development

### Database Operations
```bash
# Push schema changes
npm run db:push

# Open database studio
npm run db:studio
```

### Webhook Development
```bash
# Start ngrok for webhook testing
npm run dev:webhook
```

### Code Quality
```bash
# Run linting
npm run lint

# Build the project
npm run build

# Start production server
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Stream](https://getstream.io/) for the video calling SDK
- [Drizzle](https://orm.drizzle.team/) for the excellent ORM
- [Radix UI](https://www.radix-ui.com/) for the accessible components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on [GitHub](https://github.com/your-username/aigenda/issues)
- Check the [documentation](https://docs.aigenda.com) (if available)

---

Built with ❤️ using Next.js and modern web technologies.
