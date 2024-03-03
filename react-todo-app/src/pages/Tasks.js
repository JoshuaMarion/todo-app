import React, { useEffect, useState } from 'react';
import Task from './Task';
import AddTask from '../components/AddTask';
import './Tasks.css';


const Tasks = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks?user_id=1', {
          method: 'GET', // or any other HTTP method you are using
          headers: {
            "Content-Type": "application/json", // Example Content-Type header
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*"
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const jsonData = await response.json();
        setAllTasks(jsonData);
        console.log("data here", jsonData);
      } catch (error) {
        console.log("not working:", error);
      }
    };
  
    fetchData();
  }, []);
  

  /*
  const handleTaskChange = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };
  */

  const handleAddTaskClick = () => {
    // Handle contact button click
    console.log('Add task clicked');
    setShowAddTask(true);
  };

  return (
    <div>
      
        <div className='button-div'>
            <button className={"add-task-button"} onClick={handleAddTaskClick}>
            Add a Task
            </button>
        </div>

      {showAddTask && <AddTask />}

          <div>
      {allTasks.map(ind_task => (
        <Task task={ind_task}/>
      ))}
    </div>

    </div>
  );
};

export default Tasks;