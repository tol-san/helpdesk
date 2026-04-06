import { useEffect, useState } from "react";
import "./App.css";

interface ApiResponse {
  message?: string;
  error?: string;
  timestamp?: string;
}

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3001/api/hello");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>🚀 Full-Stack Helpdesk</h1>
        <p>Express.js Server + React Client + TypeScript + Bun</p>
      </header>

      <main>
        <section className="tech-stack">
          <h2>Technology Stack</h2>
          <ul>
            <li>
              ✅ <strong>Server:</strong> Express.js 5.x with TypeScript
            </li>
            <li>
              ✅ <strong>Client:</strong> React 19 with TypeScript & Vite
            </li>
            <li>
              ✅ <strong>Runtime:</strong> Bun - Fast JavaScript runtime
            </li>
            <li>
              ✅ <strong>Package Manager:</strong> Bun (25x faster than npm)
            </li>
          </ul>
        </section>

        <section className="api-test">
          <h2>API Test</h2>
          <button onClick={fetchData} disabled={loading}>
            {loading ? "Loading..." : "Fetch Data from Server"}
          </button>

          {error && (
            <div className="error">
              <strong>Error:</strong> {error}
            </div>
          )}

          {data && (
            <div className="response">
              <h3>Response from Server:</h3>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
        </section>

        <section className="quick-start">
          <h2>Quick Start</h2>
          <div className="commands">
            <div>
              <h3>Development</h3>
              <code>bun run dev</code>
              <p>Runs both server and client in parallel</p>
            </div>
            <div>
              <h3>Server Only</h3>
              <code>bun run dev:server</code>
              <p>Starts Express server on port 3001</p>
            </div>
            <div>
              <h3>Client Only</h3>
              <code>bun run dev:client</code>
              <p>Starts Vite dev server on port 5173</p>
            </div>
            <div>
              <h3>Build</h3>
              <code>bun run build</code>
              <p>Creates production builds for both sides</p>
            </div>
          </div>
        </section>

        <section className="features">
          <h2>Features Included</h2>
          <ul>
            <li>TypeScript strict mode enabled on both server and client</li>
            <li>CORS middleware configured for cross-origin requests</li>
            <li>Hot reload development environment</li>
            <li>ESM modules (ES2020+)</li>
            <li>Path aliases (@/*) for cleaner imports</li>
            <li>Environment variable support</li>
            <li>Production-ready build configurations</li>
            <li>Error handling and logging</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>Built with ❤️ using modern web technologies</p>
      </footer>
    </div>
  );
}

export default App;
