import React, { Component } from 'react';

import './EventCreation.css';
import NavBar from '../navbar/NavBar.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import MultiSelect from "@khanacademy/react-multi-select";
import ImageUploader from 'react-images-upload';

const allergyOptions = [
  {label: "fish", value: "fish"},
  {label: "peanut", value: "peanut"},
  {label: "eggs", value: "eggs"},
  {label: "milks", value: "milks"},
  {label: "shellfish", value: "shellfish"},
  {label: "soybean", value: "soybean"},
  {label: "tree nuts", value: "tree Nuts"},
  {label: "wheats", value: "wheats"},
];


class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      currentStep: 1,
      costPerSeat: 0.0,
      attendees: {},
      allergies: [],
      accessibilityAccommodations: false,
      location: {},
      address: '', 
      city: 'Atlanta',
      state: 'GA',
      zip: '30318',
      date: '',
      time: "10:00",
      meal: 'Dinner',
      guestNum: 0,
      description: '',
      allergies: '',
      additionalInfo: '',   
      title: '',
      photoGallery: [],  
      errors: {
        name: '',
        address: '',
      }
    };
  }

  onDrop = picture => {
    this.setState({
        photoGallery: this.state.photoGallery.concat(picture),
    });
  }

  
  handleChange = event => {
    console.log(this.state);
    const {name} = event.target;
    const value = event.target.name === 'accessibilityAccommodations' ? event.target.checked : event.target.value;
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

  setAllergies = allergies => {
    this.setState({allergies: allergies})
  }
    
  // Posts the different responses to the backend 
  handleSubmit = event => {
    event.preventDefault();

    let date =  this.state.date + " "  + this.state.time;
    let allergies = this.state.allergies === "" ? [] : this.state.allergies;
    let photoGallery = this.state.photoGallery === [] ? [] : this.state.photoGallery;
    var obj = { title: this.state.title, 
                location: {
                  address: this.state.address, 
                  city: this.state.city,
                  state: this.state.state, 
                  zip: this.state.zip,
                  geopoint: {}
                },
                accessibilityAccommodations: this.state.accessibilityAccommodations,
                date: date,
                meal: this.state.meal, 
                guestNum: this.state.guestNum,
                description: this.state.description,
                allergies: allergies, 
                costPerSeat: this.state.costPerSeat,
                additionalInfo: this.state.additionalInfo,
                photoGallery: photoGallery}

                console.log("Event",obj);

    axios.post('http://localhost:9000/event', obj).then(res => {
      console.log(res.data, "Response");
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
        setAllergies={this.setAllergies}
        handleSubmit={this.handleSubmit}
        allergies={this.state.allergies}
        additionalInfo={this.state.additionalInfo}
        accessibilityAccommodations={this.state.accessibilityAccommodations}
        onDrop={this.onDrop}
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
            <label htmlFor="title">Event Title</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="title"
              className="name-input"
              value={props.title}
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
            <select className="states" name='state' defaultValue={'GA'} onChange={props.handleChange}>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AR">AR</option>	
            <option value="AZ">AZ</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DC">DC</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="IA">IA</option>	
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="MA">MA</option>
            <option value="MD">MD</option>
            <option value="ME">ME</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MO">MO</option>	
            <option value="MS">MS</option>
            <option value="MT">MT</option>
            <option value="NC">NC</option>	
            <option value="NE">NE</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>			
            <option value="NV">NV</option>
            <option value="NY">NY</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WI">WI</option>	
            <option value="WV">WV</option>
            <option value="WY">WY</option>
            </select>
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
              onChange={props.handleChange}>
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
          <select className="meals" name='meal' defaultValue={'default'} onChange={props.handleChange}>
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
              type="number"
              min="1" max="10"
              name="guest"
              className="guests"
              value={props.guestNum}
              placeholder="0"
              onChange={props.handleChange}>
            </input>
          </div>
          <div className = "labels">
            <label htmlFor="name">Cost per seat</label>
          </div>
          <div className = "input-group">
            <input
              type="number"
              min="0" max="200"
              name="guest"
              step="any"
              className="costPerSeat"
              placeholder="0.0"
              value={props.costPerSeat}
              onChange={props.handleChange}>
            </input>
          </div>
          <div className = "labels">
            <label htmlFor="name">Meal Description</label>
          </div>
          <div className = "input-group">
            <textarea
              type="text"
              name="description"
              className="description-input"
              value={props.description}
              onChange={props.handleChange}>
            </textarea>
          </div>
        </div>
      </div>
    );
  }
  
  function Step3(props) {
    const {allergies} = props;
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
          <MultiSelect
                  options={allergyOptions}
                  selected={allergies}
                  onSelectedChanged={allergies => props.setAllergies(allergies)}/>
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
          <div className="labels">
            <label htmlFor="name">Accessibility Accommodations</label>
          </div>
          <div className="input-group">
            <label class="switch">
              <input
                type="checkbox" 
                checked={props.accessibilityAccommodations}
                onChange={props.handleChange}
                name="accessibilityAccommodations"/>
              <span class="slider round"></span>
            </label>
          </div>

          {/* <div className="labels">
            <label htmlFor="name">Event Image</label>
          </div>
          <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={props.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            /> */}
          
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