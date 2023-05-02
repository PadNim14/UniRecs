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
            const q = query(collection(database, "quizResponses"), where("userId", "==", user.uid));
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
    const handleQuiz = async (e) => {
        try {
            console.log(e)
            navigate('/quiz')
        }
        catch (e) {
            console.log(e.message)
        }
    }

    console.log(userResponses);
    return (
        <div className="App">
        
            {userResponses.length > 0 ? (
                <div>
                    <h3>Your Responses</h3>
                    <button className="btn btn-primary" onClick={goToProfilePage}>Go back to profile</button>

                    {userResponses.map((response, index) => (
                        <div key={index}>
                            <div>
                                <h4>Quiz Response {index + 1}</h4>
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
                    <button className="btn btn-primary" onClick={goToProfilePage}>Go back to profile</button>

                </div>
            ) : (
                <div>
                    <center>
                        <h2>You have not taken any quizzes yet!</h2>
                        <button className="btn btn-primary" onClick={goToProfilePage}>Go back to profile</button>
                        <button className="btn btn-primary" onClick={handleQuiz}>Take Quiz</button>

                    </center>
                </div>
            )}
            <br />
        </div>
    )
};

export default UserResponses