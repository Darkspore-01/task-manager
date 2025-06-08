import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- CRITICAL CHANGE 1: Use the environment variable ---
  // Vercel injects REACT_APP_BACKEND_URL during build.
  // Locally, you'd use a .env file or a proxy for localhost:5000.
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const controller = new AbortController();
    // Using a timeout is good, but ensure it's cleared in all paths
    const timeoutId = setTimeout(() => {
        controller.abort();
        // Only set error if loading is still true, meaning it actually timed out
        if (loading) {
            setError('Connection timeout - Backend might be waking up (Render free tier) or is not running.');
            setLoading(false);
        }
    }, 10000); // Increased timeout to 10 seconds for Render free tier wake-up

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      setBackendMessage(''); // Clear previous messages

      try {
        // --- CRITICAL CHANGE 2: Check if backend URL is defined ---
        if (!BACKEND_URL) {
            console.error("REACT_APP_BACKEND_URL is not defined in environment variables!");
            setError("Configuration error: Backend URL missing. Check Vercel environment variables.");
            return; // Exit early if no URL
        }

        // --- CRITICAL CHANGE 3: Use BACKEND_URL for the fetch request ---
        const response = await fetch(BACKEND_URL, {
          signal: controller.signal,
          // 'include' credentials is generally not needed for simple API calls like this unless you have sessions/cookies
          // credentials: 'include',
          headers: {
            'Content-Type': 'application/json', // Backend returns text, so this header might be misleading.
            'Accept': 'text/plain' // Backend returns plain text, so accept plain text.
          }
        });

        if (!response.ok) {
          // Attempt to parse as JSON, but fall back to text if it's not JSON
          const errorText = await response.text();
          let errorMessage = `API request failed: ${response.status} ${response.statusText}`;
          try {
              const errorJson = JSON.parse(errorText);
              errorMessage = errorJson.message || errorMessage;
          } catch (e) {
              // Not JSON, use plain text or default message
              errorMessage = errorText || errorMessage;
          }
          throw new Error(errorMessage);
        }

        // --- CRITICAL CHANGE 4: Backend returns plain text, not JSON ---
        const data = await response.text(); // Backend returns "Backend is running!", which is plain text
        setBackendMessage(data); // Set the text message
      } catch (err) {
        if (err.name === 'AbortError') {
          // Error already set by timeout, or simply log if aborted manually
          console.log('Fetch aborted');
        } else {
          setError(`API Error: ${err.message || 'Unknown error'}`);
          console.error('Fetch error:', err);
        }
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchData();
    // Cleanup function for useEffect (aborts fetch if component unmounts)
    return () => {
        controller.abort();
        clearTimeout(timeoutId); // Ensure timeout is cleared even on unmount
    };
  }, [BACKEND_URL]); // Dependency array: Re-run effect if BACKEND_URL changes (unlikely in prod, but good practice)

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
            {/* Display the message from backend */}
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
          {/* --- CRITICAL CHANGE 5: Link to correct Backend URL --- */}
          <a
            className="App-link"
            href={BACKEND_URL}
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