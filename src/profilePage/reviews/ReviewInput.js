import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BeautyStars from 'beauty-stars';
import './Reviews.css';
import axios from 'axios';

class ReviewInput extends Component {

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
          const user = JSON.parse(JSON.stringify(res.data))
          self.setState({user: user})
        }
      }

    render() {
        const {showing} = this.state;
        const submitReview = () => {
            //get date
            var day = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            var date = month + '/' + day + '/' + year; 
            //rating
            var rating = this.state.value;
            //reviewbody
            var body = document.getElementById("reviewBody").value;
            //reviewee
            var profileuser = this.props.profileUser.id;
            //reviewer
            var currentuser = this.state.user.id;
            //is reviewer host
            var reviewedAsHost = this.state.user.hostVerified;

            console.log(date);
            console.log(rating);
            console.log(body);
            console.log(profileuser); 
            console.log(currentuser);
            console.log(reviewedAsHost);

            //object containing data necessary for review creation
            var obj = {date: date, rating: rating, reviewBody: body, reviewedAsHost: reviewedAsHost, 
                reviewee: profileuser, reviewer: currentuser};
            
            //get both users' events so we can check if they've actually attended an event together
            var currentUserEvents = this.state.user.eventsAttended.concat(this.state.user.eventsHosted);
            var profileUserEvents = this.props.profileUser.eventsAttended.concat(this.state.user.eventsHosted);

            //Check if both users have at least one shared event
            var sharesAnEvent =  currentUserEvents.some(item => profileUserEvents.includes(item));

            // Using alerts for now to check edge cases, feel free to comment out for testing
            if (profileuser === currentuser) {
                alert("You cannot leave a review of yourself!")
            } else if (!sharesAnEvent) {
                alert("You cannot review someone you have not shared an event with!")
            } else {
                    axios.post('http://localhost:9000/review/', obj).then(function(response) {
                    if (response) {
                        console.log(response);
                    } else {
                        console.log("No res");
                    }
                });  
            }   

              
        }
        return (
            <div class="review-input-container">
                <div class = "review-input-button">
                    <Button variant="primary" id = "reviewButton" onClick={() => this.setState({showing : true})}
                        className="mb-2"> 
                    Leave a Review
                    </Button>
                </div>
                {showing
                    ?<div>
                        <div>
                            
                        </div>
                        <BeautyStars value = {this.state.value} onChange={value => this.setState({value})}
                            size = {20}>
                
                        </BeautyStars>
                        <Form>
                        <Form.Control type = "text" id = "reviewBody" as="textarea" rows="3" />    
                        </Form>
                        <Button variant = "secondary" onClick={() => this.setState({showing: !showing, value: 0})}
                            className = "mt-1">
                            Cancel
                        </Button>
                        <Button onClick = {() => submitReview()} className = "mt-1 ml-2">
                            Submit
                        </Button>
                    </div>
                    :null
                }
                
            </div>
      );
    }

}

export default ReviewInput;


