// import e from "express";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../backend/firebase.js";
import { UserAuth } from "../../context/AuthContext.js";
// import { useHistory } from 'react-router-dom';

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { Register } from "./Register.js";


export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { signIn } = UserAuth();

    const [user, setUser] = useState({});
    const handleRegClick = () => navigate('/register', { replace: true });

    const login = async (e) => {
        e.preventDefault();
        setError('')
        try {
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

    // function handleClick() {
    //     let history = useHistory();
    //     history.push('/register');
    // }


    return (
        <div className="App">
            <div className="auth-form-container">
                <h2>Welcome again!</h2>
                <form className="login-form" onSubmit={login}>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => { setEmail(e.target.value) }} className="input" value={email} type="email" placeholder="username@email.com" id="email" name="email"></input>

                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => { setPassword(e.target.value) }} className="input" value={password} type="password" placeholder="************" id="password" name="password"></input>
                    <button type="submit">Login</button>
                </form>
                <button className="link-btn" onClick={handleRegClick}>No account? Register here!</button>
            </div>
        </div>

    )
}