import React from 'react';
import nimal from '../assets/purdue.jpg';
// import connor from '../assets/connor.jpg';
// import jimmy from '../assets/jimmy.jpg';

function About() {
    return (
        <div>
            <center>
                <div className='about-container'>
                    <div className='content'>
                        <span className='img-txt'>
                            <h1>Creators</h1>
                            <div className='creator-box'>
                                <div className='creator'>
                                    <img src={nimal} alt='Nimal' />
                                    <h5>Nimal Padmanabhan</h5>
                                    <br />
                                    <h6>Full-stack</h6>
                                </div>
                                <div className='creator'>
                                    <img src={nimal} alt='Nimal' />
                                    <h5>Connor Weatherly</h5>
                                    <br />
                                    <h6>Database and backend</h6>
                                </div>
                                <div className='creator'>
                                    <img src={nimal} alt='Nimal' />
                                    <h5>Jimmy Jin</h5>
                                    <br />
                                    <h6>HCI Expert</h6>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </center>
        </div>
    );
}

export default About;
