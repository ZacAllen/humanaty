import React, { Component } from 'react';

import './RegisterEvent.css';
import NavBar from '../navbar/NavBar.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';



class RegisterEvent extends Component {

    constructor(props) {
        super(props);

        // Declare State
        this.state = {
            value: null
        };
    }


    nextPage(e) {

    }

    render() {
        return (
            <div id="registerevent">
                <NavBar/>


            <div className="inner-container">
                <div className="header">
                    Attend Event
                </div>
                <div class="thisContainer">
                    <ul class="progress">
                        <li class="active"></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className = "box">
                    <div className="labels">
                        <label htmlFor="name">Event Title:</label>
                    </div>
                    <div className="labels">
                        <label htmlFor="name">Location:</label>
                    </div>
                    <div className="labels">
                        <label htmlFor="name">Host:</label>
                    </div>
                    <div className="labels">
                        <label htmlFor="name">Event Date:</label>
                    </div>
                    <div className="labels">
                        <label htmlFor="name">Event Time:</label>
                    </div>
                    <div className = "labels">
                        <label htmlFor="name">Number of Guests In Your Party:</label>
                        <input
                            type="number"
                            name="name"
                            defaultValue="1"
                            min="1"
                            className="number-of-guests"></input>
                    </div>
                    
                    
                </div>

            </div>
            <div className="notice">
                <p>*Note the exact location of this event will not be available to
                        guests until 48 hours before the meal</p>
            </div>
            </div>
        );
    }
}

   export default RegisterEvent;