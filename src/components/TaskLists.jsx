import React, { useState, useMemo } from 'react';
import { useTaskContext } from '../context/TaskContexts';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = () => {
  const { tasks, reorderTasks } = useTaskContext();
  const [filter, setFilter] = useState('All');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'Completed': return tasks.filter(t => t.completed);
      case 'Pending': return tasks.filter(t => !t.completed);
      default: return tasks;
    }
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
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.map((task, index) => (
                <Draggable  key={task.id} draggableId={task.id.toString()} index={index} isDragDisabled={filter !== 'All'}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem task={task} />
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

export default TaskList;