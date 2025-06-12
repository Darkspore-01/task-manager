import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // You might not need axios directly in App.js if TaskList uses it
import TaskList from './TaskList'; // Assuming TaskList.js is in the same directory

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // It's good practice to define backend URL consistently
  // If REACT_APP_API_URL is already set in Vercel for your root endpoint, that's fine.
  // Or you can use REACT_APP_BACKEND_URL for all backend calls.
  const BACKEND_HEALTH_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the environment variable here for the health check
        const response = await fetch(`${BACKEND_HEALTH_URL}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.message);
      } catch (err) {
        setError("Error: API Error: Failed to fetch");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>React + Flask Fullstack App</h1>
      {loading && <p>Loading backend data...</p>}
      {error && <p className="error-message">{error}</p>}
      {data && <p>{data}</p>} {/* This will show "Backend is running!" */}
      <p>Learn <a href="YOUR_BACKEND_DOCS_URL_IF_ANY">ReactView Backend API</a></p>

      {/* Render the TaskList component here */}
      <hr /> {/* Optional separator */}
      <h2>Your Tasks</h2>
      <TaskList />
    </div>
  );
}

export default App;