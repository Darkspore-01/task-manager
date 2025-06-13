import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList'; // <--- IMPORTANT: Ensure this path is correct based on your file structure
import './App.css'; // Assuming App.css is in the same directory as App.js

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_HEALTH_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- CRITICAL CHANGE HERE ---
        // Your backend health endpoint is likely /health, not just the base URL
        const response = await fetch(`${BACKEND_HEALTH_URL}/health`);
        // --- END CRITICAL CHANGE ---

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.message);
      } catch (err) {
        setError("Error: API Error: Failed to fetch backend health"); // More specific error message
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [BACKEND_HEALTH_URL]);

  return (
    <div className="App">
      <h1>React + Flask Fullstack App</h1>
      {loading && <p>Loading backend data...</p>}
      {error && <p className="error-message">{error}</p>}
      {data && <p>{data}</p>} {/* This will show "Backend is running!" */}
      <p>Learn <a href="YOUR_BACKEND_DOCS_URL_IF_ANY">ReactView Backend API</a></p>

      <hr /> {/* Optional separator */}
      <h2>Your Tasks</h2>
      <TaskList /> {/* This will render your TaskList component */}
    </div>
  );
}

export default App;