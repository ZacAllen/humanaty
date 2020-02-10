import React, { Component } from 'react';
import './Footer.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Footer extends Component {


  constructor(props) {
    super(props);

    // Declare State
    this.state = {
    };
  }

  render() {
    return (
      <div>
      <footer class="py-5 bg-dark"> 
          <div class="container">
            <p class="m-0 text-center text-white">Copyright &copy; Humanaty 2020</p>
          </div>
        </footer>
    </div>
    );
  }
}

export default Footer;
    