import React, { useState } from 'react';
// import './intro.html';

function Quiz() {

	const questions = [
		{
			questionText: ' What year were the Indiana Pacers founded?'
			,
			answerOptions: [
				{ answerText: '1967', isCorrect: true },
				{ answerText: '1985', isCorrect: false },
				{ answerText: '1958', isCorrect: false },
				{ answerText: '1976', isCorrect: false },
			],
		},
		{
			questionText: 'Who once played for both the Indiana Pacers and the San Antonio Spurs in the same game?',
			answerOptions: [
				{ answerText: 'George Hill', isCorrect: false },
				{ answerText: 'Stephen Jackson', isCorrect: false },
				{ answerText: 'Kawhi Leonard', isCorrect: false },
				{ answerText: 'Bob Netolicky', isCorrect: true },
			],
		},
		{
			questionText: 'Which Pacer was known as the "Knick Killer"?',
			answerOptions: [
				{ answerText: 'George McGinnis', isCorrect: false },
				{ answerText: 'Alex English', isCorrect: false },
				{ answerText: 'Chris Mullin', isCorrect: false },
				{ answerText: 'Reggie Miller', isCorrect: true },
			],
		},
		{
			questionText: 'Which Pacers coach has the highest winning percentage?',
			answerOptions: [
				{ answerText: 'Larry Bird', isCorrect: true },
				{ answerText: 'Bobby Leonard', isCorrect: false },
				{ answerText: 'Larry Brown', isCorrect: false },
				{ answerText: 'Frank Vogel', isCorrect: false },
			],
		},
	];
	const [currentQuestion, setCurrentQuestion] = useState(0);
	
	const [showScore, setShowScore] = useState(false);	
	const [name, setName] = useState('')
	
	const handleInput = () => {
		console.log(name);
	};
	// <input onChange={event => setTitle(event.target.value)} />
	const [score, setScore] = useState(0);
	const [counter, setCounter] = React.useState(4);
	const id = React.useRef(null);
	const [PP, setPP] = useState(0);

	const clear=()=>{
		window.clearInterval(id.current);
	}
	
	function sleep(ms){
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	

	
	React.useEffect(() => {
		const timer =
		  counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
		  if(counter === 0)
		  {
			const nextQuestion = currentQuestion + 1;
			if(nextQuestion < questions.length){
				setCurrentQuestion(nextQuestion);
				setCounter(counter + 4);
			}
			else{
				setShowScore(true);
			}
			sleep(2000);
			
		  }
		 
		return () => clearInterval(timer);

		


	  }, [counter]);


	const handleAnswerButtonClick = (isCorrect) => {
		if(isCorrect){
			setScore(score + 1);
			setPP(PP + 1);
			setCounter(4);
		}
		
		const nextQuestion = currentQuestion + 1;
		
		if(nextQuestion < questions.length){
			setCurrentQuestion(nextQuestion);
			setCounter(4);
		}
		else{
			setShowScore(true);
			setCounter(0);
		}
		//setCounter(5);
	};
	var nameText = document.getElementById("name");
	console.log(nameText);
	return (
		<div className='app'>
			{/* <div style={{flexDirection: 'column', display: 'flex'}}>
				<input placeholder="username" onChange={e=> setName(e.target.value)}/>
			<button onClick={() => handleInput()}>Input</button> */}

			{/* </div> */}
			<div className='PPcounter'><p> Current PP: {PP}</p></div>
	  		<div className='timer-text'>Time Left {counter}</div>
			{showScore ? (
				<div className='score-section'>You scored {score} out of {questions.length}</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>{currentQuestion + 1}</span>/{questions.length}
						</div>
						
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption, index) => (
							<button onClick={()=>handleAnswerButtonClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
			
		</div>
	);
}
export default Quiz;
