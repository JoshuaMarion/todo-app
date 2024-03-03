import React, { useState, useEffect } from 'react';
import './Task.css'; // Import CSS file for styling

const Task = ({ task }) => {
  const { color, description, done, task_id, user_id } = task;
  const [isChecked, setIsChecked] = useState(false);
  const [taskColor, setTaskColor] = useState('green')

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  // make this based on what it gets from api
 
  useEffect(() => {
    // Define a function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT'); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const data = await response.json();
        // Assuming your API response includes a 'color' field indicating the color for the task
        //setColor(data.color);

        //PUT CODE HERE




      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // Define a variable to hold the background color based on the completed state
  //const color = isChecked ? '#0063ff' : initColor;

  /*

  4 Colors:
  green: easy tasks
  yellow: medium tasks
  red: hard tasks
  blue: completed tasks

  */

  return (
    <div className='task-container' style={{ borderColor: taskColor }}>
      <input type="checkbox" class="checkbox-round" onClick={handleClick}/>
      <div> {color} </div>
    </div>
  );
};

export default Task;


/*

    <div className="task-container" style={{ borderColor: color }}>
      <label class="container">One
          <input type="checkbox" />
          <span class="checkmark"></span>
      </label>
      <span className="text">{text}</span>
    </div>

*/