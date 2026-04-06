import { useState, useEffect } from "react";

/**
 * Example reusable component
 * Fetches and displays data from an API endpoint
 */
interface DataProps {
  endpoint: string;
  title?: string;
}

export function DataFetcher({ endpoint, title = "Data" }: DataProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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
  }, [endpoint]);

  return (
    <div className="data-fetcher">
      <h3>{title}</h3>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={fetchData}>Refresh</button>
        </>
      )}
    </div>
  );
}

/**
 * Example form component
 * Submits data to server API
 */
interface FormData {
  name: string;
  email: string;
}

export function DataForm({
  onSubmit,
}: {
  onSubmit?: (data: FormData) => void;
}) {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:3001/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setMessage(`Success! ID: ${result.id}`);
      setFormData({ name: "", email: "" });
      onSubmit?.(formData);
    } catch (err) {
      setMessage(
        `Error: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="data-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}

/**
 * Example hook for API calls
 */
export function useApi<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch(`http://localhost:3001${endpoint}`);
        if (!response.ok) throw new Error("API request failed");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}
