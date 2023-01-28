import './App.css';
// import { Landing } from './pages/Landing'
import React, { useState } from 'react';
import { Login } from './frontend/components/Login';
import { Register } from './frontend/components/Register';
import Home from './frontend/components/Home';
// import {InitialQuiz}  from './components/InitialQuiz';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import { registerVersion } from 'firebase/app';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div>
      <Home />
     
      {
        currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }

      {/* <InitialQuiz /> */}
    </div>

  );
}

export default App;
