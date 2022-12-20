import './App.css';
// import { Landing } from './pages/Landing'
import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div>
      {
        currentForm == 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }

      {/* <Landing /> */}

    </div>

  );
}

export default App;
