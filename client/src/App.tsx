import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  timestamp: string;
};

export default function App() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL ?? "http://localhost:3001"}/api/health`,
    )
      .then((response) => response.json())
      .then((data: HealthResponse) => setStatus(data.status))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main>
      <h1>Helpdesk</h1>
      <p>Server status: {status}</p>
    </main>
  );
}
