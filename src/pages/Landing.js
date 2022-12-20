import React from "react";
import './landing.css';
class Landing extends React.Component {
    render() {
        return (
            <div>
                <link rel="stylesheet" href="landing.css" />
                <div className="context"></div>
                <h1><center>Welcome to UniRecs!</center></h1>
                
                <form>
                    <div className="floating-placeholder">
                        <input type="text" name="inputBox" placeholder="First Name" />
                        { }
                    </div>
                    <div className="floating-placeholder">
                        <input type="text" name="inputBox" placeholder="Last Name" />
                        { }
                    </div>
                    <div className="floating-placeholder">
                        <input type="text" name="inputBox" placeholder="Graduation Year" />
                        { }
                    </div>

                    <div className="floating-placeholder">
                        <input type="text" name="inputBox" placeholder="City" />
                        { }
                    </div>
                    <div className="floating-placeholder">
                        <input type="text" name="inputBox" placeholder="State" />
                        { }
                    </div>
                    <div className="floating-placeholder">
                        <input type="text" name="inputBox" placeholder="Country" />
                        { }
                    </div>
                </form>
                {/* <button onclick={sayHello}>Let's go</button> */}
                <center><a href="/"><button>Start your search!</button></a></center>
                {/* <center><button onlick="window.location.href='www.google.com'">Start your search</button></center> */}

                <br />
                <br />
                <br />
                <center><h4>Your one stop shop to finding the perfect college fit!</h4></center>

                <center>Created by Nimal Padmanabhan, 2022-2023</center>
            </div>
        )
    }
}
export default Landing