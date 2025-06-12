import React, { useState, useEffect } from 'react';
import TaskList from './TaskList'; // <--- Add this import
// import axios from 'axios'; // No need for axios here unless App.js makes direct axios calls

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // It's good practice to define backend URL consistently
  // Use REACT_APP_BACKEND_URL for the health check as well for consistency
  const BACKEND_HEALTH_URL = process.env.REACT_APP_BACKEND_URL; // Use this variable

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_HEALTH_URL}`); // Use the consistent variable
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

      <hr /> {/* Optional separator */}
      <h2>Your Tasks</h2>
      <TaskList /> {/* <--- Add this line to render TaskList */}
    </div>
  );
}

export default App;