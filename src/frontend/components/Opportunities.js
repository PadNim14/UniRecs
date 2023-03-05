import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../../backend/firebase';
import { collection, addDoc } from "firebase/firestore";
import QuizResults from './InitialQuizResults';
import { getAuth } from 'firebase/auth';

export const Opportunities = () => {

    const questions = [
        {
            questionText: 'Do you intend to study abroad?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' },
            ],
        },
        {
            questionText: 'How important is college-supported strong coop/career services based program?',
            answerOptions: [
                { answerText: 'Very Important' },
                { answerText: 'Important' },
                { answerText: 'Not Important' },

            ],
        },

        {
            questionText: 'Do you need specific resources or accommodations for students with disabilities?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' }
            ]
        },
        {
            questionText: 'Do you intend to go into research or dabble with research?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' }
            ]
        },
        {
            questionText: 'Do you intend in partipating in college level competitions?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' }
            ]
        },
        {
            questionText: 'Are you interested in mentorship?',
            answerOptions: [
                { answerText: 'Yes' },
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

    const goToPersonalInfo = async (e) => {
        try {
            console.log(e);
            navigate('/personal_info')
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
                        <button onClick={goToPersonalInfo}>Continue: Personal Information</button>
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