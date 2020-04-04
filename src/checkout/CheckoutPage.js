import React, {Component} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';
import NavBar from '../navbar/NavBar.js';
import './CheckoutPage.css';

import axios from 'axios';
import RegisterEvent from '../eventRegister/EventDetailPage';
import { registerVersion } from 'firebase';

const stripePromise = loadStripe('pk_test_KsSBLHsah3N55vJsAQ7a8YDO00qx7rn3an');

class CheckoutPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.location.state.title,
            date: this.props.location.state.date,
            location: this.props.location.state.location,
            cost: this.props.location.state.cost,
            guest: this.props.location.state.cost,
            hostID: this.props.location.state.hostID,
            attendees: this.props.location.state.attendees,
            description: this.props.location.state.description,
            id: this.props.location.state.id,
            meal: this.props.location.state.meal,
            full_name: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        }
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <Elements stripe={stripePromise}>
            <div id="registerevent">
                <NavBar/>
                <div className="event">
                    <div className="summarybox">
                        <label htmlFor="name" className="reservationHeader">Reservation Summary</label>
                        <div>
                            <ul class = "modseparate"></ul>
                        </div>
                        <div className="summaryboxdetails">
                            <label className="summaryboxdetails">{this.state.meal} with {this.state.hostID}</label>
                        </div>
                        <div className="reservationHeader">
                            <label className="reservationHeader">{this.state.title}</label>
                        </div>
                        <div className="summaryboxdetails">
                            <label className="summaryboxdetails">{this.state.location.city}, {this.state.location.state}</label>
                        </div>
                        <div>
                            <ul class = "modseparate"></ul>
                        </div>
                        <div className="summaryboxdetails">
                            <label className="summaryboxdetails">{this.state.date}</label>
                        </div>
                        <div>
                            <ul class = "modseparate"></ul>
                        </div>
                        <div className="summaryboxdetails">
                            <label className="summaryboxdetails">{this.state.attendees} guests x {this.state.cost}</label>
                        </div>
                        <div>
                            <ul class = "modseparate"></ul>
                        </div>
                        <div className="reservationHeader">
                            <label className="reservationHeader">Total</label>
                        </div>
                    </div>
                    
                    <label className="cancellation">Free cancellation up to 48 hours before event. </label>
                    <label htmlFor="name">Billing Information</label>
                    <div className="sectionheader">
                        <span className="numberCircle"><span>1</span></span>
                        <label htmlFor="name">Billing Address</label>
                        <div className="inputheader">
                            <label htmlFor="name">Full Name</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="full_name"
                                className="name-address-input"
                                value={this.state.full_name}
                                onChange={this.handleChange}/>
                        </div>
                        <div className="inputheader">
                            <label htmlFor="name">Street Address</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="address"
                                className="name-address-input"
                                value={this.state.address}
                                onChange={this.handleChange}/>
                        </div>
                        <div id="block-container">
                            <div id="bloc1">
                            <div className="inputheader">
                                <label htmlFor="name">City</label>
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    name="city"
                                    className="city-state-input"
                                    value={this.state.city}
                                    onChange={this.handleChange}/>
                            </div>
                            </div>
                            <div id="bloc2">
                            <div className="inputheader">
                                <label htmlFor="name">State</label>
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    name="state"
                                    className="city-state-input"
                                    value={this.state.state}
                                    onChange={this.handleChange}/>
                            </div>
                            </div>
                        </div>
                        <div className="inputheader">
                            <label htmlFor="name">Postal Code</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="zip"
                                className="zip-input"
                                value={this.state.zip}
                                onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="sectionheader">
                        <span class="numberCircle"><span>2</span></span>
                        <label htmlFor="name">Payment Details</label>
                        <div className="inputheader">
                            <CheckoutForm />
                        </div>
                    </div>
                </div>
            </div>
            </Elements>
        );
    }
}

export default CheckoutPage;