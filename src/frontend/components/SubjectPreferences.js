import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from '../../backend/firebase';
import { collection, addDoc } from "firebase/firestore";

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

    // const submitPreferences = async (subjects) => {
    //     console.log("submitPreferences is called.");
    //     for (const key in subjects) {
    //         const subject = subjects[key];
    //         console.log(subject);
    //         try {
    //             const docRef = await addDoc(collection(database, "subjectPreferences"), {
    //                 name: subject.name,
    //                 rank: subject.rank,
    //             });
    //             console.log("Document written with ID: ", docRef.id);
    //         } catch (error) {
    //             console.error("Error adding document", error);
    //         }
    //     }

    //     console.log("Made it here");
    //     // navigate('/environmental_information');
    // };
    const submitPreferences = async (subjects) => {
        for (const subject in subjects) {
            console.log(subject)
            try {
                const docRef = await addDoc(collection(database, "subjectPreferences"), {
                    name: subject.name,
                    rank: subject.rank,
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
        // navigate("/environmental_information");
    };



    const navigate = useNavigate();
    const handleSubmit = () => {
        submitPreferences();
        // console.log(subjects);
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
                                    {[...Array(12).keys()].slice(1).map((i) => (
                                        <option
                                            key={i}
                                            value={i}
                                            disabled={subjects.filter((s) => s.rank === i && s !== subject).length > 0}
                                        >
                                            {i}
                                        </option>
                                    ))}
                                </select>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button onClick={handleSubmit}>Submit Preferences</button>
        </div>
    );
};

