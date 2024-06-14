import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Register from './components/Register';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import User from './components/User';
import Home from './components/Home';
import Event from './components/Event';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/event' element={<Event/>}/>
        </Routes>
      </Router>

      {/* <Register /> */}
      {/* <User/> */}
    </div>
  );
}

export default App;
