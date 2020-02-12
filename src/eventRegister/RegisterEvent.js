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
                    event title here
                </div>
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
                        {/* <select id="guests">
                            <option value="volvo">1</option>
                            <option value="saab">2</option>
                            <option value="opel">3</option>
                            <option value="audi">4</option>
                            <option value="volvo">5</option>
                            <option value="saab">6</option>
                            <option value="opel">7</option>
                            <option value="audi">8</option>
                            <option value="volvo">9</option>
                            <option value="saab">10</option>
                            <option value="opel">11</option>
                            <option value="audi">12</option>
                            <option value="opel">13</option>
                            <option value="audi">14</option>
                            <option value="opel">15</option>
                            <option value="audi">16</option>
                        </select> */}
                        <input
                            type="number"
                            name="name"
                            defaultValue="1"
                            min="1"
                            max="40"
                            className="number-of-guests"></input> 
                    </div>
                    <button 
                        type="submit"  
                        className="reservebutton">Reserve</button>
                </div>
                    
                <div className="host">
                    {/* put account image here */}
                    <label htmlFor="name">Hostnamehere</label>
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