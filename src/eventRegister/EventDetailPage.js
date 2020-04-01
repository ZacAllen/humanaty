import React, { Component } from 'react';

import './EventDetailPage.css';
import NavBar from '../navbar/NavBar.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



class RegisterEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: null,
            title: this.props.location.state.title,
            location: this.props.location.state.location,
            date: this.props.location.state.date,
            cost: this.props.location.state.cost,
            meal: this.props.location.state.meal,
            guest: this.props.location.state.guest,
            hostId:this.props.location.state.hostId,
            accessibility: this.props.location.state.accessibility, 
            attendees: this.props.location.state.attendees,
            description:this.props.location.state.description,
            allergies: this.props.location.state.allergies,
            additionalInfo: this.props.location.state.additionalInfo,
            id: this.props.location.state.id,

            name: '',
            description: '',
            amount: 0,
            quantity: 0
        };
        console.log(this.state.title)
    }


    componentDidMount() {
 


    }

    render() {
        return (
            <div id="registerevent">
                <NavBar/>


            <div className="inner-container">
                <div className="detail-box">
                    <div className="modprice">
                        <label htmlFor="name">$ {this.state.cost}l</label> 
                    </div>
                    <div>
                        <ul class = "modseparate"></ul>
                    </div>
                    <div className="moddetails">
                        <label htmlFor="name">Dates</label> {this.state.date}
                        <input 
                        type="date"
                        className="number-of-guests"></input>
                    </div>
                    <div className="moddetails">
                        <label htmlFor="name">Guests</label>
                        <select id="guests" className="number-of-guests"> num value set at max event.guestNum? 
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
                    <button 
                        type="submit"  
                        className="reservebutton">Reserve</button>
                </div>
                <div className="event">
                    <label htmlFor="name">{this.state.title} </label>  
                </div>    
                <div className="host">
                    <img 
                        src="https://getdrawings.com/free-icon/google-account-icon-65.png"
                        className="acctimg"></img>
                    {/* <label htmlFor="name">{this.state.hostId.displayName}</label>   */}
                </div>
                <div className="detaildescriptions">
                    <label htmlFor="name"></label> 
                </div>
                <div>
                    <ul class = "detailseparate"></ul>
                </div>
                <div className="mealdescriptions">
                    <label htmlFor="name">{this.state.description}</label>
                </div>
                <div>
                    <ul class = "detailseparate"></ul>
                </div>
                <div className="detailheaders">
                    <label htmlFor="name">Menu Overview</label> 
                </div>
                
                <div className="detaildescriptions">
                    <label htmlFor="name">{this.state.meal}</label> 
                </div>
                <div>
                    <ul class = "detailseparate"></ul>
                </div>
                <div className="detailheaders">
                    <label htmlFor="name">Accessibility Accommodations?</label> {}
                </div>
                
                <div className="detaildescriptions">
                    <label htmlFor="name">{this.state.accessibility}</label>
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
                    <label htmlFor="name"></label>  {}
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