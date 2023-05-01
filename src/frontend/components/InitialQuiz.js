import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../../backend/firebase';
import { collection, addDoc, getDocs, setDoc } from "firebase/firestore";
import QuizResults from './InitialQuizResults';
import { getAuth } from 'firebase/auth';

export const InitialQuiz = () => {

    const questions = [
        {
            questionText: 'What field interests you most?',
            answerOptions: [
                { answerText: 'STEM (Science, Technology, Engineering, Math)', weight: { 'STEM': { 'weight': 5 } } },
                { answerText: 'Liberal Arts (Humanities, Social Sciences, Arts, Natural Sciences)', weight: { 'Liberal Arts': { 'weight': 5 } } },
                { answerText: 'Business (Marketing, Accounting, Finance, Management', weight: { 'Business': { 'weight': 5 } } }
                // Have some redirect that takes care of No answer
                // Render another quiz
            ],
        },
        {
            questionText: 'In the STEM field, what interests you most?',
            answerOptions: [
                { answerText: 'Engineering', weight: { 'STEM': { 'weight': 1, 'Engineering': 2 } } },
                { answerText: 'Technology', weight: { 'STEM': { 'weight': 1, 'Technology': 2 } } },
                { answerText: 'Science', weight: { 'STEM': { 'weight': 1, 'Science': 2 } } },
                { answerText: 'Mathematics', weight: { 'STEM': { 'weight': 1, 'Mathematics': 2 } } },
                { answerText: 'STEM isn\'t my thing.', weight: { 'STEM': { 'weight': 0 } } }
            ],
        },

        {
            questionText: 'In the Liberal Arts field, what interests you most?',
            answerOptions: [
                { answerText: 'Humanities', weight: { 'Liberal Arts': { 'weight': 1, 'Humanities': 2 } } },
                { answerText: 'Social Sciences', weight: { 'Liberal Arts': { 'weight': 1, 'Social Sciences': 2 } } },
                { answerText: 'Arts', weight: { 'Liberal Arts': { 'weight': 1, 'Arts': 2 } } },
                { answerText: 'Natural Sciences', weight: { 'Liberal Arts': { 'weight': 1, 'Natural Sciences': 2 } } },
                { answerText: 'These fields don\'t interest me.', weight: { 'Liberal Arts': { 'weight': 0 } } }

            ]
        },

        {
            questionText: 'In the Business field, what interests you the most?',
            answerOptions: [
                { answerText: 'Finance', weight: { 'Business': { 'weight': 1, 'Finance': 2 } } },
                { answerText: 'Marketing', weight: { 'Business': { 'weight': 1, 'Marketing': 2 } } },
                { answerText: 'Hospitality', weight: { 'Business': { 'weight': 1, 'Hospitality': 2 } } },
                { answerText: 'Management', weight: { 'Business': { 'weight': 1, 'Management': 2 } } },
                { answerText: 'These fields don\'t interest me.', weight: { 'Business': { 'weight': 0 } } }
            ]
        },
        {
            questionText: 'Does it matter how strong your college is in fields you aren\'t studying?',
            answerOptions: [
                {
                    answerText: 'Yes, all other fields should be highly ranked.',
                    weight: {
                        'STEM': { 'weight': 1, 'Engineering': 3, 'Technology': 3, 'Science': 3, 'Mathematics': 3 },
                        'Business': { 'weight': 1, 'Finance': 3, 'Marketing': 3, 'Hospitality': 3, 'Management': 3 },
                        'Liberal Arts': { 'weight': 1, 'Humanities': 3, 'Social Sciences': 3, 'Arts': 3, 'Natural Sciences': 3 }
                    }
                },
                { answerText: 'No. As long as I\'m learning, it doesn\'t really matter.', weight: { 'STEM': { 'weight': 0 } } },


            ]
        },
        {
            questionText: 'Does college ranking matter to you?',
            answerOptions: [
                {
                    answerText: 'Yes. Ranking matters a lot to me.',
                    weight: {
                        'STEM': { 'Engineering': 3, 'Technology': 3, 'Science': 3, 'Mathematics': 3 },
                        'Business': { 'Finance': 3, 'Marketing': 3, 'Hospitality': 3, 'Management': 3 },
                        'Liberal Arts': { 'Humanities': 3, 'Social Sciences': 3, 'Arts': 3, 'Natural Sciences': 3 }
                    }
                },
                { answerText: 'No. As long as I\'m learning, it doesn\'t really matter.', weight: { 'STEM': { 'weight': 0 } } }
            ]
        }

    ];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userResponses, setUserResponses] = useState([]);
    const currentUser = getAuth().currentUser;
    const userId = currentUser.uid;

    // useEffect(() => {

    //     if (userResponses.length === questions.length) {
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
    //             quiz: 1
    //         })
    //             .then(() => {
    //                 console.log("List of responses added with userId!");
    //             })
    //             .catch((error) => {
    //                 console.error("Error adding the list of responses to the database: ", error);
    //             });
    //     }
    // })

    useEffect(() => {    
        if (userResponses.length !== questions.length) {
            return;
        }

        const userCollection = collection(database, 'quizResponses');
        var isUpdated = false;
        getDocs(userCollection).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().userId === userId && doc.data().quiz == 1) {
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
                quiz: 1
            })
            .then(() => {
                console.log("Quiz 1 added!");
            })
            .catch((error) => {
                console.error(error);
            });
        });
    });

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

    const goToAcademicQuestionnaire = async (e) => {
        try {
            console.log(e);
            navigate('/academic_traits')
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
                        <button className='btn btn-success' onClick={goToAcademicQuestionnaire}>Continue: Academic Traits</button>

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
                        <center>
                            <div>
                                {questions[currentQuestion].answerOptions.map((answerOption) => (
                                    <button className='btn btn-success' key={answerOption.answerText} onClick={() => handleAnswerOptionClick(answerOption.answerText, answerOption.weight)}>{answerOption.answerText}</button>
                                ))}

                            </div>
                        </center>
                    </>
                )}
            </h2>
        </div>
    );
};