import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/tasks").then(res => setTasks(res.data));
  }, []);

  const addTask = useCallback(async (text) => {
    if (!text.trim()) return;
    const res = await axios.post("http://localhost:9000/tasks", { text });
    setTasks(prev => [...prev, res.data]);
  }, []);

  const toggleTask = useCallback(async (id) => {
    await axios.put(`http://localhost:9000/tasks/${id}`);
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback(async (id) => {
    await axios.delete(`http://localhost:9000/tasks/${id}`);
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const reorderTasks = (startIndex, endIndex) => {
    const updatedTasks = [...tasks];
    const [moved] = updatedTasks.splice(startIndex, 1);
    updatedTasks.splice(endIndex, 0, moved);
    setTasks(updatedTasks);
  };
  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, reorderTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

// export const useTaskContext = () => useContext(TaskContext);