import React from 'react';
import './signup.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function SignUp(props) {
    return ( 
        <div>
            <div class = "signupContainer">
            {/* <!-- Create card width of 25% centered in page--> */}
                <div class = "col d-flex justify-content-center" id = "flexcontainer"> 
                    <div class="card w-50 p-3"> 
                        <div class = "card-header">Sign Up For huMANAty</div>
                        <div class="form-row">
                        
                        <div class = "form-group col-md-6">
                            <label for = "firstNameForm">First Name</label>
                                <input type="name" class="form-control" id="firstNameForm" placeholder="First name"></input>
                        </div>

                        <div class = "form-group col-md-6">
                            <label for = "lastNameForm">Last Name</label>    
                                <input type="name" class="form-control" id="lastNameForm" placeholder="Last name"></input>
                        </div>

                        <div class = "form-group col-md-6">
                            <label for = "emailForm">Email address</label>
                            <input type="email" class="form-control" id="emailForm" placeholder="email"></input>
                        </div>

                        <div class = "form-group col-md-6">
                            <label for = "lastNameForm">Password</label>    
                            <input type="password" class="form-control" id="passwordForm" placeholder="password"></input>
                        </div>

                        <p class = "DOB">Date of birth</p>
                                <div class="col-md-10">
                                    <input class="form-control" type="date" id = "dateForm" value="2020-02-20"></input>
                                </div> 

                        <a  class="btn btn-primary btn-lg btn-block" onClick= {() => signUp()}>Join huMANAty!</a>        

                        </div>
                    </div>
                </div>   
            </div>
        </div>
    );
    function signUp() {
        var email = document.getElementById("emailForm").value;
        var password = document.getElementById("passwordForm").value;
        var name = document.getElementById("firstNameForm").value + " " + document.getElementById("lastNameForm").value;
        var DOB = document.getElementById("dateForm").value;
      
        var obj = {email: email, password: password, name: name, DOB: DOB};
        axios.post('http://localhost:9000/signUp', obj);
      
        console.log(obj);
        window.location.href='../';
    }
    
};


export default SignUp;