import React, {Component} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';
import NavBar from '../navbar/NavBar.js';
import './CheckoutPage.css';

import axios from 'axios';

const stripePromise = loadStripe('pk_test_KsSBLHsah3N55vJsAQ7a8YDO00qx7rn3an');

class CheckoutPage extends Component {
    render() {
        return (
            <Elements stripe={stripePromise}>
            <div id="registerevent">
                <NavBar/>
                <div className="event">
                    <label htmlFor="name">Billing Information</label>
                    <div className="sectionheader">
                        <label htmlFor="name">Billing Address</label>
                    </div>
                    <div>
                        <ul class = "sectionseparate"></ul>
                    </div>
                    <div className="sectionheader">
                        <label htmlFor="name">Payment Details</label>
                    </div>
                </div>
            </div>
            </Elements>
        );
    }
}

export default CheckoutPage;