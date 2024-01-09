// Task.js

import React ,{useState,useEffect} from 'react';
import './task.css'; // Import your CSS file here

const Task = () => {
  const [taskInputValue, setTaskInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditTask, setIsEditTask] = useState(false);

  const handleFilterClick = (filter) => {
    // Logic to handle filter click (show todos based on filter)
  };

  const showTodo = (filter) => {
    // Logic to display todos based on the filter
  
  };

  const showMenu = (selectedTask) => {
    // Logic to show menu
  };

  const updateStatus = (selectedTask) => {
    // Logic to update task status
  };

  const editTask = (taskId, textName) => {
    // Logic to edit a task
  };

  const deleteTask = (deleteId, filter) => {
    // Logic to delete a task
  };

  const handleClearAll = () => {
    // Logic to clear all tasks
  };

  const handleInputKeyPress = (e) => {
    // Logic to handle input key press
  };
  return (
    <div className="wrapper">
      <div className="task-input">
        <img src="bars-icon.svg" alt="Bars Icon" />
        <input
          type="text"
          placeholder="Add a new task"
          value={taskInputValue}
          onChange={(e) => setTaskInputValue(e.target.value)}
          onKeyUp={handleInputKeyPress}
        />
      </div>

      <div className="controls">
        <div className="filters">
          <span className="active" onClick={() => handleFilterClick('all')}>
            All
          </span>
          <span onClick={() => handleFilterClick('pending')}>Pending</span>
          <span onClick={() => handleFilterClick('completed')}>Completed</span>
        </div>
        <button className="clear-btn" onClick={handleClearAll}>
          Clear All
        </button>
      </div>
      <ul className="task-box">
        {/* Display todos here */}
      </ul>
    </div>
  );
};
export default Task;
