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
            <Modal.Title>
              <h3 class = "loginTitle">Welcome to huMANAty!</h3>
            </Modal.Title>
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
          <Modal.Body><p class = "or">OR</p></Modal.Body>  
          <div class = "googleButton">
          <GoogleLogin 
            
            clientId="129035646582-a4ttt51j5jt7iqfur98kdr214cmc5p1r.apps.googleusercontent.com"
            buttonText="Log in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogleFail}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}

            render={renderProps => (
              <div class = "buttonContainer">
                <img src = {'G.png'} class = "gLogo"></img>
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}
              style={{backgroundColor: '#5989FF',
                      height: '40px',
                      width: '70%',
                      borderRadius: '5px',
                      border: 'none',
                      color: 'white',
                      fontWeight: 'bold',
                      paddingLeft: '10%'}}
              >Sign in with Google</button>

              </div>
            )}

            >

            </GoogleLogin>
          </div>
          
          <Modal.Footer>
            <Button variant="primary" block onClick={handleCloseLogin} style = {{
              fontWeight: 'bold'
            }}>
            Log In
            </Button>
            
            <p class = "noAcc">Don't have an account?</p>
            <p class = "createAcc" onClick= {event => window.location.href='../signup'}>Create one here!</p>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
// render(<Login />);
export default Login;
