import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
            questionText: 'If yes, what areas of study are you interested in?',
            answerOptions: [
                { answerText: 'not applicable'},
                { answerText: 'natural sciences' },
                { answerText: 'mathematics' },
                { answerText: 'engineering' },
                { answerText: 'computing' },
                { answerText: 'business and management' },
                { answerText: 'fine arts' },
                { answerText: 'legal studies' },
                { answerText: 'medical services' },
                { answerText: 'environmental studies/planning' },
                { answerText: 'architecture' },
                { answerText: 'humanities (behavioral/social)' },
                { answerText: 'humanities (languages/history/philosophy)' },
            ],
        },

        {
            questionText: 'Do you want the college to give a holistic academic experience?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' },
            ]
        }

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

    const goToAcademicQuestionnaire = async (e) => {
        try {
            console.log(e);
            navigate('/academic_traits')
        }
        catch{
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
                        <button onClick={goToAcademicQuestionnaire}>Continue: Academic Traits</button>

                        {/* <div>
                            {responses.map((response) => (
                                <div key={response.id}> {response.text} </div>
                            ))}
                        </div> */}
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