import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [badCredsVisible, setBadCredsVisible] = useState(false);
    const [emailUser, setEmailUser] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {

      e.preventDefault();

      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          //"Access-Control-Allow-Headers" : "Content-Type",
          //"Access-Control-Allow-Origin": "*",
          //"Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify({
          usernameoremail: emailUser,
          password: password,
        }),
      });

      const responseBody = await response.json();
      const errorMessage = responseBody.message;
      if (errorMessage !== 400)
      {
        console.log("error message not 400")
        console.log(responseBody)
      }
      else 
      {
        console.log("error message 400")
        console.log(responseBody)
      }


    }


  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login Below!</h1>
        {badCredsVisible && <p id='badcreds' >Invalid Credentials</p>}
        <form onSubmit={handleSubmit}>
          <label>Username or Email</label>
          <input
            type="text"
            id="emailusername"
            value={emailUser}
            onChange={(e) => setEmailUser(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            <button type="submit" className="submit-button">Login</button>
      </form>
        <h3>Forgot Password?</h3>
        <p>Don't have an account yet? <Link to="/register">Make one here</Link></p>
      </div>
    </div>
  );
};

export default Login;