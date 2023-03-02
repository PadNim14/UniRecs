import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { collection, getDocs, where, query } from "firebase/firestore";
import { auth, database } from '../../backend/firebase';
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

  const [responses, setResponses] = useState([]);
  const handleResults = async (e) => {
    // useEffect(() => {
    //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
    //     if (user) {
    //       const q = query(
    //         collection(database, "quizResponses")
    //         // where("userId", "==", user.uid)
    //       );
    //       console.log(q);
    //       const querySnapshot = await getDocs(q);
    //       const responsesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //       setResponses(responsesData);
    //       console.log("Responses", responses)
    //     }
    //   });
    //   return unsubscribe;
    // }, []);
    try {
      const q = query(collection(database, "users"), where("userId", "==", user.uid));
      // const messageRef = getDocs(database, "quiZResponses");
      // console.log(messageRef);
      const querySnapshot = await getDocs(q);
      const responsesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(responsesData)
      setResponses(responsesData);
      // console.log(responses)
    }
    catch(e){
      console.log(e.message);
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
        <button onClick={handleQuiz}>Take Quiz</button>
        <br />
        <br />
        <button onClick={handleResults}>Previous Responses</button>
      </center>
    </div>
  )


}
export default Profile