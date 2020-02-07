import React, { Component } from 'react';

import NavBar from '../navbar/NavBar.js';

class RegisterEvent extends Component {

    constructor(props) {
      super(props);

      // Declare State
      this.state = {
      };
    }

    render() {
      return (
        <div id="registerevent">
          <NavBar/>
        </div>
      );
    }
  }

  export default RegisterEvent; 