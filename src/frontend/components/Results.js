import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CollegeCards from './CollegeCards';
function Results() {
    const [colleges, setColleges] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state;
    // const dataSet = new Set(data.split(/, (?![^(]*\))/))
    const goToProfilePage = async (e) => {
        try {
            console.log(e);
            navigate('/profile');
        }
        catch {
            console.log(e.message);
        }
    }
    console.log(data);

    // useEffect(() => {
    //     fetch('/recs')
    //         .then(response => response.json())
    //         .then(data => setColleges(data));
    // }, []);
    return (
        <div className='App'>
            <center>
                <h1>Your College Recommendations</h1>
                <CollegeCards colleges={data} />
                <button className='btn btn-primary' onClick={goToProfilePage}>Go back to profile</button>
                <br />
            </center>
        </div>
    )
}

export default Results