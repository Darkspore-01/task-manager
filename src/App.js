import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual Render backend URL
  const API_URL = "https://flask-backend.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.text();
        setBackendMessage(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
