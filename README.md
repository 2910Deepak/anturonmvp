# VoiceAI - Enterprise Voice AI SaaS Platform

A modern, multi-tenant Voice AI platform for enterprises in the Middle East and India. Built with Next.js, Node.js, PostgreSQL, and integrations with Deepgram (ASR), ElevenLabs (TTS), and OpenAI (LLM).

## Features

### Core Capabilities
- **AI Voice Agents**: Customizable voice assistants for customer support, lead qualification, and sales
- **Multi-Language Support**: English, Arabic, Hindi, Urdu, Tamil, Telugu, Bengali
- **Real-time Voice**: WebSocket-based streaming conversations
- **Call Analytics**: Comprehensive dashboards with sentiment analysis and call outcomes
- **Industry Templates**: Pre-built configurations for Retail, Real Estate, E-commerce, Fintech, and Banking

### Regional Focus
- **Middle East (UAE/Dubai)**: Arabic support, regional compliance, AED billing
- **India**: Hindi and regional language support, INR billing, local integrations
- **Data Residency**: Option for regional data storage

### Enterprise Features
- Multi-tenant SaaS architecture with organization isolation
- Role-based access control (Super Admin, Admin, Agent, Viewer)
- Webhook support for CRM integrations
- Call recording and transcription
- RESTful API and tRPC for type-safe communication

## Architecture

```
voice-ai-saas/
├── apps/
│   ├── web/                 # Next.js 14 frontend
│   └── api/                 # Node.js + Express + tRPC backend
├── packages/
│   ├── shared/              # Shared types and constants
│   └── database/            # Prisma schema and client
├── infra/
│   ├── docker/              # Docker configurations
│   └── k8s/                 # Kubernetes manifests
└── docs/                    # Documentation
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express, tRPC, TypeScript |
| Database | PostgreSQL, Prisma ORM, Redis |
| Voice AI | Deepgram (ASR), ElevenLabs (TTS), OpenAI/Anthropic (LLM) |
| Real-time | WebSocket, Socket.io |
| Telephony | Twilio (Global), Exotel (India) |

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- pnpm 9+

### Installation

1. **Clone and install dependencies:**
```bash
# Install pnpm if not already installed
npm install -g pnpm

# Navigate to project
cd voice-ai-saas

# Install dependencies
pnpm install
```

2. **Set up environment variables:**
```bash
# API
 cp apps/api/.env.example apps/api/.env

# Database
 cp packages/database/.env.example packages/database/.env
```

Edit the `.env` files with your actual configuration values.

3. **Set up the database:**
```bash
# Generate Prisma client
 pnpm db:generate

# Push schema to database
 pnpm db:push

# (Optional) Run Prisma Studio to view data
 pnpm db:studio
```

4. **Start development servers:**
```bash
# Start all apps in development mode
 pnpm dev

# Or start individually:
# Frontend only
 pnpm --filter @voice-ai/web dev

# API only
 pnpm --filter @voice-ai/api dev
```

The application will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:3001
- API Health: http://localhost:3001/health

## Project Structure

### Frontend (apps/web)
- `app/` - Next.js 14 app router
- `components/ui/` - shadcn/ui components
- `lib/` - Utilities and helpers
- Public landing page + authenticated dashboard

### Backend (apps/api)
- `trpc/` - tRPC setup and procedures
- `routers/` - API route handlers
- `services/` - Business logic and integrations
- `middleware/` - Express middleware

### Database (packages/database)
- `prisma/schema.prisma` - Database schema
- Multi-tenant design with organization-scoped queries

### Shared (packages/shared)
- `types/` - TypeScript types and Zod schemas
- `constants/` - Industry templates, languages, regions

## API Endpoints

The API uses tRPC for type-safe procedures. Key routers:

| Router | Description |
|--------|-------------|
| `auth` | Registration, login, user management |
| `agents` | Voice agent CRUD operations |
| `calls` | Call management and analytics |
| `analytics` | Dashboard data and reports |
| `organization` | Org settings and user management |
| `webhooks` | Webhook configuration |

## Voice AI Integration

### Supported Providers

**Speech-to-Text (ASR):**
- Deepgram (recommended) - supports all regional languages

**Text-to-Speech (TTS):**
- ElevenLabs - high-quality voices for all supported languages

**LLM/Conversational AI:**
- OpenAI GPT-4
- Anthropic Claude (planned)

### Regional Telephony

| Region | Provider | Notes |
|--------|----------|-------|
| UAE/Dubai | Twilio | Global coverage |
| India | Exotel | Local numbers, regulatory compliance |
| Saudi Arabia | Twilio | With local partner |

## Industry Templates

Pre-configured voice agents for:

1. **Retail**: Order tracking, returns, loyalty program support
2. **Real Estate**: Lead qualification, property inquiries, appointment booking
3. **E-commerce/Quick Commerce**: Delivery tracking, order support, promotions
4. **Fintech**: Account services, KYC, fraud alerts (security-compliant)
5. **Banking**: Account inquiries, card services, branch information

## Deployment

### Docker
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Environment Variables

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `DEEPGRAM_API_KEY` - For speech recognition
- `ELEVENLABS_API_KEY` - For text-to-speech

**Optional:**
- `OPENAI_API_KEY` - For LLM responses
- `TWILIO_*` - For telephony
- `REDIS_URL` - For caching and sessions

## Pricing Plans

| Plan | Minutes/Month | Agents | Users | Price (USD) |
|------|---------------|--------|-------|-------------|
| Free | 100 | 1 | 2 | $0 |
| Starter | 1,000 | 3 | 5 | $49 |
| Growth | 5,000 | 10 | 20 | $199 |
| Enterprise | Unlimited | Unlimited | Unlimited | Custom |

Regional pricing available in AED (UAE) and INR (India).

## Security & Compliance

- SOC 2 Type II compliant infrastructure
- End-to-end encryption for calls
- GDPR and regional data protection compliance
- Optional on-premise deployment for Enterprise
- Audit logs for all operations

## Roadmap

### Phase 1 (MVP)
- [x] Multi-tenant architecture
- [x] Basic voice agent creation
- [x] Call tracking and analytics
- [x] Industry templates

### Phase 2
- [ ] Real-time voice streaming
- [ ] CRM integrations (Salesforce, HubSpot, Zoho)
- [ ] Advanced analytics with AI insights
- [ ] Mobile app for agents

### Phase 3
- [ ] WhatsApp Business integration
- [ ] Custom voice training
- [ ] Predictive calling
- [ ] Multi-region deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

- **Documentation**: https://docs.voiceai.example.com
- **Email**: support@voiceai.example.com
- **UAE Office**: Dubai Internet City
- **India Office**: Bangalore, Karnataka

## License

MIT License - See [LICENSE](LICENSE) for details

---

Built with ❤️ for Middle East and India 🌍
