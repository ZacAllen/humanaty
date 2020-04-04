import React, {useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import render from 'react-dom';
import GoogleLogin from 'react-google-login';


function Login(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    // Google Sign in---------------------------------------------------------------------------------------------------
    const responseGoogle = (response) => { //response is a googleUser object
        const profile = response.getBasicProfile();
        console.log(profile.getName());
        console.log(response);
        var id_token = response.getAuthResponse().id_token;
        /* For some reason sending the raw id token wouldn't work even tho google documentation said it should, so i'm 
        sending it as part of an object with all the other requisite parts to send to the db */
        var obj = {token: id_token, name: profile.getName(), email: profile.getEmail(), DOB: "---"};
        axios.post('http://localhost:9000/loginGoogle', obj);
        props.isLoggedIn();
        setShow(false);
    }
    const responseGoogleFail = (response) => {
        console.log("FALURE");
    }
    // On board login---------------------------------------------------------------------------------------------------
    const handleCloseLogin = () => {
        var email = document.getElementById("emailLogin").value;
        var password = document.getElementById("passwordLogin").value;
        var obj = {email: email, password: password};
        console.log(obj);
        axios.post('http://localhost:9000/login', obj).then(function(response) {
            if (response.data) { 
                console.log(response.data)
                setShow(false);
                props.isLoggedIn();
            } else {
                //show some error message?
                console.log(response.data);
                console.log("Login failed");
            }
        });
        
        
    }

    return (
      <>
        <Button variant="primary" onClick={handleShow} id = "loginButton">
          Log in
        </Button>
        
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome to huMANAty!</Modal.Title>
          </Modal.Header>
          {/* Email */}
          <Modal.Body>Your email</Modal.Body>
          <input class = "emailpassword" type="text" placeholder="email"
                  id = "emailLogin"></input>
          {/* Password */}
          <Modal.Body>Your password</Modal.Body>
          <input class = "emailpassword" type="password" placeholder="password"
                  id = "passwordLogin"></input>  
          {/* Google Sign in */}  
          <Modal.Body>Sign in with Google</Modal.Body>  
          <GoogleLogin 
            
            clientId="129035646582-a4ttt51j5jt7iqfur98kdr214cmc5p1r.apps.googleusercontent.com"
            buttonText="G-Sign in"
            onSuccess={responseGoogle}
            onFailure={responseGoogleFail}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}

            // render={renderProps => (
            //   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
            // )}

            >

            </GoogleLogin>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseLogin}>
              Log In
            </Button>
            <p>Don't have an account?</p>
            <p>Create one here!</p>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
// render(<Login />);
export default Login;
