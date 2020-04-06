import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './ProfilePage.css';
import EventThumbnails from './eventThumbnails/EventThumbnails';
import Reviews from './reviews/Reviews';
import ReviewInput from './reviews/ReviewInput';
import axios from 'axios';
import BeautyStars from 'beauty-stars';

class ProfilePage extends Component {
  
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
        user : {},
        eventsHosting : [],
        eventsHosted : [],
        eventsAttending: [],
        eventsAttended: [],
        reviews: [],
        selectedEvent: {}
    };
  }

  componentDidMount() {
    this.getUser(this.props.location.state.user.id);
  }

  getUser = async (id) => {
    var self = this;
    const res = await axios.get('http://localhost:9000/user/' + id);
    if (res) {
      console.log("did mount: ", res.data);
      const user = JSON.parse(JSON.stringify(res.data))
      self.setState({user: user});
    }

    Promise.all(this.state.user.eventsAttending.map(event => this.getAttendingEvents(event)));
    Promise.all(this.state.user.eventsAttended.map(event => this.getAttendedEvents(event)));
    Promise.all(this.state.user.eventsHosting.map(event => this.getHostingEvents(event)));
    Promise.all(this.state.user.eventsHosted.map(event => this.getHostedEvents(event)));
    Promise.all(this.state.user.reviews.map(review => this.getReviews(review)));
    // Promise.all(this.state.reviews.map(review => this.getReviewers(review)));
  }

  getReviews = async (review) => {
    let reviews = this.state.reviews;
    let res = await axios.get(`http://localhost:9000/review/${review}/`);
    let reviewerId = res.data.reviewer;
    let reviewer = await axios.get(`http://localhost:9000/user/${reviewerId}/`);
    res.data.reviewer = reviewer.data;
    reviews.push(res.data);
    this.setState({ reviews });
    return res;
  }

  getAttendingEvents = async (e) => {
    let eventsAttending = this.state.eventsAttending;
    let res = await axios.get(`http://localhost:9000/event/${e}/`);
    eventsAttending.push(res.data);
    this.setState({ eventsAttending });
    return res;
  }

  getAttendedEvents = async (e) => {
    let eventsAttended = this.state.eventsAttended;
    let res = await axios.get(`http://localhost:9000/event/${e}/`);
    eventsAttended.push(res.data);
    this.setState({ eventsAttended });
    return res;
  }

  getHostingEvents = async (e) => {
    let eventsHosting = this.state.eventsHosting;
    let res = await axios.get(`http://localhost:9000/event/${e}/`);
    eventsHosting.push(res.data);
    this.setState({ eventsHosting });
    return res;
  }

  getHostedEvents = async (e) => {
    let eventsHosted = this.state.eventsHosted;
    let res = await axios.get(`http://localhost:9000/event/${e}/`);
    eventsHosted.push(res.data);
    this.setState({ eventsHosted });
    return res;
  }

  viewEventDetail = async (e) => {
    console.log(e);
     
    this.props.history.push({
    pathname: '/event-detail', 
    state: {  title: e.title, location: e.location, date: e.date,
      cost: e.costPerSeat, meal: e.meal, guest: e.guestNum, hostID: e.hostID,
      accessibility: e.accessibilityAccommodations, attendees: e.attendees,
       description: e.description, allergies: e.allergies, 
       additionalInfo: e.additionalInfo, id: e.id}
    
  })
  }

  viewProfilePage = async (e) => {
    console.log("BANG:  ", e);
    this.setState({ 
      user : {},
      eventsHosting : [],
      eventsHosted : [],
      eventsAttending: [],
      eventsAttended: [],
      reviews: [],
      selectedEvent: {}});
    this.getUser(e.id);
  }

  render() {
    let user = this.state.user;
    console.log("STATE RENDER REVIEWS", this.state.reviews);
    return (
      <div id="profile-page-container">

        <div class="section" id="profile-header">
            <img class="profile-img" src={user.photoURL}/>
            
            <div id="profile-name">
              <div>{user.displayName}</div>
              <div style={user.hostVerified ? {} : { display: 'none' }} id="rating"> <BeautyStars value={user.hostRating} size="12" activeColor="#ebb134"/></div>
              <div style={!user.hostVerified ? {} : { display: 'none' }} id="rating"> <BeautyStars value={user.guestRating} size="16"activeColor="#ebb134"/></div>
            </div>
            
        </div>

        <hr></hr>

        <div class="section" id="about-me">
            <label>About Me </label>
            <div>{user.aboutMe}</div>
        </div>

        <hr></hr>

        <div class="section" style={user.hostVerified ? {} : { display: 'none' }} id="eventsHosted">  
            <label>{user.displayName}'s Hosted Events </label>
            <EventThumbnails eventList={this.state.eventsHosted} viewEventDetail={this.viewEventDetail}/>
            <a class="EventDetail" id = "eventDetailPage" href="/event-detail" />
        </div>

        <div class="section" style={user.hostVerified ? {} : { display: 'none' }} id="eventsHosting">  
            <label>{user.displayName}'s Upcoming Events </label>
            <EventThumbnails eventList={this.state.eventsHosting} viewEventDetail={this.viewEventDetail}/>
            <a class="EventDetail" id = "eventDetailPage" href="/event-detail" />
        </div>

        <div class="section" style={!user.hostVerified ? {} : { display: 'none' }} id="eventsAttending">  
            <label>{user.displayName}'s Upcoming Experiences </label>
            <EventThumbnails eventList={this.state.eventsAttending} viewEventDetail={this.viewEventDetail}/>
            <a class="EventDetail" id = "eventDetailPage" href="/event-detail" />
        </div>

        <div class="section" style={!user.hostVerified ? {} : { display: 'none' }} id="eventsAttended">  
            <label>{user.displayName}'s Past Experiences </label>
            <EventThumbnails eventList={this.state.eventsAttended} viewEventDetail={this.viewEventDetail}/>
            <a class="EventDetail" id = "eventDetailPage" href="/event-detail" />
        </div>

        <hr></hr>
        <ReviewInput profileUser = {this.state.user}></ReviewInput>
        <div class="section"id="reviews">
            <label>Reviews </label>
            
            
            <Reviews reviews={this.state.reviews} viewProfilePage={this.viewProfilePage}></Reviews>

        </div>
       
      </div>
      
    );
  }
}

export default ProfilePage;
