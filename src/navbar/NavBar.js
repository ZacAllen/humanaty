import React, {Component} from 'react';
import './NavBar.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Login from '../login/Login.js';
import Account from '../components/account/Account.js';
import SignUp from '../signUp/SignUp.js';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false}
    this.loggedInHandler = this.loggedInHandler.bind(this);
    this.loggedOutHandler = this.loggedOutHandler.bind(this);
  }

  loggedInHandler() {
    console.log("STATE CHANGED - LOGGED IN");
    this.setState({
      loggedIn: true
    })
  }
  loggedOutHandler() {
    console.log("STATE CHANGED - LOGGED OUT");
    this.setState({
      loggedIn: false
    })
  }

  componentDidMount() {
    let navbarComponent  = this; //this is so we can reference the component inside the callback to the api
    axios.get('http://localhost:9000/isUserLoggedIn').then(function(response) {
      if (response.data) {
        navbarComponent.setState({loggedIn: true})
      } else {
        navbarComponent.setState({loggedIn: false})
      }
    })
  }
  componentDidUpdate() {
    let navbarComponent  = this; //this is so we can reference the component inside the callback to the api
    if (!this.state.loggedIn) { //if not logged in; this is to prevent infinite component update loop
      axios.get('http://localhost:9000/isUserLoggedIn').then(function(response) {
        if (response.data) {
          navbarComponent.setState({loggedIn: true})
        } else {
          // navbarComponent.setState({loggedIn: false})
        }
      })
    }

  }

  render() {
    if (this.state.loggedIn == true) {
      return (
        <div>  
          <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div class = "container">
              <a class="navbar-brand js-scroll-trigger" id = "humanatyTitle" href="/">huMANAty</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger">Explore</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger">About</a>
                </li>
                <li class="nav-item" id = "create">
                  <a class="nav-link js-scroll-trigger" id = "createEvent" href="/create-event" >Create</a>
                </li>
                <li class="nav-item" id = "account">
                 <Account isLoggedOut = {this.loggedOutHandler}/>
                </li>
              </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    } else { 
      return (
        <div>  
          <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div class = "container">
              <a class="navbar-brand js-scroll-trigger" id = "humanatyTitle" href="/">huMANAty</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger">Explore</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger">About</a>
                </li>
                <li class="nav-item" id = "login">
                  <Login isLoggedIn = {this.loggedInHandler}/>
                  {/* <a class="nav-link" id = "loginClick" onClick>Login</a> */}
                </li>
                <li class="nav-item" id = "signup">
                 <a class="nav-link" id = "signupClick" onClick= {event => window.location.href='../signup'}>Sign Up</a>
                </li>
              </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }

  }

};


export default NavBar;