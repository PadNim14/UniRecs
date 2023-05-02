import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext';
import CollegeCards from './CollegeCards';

function Results() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state;

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
                <CollegeCards colleges={data} />
                <button className='btn btn-primary' onClick={goToProfilePage}>Go back to profile</button>
                <br />
            </center>
        </div>
    )
}

export default Results