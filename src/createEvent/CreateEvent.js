import React, { Component } from 'react';

import './EventCreation.css';
import NavBar from '../navbar/NavBar.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      title:  '',
      address: '', 
      city: '',
      state: '',
      zip: '',
      date: '',
      meal: '',
      guestNum: '',
      description: '',
      allergies: '',
      additionalInfo: '', 
      costPerSeat: '',
      hostId: '' ,
      accessibilityAccommodations: '',   
      errors: {
        name: '',
        address: '',
      }
    };
  }
  
  handleChange = event => {
    const {name, value} = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'name': 
        errors.name = 
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
      case 'address': 
        errors.address = value.toString().trim().length < 8;
        break;
      case 'city': 
  
        break;
      default:
        break;
    }  

    this.setState({
      [name]: value
    })    
  }
    
  // Posts the different responses to the backend 
  handleSubmit = event => {
    var obj = {title: this.state.title,location: this.state.location, date: this.state.date,
      costPerSeat: this.state.costPerSeat, meal: this.state.meal, guestNum: this.state.guestNum, hostId:this.state.hostId,
      accessibilityAccommodations: this.state.accessibilityAccommodations, attendees: this.state.attendees,
       description: this.state.description, allergies: this.state.allergies, 
       additionalInfo: this.state.additionalInfo, id: this.state.id, address: this.address, state: this.state.state,
      city: this.state.city, zip: this.state.zip}
    axios.post('http://localhost:9000/create-event', obj).then(res => {
      console.log(res);
      console.log(res.data);
    })

 
  }
   
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2 ? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }
  
  /*
  * the functions for our button
  */
  previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep !== 1){
      return (
        <button 
          className="btn btn-secondary" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      )
    }
    return null;
  }
  
  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep < 3){
      return (
        <button 
          className="btn btn-primary" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
    return null;
  }
    
  render() {    
    return (
      <React.Fragment>
      <div id="eventCreation">
        <NavBar/>
      </div>

      <form onSubmit={this.handleSubmit}>
      {/* 
        render the form steps and pass required props in
      */}
      <Step1 
        currentStep={this.state.currentStep} 
        handleChange={this.handleChange}
        title={this.state.title}
        address={this.state.address}
        city={this.state.city}
        state={this.state.state}
        zip={this.state.zip}
        date={this.state.date}
        // time={this.state.time}
      />
      <Step2 
        currentStep={this.state.currentStep} 
        handleChange={this.handleChange}
        meal={this.state.meal}
        guestNum={this.state.guestNum}
        description={this.state.description}
      />
      <Step3 
        currentStep={this.state.currentStep} 
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        allergies={this.state.allergies}
        additionalInfo={this.state.additionalInfo}
      />
      {this.previousButton()}
      {this.nextButton()}
      </form>
      </React.Fragment>
    );
  }
}
  
  function Step1(props) {
    if (props.currentStep !== 1) {
      return null
    } 
    return(
      <div className="inner-container">
        <div className="header">
          Create an Event
        </div>
        <div class="progress-container">
          <ul class="progress">
            <li class="active"></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className = "box">
          <div className="labels">
            <label htmlFor="name">Event Title</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="name"
              className="name-input"
              value={props.name}
              onChange={props.handleChange}
              placeholder="My Event"/>
          </div>
          <div className="labels">
            <label htmlFor="name">Street Address*</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="address"
              className="address-input"
              value={props.address}
              onChange={props.handleChange}
              placeholder=" ">
            </input>
          </div>
          <div className="labels">
            <label htmlFor="name">City</label>
          </div>
          <div className="labels">
            <label htmlFor="name">State</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="city"
              className="city-input"
              value={props.city}
              onChange={props.handleChange}
              placeholder=" ">
            </input>
            <input
              type="text"
              name="state"
              className="state-input"
              value={props.state}
              onChange={props.handleChange}
              placeholder=" ">
            </input>
          </div> 
          <div className="labels">
            <label htmlFor="name">Postal Code</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="zip"
              className="zip-input"
              value={props.zip}
              onChange={props.handleChange}
              placeholder=" "/>
          </div>
          <div className="labels">
            <label htmlFor="name">Date</label>
          </div>
          <div className="labels">
            <label htmlFor="name">Time</label>
          </div>
          <div className="input-group">
            <input
              type="date"
              name="date"
              className="date-input"
              value={props.date}
              onChange={props.handleChange}
              placeholder=" ">
            </input>
            <input
              type="time"
              name="time"
              className="time-input"
              value={props.time}
              onChange={props.handleChange}
              placeholder=" ">
            </input>
          </div>
        </div>
      </div>
    );
  }
  
  function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <div className="inner-container">
        <div className="header">
          Create an Event
        </div>
        <div class="progress-container">
          <ul class="progress">
            <li class="active"></li>
            <li class="active"></li>
            <li></li>
          </ul>
        </div>
        <div className = "box">
          <div className = "labels">
            <label htmlFor="name">Meal Type</label>
          </div>
          <select className = "meals" defaultValue={'default'} onChange={props.handleChange}>
            <option>Breakfast</option>
            <option>Brunch</option>
            <option>Lunch</option>
            <option value='default'>Dinner</option>
          </select>
          <div className = "labels">
            <label htmlFor="name">Number of Guests</label>
          </div>
          <div className = "input-group">
            <input
              type="text"
              name="guestNum"
              className="guests"
              value={props.guestNum}
              onChange={props.handleChange}>
            </input>
          </div>
          <div className = "labels">
            <label htmlFor="name">Meal Description</label>
          </div>
          <div className = "input-group">
            <input
              type="text"
              name="meal"
              className="meal-input"
              value={props.meal}
              onChange={props.handleChange}>
            </input>
          </div>
        </div>
      </div>
    );
  }
  
  function Step3(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <div className="inner-container">
        <div className="header">
          Create an Event
        </div>
        <div class="progress-container">
          <ul class="progress">
              <li class="active"></li>
              <li class="active"></li>
              <li class="active"></li>
          </ul>
        </div>
        <div className = "box">
          <div className="labels">
            <label htmlFor="name">Dietary Restrictions</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="allergies"
              className="allergy-input"
              value={props.allergies}
              onChange={props.handleChange}>
            </input>
          </div>
          <div className="labels">
            <label htmlFor="name">Additional Information</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="additionalInfo"
              className="additional-input"
              value={props.additionalInfo}
              onChange={props.handleChange}>
            </input>
          </div>
          <button
            className="submit"
            type="submit"
            formAction="/"
            onClick={props.onSubmit}>Submit
          </button>
        </div>
      </div>
    );
  }
  
export default CreateEvent;