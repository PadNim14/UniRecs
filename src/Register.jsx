// import e from "express";
import React, { useState } from "react";
import { database } from './firebase';
import { collection, addDoc } from "firebase/firestore";
export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [confirm, setConfirm] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(email);
        // console.log(name);
        // console.log(pass);
        // console.log(confirm);
        let obj = {
            name: name,
            email: email,
            password: pass,
            confirmPassword: confirm,
        }
        // const newPostKey = push(child(ref(database), 'posts')).key;
        // const updates = {};
        // updates['/' + newPostKey] = obj;
        // console.log(obj)
        // return update(ref(database), updates);
        try {
            const docRef = await addDoc(collection(database, "users"), {
                userInfo: obj,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
    return (
        <div className='App'>
            <div className="auth-form-container">
                <h1>Let's tackle cost of attendance together.</h1>
                <h2>Create New Account</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label className="label">Full Name</label>
                    <input className="input" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Full Name" />
                    <label className="label" htmlFor="email">Email</label>
                    <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="username@email.com" id="email" name="email"></input>

                    <label className="label" htmlFor="password">Password</label>
                    <input className="input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="" id="password" name="password"></input>

                    <label className="label" htmlFor="confirmpassword">Confirm Password</label>
                    <input className="input" value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="" id="confirmpassword" name="confirmpassword"></input>
                    <button type="submit">Login</button>
                </form>
                <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Have account? Login here!</button>
            </div>
        </div>

    )
}