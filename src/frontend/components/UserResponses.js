import { React, useEffect, useState } from "react"
import { database } from "../../backend/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { UserAuth } from '../../context/AuthContext';


const UserResponses = () => {
    const [userResponses, setUserResponses] = useState([]);
    const { user, auth } = UserAuth();
    useEffect(() => {
        const fetchUserResponses = async () => {
            const q = query(collection(database, "users"), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const userResponsesData = querySnapshot.docs.map((doc) => doc.data());
            setUserResponses(userResponsesData);
            // console.log(userResponses)
        };
        fetchUserResponses();
    }, [user]);
    
    const navigate = useNavigate();
    const goToProfilePage = async (e) => {
        try {
            console.log(e);
            navigate('/profile');
        }
        catch {
            console.log(e.message);
        }
    }

    return (
        <div className="App">

            {userResponses.length > 0 ? (
                <div>
                    <h3>Your Responses</h3>
                    <button onClick={goToProfilePage}>Go back to profile</button>

                    {userResponses.map((response, index) => (
                        <div key={index}>
                            <div>
                                <h4>Response {index + 1}</h4>
                                {response.responseID.map((res2, idx) => (
                                    <div key={idx}>
                                        <center>
                                            <h5>{idx + 1}. {res2.question}</h5>
                                            <h6>{res2.answer}</h6>
                                        </center>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <div>
                    <h2>You have not taken any quizzes yet!</h2>
                </div>
            )}
            <br />
        </div>
    )
};

export default UserResponses