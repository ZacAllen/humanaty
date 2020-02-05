import React, { Component } from 'react';

import NavBar from '../navbar/NavBar.js';

class EventCreation extends Component {
  
    constructor(props) {
      super(props);
  
      // Declare State
      this.state = {
      };
    }
  
    render() {
      return (
        <div id="eventCreation">
          <NavBar/>
        </div>
      );
    }
  }
  
  export default EventCreation;