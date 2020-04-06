/* eslint-disable */

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

const defaultPhoto = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/220px-Good_Food_Display_-_NCI_Visuals_Online.jpg";


class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this);
    this.validated = this.validated.bind(this);
    this.handleChangePhoto = this.handleChangePhoto.bind(this);
    this.state = {
      currentStep: 1,
      costPerSeat: 0.0,
      attendees: {},
      allergies: [],
      accessibilityAccommodations: false,
      location: {},
      address: '', 
      city: '',
      state: '',
      zip: '',
      date: '',
      time: "10:00",
      meal: 'Dinner',
      guestNum: 0,
      description: '',
      allergies: '',
      additionalInfo: '',   
      title: '',
      photoGallery: [defaultPhoto],  
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

  handleChangePhoto = event => {
    if (event.target.name === 'photoGallery') {
      let picture = event.target.value;
      this.setState({
        photoGallery: this.state.photoGallery.concat(picture),
      });
    } 
  }

  handleChange = event => {
    console.log("STATE", this.state);
    
      const {name} = event.target;
      const value = event.target.name === 'accessibilityAccommodations' ? event.target.checked : event.target.value;
      let errors = this.state.errors;

      if (event.target.name === 'photoGallery') {
        let picture = event.target.value;
        console.log("photo", value);
        this.setState({
          photoGallery: [picture],
        });
      } else {
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
        
  }

  setAllergies = allergies => {
    this.setState({allergies: allergies})
  }

  validated = () => {
    console.log("HEEERRR");
    var event = this.state;
    if (event.title === "" || event.address === "" || event.city === "" || event.zip === "" || event.zip.length < 5 || event.state === "") {
      return false;
    }
    return true;
  }
    
  // Posts the different responses to the backend 
  handleSubmit = event => {
    event.preventDefault();
    if (this.validated()) {   
      let date =  this.state.date + " "  + this.state.time;
      let allergies = this.state.allergies === "" ? [] : this.state.allergies;
      let photoGallery = (this.state.photoGallery[0] === "") ? [defaultPhoto] : this.state.photoGallery;
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
        if (res.data) {
          console.log(res.data);
          let eventId = res.data.eventId;
          let hostId = res.data.hostId;
          var event = this.state;
          this.props.history.push({
            pathname: '/event-detail',
            state: {
              title: event.title,
              location: event.location,
              date: event.date,
              cost: event.costPerSeat,
              meal: event.meal,
              guest: event.guestNum,
              hostID: hostId,
              accessibility: event.accessibilityAccommodations, 
              attendees: event.attendees,
              description: event.description,
              allergies: event.allergies,
              additionalInfo: event.additionalInfo,
              id: eventId,
              photoGallery: event.photoGallery,
            }
          });
        }  
      })
    } else {
      alert("please fill out all required fields");
    }
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
          className="btn btn-secondary buttons" 
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
          className="btn btn-primary buttons" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
    return null;
  }

  submitButton() {
    let currentStep = this.state.currentStep;
    if(currentStep === 3){
      return (
        <button
            className="submit btn btn-primary buttons"
            type="submit"
            formAction="/"
            onClick={this.onSubmit}>Submit
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
        accessibilityAccommodations={this.state.accessibilityAccommodations}
      />
      <Step3 
        currentStep={this.state.currentStep} 
        handleChange={this.handleChange}
        setAllergies={this.setAllergies}
        handleSubmit={this.handleSubmit}
        allergies={this.state.allergies}
        description={this.state.description}
        additionalInfo={this.state.additionalInfo}
        photoGallery={this.state.photoGallery}
        handleChangePhoto={this.state.handleChangePhoto}
        onDrop={this.onDrop}
      />
      {this.previousButton()}
      {this.nextButton()}
      {this.submitButton()}
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
            <label htmlFor="title">Event Title*</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="title"
              className="name-input form-control"
              value={props.title}
              onChange={props.handleChange}
              placeholder="required"/>
          </div>
          <div className="labels">
            <label htmlFor="name">Street Address</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="address"
              className="address-input form-control"
              value={props.address}
              onChange={props.handleChange}
              placeholder="required">
            </input>
          </div>

          {/* city zip state */}
          <div className="city-state-zip">
            <div className="labels">
              <label htmlFor="name">City/State/Zip</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="city"
                className="city-input form-control"
                value={props.city}
                onChange={props.handleChange}
                placeholder="City">
              </input>
              <select className="states" name='state' onChange={props.handleChange}>
                <option value="default">State</option>
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
              <input
                type="text"
                name="zip"
                pattern="[0-9]*"
                maxLength="5"
                minLength="5"
                className="zip-input form-control"
                value={props.zip}
                onChange={props.handleChange}
                placeholder="Zipcode"/>
            </div> 

          </div> {/* city zip state */}
          
          



          <div className="labels">
            <label htmlFor="name">Date/Time</label>
          </div>
          <div className="input-group">
            <input
              type="date"
              name="date"
              className="date-input form-control"
              value={props.date}
              onChange={props.handleChange}
              placeholder="">
            </input>
            <input
              type="time"
              name="time"
              className="time-input form-control"
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
          <select className="meals form-control" name='meal' defaultValue={'default'} onChange={props.handleChange}>
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
              className="guests form-control"
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
              className="costPerSeat form-control"
              placeholder="0.0"
              value={props.costPerSeat}
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
                  className="allergies"
                  options={allergyOptions}
                  selected={allergies}
                  onSelectedChanged={allergies => props.setAllergies(allergies)}/>

          <div className = "labels">
            <label htmlFor="name">Meal Description</label>
          </div>
          <div className = "input-group">
            <textarea
              type="text"
              name="description"
              className="description-input form-control"
              value={props.description}
              onChange={props.handleChange}>
            </textarea>
          </div>

          <div className="labels">
            <label htmlFor="name">Additional Information</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="additionalInfo"
              className="additional-input form-control"
              value={props.additionalInfo}
              onChange={props.handleChange}>
            </input>
          </div>

          <div className="labels">
            <label htmlFor="name">Photo</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="photoGallery"
              className="photoGallery form-control"
              value={props.photoGallery[0]}
              onChange={props.handleChange}
              placeholder="photoURL">
            </input>
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
        </div>
      </div>
    );
  }
  
export default CreateEvent;
