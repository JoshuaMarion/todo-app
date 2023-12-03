import React, { useState } from 'react';


const Login = () => {
return (
    <div>
        <p> this is login page</p>
        <form>
            <label>Username</label><br/>
            <input type="text" id="username"/><br/>
            <label>Password</label><br/>
            <input type="text" id="password"/><br/>
            <input type="submit"/>
        </form>
    </div>
    );
};

export default Login;