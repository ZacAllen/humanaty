import React, { Component } from 'react';
import './ProfilePage.css';

class ProfilePage extends Component {
  
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
        user : {}
    };
  }

  componentDidMount() {
      //TODO pull user objct from backend
      var user = {
          name : "Bang",
          aboutMe : "I am a cat",
      }

      this.setState({ user: user});
      console.log("user", this.state);
  }

  render() {
    return (
      <div id="profile-page-container">

        <div class="section" id="avatar">
            <label>Host Name </label>
            <div>{this.state.user.name}</div>
        </div>

        <div class="section" id="about-me">
            <label>About Me </label>
            <div>{this.state.user.aboutMe}</div>
        </div>

        <div class="section" id="past-experience">
            <label>Past Experiences </label>
            <div>Chau</div>
        </div>

        <div class="section"id="reviews">
            <label>Reviews </label>
            <div id="reviews-item">
                <div>Chau</div>
            </div>
        </div>
       
      </div>
      
    );
  }
}

export default ProfilePage;