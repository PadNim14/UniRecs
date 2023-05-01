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

    // const colleges = [
    //     'Massachusetts Institute of Technology (MIT)',
    //     'Carnegie Mellon University',
    //     'University of Illinois--Urbana-Champaign',
    //     'University of California--Berkeley',
    //     'Stanford University',
    //     'California Institute of Technology (Caltech)',
    //     'University of Michigan--Ann Arbor',
    //   ];
    console.log(data);
    return (
        <div className='App'>
            <center>
                <h1>Your College Recommendations</h1>
                {/* <pre>{JSON.stringify(data)}</pre> */}
                {/* <h7>{Array.from(data)}</h7> */}
                {/* <div>
                    {Array.from(dataSet).map((college, index) => (
                        <li key={index}>{college}</li>
                        ))}
                    </div> */}
                <CollegeCards colleges={data} />
                <button className='btn btn-primary' onClick={goToProfilePage}>Go back to profile</button>
                <br />
            </center>
        </div>
    )
}

export default Results