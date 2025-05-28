import React, { useContext, useState, useMemo } from "react";
import { TaskContext } from "../context/taskContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = () => {
  const { tasks, toggleTask, deleteTask, reorderTasks } = useContext(TaskContext);
  const [filter, setFilter] = useState("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter === "Completed") return task.completed;
      if (filter === "Pending") return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    // Only allow reorder if filter is 'All'
    if (filter !== 'All') {
      alert("Reordering is only allowed in 'All' view.");
      return;
    }
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <div className="task-list">
      <div className="filters">
        <button className='btn btn-secondary' onClick={() => setFilter('All')}>All</button>
        <button className='btn btn-success' onClick={() => setFilter('Completed')}>Completed</button>
        <button className='btn btn-warning' onClick={() => setFilter('Pending')}>Pending</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index} isDragDisabled={filter !== 'All'}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ ...provided.draggableProps.style, marginBottom: "8px" }}
                    >
                      <div className="task-item">
                        <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
                        <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>Delete</button>
                      </div>
                      {/* <span
                        onClick={() => toggleTask(task.id)}
                        style={{
                          textDecoration: task.completed ? "line-through" : "none",
                          cursor: "pointer"
                        }}
                      >
                        {task.text}
                      </span>
                      <button onClick={() => deleteTask(task.id)}>❌</button> */}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default React.memo(TaskList);
