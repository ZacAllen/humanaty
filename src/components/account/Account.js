import React, {useState} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './account.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Account(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
        setShow(false);
    }
    const handleCloseLogout = () => {
        setShow(false);
        axios.get('http://localhost:9000/logout').then((response) => {
            props.isLoggedOut();
            console.log(response.data);
        })
    }
    const handleShow = () => {
        setShow(true);
        //in handleShow we're setting the user's name, email, and status
        axios.get('http://localhost:9000/accountInfo').then(function(response) {
            //get user data object from backend
            setName(response.data.name)
            setEmail(response.data.email)
            if (response.data.isHost) {
                setMode("Host")
                setChecked(true)
            } else { //Setting checked status of toggle switch so its remembered on reload
                setMode("Guest")
                setChecked(false)
            }
        })
       
    }

    const handleModeChange = () => {
        axios.get('http://localhost:9000/accountInfo').then(function(response) {
            if (response.data.isHost) { //if host, change to guest
                axios.get('http://localhost:9000/changeStatus').then(function(response) {
                    console.log(response.data);
                })
                setMode("Guest")
                setChecked(false)
            } else {
                axios.get('http://localhost:9000/changeStatus').then(function(response) {
                    console.log(response.data);
                })
                setMode("Host") //vice versa
                setChecked(true)
            }
        })
    }

    //hooks for setting the state of name, email, mode, and toggle switch
    const [showName, setName] = useState(true)
    const [showEmail, setEmail] = useState(true)
    const [showMode, setMode] = useState(true)
    const [checkedState, setChecked] = useState(true)

    return (
        <div>
            {/* Will replace placeholder with actual image fetched from database; in the future users will have an
            image url field that we will get image from */}
            <img id = "profilePic" src={require('./placeholder.png')} alt="profile pic" onClick={handleShow}/>
            <Modal show = {show} onHide = {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your account</Modal.Title>
                </Modal.Header>
                <div class = "col-sm" id = "basicInfo">
                  <p  id="accName">{showName}</p> 
                  <p id="accEmail">{showEmail}</p>
                  <p>Member Since 2020</p>
                </div>

                <div class = "col-sm" id = "toggleMode">
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="customSwitches" checked = {checkedState}></input>
                        <p>Current Mode: {showMode} </p>
                        <label class="custom-control-label" for="customSwitches" onClick = {handleModeChange}>Host Mode</label>
                    </div>
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Settings
                    </Button>
                    <Button variant="primary" onClick={handleCloseLogout}>
                    Log Out
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Account;