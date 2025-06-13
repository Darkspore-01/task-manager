import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios here if you are using it for tasks
// import './TaskList.css'; // Optional: if you have specific CSS for TaskList

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define your backend URL for tasks. It's often the same base URL.
  // Make sure this matches what you set in your Vercel environment variables.
  const BACKEND_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL;
  const TASKS_ENDPOINT = `${BACKEND_URL}/tasks`; // Assuming your tasks endpoint is /tasks

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(TASKS_ENDPOINT); // Fetch tasks from your backend
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tasksData = await response.json();
        setTasks(tasksData); // Assuming your backend returns an array of tasks
      } catch (err) {
        setError("Error: Could not fetch tasks.");
        console.error("Fetch tasks error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [TASKS_ENDPOINT]); // Depend on TASKS_ENDPOINT to satisfy ESLint

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks found. Add some!</p>;
  }

  return (
    <div>
      {/* You'll replace this with actual task rendering */}
      {/* For example, a list of tasks */}
      <ul>
        {tasks.map(task => (
          <li key={task.id}> {/* Assuming tasks have a unique 'id' property */}
            {task.title}
            {/* Add more task details and actions here */}
          </li>
        ))}
      </ul>
      {/* Add a form or button to add new tasks if you have one */}
    </div>
  );
}

export default TaskList;