import React from 'react';
import { useTaskContext } from '../context/TaskContexts';

const TaskItem = ({ task }) => {
  const { deleteTask, toggleComplete } = useTaskContext();

  return (
    <div className="task-item">
      <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
      <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default React.memo(TaskItem);