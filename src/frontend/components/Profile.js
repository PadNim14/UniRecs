import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
// import { useRouter } from 'react-router-dom';

function Profile() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log("Logged out successfully!");
    }
    catch (e) {
      console.log(e.message);
    }
  };

  const handleQuiz = async (e) => {
    try {
      console.log(e)
      navigate('/quiz')
    }
    catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div>
      <center>
        <h3>Welcome, student.</h3>
        <p>
          Email: {user && user.email}
        </p>
        <p>

        </p>

        <button onClick={handleLogout}>Logout</button>
        <br />
        <br />
        <button onClick={handleQuiz}>Take quiz</button>
      </center>
    </div>
  )


}
export default Profile