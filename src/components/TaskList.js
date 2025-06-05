import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/tasks", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      {tasks.map(task => <div key={task.id}>{task.title}</div>)}
    </div>
  );
}