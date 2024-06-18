import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Registration from './components/Registration';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import User from './components/User';
import Home from './components/Home';
import Event from './components/Event';
import UserHome from './components/UserHome';
import ForgetPassword from './components/ForgetPassword';
import Resetpassword from './components/Resetpassword';
import Error from './components/Error'

function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/event' element={<Event/>}/>
          <Route path='/userhome' element={<UserHome/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<Resetpassword />} />
          <Route path="/*" element={<Error/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
