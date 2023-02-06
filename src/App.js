import './frontend/styles/App.css';
// import { Landing } from './pages/Landing'
import React, { useState } from 'react';
import { Login } from './frontend/components/Login';
import { Register } from './frontend/components/Register';
import Home from './frontend/components/Home';
import Data from './frontend/components/SampleData';
import Navbar from './frontend/helper/Navbar';
import About from './frontend/components/About';
import { InitialQuiz } from './frontend/components/InitialQuiz';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './frontend/components/ProtectedRoute';
import Profile from './frontend/components/Profile';

function App() {
  
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Navbar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/sample_database' element={<Data />} />
            <Route path='/about' element={<About />} />
            <Route path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path='/quiz'
              element={
                <ProtectedRoute>
                  <InitialQuiz />
                </ProtectedRoute>
              }
            />
          </Routes>

        </Router>
      </AuthContextProvider>

      {/* {
        currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      } */}


      {/* <InitialQuiz /> */}
    </div>

  );
}

export default App;