import React, { Component } from 'react';
import './footer.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Footer extends React.Component {


  constructor(props) {
    super(props);

    // Declare State
    this.state = {
    };
  }

  render() {
    return (
      <div>
      <footer className="py-5 bg-dark">
          <div className="container">
            <p className="m-0 text-center text-white">Copyright &copy; Humanaty 2020</p>
          </div>
        </footer>
    </div>
    );
  }
}

export default Footer;
    