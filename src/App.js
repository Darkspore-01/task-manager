import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual Render backend URL
  const API_URL = "https://flask-backend.onrender.com";

useEffect(() => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL, {
        signal: controller.signal,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'API request failed');
      }

      const data = await response.json();
      setBackendMessage(data.message);
    } catch (err) {
      setError(err.name === 'AbortError' 
        ? 'Connection timeout - Backend might be waking up'
        : `API Error: ${err.message}`);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  fetchData();
  return () => controller.abort();
}, []);curl -X OPTIONS https://flask-backend.onrender.com \

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Flask Fullstack App</h1>
        
        {loading ? (
          <p>Loading backend data...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : (
          <>
            <p>Backend says: <strong>{backendMessage}</strong></p>
            <p>Edit <code>src/App.js</code> to customize this frontend.</p>
          </>
        )}

        <div className="App-links">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a
            className="App-link"
            href={API_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Backend API
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
