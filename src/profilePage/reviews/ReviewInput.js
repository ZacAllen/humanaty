import React, { Component, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BeautyStars from 'beauty-stars';
import './Reviews.css';
import axios from 'axios';

class ReviewInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showing: false, value: 0, user : null}
    }
   
    componentDidMount() {
        this.getUser();
    }

    getUser = async () => {
        var self = this;
        const res = await axios.get('http://localhost:9000/current');
        if (res) {
          console.log("current user ", res.data);
          const user = JSON.parse(JSON.stringify(res.data.id))
          self.setState({user: user})
        }
      }

    render() {
        const {showing} = this.state;
        const submitReview = () => {
            var day = new Date().getDate();
            var month = new Date().getMonth();
            var year = new Date().getFullYear();
            var date = month + '/' + day + '/' + year; 
            
            var rating = this.state.value;

            //body = getelementbyid "reviewBody" value
            
            var profileuser = this.props.profileUser.id;
            var currentuser = this.state.user;
            
             

            // var obj = {};
            // axios.post('http://localhost:9000/create-review', obj)
            console.log(date);
            console.log(rating);
            console.log(profileuser); 
            console.log(currentuser);
        }
        return (
            <div class="review-input-container">
                <div class = "review-input-button">
                    {/* Later, replace onclick with a method that includes user checking etc */}
                    <Button variant="primary" id = "reviewButton" onClick={() => this.setState({showing : true})}> 
                    Leave a Review
                    </Button>
                </div>
                {showing
                    ?<div>
                        <div>
                            
                        </div>
                        <BeautyStars value = {this.state.value} onChange={value => this.setState({value})}>
                
                        </BeautyStars>
                        <Form>
                        <Form.Control type = "text" id = "reviewBody"/>    
                        </Form>
                        <Button variant = "secondary" onClick={() => this.setState({showing: !showing, value: 0})}>
                            Cancel
                        </Button>
                        <Button 
                        onClick = {() => submitReview()}
                        >Submit</Button>
                    </div>
                    :null
                }
                
            </div>
      );
    }

}

export default ReviewInput;


