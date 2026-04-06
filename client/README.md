# Client - React with TypeScript and Vite

A modern React frontend with TypeScript, Vite build tool, and Bun runtime.

## Features

- ⚛️ React 19 with TypeScript
- ⚡ Vite for fast development and builds
- 📘 Full TypeScript support with strict mode
- 🔄 Hot Module Replacement (HMR)
- 🎨 Modern CSS styling
- 🌐 Axios for HTTP requests
- 🛣️ Path aliases for clean imports (@/*)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.0+

### Installation

```bash
bun install
```

### Development

Start the development server:

```bash
bun run dev
```

The application will open automatically at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
bun run build
```

Built files will be in the `dist` directory.

### Preview

Preview the production build locally:

```bash
bun run preview
```

## Project Structure

```
client/
├── src/
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Main component
│   ├── App.css            # Styling
│   ├── index.css          # Global styles
│   └── components/        # Reusable components
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## API Integration

The client is configured to communicate with the server at `http://localhost:3001`.

Example API call:
```typescript
const response = await fetch('http://localhost:3001/api/hello')
const data = await response.json()
```

## Scripts

- `bun run dev` - Start development server with HMR
- `bun run build` - Create production build
- `bun run preview` - Preview production build
- `bun run type-check` - Check TypeScript types

## Dependencies

- **react** - UI library
- **react-dom** - React DOM rendering
- **axios** - HTTP client

## Dev Dependencies

- **vite** - Build tool and dev server
- **@vitejs/plugin-react** - React plugin for Vite
- **typescript** - TypeScript compiler
- **@types/react** - React type definitions
- **@types/react-dom** - React DOM type definitions

## License

MIT
