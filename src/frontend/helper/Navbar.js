import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
// import ReorderIcon from '@material-ui/icons/Reorder';

function Navbar() {
    const [expandNavBar, setExpandNavBar] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setExpandNavBar(false);
    }, [location]);

    return (
        // <div id={expandNavBar ? "open" : "close"}>
        //     <div className='toggleButton'>
        //         <button
        //             onClick={() => {
        //                 setExpandNavBar((prev) => !prev);
        //             }}
        //         >
        //         </button>
        //     </div>
        <div className='navbar'>
            <div className='links'>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/sample_database">National University Rankings</Link>
                <Link to="/liberal_arts">Liberal Arts College Rankings</Link>
                <Link to="/about">About Us</Link>
            </div>
        </div>



    )
}

export default Navbar
