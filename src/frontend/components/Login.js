import React, { useState } from "react";
// useEffect } 
import { useNavigate } from 'react-router-dom';
import { auth } from "../../backend/firebase.js";
import { UserAuth } from "../../context/AuthContext.js";
import grad from '../assets/stanford3.jpg'
// import { useHistory } from 'react-router-dom';

import {
    // signInWithEmailAndPassword,
    // onAuthStateChanged,
    signOut,
    // setPersistence
} from 'firebase/auth';
// import { Register } from "./Register.js";


export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { signIn } = UserAuth();

    const [user, setUser] = useState({});
    const handleRegClick = () => navigate('/register', { replace: true });


    const login = async (e) => {
        e.preventDefault();
        setError('')
        try {
            // await setPersistence()
            await signIn(email, password);
            // navigate("/profile")
            console.log(user);
            navigate('/profile');
        }
        catch (e) {
            setError(e.message);
            console.log(e.message)
        }
    }
    // console.log(login)
    const logout = async () => {
        await signOut(auth);
    }


    return (
        <div className="auth-form-container">
            {/* <h2>Welcome again!</h2> */}
            <img src={grad} alt="My Image" />
            <div className="content">
                <center>
                    <br />
                    <span className="img-txt">Welcome again!</span>
                    <form className="auth-form-container" onSubmit={login}>
                        <br />
                        <label className='label' htmlFor="email">Email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }} className="input" value={email} type="email" placeholder="username@email.com" id="email" name="email"></input>

                        <label className='label' htmlFor="password">Password</label>
                        <input onChange={(e) => { setPassword(e.target.value) }} className="input" value={password} type="password" placeholder="************" id="password" name="password"></input>
                        <br />
                        <button className='btn btn-secondary' type="submit">Login</button>
                    </form>
                    <br />
                    
                    <button className='btn btn-secondary' onClick={handleRegClick}>No account? Register here!</button>
                    <br />
                </center>

            </div>

        </div>

    )
}