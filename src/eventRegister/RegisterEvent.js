import React, { Component } from 'react';

import './RegisterEvent.css';
import Checkout from '../payment/Checkout.js';
import NavBar from '../navbar/NavBar.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class RegisterEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            amount: 0,
            quantity: 0
        };
    }

    render() {
        return (
            <div id="registerevent">
                <NavBar/>
            <div className="inner-container">
                <div className="box">
                    <div className="modprice">
                        <label htmlFor="name">$ /meal</label>
                    </div>
                    <div>
                        <ul class = "modseparate"></ul>
                    </div>
                    <div className="moddetails">
                        <label htmlFor="name">Dates</label>
                        <input 
                        type="date"
                        className="number-of-guests"></input>
                    </div>
                    <div className="moddetails">
                        <label htmlFor="name">Guests</label>
                        <select id="guests" className="number-of-guests">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        {/* <input
                            type="number"
                            name="name"
                            defaultValue="1"
                            min="1"
                            max="40"
                            className="number-of-guests"></input>  */}
                    </div>
                    <Checkout />
                </div>
                <div className="event">
                    <label htmlFor="name">EventTitleHere</label>
                </div>    
                <div className="host">
                    <img 
                        src="https://getdrawings.com/free-icon/google-account-icon-65.png"
                        className="acctimg"></img>
                    <label htmlFor="name">HostNameHere</label>
                </div>
                <div className="detaildescriptions">
                    <label htmlFor="name">Descriptor Descriptor Descriptor</label>
                </div>
                <div>
                    <ul class = "detailseparate"></ul>
                </div>
                <div className="mealdescriptions">
                    <label htmlFor="name">A basic description of meal/environment/whatever the host wants to put</label>
                </div>
                <div>
                    <ul class = "detailseparate"></ul>
                </div>
                <div className="detailheaders">
                    <label htmlFor="name">Menu</label>
                </div>
                
                <div className="detaildescriptions">
                    <label htmlFor="name">Menu description + ingredients etc</label>
                </div>
                <div>
                    <ul class = "detailseparate"></ul>
                </div>
                <div className="detailheaders">
                    <label htmlFor="name">House Rules</label>
                </div>
                
                <div className="detaildescriptions">
                    <label htmlFor="name">Children yes/no, no smoking, pet friendly, other info like that</label>
                </div>
                <div>
                    <ul class = "detailseparate"></ul>
                </div>
                <div className="detailheaders">
                    <label htmlFor="name">Cancellation Policy</label>
                </div>
                
                <div className="detaildescriptions">
                    <label htmlFor="name">Free cancellations provided up to 48 hours before event.</label>
                </div>
                <div>
                    <ul class = "detailseparate"></ul>
                </div>
                <div className="detailheaders">
                    <label htmlFor="name">Location</label>
                </div>
                <div class="mapouter">
                    <div class="gmap_canvas">
                        <iframe 
                        width="700" 
                        height="500" 
                        id="gmap_canvas" 
                        src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                        frameborder="0" 
                        scrolling="no" 
                        marginheight="0" 
                        marginwidth="0"></iframe>
                    </div>
                </div>
                <div className="detaildescriptions">
                    <p>*Note the exact location of this event will not be available to guests until 48 hours before the meal</p>
                </div>
            </div>
            </div>
        );
    }
}

export default RegisterEvent;