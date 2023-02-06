import React, { useState } from 'react';
// import '../styles/quiz.css'
export const InitialQuiz = (props) => {
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
            questionText: 'Do you know what you want to study?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' },
            ],
        },
        {
            questionText: 'Do you know what you want to study?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' },
            ],
        },
        {
            questionText: 'Do you know what you want to study?',
            answerOptions: [
                { answerText: 'Yes' },
                { answerText: 'No' },
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };
    return (
        <div>
            {showScore ? (
                <div>
                    You scored {score} out of {questions.length}
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
                            <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}