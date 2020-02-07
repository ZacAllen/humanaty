import React, { Component } from 'react';

import './EventCreation.css';
import NavBar from '../navbar/NavBar.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';



class EventCreation extends Component {

    constructor(props) {
        super(props);

        // Declare State
        this.state = {
            value: null
        };
    }

    // render() {
    //     return (
    //
    //     );
    // }



    nextPage(e) {

    }

    render() {
        return (
            <div id="eventCreation">
                <NavBar/>


            <div className="inner-container">
                <div className="header">
                    Create an Event
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
                        <label htmlFor="name">Event Title</label>
                    </div>
                    <div className="input-group">

                        <input
                            type="text"
                            name="name"
                            className="name-input"
                            placeholder="My Event"/>
                    </div>
                    <div className="labels">
                        <label htmlFor="name">Street Address*</label>
                    </div>
                    <div className="input-group">

                        <input
                            type="text"
                            name="name"
                            className="name-input"
                            placeholder=" "/>
                    </div>
                    <div className="labels">
                        <label htmlFor="name">City</label>
                    </div>
                    <div className="labels">

                        <label htmlFor="name">State</label>
                    </div>
                    <div className="input-group">

                        <input
                        type="text"
                        name="name"
                        className="name-input"
                        placeholder=" "/>

                        <input
                            type="text"
                            name="name"
                            className="name-input"
                            placeholder=" "/>
                    </div>
                    <div className="labels">
                        <label htmlFor="name">Postal Code</label>
                    </div>
                    <div className="input-group">

                        <input
                            type="text"
                            name="name"
                            className="name-input"
                            placeholder=" "/>
                    </div>
                    <div className="labels">
                        <label htmlFor="name">Date</label>
                    </div>
                    <div className="labels">

                        <label htmlFor="name">Time</label>
                    </div>
                    <div className="input-group">

                        <input
                            type="date"
                            name="name"
                            className="name-input"
                            placeholder=" "/>

                        <input
                            type="time"
                            name="name"
                            className="name-input"
                            placeholder=" "/>
                    </div>


                    <button
                        type="button"
                        className="next"
                        onClick={this
                            .nextPage
                            .bind(this)}>Continue
                    </button>


                    {/* Code for the second event screen
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
                    <select className = "guests" value={this.state.value} onChange={this.handleChange}>
                        <option selected value="zero">0</option>
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                    </select>
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
                    <button
                        type="button"
                        className="next"
                        onClick={this
                            .nextPage
                            .bind(this)}>Continue
                    </button> */}

                    {/* Code for the third event screen
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
                        onClick={this
                            .nextPage
                            .bind(this)}>Create
                    </button> */}
                </div>

            </div>
                <div className="notice">
                    <p>*Note your exact location will not be available to
                        guests until 48 hours before the meal</p>
                </div>
            </div>
        );
    }
}

   export default EventCreation;