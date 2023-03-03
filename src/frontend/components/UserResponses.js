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
    console.log(userResponses[0])
    return (
        <div>
            {userResponses.length > 0 ? (
                <div>
                    <h3>Your Responses</h3>

                    {userResponses.map((response, index) => (
                        <div key={index}>
                            <div>
                                <h3>Response {index + 1}</h3>
                                {response.responseID.map((res2, idx) => (
                                    <div key={idx}>
                                        <h5>{res2.question} {res2.answer}</h5>
                                        {/* <h5>{res2.answer}</h5> */}
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
        </div>
    )
};

export default UserResponses