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
                    <div className="modseparate">
                        {/* figure out how to put a line in */}
                    </div>
                    <button type="submit">Reserve</button>
                    
                </div>
                    
                <div className="host">
                    <label htmlFor="name">Hostnamehere</label>
                </div>
                <div className = "details">
                    <label htmlFor="name">Number of Guests In Your Party:</label>
                    <input
                        type="number"
                        name="name"
                        defaultValue="1"
                        min="1"
                        max="40"
                        className="number-of-guests"></input> 
                </div> 

                <div className="notice">
                    <p>*Note the exact location of this event will not be available to guests until 48 hours before the meal</p>
                </div>
                
                
            </div>
            
            
            </div>
        );
    }
}

   export default RegisterEvent;