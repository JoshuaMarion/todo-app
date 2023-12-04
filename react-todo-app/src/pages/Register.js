import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Import the CSS file for styling

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const uuid = require('uuid');
  const generateUserId = () => { return uuid.v4(); };

  async function handleSubmit(e) {
    e.preventDefault();

    // Username
    // Must be only numbers and letters
    // between length 4 and 20

    // Email
    // must have an @
    // maybe check for .com after

    //Password
    // must match
    // between length 8 and 20

    //check passwords first, then email, then username
    if (password !== passwordAgain) { alert('Passwords do not match'); return; }
    if (password.length > 20) { alert('Password cannot exceed 20 characters in length'); return; }
    if (password.length < 8) { alert('Password must be at least 8 cracters in length'); return; }
    
    // email
    if (!email.includes('@') || !email.includes('.com')) { alert('Please enter a valid email address'); return; }

    // username
    if (username.length > 20) { alert('Username cannot exceed 20 characters in length'); return; }

    if (username.length < 8) { alert('Username must be at least 8 characters in length'); return; }

    var testRegex = new RegExp("^([a-z0-9]{5,})$");
    if (!testRegex.test(username)) { alert('Username can only be letters and numbers'); return; }
  
    
    const userUUID = generateUserId();
    // If validations pass, send a POST API call
    try {
        const response = await fetch('http://localhost:5000/users/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            userId: userUUID,
            email: email,
            password: password,
          }),
        });
  
        if (response.ok) {
          console.log('Registration successful!');
          // You might want to redirect or perform other actions upon successful registration
        } else {
          console.error('Registration failed');
          // Handle the error, display an error message, or perform other actions
        }
      } catch (error) {
        console.error('Error occurred during registration:', error.message);
      }

    // All validations passed client side, time to send to interact with backend
    console.log('Form submitted successfully');
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            id="password-again"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />

            <button type="submit" className="submit-button">Register</button>
      </form>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default Register;
