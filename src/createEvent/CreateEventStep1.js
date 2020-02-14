import React, { Component } from 'react';

import './EventCreation.css';
import NavBar from '../navbar/NavBar.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

class CreateEventStep1 extends Component {
    constructor(props) {
        super(props);
        // Declare State
        this.state = {
            value: null
        };
    }
    render() {
        return (
            <div id="eventCreation">
            <NavBar/>
            <div className="inner-container">
                <div className="header">
                    Create an Event
                </div>
                <div class="progress-container">
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
                            className="address-input"
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
                            className="city-input"
                            placeholder=" "/>
                        <input
                            type="text"
                            name="name"
                            className="state-input"
                            placeholder=" "/>
                    </div>
                    <div className="labels">
                        <label htmlFor="name">Postal Code</label>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            className="zip-input"
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
                            className="date-input"
                            placeholder=" "/>
                        <input
                            type="time"
                            name="name"
                            className="time-input"
                            placeholder=" "/>
                    </div>
                    <a button
                        type="button"
                        className="next"
                        href="/create-event2"
                        onClick= {() => makeEvent()}
                        >Continue
                    </a>
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

function makeEvent() {
    var name = document.getElementsByClassName("name-input");
    var address = document.getElementsByClassName("address-input");
    var city  = document.getElementsByClassName("city-input");
    var state = document.getElementsByClassName("state-input");
    var zip = document.getElementsByClassName("zip-input");
    var date = document.getElementsByClassName("date-input");
    var time = document.getElementsByClassName("time-input");
    var obj = {name: name, address: address, city: city, state: state,
                zip: zip, date: date, time: time};
    Axios.post('http://localhost:9000/create-event', obj);
}

export default CreateEventStep1;