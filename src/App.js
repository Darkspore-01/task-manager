import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the environment variable here
        const response = await fetch(`${process.env.REACT_APP_API_URL}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.message); // Assuming your Flask app returns { message: "Backend is running!" }
      } catch (err) {
        setError("Error: API Error: Failed to fetch"); // Your current error message
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
      {data && <p>{data}</p>}
      <p>Learn <a href="#">ReactView Backend API</a></p>
    </div>
  );
}

export default App;