import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../../backend/firebase';
import { collection, addDoc } from "firebase/firestore";
import QuizResults from './InitialQuizResults';
import { getAuth } from 'firebase/auth';

export const EnvironInfo = () => {

    const questions = [
        {
            questionText: 'What size of college do you prefer? (e.g. small, medium, large)',
            answerOptions: [
                { answerText: 'Small' },
                { answerText: 'Medium' },
                { answerText: 'Large' }
            ],
        },
        {
            questionText: 'How selective do you want the college to be? (e.g. highly selective, selective, less selective)',
            answerOptions: [
                { answerText: 'Highly Selective' },
                { answerText: 'Selective' },
                { answerText: 'Less Selective' }
            ],
        },

        {
            questionText: 'Are you interested in participating in Greek life?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' }
            ]
        },
        {
            questionText: 'Do you have a preference for a college with a specific type of academic calendar (e.g. semester, quarter)?',
            answerOptions: [
                { answerText: 'Yes, Semester' },
                { answerText: 'Yes, Quarter' },
                { answerText: 'No' }
            ]
        },
        {
            questionText: 'Do you have a preference for a college with a rural, suburban, or urban campus?',
            answerOptions: [
                { answerText: 'Yes, Rural' },
                { answerText: 'Yes, Suburban' },
                { answerText: 'Yes, Urban' },
                { answerText: 'No' }
            ]
        },
        {
            questionText: 'Are geographical features important: beaches, mountains, rivers, lakes, plains?',
            answerOptions: [
                { answerText: 'Yes, beaches' },
                { answerText: 'Yes, mountains' },
                { answerText: 'Yes, rivers' },
                { answerText: 'Yes, lakes' },
                { answerText: 'Yes, plains' },
                { answerText: 'No' }
            ]
        },
    ];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userResponses, setUserResponses] = useState([]);
    const currentUser = getAuth().currentUser;
    const userId = currentUser.uid;

    useEffect(() => {

        if (userResponses.length === questions.length) {
            // console.log(addDoc(collection(database, "quizResponses")))
            addDoc(collection(database, "quizResponses"), {

                responses: userResponses
            })
                .then(() => {
                    console.log("Responses added to the database!");
                })

                .catch((error) => {
                    console.error("Error adding responses to the database: ", error);
                });
            addDoc(collection(database, "users"), {
                responseID: userResponses,
                userId: userId
            })
                .then(() => {
                    console.log("List of responses added with userId!");
                })
                .catch((error) => {
                    console.error("Error adding the list of responses to the database: ", error);
                });
        }
    })

    const handleAnswerOptionClick = (answerText) => {
        const response = {
            question: questions[currentQuestion].questionText,
            answer: answerText,
            userId: getAuth().currentUser.uid
        };

        setUserResponses([...userResponses, response]);

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        }
    };
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

    const goToOpportunities = async (e) => {
        try {
            console.log(e);
            navigate('/opp_info')
        }
        catch {
            console.log(e);
        }
    }

    return (
        <div className='App'>
            <h2>
                {userResponses.length === questions.length ? (
                    <div>
                        {/* Made it to the end of questionnaire */}
                        <QuizResults userResponses={userResponses} userId={userId} />
                        <br />
                        <button onClick={goToProfilePage}>Go back to profile</button>
                        <button onClick={goToOpportunities}>Continue: Opportunistic Information</button>
                    </div>
                ) : (
                    <>
                        <div>
                            <div>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <div>{questions[currentQuestion].questionText}</div>
                        </div>
                        <div>
                            {questions[currentQuestion].answerOptions.map((answerOption) => (
                                <button key={answerOption.answerText} onClick={() => handleAnswerOptionClick(answerOption.answerText)}>{answerOption.answerText}</button>
                            ))}
                        </div>
                    </>
                )}
            </h2>
        </div>
    );
};