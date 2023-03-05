import React from 'react'
import { useNavigate } from 'react-router-dom'


function Results() {
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
    return (
        <div className='App'>
            <center>
                <h1>Recommendation System in Progress...</h1>
                <button onClick={goToProfilePage}>Go back to profile</button>
            </center>
        </div>
    )
}

export default Results