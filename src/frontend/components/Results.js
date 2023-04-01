import React from 'react'
import { useNavigate } from 'react-router-dom'


function Results(props) {
    const navigate = useNavigate();
    // const { data } = props.location.state;
    // console.log(props.location.state);
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
                <h1>Recommendation</h1>
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                <button onClick={goToProfilePage}>Go back to profile</button>
            </center>
        </div>
    )
}

export default Results