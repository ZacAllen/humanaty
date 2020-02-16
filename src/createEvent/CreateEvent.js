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
      name:  '',
      address: '', 
      city: '',
      state: '',
      zip: '',
      date: '',
      time: '',
      meal: '',
      guest: '',
      description: '',
      allergy: '',
      additional: ''
    }
  }
  
  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
  }
    
  // Posts the different responses to the backend 
  handleSubmit = event => {
    var obj = {name: this.state.name, address: this.state.address, city: this.state.city,
              state: this.state.state, zip: this.state.zip, date: this.state.date,
              time: this.state.time, meal: this.state.meal, guest: this.state.guest,
              description: this.state.description, allergy: this.state.allergy, 
              additional: this.state.additional};
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
        name={this.state.name}
        address={this.state.address}
        city={this.state.city}
        state={this.state.state}
        zip={this.state.zip}
        date={this.state.date}
        time={this.state.time}
      />
      <Step2 
        currentStep={this.state.currentStep} 
        handleChange={this.handleChange}
        meal={this.state.meal}
        guest={this.state.guest}
        description={this.state.description}
      />
      <Step3 
        currentStep={this.state.currentStep} 
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        allergy={this.state.allergy}
        additional={this.state.additional}
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
              name="guest"
              className="guests"
              value={props.guest}
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
              name="allergy"
              className="allergy-input"
              value={props.allergy}
              onChange={props.handleChange}>
            </input>
          </div>
          <div className="labels">
            <label htmlFor="name">Additional Information</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="additional"
              className="additional-input"
              value={props.additional}
              onChange={props.handleChange}>
            </input>
          </div>
          <button
            className="submit"
            type="submit"
            onClick={props.onSubmit}>Submit
          </button>
        </div>
      </div>
    );
  }
  
export default CreateEvent;