import React from 'react';
import './NavBar.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const NavBar = () => {
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
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger">Create</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id = "loginClick">Login</a>
            </li>
            <li class="nav-item">
             <a class="nav-link" id = "signupClick" onClick= {() => testMakeUser()}>Sign Up</a>
            </li>
          </ul>
          </div>
        </div>
      </nav>

    </div>
  );
};

function testMakeUser() {
  
  var testEmail = "MRTEST@gmail.com";
  var testPassword = "testword123";

  var obj = {email: testEmail, password: testPassword};
  axios.post('http://localhost:9000/signUp', obj);

  console.log(obj);
  
   
}

export default NavBar;