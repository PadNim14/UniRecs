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

    console.log(userId)
    return (
        <div>
            {userResponses.length > 0 ? (
                <div>
                    <h3>Your Quiz Results</h3>
                    {userResponses.map((response, index) => (
                        <div key={index}>
                            <h4>Question {index + 1}</h4>
                            <h5>{response.question}</h5>
                            <h5>Your answer: {response.answer}</h5>
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
