// import e from "express";
import React, { useState } from "react";
export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    return (
        <div className="App">
            <div className="auth-form-container">
                <h1>Welcome again!</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label for="email">Email</label>
                    <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="username@email.com" id="email" name="email"></input>

                    <label for="password">Password</label>
                    <input className="input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="************" id="password" name="password"></input>
                    <button type="submit">Login</button>
                </form>
                <button className="link-btn" onClick={() => props.onFormSwitch('register')}>No account? Register here!</button>
            </div>
        </div>

    )
}