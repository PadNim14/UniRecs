import axios from 'axios';
import React, { useState, 
    // useEffect 
} from 'react';
import { useNavigate } from 'react-router-dom';
// import { database } from '../../backend/firebase';
// import { collection, addDoc } from "firebase/firestore";
// import QuizResults from './InitialQuizResults';
// import { getAuth } from 'firebase/auth';

export const TranscriptInfo = () => {
    const [gpa, setGPA] = useState(3.70);
    const [SAT_MATH, setSAT_MATH] = useState(600);
    const [SAT_EBRW, setSAT_EBRW] = useState(600);
    const [ACT_MATH, setACT_MATH] = useState(26);
    const [ACT_READING, setACT_READING] = useState(27);
    const [ACT_ENGLISH, setACT_ENGLISH] = useState(29);
    const [ACT_SCIENCE, setACT_SCIENCE] = useState(30);
    const [courses, setCourses] = useState("");
    // const [AP, setAP] = useState("");
    // const [IB, setIB] = useState("");

    // const [userResponses, setUserResponses] = useState([]);
    // const currentUser = getAuth().currentUser;
    // const userId = currentUser.uid;

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

    const goToResultsView = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/recs');
            console.log(e);
            navigate('/results', {state: {data: response.data}});
        }
        catch {
            console.log(e);
        }
    }

    // const [courses, setCourses] = useState("");
    // const [AP, setAP] = useState("");
    // const [IB, setIB] = useState("");

    return (
        <div className='subject-ranking'>
            <h2>Transcript Information</h2>
            <form>
                <label> Unweighted High School GPA (out of 4.00)
                    <br />
                    <input
                        type='number'
                        value={gpa}
                        min='0.00'
                        max='4.00'
                        step="0.01"
                        onChange={(e) => setGPA(e.target.value)}
                    />
                </label>
                <br />
                <label>SAT Math Score (out of 800)
                    <br />
                    <input
                        type='number'
                        value={SAT_MATH}
                        min='200'
                        max='800'
                        step='10'
                        onChange={(e) => setSAT_MATH(e.target.value)}
                    />
                </label>
                <br />
                <label>SAT Evidence-Based Reading and Writing Score (out of 800)
                    <br />
                    <input
                        type='number'
                        value={SAT_EBRW}
                        min='200'
                        max='800'
                        step='10'
                        onChange={(e) => setSAT_EBRW(e.target.value)}
                    />
                </label>
                <br />
                <label> ACT English Score (out of 36)
                    <br />
                    <input
                        type='number'
                        value={ACT_ENGLISH}
                        min='1'
                        max='36'
                        onChange={(e) => setACT_ENGLISH(e.target.value)}
                    />
                </label>
                <br />
                <label> ACT Math Score (out of 36)
                    <br />
                    <input
                        type='number'
                        value={ACT_MATH}
                        min='1'
                        max='36'
                        onChange={(e) => setACT_MATH(e.target.value)}
                    />
                </label>
                <br />

                <label> ACT Science Score (out of 36)
                    <br />
                    <input
                        type='number'
                        value={ACT_SCIENCE}
                        min='1'
                        max='36'
                        onChange={(e) => setACT_SCIENCE(e.target.value)}
                    />
                </label>
                <br />

                <label> ACT Reading Score (out of 36)
                    <br />
                    <input
                        type='number'
                        value={ACT_READING}
                        min='1'
                        max='36'
                        onChange={(e) => setACT_READING(e.target.value)}
                    />
                </label>
                <br />
                <label> Advanced/High School Coursework
                    <br />
                    <textarea
                        value={courses}
                        rows='5'
                        cols='70'
                        onChange={(e) => setCourses(e.target.value)}
                    />
                </label>
                <br />
                <br />
                <button type='submit' onClick={goToResultsView}>View Results</button>
                <button onClick={goToProfilePage}>Go to Profile Page</button>
            </form>
        </div>
    );
};