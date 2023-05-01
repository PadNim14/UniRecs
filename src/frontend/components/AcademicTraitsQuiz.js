import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { database } from '../../backend/firebase';
import { collection, addDoc, getDocs, setDoc } from "firebase/firestore";
import QuizResults from './InitialQuizResults';
import { getAuth } from 'firebase/auth';

export const AcademicTraitsQuiz = () => {

    const questions = [
        // {
        //     questionText: 'Do you enjoy participating in extracurricular competition?',
        //     answerOptions: [
        //         { answerText: 'Yes' },
        //         { answerText: 'No' }
        //     ],
        // },
        {
            questionText: 'How important is your personal philosophy?',
            answerOptions: [
                { answerText: 'I refuse to work if I don\'t agree with the work\'s principles', weight: { 'Liberal Arts': { 'weight': 2, 'Humanities': 5 } } },
                { answerText: 'I\'m pretty stringent, but I can do work if it doesn\'t completely contradict my principles', weight: { 'Liberal Arts': { 'weight': 1, 'Humanities': 3 } } },
                { answerText: 'I get work done, regardless if I agree with its principles or not', weight: { 'Liberal Arts': { 'weight': 0 } } }
            ],
        },

        {
            questionText: 'Do you like working in groups?',
            answerOptions: [
                { answerText: 'Absolutely not', weight: { 'STEM': { 'weight': 2, 'Engineering': 1, 'Technology': 1, 'Science': 1, 'Mathematics': 1 } } },
                { answerText: 'I\'m indifferent', weight: { 'Business': { 'weight': 2, 'Finance': 1, 'Marketing': 1, 'Hospitality': 1, 'Management': 1 } } },
                { answerText: 'I love group projects', weight: { 'Liberal Arts': { 'weight': 2, 'Humanities': 1, 'Social Sciences': 1, 'Arts': 1, 'Natural Sciences': 1 } } },

            ]
        },
        {
            questionText: 'Which do you prefer?',
            answerOptions: [
                { answerText: 'Learning new material', weight: { 'STEM': { 'weight': 2, 'Engineering': 1, 'Technology': 1, 'Science': 1, 'Mathematics': 1 } } },
                { answerText: 'Learning old material', weight: { 'Business': { 'weight': 2, 'Engineering': 1, 'Technology': 1, 'Science': 1, 'Mathematics': 1 } } }
            ]
        },

        {
            questionText: 'Do you think studying different cultures is an important part of learning?',
            answerOptions: [
                { answerText: 'Yes. Learning about other cultures matters a lot', weight: { 'Liberal Arts': { 'weight': 1, 'Humanities': 2 } } },
                { answerText: 'No. I can learn about other cultures by talking with others', weight: { 'Liberal Arts': { 'weight': 0 } } },
            ]
        },
        {
            questionText: 'Do you prefer when things happen exactly as planned?',
            answerOptions: [
                { answerText: 'Yes. I love predictability', weight: { 'STEM': { 'weight': 2, 'Technology': 2, 'Mathematics': 2 } } },
                { answerText: 'Sometimes. Some unpredictability makes things interesting', weight: { 'Liberal Arts': { 'weight': 2, 'Humanities': 1, 'Arts': 1, 'Natural Sciences': 1 }, 'STEM': { 'Science': 1 } } },
                { answerText: 'No. I like thinking on my feet', weight: { 'Business': { 'weight': 2, 'Marketing': 1, 'Hospitality': 1, 'Management': 1 } } }
            ]
        },
        {
            questionText: 'If you could, would you travel for work?',
            answerOptions: [
                { answerText: 'No. I like staying in one place', weight: { 'STEM': { 'weight': 2, 'Technology': 2, 'Mathematics': 2 } } },
                { answerText: 'Yes. I want to explore', weight: { 'Business': { 'weight': 2, 'Marketing': 1, 'Hospitality': 1, 'Management': 1 } } }
            ]
        },
        {
            questionText: 'Do you find it easy to express your ideas with others?',
            answerOptions: [
                { answerText: 'No. It\'s hard to get what I\'m thinking out into the world', weight: { 'STEM': { 'weight': 1 } } },
                { answerText: 'Eh. I can communicate, but it takes a while before people get what I\'m saying', weight: { 'Liberal Arts': { 'weight': 1 } } },
                { answerText: 'Yes. I can explain anything to anyone and they will understand', weight: { 'Business': { 'weight': 1 } } },
            ]
        },
        {
            questionText: 'Would you consider yourself a patient person?',
            answerOptions: [
                { answerText: 'Yes', weight: { 'STEM': { 'weight': 2 }, 'Business': { 'weight': 1 }, 'Liberal Arts': { 'weight': 1 } } },
                { answerText: 'No', weight: { 'Liberal Arts': { 'weight': 2 }, 'Business': { 'weight': 2 }, 'STEM': { 'weight': 1 } } },
            ]
        },
        {
            questionText: 'Is getting work done more important than relaxing?',
            answerOptions: [
                { answerText: 'Yes. If there\'s work to do, you have to get it done before you relax', weight: { 'Business': { 'weight': 3 }, 'STEM': { 'weight': 2 }, 'Liberal Arts': { 'weight': 1 } } },
                { answerText: 'Sometimes. It depends on mental state and fatigue', weight: { 'Business': { 'weight': 1 }, 'STEM': { 'weight': 2 }, 'Liberal Arts': { 'weight': 2 } } },
                { answerText: 'No. Relaxing is important for mental health', weight: { 'Business': { 'weight': 0 }, 'STEM': { 'weight': 1 }, 'Liberal Arts': { 'weight': 3 } } },
            ]
        },

        {
            questionText: 'Do you enjoy planning out projects?',
            answerOptions: [
                {
                    answerText: 'Yes. I like taking the lead in organizing projects',
                    weight: {
                        'Business': { 'weight': 2, 'Management': 4, 'Marketing': 2, 'Hospitality': 1 },
                        'STEM': { 'Engineering': 3, 'Science': 1, 'Mathematics': 1 },
                        'Liberal Arts': { 'Arts': 2 }
                    }
                },

                {
                    answerText: 'No. I prefer working once I know what\'s expected',
                    weight: { 'STEM': { 'weight': 1, 'Technology': 2, 'Mathematics': 1 }, 'Liberal Arts': { 'Humanities': 1 } }
                },
            ]
        },
        {
            questionText: 'You want to uphold justice in society.',
            answerOptions: [
                { answerText: 'Very important', weight: { 'Liberal Arts': { 'weight': 3 } } },
                { answerText: 'Somewhat important', weight: { 'Liberal Arts': { 'weight': 1 } } },
                { answerText: 'Not important', weight: { 'Liberal Arts': { 'weight': 0 } } },
            ]
        }
    ];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userResponses, setUserResponses] = useState([]);
    const currentUser = getAuth().currentUser;
    const userId = currentUser.uid;
    console.log(userId);

    useEffect(() => {    
        if (userResponses.length !== questions.length) {
            return;
        }

        const userCollection = collection(database, 'quizResponses');
        var isUpdated = false;
        getDocs(userCollection).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().userId === userId && doc.data().quiz == 2) {
                    setDoc(doc.ref, { responseID: userResponses }, { merge: true }).then(() => {
                        console.log("User doc updated with new quiz info.");
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
                    isUpdated = true;
                    return;
                }
            });
      
            // console.log(isUpdated);
            if (isUpdated) {
                return;
            }

            addDoc(collection(database, "quizResponses"), {
                responseID: userResponses,
                userId: userId,
                quiz: 2
            })
            .then(() => {
                console.log("Quiz 2 added!");
            })
            .catch((error) => {
                console.error(error);
            });
        });
    });

    // useEffect(() => {  
    //     if (userResponses.length !== questions.length) {
    //         return;
    //     }

    //     const userCollection = collection(database, 'quizResponses');
    //     var isUpdated = true;
    //     getDocs(userCollection).then((querySnapshot) => {
    //         if (querySnapshot) {
    //             console.log(querySnapshot);
    //         }
    //         querySnapshot.forEach((doc) => {
    //             if(doc.data().userId === userId && doc.data().quiz == 2) {
                    
    //                 setDoc(doc.ref, { responseID: userResponses }, { merge: true }).then(() => {
    //                     console.log("User doc updated with new quiz info.");
    //                 })
    //                 .catch((error) => {
    //                     console.error("Error updating document: ", error);
    //                 });
    //                 return;
    //             }
    //         }); 
    //     });
        
    //     if (isUpdated) {
    //         return;
    //     }

    //     addDoc(collection(database, "quizResponses"), {
    //         responseID: userResponses,
    //         userId: userId,
    //         quiz: 2
    //     })
    //     .then(() => {
    //         console.log("Quiz 2 added!");
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // });

    //         // console.log(addDoc(collection(database, "quizResponses")))
    //         addDoc(collection(database, "quizResponses"), {

    //             responses: userResponses
    //         })
    //             .then(() => {
    //                 console.log("Responses added to the database!");
    //             })

    //             .catch((error) => {
    //                 console.error("Error adding responses to the database: ", error);
    //             });

    //         addDoc(collection(database, "users"), {
    //             responseID: userResponses,
    //             userId: userId,
    //             quiz: 2
    //         })
    //             .then(() => {
    //                 console.log("List of responses added with userId!");
    //             })
    //             .catch((error) => {
    //                 console.error("Error adding the list of responses to the database: ", error);
    //             });
    //     }
    // })

    const handleAnswerOptionClick = (answerText, weight) => {
        const response = {
            question: questions[currentQuestion].questionText,
            answer: answerText,
            weight: weight,
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

    const goToResults = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/recs');
            console.log(e);
            navigate('/results', { state: { data: response.data } });
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
                        <button className='btn btn-success' onClick={goToProfilePage}>Go back to profile</button>
                        <button className='btn btn-success' onClick={goToResults}>View Your Recommendations</button>

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
                                <button className='btn btn-success' key={answerOption.answerText} onClick={() => handleAnswerOptionClick(answerOption.answerText, answerOption.weight)}>{answerOption.answerText}</button>
                            ))}
                        </div>
                    </>
                )}
            </h2>
        </div>
    );
};