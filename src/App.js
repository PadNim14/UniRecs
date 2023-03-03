import './frontend/styles/App.css';
import React from 'react';
import { Login } from './frontend/components/Login';
import { Register } from './frontend/components/Register';
import Home from './frontend/components/Home';
import Navbar from './frontend/helper/Navbar';
import SampleData from './frontend/components/SampleData';
import LiberalArts from './frontend/components/LiberalArts';
import About from './frontend/components/About';
import { InitialQuiz } from './frontend/components/InitialQuiz';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './frontend/components/ProtectedRoute';
import Profile from './frontend/components/Profile';
import UserResponses from './frontend/components/UserResponses';

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
            <Route path='/sample_database' element={<SampleData />} />
            <Route path='/liberal_arts' element={<LiberalArts />} />
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
                  <center>
                    <InitialQuiz />
                  </center>
                </ProtectedRoute>
              }
            />
            <Route path='/user_results'
              element={
                <ProtectedRoute>
                  <center>
                    <UserResponses />
                  </center>
                </ProtectedRoute>
              }
            />
          </Routes>

        </Router>
      </AuthContextProvider>
    </div>

  );
}

export default App;
