import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Results() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state;
    const dataSet = new Set(data.split(/, (?![^(]*\))/))
    const goToProfilePage = async (e) => {
        try {
            console.log(e);
            navigate('/profile');
        }
        catch {
            console.log(e.message);
        }
    }
    return (
        <div className='App'>
            <center>
                <h1>Your College Recommendations</h1>
                {/* <pre>{JSON.stringify(data)}</pre> */}
                {/* <h7>{Array.from(data)}</h7> */}
                <div>
                    {Array.from(dataSet).map((college, index) => (
                        <li key={index}>{college}</li>
                    ))}
                </div>
                <br />
                <button onClick={goToProfilePage}>Go back to profile</button>
            </center>
        </div>
    )
}

export default Results