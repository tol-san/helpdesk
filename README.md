# Helpdesk Application

A modern, production-ready full-stack web application built with **Express.js**, **React**, **TypeScript**, and **Bun**.

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) (1.0 or higher)

### Installation

```bash
# Install dependencies for both server and client
bun install
```

### Development

```bash
# Run both server and client servers
bun run dev

# Or run them separately:
bun run dev:server   # Express server on port 3001
bun run dev:client  # React dev server on port 5173
```

### Build

```bash
# Build both packages for production
bun run build

# Build individually:
bun run build:server
bun run build:client
```

### Production

```bash
# Start the server
bun run start
```

## 📁 Project Structure

```
helpdesk/
├── server/                    # Express.js API server
│   ├── src/
│   │   ├── index.ts           # Server entry point
│   │   └── routes/
│   │       └── api.ts         # API routes
│   ├── tsconfig.json
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── client/                    # React web application
│   ├── src/
│   │   ├── main.tsx           # React entry point
│   │   ├── App.tsx            # Root component
│   │   └── components/        # Reusable components
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
│
└── package.json               # Root package.json with workspaces
```

## 🛠️ Technology Stack

### Server
- **Express.js 5.x** - Fast, unopinionated web framework
- **TypeScript** - Static typing for safer code
- **Bun** - JavaScript runtime with built-in package manager
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Client
- **React 19** - Modern UI library
- **TypeScript** - Static typing for React components
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client (ready to import)
- **CSS3** - Modern styling capabilities

### Common
- **Bun** - Package manager and runtime (25x faster than npm)
- **TypeScript 5.3+** - Latest version with strict mode

## 🎯 Features

✅ **Type-Safe Development**: Full TypeScript support with strict mode on both sides
✅ **Hot Reload**: Automatic browser refresh and server restart during development
✅ **Modern JavaScript**: ES2020+ modules and syntax
✅ **API Integration**: Pre-configured CORS and fetch/axios ready
✅ **Environment Configuration**: .env support for configuration management
✅ **Production Ready**: Optimized builds for deployment
✅ **Path Aliases**: Clean imports using @/* path aliasing
✅ **Error Handling**: Comprehensive error handling on both sides

## 🔗 API Integration

The client automatically communicates with the server at `http://localhost:3001`.

### Example Server Endpoint

```typescript
// server/src/routes/api.ts
router.get("/data", (req: Request, res: Response) => {
  res.json({ message: "Hello from server" });
});
```

### Example Client Call

```typescript
// client/src/App.tsx
const response = await fetch('http://localhost:3001/api/data')
const data = await response.json()
```

## 📝 Scripts

### Root Level

```bash
bun run dev              # Start both servers (recommended)
bun run dev:server      # Start server only
bun run dev:client      # Start client only
bun run build            # Build both packages
bun run build:server     # Build server only
bun run build:client     # Build client only
bun run type-check       # Run TypeScript checks
```

### Server Scripts

Navigate to `server/` or use `bun run --cwd ./server`:

```bash
bun run dev              # Start with hot reload
bun run build            # Build for production
bun run start            # Run production build
bun run type-check       # Type check
```

### Client Scripts

Navigate to `client/` or use `bun run --cwd ./client`:

```bash
bun run dev              # Start dev server
bun run build            # Build for production
bun run preview          # Preview production build
bun run type-check       # Type check
```

## ⚙️ Configuration

### Environment Variables

#### Server (.env)

```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

See [server/.env.example](server/.env.example) for all options.

#### Client

Vite environment variables use the `VITE_` prefix:

```env
VITE_API_URL=http://localhost:3001
```

Access in code: `import.meta.env.VITE_API_URL`

## 🌍 Deployment

### Server Deployment

1. Build: `bun run build:server`
2. Set environment variables in production
3. Run: `bun run start` or `bun ./dist/index.js`

### Client Deployment

1. Build: `bun run build:client`
2. Serve the `dist` directory with a web server (nginx, Vercel, Netlify, etc.)

## 🧠 Why Bun?

- **⚡ 4x faster** than Node.js in many scenarios
- **📦 Integrated package manager** - no need for npm/yarn
- **🔥 Native TypeScript support** - no transpilation needed
- **🎯 Drop-in Node.js replacement** - compatible with existing packages
- **📝 Single tool** - runtime + package manager + bundler + test runner

## 📚 Additional Resources

- [Server README](./server/README.md) - Server-specific documentation
- [Client README](./client/README.md) - Client-specific documentation
- [Bun Documentation](https://bun.sh/docs)
- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide/)

## 📄 License

MIT License - feel free to use this template for any project.

---

**Happy coding!** 🎉
