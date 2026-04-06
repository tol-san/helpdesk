# Server - Express.js with TypeScript

A modern backend server built with Express.js and TypeScript, running on Bun.

## Features

- 🚀 Express.js 5.x API server
- 📘 Full TypeScript support with strict mode
- 🔄 CORS middleware configured
- 📝 JSON request/response handling
- 🛡️ Error handling middleware
- 🌍 Environment configuration with dotenv

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.0+

### Installation

```bash
bun install
```

### Development

Start the development server with hot reload:

```bash
bun run dev
```

The server will start at `http://localhost:3001`

### Build

Create a production build:

```bash
bun run build
```

### Production

Run the built application:

```bash
bun run start
```

## Project Structure

```
server/
├── src/
│   ├── index.ts           # Main server entry point
│   ├── routes/
│   │   └── api.ts         # API route handlers
│   └── middleware/        # Custom middleware
├── dist/                  # Compiled output
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variables template
└── README.md              # This file
```

## API Endpoints

### Health Check
```
GET /health
```

### API Routes
```
GET /api/hello              # Example GET endpoint
POST /api/data              # Example POST endpoint
GET /api/data/:id           # Example GET with parameter
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run start` - Run production build
- `bun run type-check` - Check TypeScript types

## Dependencies

- **express** - Web framework
- **cors** - CORS middleware
- **dotenv** - Environment variable management

## License

MIT
