import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../../backend/firebase';
import { collection, addDoc } from "firebase/firestore";
import QuizResults from './InitialQuizResults';
import { getAuth } from 'firebase/auth';

export const AcademicTraitsQuiz = () => {

    const questions = [
        {
            questionText: 'Would you participate in contests about problem solving?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' }
            ],
        },
        {
            questionText: 'Do you feel strongly about your personal philosophy?',
            answerOptions: [
                { answerText: 'Yes'},
                { answerText: 'No' }
            ],
        },

        {
            questionText: 'Do you enjoy collaborating with others?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' }
            ]
        },
        {
            questionText: 'Do you enjoy learning new material?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' }
            ]
        },
        {
            questionText: 'Do you enjoy being around nature?',
            answerOptions: [
                { answerText: 'Yes'},
                { answerText: 'No'}
            ]
        },
        {
            questionText: 'You enjoy learning about the differences between cultures and identity.',
            answerOptions: [
                { answerText: 'Strongly Agree' },
                { answerText: 'Agree' },
                { answerText: 'Neutral' },
                { answerText: 'Disagree' },
                { answerText: 'Strongly Disagree' }
            ]
        },
        {
            questionText: 'You are more of a determinist.',
            answerOptions: [
                { answerText: 'Strongly Agree' },
                { answerText: 'Agree' },
                { answerText: 'Neutral' },
                { answerText: 'Disagree' },
                { answerText: 'Strongly Disagree' }
            ]
        },
        {
            questionText: 'You find it easy to converse with others.',
            answerOptions: [
                { answerText: 'Strongly Agree' },
                { answerText: 'Agree' },
                { answerText: 'Neutral' },
                { answerText: 'Disagree' },
                { answerText: 'Strongly Disagree' }
            ]
        },
        {
            questionText: 'You are patient.',
            answerOptions: [
                { answerText: 'Strongly Agree' },
                { answerText: 'Agree' },
                { answerText: 'Neutral' },
                { answerText: 'Disagree' },
                { answerText: 'Strongly Disagree' }
            ]
        },
        {
            questionText: 'Optimizing your time is more important than staying relaxed.',
            answerOptions: [
                { answerText: 'Strongly Agree' },
                { answerText: 'Agree' },
                { answerText: 'Neutral' },
                { answerText: 'Disagree' },
                { answerText: 'Strongly Disagree' }
            ]
        },
        {
            questionText: 'You enjoy planning out projects.',
            answerOptions: [
                { answerText: 'Strongly Agree' },
                { answerText: 'Agree' },
                { answerText: 'Neutral' },
                { answerText: 'Disagree' },
                { answerText: 'Strongly Disagree' }
            ]
        },
        {
            questionText: 'You want to uphold justice in society.',
            answerOptions: [
                { answerText: 'Strongly Agree' },
                { answerText: 'Agree' },
                { answerText: 'Neutral' },
                { answerText: 'Disagree' },
                { answerText: 'Strongly Disagree' }
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

    const goToSubjectPreferences = async (e) => {
        try {
            console.log(e);
            navigate('/subject_preferences')
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
                        <button onClick={goToSubjectPreferences}>Continue: Subject Preferences</button>

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