import React, { Component } from 'react';

import './EventCreation.css';
import NavBar from '../navbar/NavBar.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';



class EventCreation2 extends Component {

    constructor(props) {
        super(props);

        // Declare State
        this.state = {
        };
    }

    render() {
        return (
            <div id="eventCreation2">
                <NavBar/>

                <div className="inner-container">
                    <div className="header">
                        Create an Event
                    </div>
                    <div class="progress-container">
                        <ul class="progress">
                            <li class="active"></li>
                            <li class="active"></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className = "box">
                        <div className = "labels">
                            <label htmlFor="name">Meal Type</label>
                        </div>
                        <select className = "meals" value={this.state.value} onChange={this.handleChange}>
                            <option value="breakfast">Breakfast</option>
                            <option value="brunch">Brunch</option>
                            <option value="lunch">Lunch</option>
                            <option selected value="dinner">Dinner</option>
                        </select>
                        <div className = "labels">
                            <label htmlFor="name">Number of Guests</label>
                        </div>
                        <div className = "input-group">
                            <input
                                type="text"
                                name="guest"
                                className="guests"></input>
                        </div>
                        <div className = "labels">
                            <label htmlFor="name">Meal Description</label>
                        </div>
                        <div className = "input-group">
                            <input
                                type="text"
                                name="meal"
                                className="meal-input">
                            </input>
                        </div>
                        <a button
                            type="button"
                            className="next"
                            href="/event3"
                            >Continue
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

function makeEvent() {
    var meal = document.getElementsByClassName("meals");
    var guest = document.getElementsByClassName("guests");
    var description = document.getElementsByClassName("meal-input");

    var obj = {meal: meal, guest: guest, description: description};
    Axios.post('http://localhost:9000/signUp', obj);
}

export default EventCreation2;