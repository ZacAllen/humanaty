import React, { Component } from 'react';

import './EventCreation.css';
import NavBar from '../navbar/NavBar.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';



class EventCreation3 extends Component {

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
                    <div class="thisContainer">
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
                        <button
                            type="button"
                            className="next"
                            >Create
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default EventCreation3;