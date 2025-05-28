import React, { useContext, useState, useMemo } from "react";
import { TaskContext } from "../context/taskContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, toggleTask, deleteTask } = useContext(TaskContext);
  const [filter, setFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(filteredTasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    // Optional: setTasks(reordered) for saving order
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
                <Draggable key={task.id} draggableId={String(task.id)} index={index} isDragDisabled={filter !== 'All'}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ ...provided.draggableProps.style, marginBottom: "8px" }}
                    >
                      <TaskItem task={task} />
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
