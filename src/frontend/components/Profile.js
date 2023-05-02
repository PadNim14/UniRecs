import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { collection, getDocs, where, query, setDoc, addDoc } from "firebase/firestore";
import { database } from '../../backend/firebase';
import axios from 'axios';
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
    };

    const handleRecs = async (e) => {
        console.log(user.uid);

        var isUpdated = false;
        const userCollection = collection(database, 'collegeList');
        await getDocs(userCollection).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().userId === user.uid && doc.data().isUpdated) {
                    navigate('/results', { state: { data: doc.data().colleges } });
                    isUpdated = true;
                    return;
                }
            });
        });

        if (isUpdated) {
            return;
        }

        var data = undefined;
        try {
          const response = await axios.post('/recs', { userId: user.uid }, { 
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000
          });

          data = response.data;
        }
        catch (e) {
          console.log(e.message);
        }

        isUpdated = false;
        await getDocs(userCollection).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().userId === user.uid) {
                    setDoc(doc.ref, { colleges: data }, { merge: true }).then(() => {
                        console.log("User doc updated with new college info.");
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
                    doc.data().isUpdated = true;
                    isUpdated = true;
                    return;
                }
            });
        });

        navigate('/results', { state: { data: data } });

        if (isUpdated) {
            return;
        }

        addDoc(collection(database, "collegeList"), {
            userId: user.uid,
            colleges: data,
            isUpdated: true
        });
      }
      

    const [responses, setResponses] = useState([]);
    const handleResults = async (e) => {
        try {
            const q = query(collection(database, "users"), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const responsesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setResponses(responsesData);
            navigate('/user_results');
        }
        catch (e) {
            console.log(e.message);
        }

    }


    return (
        <div className='App'>
            <center>
                <h3>Welcome, student.</h3>
                <p>
                    Email: {user && user.email}
                </p>

                <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                <br />
                <br />
                <button className='btn btn-primary' onClick={handleQuiz}>Take Quiz</button>
                <br />
                <br />
                <button className='btn btn-primary' onClick={handleResults}>Previous Responses</button>
                <br />
                <br />
                <button className='btn btn-primary' onClick={handleRecs}>Recommendations</button>
            </center>
        </div>
    )


}
export default Profile