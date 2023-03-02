import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from '../../backend/firebase';

const QuizResults = ({ userResponses, userId }) => {
    const [userResponse, setUserResponse] = useState([]);
    useEffect(() => {
        const fetchUserResponses = async () => {
            const q = query(collection(database, "quizResponses"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            const userResponsesData = querySnapshot.docs.map((doc) => doc.data());
            setUserResponse(userResponsesData);
        };

        fetchUserResponses();
    }, [userId]);

    // console.log(userId)
    return (
        <div>
            {userResponses.length > 0 ? (
                <div>
                    <h4>Your Quiz Results</h4>
                    {userResponses.map((response, index) => (
                        <div key={index}>
                            <h5>{response.question}</h5>
                            <h6>Your answer: {response.answer}</h6>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h2>No quiz results to show.</h2>
                </div>
            )}
        </div>
    );
};

export default QuizResults;
