import React, { Component } from 'react';

import './EventCreation.css';
import NavBar from '../navbar/NavBar.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';



class CreateEventStep3 extends Component {

    constructor(props) {
        super(props);

        // Declare State
        this.state = {
        };
    }

    render() {
        return (
            <div id="eventCreation3">
                <NavBar/>
                <div className="inner-container">
                    <div className="header">
                        Create an Event
                    </div>
                    <div class="progress-container">
                        <ul class="progress">
                            <li class="active"></li>
                            <li class="active"></li>
                            <li class="active"></li>
                        </ul>
                    </div>
                    <div className = "box">
                        <div className="labels">
                            <label htmlFor="name">Dietary Restrictions</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="name"
                                className="allergy-input"></input>
                        </div>
                        <div className="labels">
                            <label htmlFor="name">Additional Information</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="name"
                                className="additional-input"></input>
                        </div>
                        <a
                            type="button"
                            className="next"
                            href="/"
                            onClick= {() => makeEvent()}
                            >Create
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

function makeEvent() {
    var allergy = document.getElementsByClassName("allergy-input");
    var additional = document.getElementsByClassName("additional-input");
    console.log("3rd event page");
    var obj = {allergy: allergy, additional: additional};
    Axios.post('http://localhost:9000/create-event', obj);
}

export default CreateEventStep3;