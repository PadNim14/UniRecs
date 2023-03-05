import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../../backend/firebase';
import { collection, addDoc } from "firebase/firestore";
// import QuizResults from './InitialQuizResults';
import { getAuth } from 'firebase/auth';

export const PersonalInfo = () => {
    const [salary, setSalary] = useState(0);
    const [workHours, setWorkHours] = useState(0);
    const [state, setState] = useState("");
    const [budget, setBudget] = useState(0);
    const [scholarship, setScholarship] = useState(0);
    // const [userResponses, setUserResponses] = useState([]);
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
    //             userId: userId
    //         })
    //             .then(() => {
    //                 console.log("List of responses added with userId!");
    //             })
    //             .catch((error) => {
    //                 console.error("Error adding the list of responses to the database: ", error);
    //             });
    //     }
    // })


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

    const goToTranscriptInfo = async (e) => {
        try {
            console.log(e);
            navigate('/transcript_info')
        }
        catch {
            console.log(e);
        }
    }

    return (
        <div className='subject-ranking'>
            <h2>Personal/Financial Information</h2>
            <form>
                <label> Annual Salary Report (in USD)
                    <br />
                    <input
                        type='number'
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </label>
                <br />
                <label>Intended Working Hours
                    <br />
                    <input
                        type='number'
                        value={workHours}
                        onChange={(e) => setWorkHours(e.target.value)}
                    />
                </label>
                <br />
                <label> U.S. State/Territory
                    <br />
                    <input
                        type='text'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                <br />
                <label> Estimated College Budget
                    <br />
                    <input
                        type='number'
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                </label>
                <br />
                <label> Scholarship/Grant Money
                    <br />
                    <input
                        type='number'
                        value={scholarship}
                        onChange={(e) => setScholarship(e.target.value)}
                    />
                </label>
                <br />
                <br />
                <button type='submit' onClick={goToTranscriptInfo}>Continue: Transcript Information</button>
                <button onClick={goToProfilePage}>Go to Profile Page</button>
            </form>
        </div>
    );
};