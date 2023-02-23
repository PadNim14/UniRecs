import React, { useState, useEffect } from 'react';
import { database } from '../../backend/firebase';
import { collection, addDoc } from "firebase/firestore";
import QuizResults from './InitialQuizResults';
import { getAuth } from 'firebase/auth';

export const InitialQuiz = () => {
    const questions = [
        {
            questionText: 'Do you know what you want to study?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' },
                // Have some redirect that takes care of No answer
                // Render another quiz
            ],
        },
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
                { answerText: 'Less Selective' },
            ],
        },
        {
            questionText: 'Are you interested in participating in Greek life?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' },
            ],
        },
        {
            questionText: 'Do you prefer a college with a strong athletics program?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' },
            ],
        },
        {
            questionText: 'Do you plan on studying in STEM?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' },
            ],
        },
        {
            questionText: 'Do you want to attend a college with a strong study abroad program',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' },
            ],
        },
        {
            questionText: 'Do you have a preference for a college with a specific type of academic calendar (e.g. semester, quarter)?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' }
            ]

        },
        {
            questionText: 'Do you want to attend a college with a strong program in a particular area of study (e.g. humanities, social sciences, natural sciences)?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' }
            ]

        },
        {
            questionText: 'Do you prefer a college with a strong career services program?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' }
            ]

        },
        {
            questionText: 'Do you need a college with specific resources or accommodations for students with disabilities?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' }
            ]
        },
        {
            questionText: 'Do you prefer a college with a strong research program?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' }
            ]
        }


    ];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userResponses, setUserResponses] = useState([]);
    const currentUser = getAuth().currentUser;
    const userId = currentUser.uid;
    // console.log(currentUser);
    useEffect(() => {
        if (userResponses.length === questions.length) {
            addDoc(collection(database, "quizResponses"), {
                
                responses: userResponses
            })
                .then(() => {
                    console.log("Responses added to the database!");
                })

                .catch((error) => {
                    console.error("Error adding responses to the database: ", error);
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

    return (
        <div>
            <h2>
                {userResponses.length === questions.length ? (
                    <div>
                        {/* Made it to the end of questionnaire */}
                        <QuizResults userResponses={userResponses} userId={userId} />
                       
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