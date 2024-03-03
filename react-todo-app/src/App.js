import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

// http://localhost:3000/



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/" Component={Home} />
          <Route path = "/register" Component={Register}/>
          <Route path = "/tasks" Component={Tasks}/>
        </Routes>
      </div>

    </Router>
  );
}

export default App;
