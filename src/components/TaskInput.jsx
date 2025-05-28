import React, { useState, useCallback } from 'react';
import { useTaskContext } from '../context/TaskContexts';

const TaskInput = () => {
  const [text, setText] = useState('');
  const { addTask } = useTaskContext();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text);
      setText('');
    }
  }, [text, addTask]);

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add task..." className='form-control'/>
      <button type="submit" disabled={!text.trim()} className='btn btn-primary'>Add</button>
    </form>
  );
};

export default React.memo(TaskInput);