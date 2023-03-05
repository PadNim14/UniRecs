import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from '../../backend/firebase';
// import { collection, addDoc } from "firebase/firestore";

export const SubjectPreferences = () => {
    const [subjects, setSubjects] = useState([
        { name: "Natural Sciences", rank: 0 },
        { name: "Mathematics", rank: 0 },
        { name: "Engineering", rank: 0 },
        { name: "Computing", rank: 0 },
        { name: "Business and Management", rank: 0 },
        { name: "Fine Arts", rank: 0 },
        { name: "Legal Studies", rank: 0 },
        { name: "Environmental Studies/Planning", rank: 0 },
        { name: "Architecture", rank: 0 },
        { name: "Humanities (behavioral/social)", rank: 0 },
        { name: "Humanities (languages/history/philosophy)", rank: 0 }
    ]);

    const handleRanking = (index, value) => {
        setSubjects(
            subjects.map((subject, i) =>
                i === index ? { ...subject, rank: value } : subject
            )
        );
    };

    const submitPreferences = (subjects) => {
        subjects.forEach((subject) => {
            database.collection('subjectPreferences')
                .add({
                    name: subject.name,
                    rank: subject.rank,
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef);
                })
                .catch((error) => {
                    console.log("Error adding document", error);
                });
        });
    };

    const navigate = useNavigate();
    const handleSubmit = () => {
        // submitPreferences(subjects);
        console.log(subjects);
        navigate('/environmental_information');

    }
    return (
        <div className="subject-ranking">
            <h2>Subject Ranking</h2>
            <table>
                <tbody>
                    {subjects.map((subject, index) => (
                        <tr key={index}>
                            <td>{subject.name}</td>
                            <td>
                                <select
                                    value={subject.rank}
                                    onChange={(e) => handleRanking(index, parseInt(e.target.value))}
                                >
                                    <option value="0">Select Rank</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSubmit}>Submit Preferences</button>
        </div>
    );
};

