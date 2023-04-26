import React, { useState } from "react";
// import { database } from '../../backend/firebase';
// import { collection, addDoc } from "firebase/firestore";
// import { auth } from "../../backend/firebase.js"
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import grad from '../assets/stanford2.jpg';
// import { 
//     createUserWithEmailAndPassword,
//     onAuthStateChanged,
//     signOut
// } from 'firebase/auth';



export const Register = (props) => {
    // const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [confirm, setConfirm] = useState('');
    const navigate = useNavigate();
    const handleLoginClick = () => navigate('/login', { replace: true });
    const { createUser } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUser(email, password);
            navigate('/profile')
        }
        catch (e) {
            setError(e.message);
            console.log(e.message)
        }
    }
    return (
        <div className="auth-form-container">
            <img src={grad} alt="My Image" />
            <div className="content">
                <center>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <span className="img-txt">Find your perfect college fit today!</span>
                    <br />
                    <br />
                    <br />
                    <span className="img-small-txt">Create a new account.</span>
                    
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label className="label">Full Name</label>
                        <input className="input" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Full Name" />
                        <label className="label" htmlFor="email">Email</label>
                        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="username@email.com" id="email" name="email"></input>

                        <label className="label" htmlFor="password">Password</label>
                        <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="************" id="password" name="password"></input>
                        <br />
                        <label className="label" htmlFor="confirmpassword">Confirm Password</label>
                        <input className="input" value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="************" id="confirmpassword" name="confirmpassword"></input>
                        <button className='btn btn-secondary' type="submit">Login</button>
                    </form>
                    <br />
                    <button className='btn btn-secondary' onClick={handleLoginClick}>Have account? Login here!</button>
                </center>
            </div>

        </div>

    )
}