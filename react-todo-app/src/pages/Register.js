import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const uuid = require('uuid');
  const generateUserId = () => { return uuid.v4(); };
  const [badCredsVisible, setBadCredsVisible] = useState(false);
  const [badEmailVisible, setBadEmailVisible] = useState(false);
  const [badUsernameVisible, setBadUsernameVisible] = useState(false);


  async function handleSubmit(e) {
    setBadCredsVisible(false);
    setBadUsernameVisible(false);
    setBadEmailVisible(false);
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
    if (password.length < 1) { alert('Password must be at least 8 cracters in length'); return; }
    
    // email
    if (!email.includes('@') || !email.includes('.com')) { alert('Please enter a valid email address'); return; }

    // username
    if (username.length > 20) { alert('Username cannot exceed 20 characters in length'); return; }

    if (username.length < 1) { alert('Username must be at least 8 characters in length'); return; }

    var testRegex = new RegExp("^([a-zA-Z0-9]{5,})$");
    if (!testRegex.test(username)) { alert('Username can only be letters and numbers'); return; }
  
    

    // Generate user Id, hash+salt password, then store in DB
    //todo: need to make sure can't store same email/username
    // watch video on promises
    // then implement in here
    const userUUID = generateUserId();

      
        const response = await fetch('http://localhost:5000/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //"Access-Control-Allow-Headers" : "Content-Type",
            //"Access-Control-Allow-Origin": "*",
            //"Access-Control-Allow-Methods": "OPTIONS,POST,GET"
          },
          body: JSON.stringify({
            username: username,
            userId: userUUID,
            email: email,
            password: password,
          }),
        });

        const responseBody = await response.json();
        const errorMessage = responseBody.message;
        if (response.status === 409 && errorMessage === "Email already in use") {
          console.error('Email is already in use. Try logging in');
          setBadEmailVisible(true);
          console.log(response)
          // You might want to redirect or perform other actions upon successful registration
        } else if (response.status === 409 && errorMessage === "Username already taken") {
          console.error('That username is already taken. Try a different one');
          setBadUsernameVisible(true);
          console.log(response)
          // You might want to redirect or perform other actions upon successful registration
        } else if (response.status === 400) {
          console.error('Registration failed. Please try again');
          // You might want to redirect or perform other actions upon successful registration
        } else {
          console.log('Registration successful!');
          // Handle the error, display an error message, or perform other actions
        }
      

  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register for EasyGo!</h1>
        <h2>Create your free account below</h2>
        {badCredsVisible && <p id='badcreds' >Invalid Credentials</p>}
        {badEmailVisible && <p id='bademail' >The email is already in use. Try logging in</p>}
        {badUsernameVisible && <p id='badusername' >This username is already taken. Try another one</p>}
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
