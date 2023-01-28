// import e from "express";
import React, { useState } from "react";
import { useNavigate }  from 'react-router-dom';
import { auth } from "../../backend/firebase.js"
import { 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});

    // const navigate = useNavigate();
    // function handleSubmit(e) {
    //     e.preventDefault();
    //     console.log(email);
    //     // navigate("/quiz")
        
    // }

    const login = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            // navigate("/profile")
            console.log(user);
        }
        catch (error) {
            alert(error.message)
        }
    }
    // console.log(login)
    const logout = async () => {
        await signOut(auth);
    }


    return (
        <div className="App">
            <div className="auth-form-container">
                <h2>Welcome again!</h2>
                <form className="login-form" onSubmit={login}>
                    <label htmlFor="email">Email</label>
                    <input onChange = {(e) => {setEmail(e.target.value)}} className="input" value={email}  type="email" placeholder="username@email.com" id="email" name="email"></input>

                    <label htmlFor="password">Password</label>
                    <input onChange = {(e) => {setPassword(e.target.value)}}className="input" value={password} type="password" placeholder="************" id="password" name="password"></input>
                    <button type="submit">Login</button>
                </form>
                <button className="link-btn" onClick={() => props.onFormSwitch('register')}>No account? Register here!</button>
            </div>
        </div>

    )
}