import React, { useState, useEffect } from "react";
import axios from "axios";

// Access the environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; 

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Use the environment variable for the base URL
    axios.get(`${BACKEND_URL}/tasks`, { 
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      console.log("Tasks fetched:", res.data); // Add for debugging
      setTasks(res.data);
    })
    .catch(error => {
      console.error("Error fetching tasks:", error); // Add error handling
    });
  }, []);

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks found. Add some!</p> // Or a loading indicator
      ) : (
        tasks.map(task => (
          <div key={task.id}>{task.title}</div>
        ))
      )}
    </div>
  );
}

export default TaskList; // Make sure to export your component if not already