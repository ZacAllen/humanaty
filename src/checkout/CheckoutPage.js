import React, {Component} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';
import NavBar from '../navbar/NavBar.js';
import './CheckoutPage.css';

import axios from 'axios';

const stripePromise = loadStripe('pk_test_KsSBLHsah3N55vJsAQ7a8YDO00qx7rn3an');

class CheckoutPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            full_name: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            name_on_card: ''
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
                    <label htmlFor="name">Billing Information</label>
                    <div className="sectionheader">
                        <span class="numberCircle"><span>1</span></span>
                        <label htmlFor="name">Billing Address</label>
                        <div className="inputheader">
                            <label htmlFor="name">Full Name</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="full-name"
                                className="name-address-zip-input"
                                onChange={this.handleChange}/>
                        </div>
                        <div className="inputheader">
                            <label htmlFor="name">Street Address</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="address"
                                className="name-address-zip-input"
                                onChange={this.handleChange}/>
                        </div>
                        <div className="inputheader">
                            <label htmlFor="name">City</label>
                        </div>
                        <div className="inputheader">
                            <label htmlFor="name">State</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="city"
                                className="city-state-input"
                                onChange={this.handleChange}/>
                            <input
                                type="text"
                                name="state"
                                className="city-state-input"
                                onChange={this.handleChange}/>
                        </div>
                        <div className="inputheader">
                            <label htmlFor="name">Postal Code</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="zip"
                                className="name-address-zip-input"
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