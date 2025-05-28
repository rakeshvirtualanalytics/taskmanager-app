
import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  const addTask = (text) => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
 const reorderTasks = (startIndex, endIndex) => {
    const updatedTasks = [...tasks];
    const [moved] = updatedTasks.splice(startIndex, 1);
    updatedTasks.splice(endIndex, 0, moved);
    setTasks(updatedTasks);
  };
  const value = { tasks, addTask, deleteTask, toggleComplete, reorderTasks, setTasks };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => useContext(TaskContext);