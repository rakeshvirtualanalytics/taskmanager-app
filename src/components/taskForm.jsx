import React, { useState, useContext } from "react";
import { TaskContext } from "../context/taskContext";

const TaskForm = () => {
  const [text, setText] = useState("");
  const { addTask } = useContext(TaskContext);

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new task"
        required
        className='form-control'
      />
      <button type="submit" disabled={!text.trim()} className='btn btn-primary'>Add</button>
    </form>
  );
};

export default React.memo(TaskForm);
