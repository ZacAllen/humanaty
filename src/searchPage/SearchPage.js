/* eslint-disable */

/* global google */

import React, { Component } from 'react';
import './SearchPage.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../navbar/NavBar.js';
import Script from 'react-load-script';
import Geocode from "react-geocode";
import Map from './map/Map.js';
import axios from 'axios';
import MultiSelect from "@khanacademy/react-multi-select";

Geocode.setApiKey("AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g");
Geocode.enableDebug();

const allergyOptions = [
  {label: "fish", value: "fish"},
  {label: "penut", value: "penut"},
  {label: "eggs", value: "eggs"},
  {label: "milk", value: "milk"},
  {label: "shellfish", value: "shellfish"},
  {label: "soybean", value: "soybean"},
  {label: "tree nuts", value: "tree nuts"},
  {label: "wheat", value: "wheat"},
];

class SearchPage extends Component {
  
  // Define Constructor
  constructor( props )  {
    super( props );
    this.state = {
      eventList: this.props.location.state.eventList,
      mapPosition: this.props.location.state.mapPosition,
      markerPosition: this.props.location.state.markerPosition,
      zoom: 12, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedEvent: null, //Shows the infoWindow to the selected place upon a marker
      maxCostPerSeat: 99,
      minCostPerSeat: 0,
      accessibilityAccommodations: false,
      allergies: []
    }

    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    this.getEventsByCity = this.getEventsByCity.bind(this);
    this.handleMarkerClicked = this.handleMarkerClicked.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);

  }

  componentDidMount() {
    const city = this.props.location.state.city;
    const state = this.props.location.state.state;

    this.setEventListLatLong();
    this.setMarker(city, state);
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,{"types": ["geocode"]});
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  setMarker (city, state) {
    Geocode.fromAddress(city + ', ' + state)
    .then(res => {
        let location = res.results[0].geometry.location;
        this.setState({ mapPosition : location,
                        markerPosition : location});
        return location;
      },
      error => { console.error("Error occurs when getting lat long from address list: ",error);
      }
    )
  }

  /**
   * get lat/long for events so Map can render it.
   */
  setEventListLatLong() {
    let eventList = this.state.eventList;
    let newEventList = [];

    eventList.forEach(event => {
      let location = event.location;
      Geocode.fromAddress(location.address + ', ' + location.city + ', ' + location.state)
      .then(res => {
          let geopoint = res.results[0].geometry.location;
          event.location.geopoint = geopoint;
          newEventList.push(event);
          this.setState({ mapPosition : geopoint,
                          markerPosition : geopoint});
          return geopoint;
        },
        error => { console.error("Error occurs when getting lat long from address list: ",error);
        }
      )
    });
    this.setState({ eventList : newEventList});
  }

  getEventsByCity(city) {    
    axios.get('http://localhost:9000/events', { params: {city: city} })
      .then(res => {    
        this.setState({eventList: res.data});
      }).then(res => {
        this.setEventListLatLong();
      })
  }

  /**
   * Handler when user search for City
   */
  handlePlaceChanged(){
    const place = this.autocomplete.getPlace();
    const addressArray =  place.address_components;
    const city = this.getCity( addressArray );
    const state = this.getState( addressArray );

    this.getEventsByCity(city);
    this.setMarker(city, state);
    this.setState({zoom: 12});
  }

  getCity = ( addressArray ) => {
    let city = '';
    for( let i = 0; i < addressArray.length; i++ ) {
      if ( addressArray[ i ].types[0] && 'locality' === addressArray[ i ].types[0] ) {
        city = addressArray[ i ].long_name;
        return city;
      }
    }
  };

  getState = ( addressArray ) => {
    let state = '';
    for( let i = 0; i < addressArray.length; i++ ) {
      for( let i = 0; i < addressArray.length; i++ ) {
        if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
          state = addressArray[ i ].long_name;
          return state;
        }
      }
    }
  };


  /**
  * And function for city,state and address input
  * @param event
  */
  onChange = ( event ) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getEventListForRendering() {

    const state = this.state;
    let list = this.state.eventList;
    console.log("LIST: " , list);

    let filteredList = list.filter(event => 
      event.accessibilityAccommodations === state.accessibilityAccommodations
      && event.costPerSeat >= state.minCostPerSeat && event.costPerSeat < state.maxCostPerSeat
      && !state.allergies.some(v => event.allergies.includes(v))  
      );   

      console.log("FILTER LIST: " , filteredList);
      
    var events = filteredList.map((item, idx) => 
      <div onClick={() => this.viewEventDetailPage(item) } className="event-list-item">
        <h5 key={idx}>{item.title}</h5>
        <div className="event-list-date">{item.date}</div>
        <div className="event-list-description">{item.description}</div>
        <a class="EventDetail" id = "eventDetailPage" href="/event-detail" >View Event Detail</a>
        
      </div>
      );
   
    return events;
  }


   viewEventDetailPage(item) {

  this.props.history.push({
    pathname: '/event-detail', 
    state: {  title: item.title, location: item.location, date: item.date,
      cost: item.costPerSeat, meal: item.meal, guest: item.guestNum, hostID: item.hostID,
      accessibility: item.accessibilityAccommodations, attendees: item.attendees,
      description: item.description, allergies: item.allergies, 
      additionalInfo: item.additionalInfo, id: item.id}  
  })
}
    
  handleFilterChange(event) {
    const target = event.target;
    const value = target.name === 'accessibilityAccommodations' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleMarkerClicked = (event) => {
    this.setState({  
      mapPosition:  event.location.geopoint,
      zoom: 16,
      selectedEvent: event
    });

  this.viewEventDetailPage(event);
  }
  
  render() {
    const listItems = this.getEventListForRendering();
    const {allergies} = this.state;
    return (
      <div id="search-container">
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g&libraries=places"          
        onLoad={this.handleScriptLoad}/> 
        <div id="place-container"> 
          <input ref={this.autocompleteInput}  id="autocomplete" placeholder='Search'
          type="text"></input>
          <div className="event-list-filter">
            <form>
              <div className="wheelchair-container"><span>Wheelchair accessibility: </span> 
              <label class="switch">
                  <input
                    type="checkbox"
                    checked={this.state.accessibilityAccommodations}
                    onChange={this.handleFilterChange}
                    name="accessibilityAccommodations"/>
                  <span class="slider round"></span>
                </label>
              </div>
              
                <div className="allergies-container"><span>Allergies: </span>
                <MultiSelect
                  options={allergyOptions}
                  selected={allergies}
                  onSelectedChanged={allergies => this.setState({allergies})}/></div>  
                <div className="cost-container">
                  min cost/seat:
                  <input
                    className="filter-input"
                    name="maxCostPerSeat"
                    type="number"
                    value={this.state.minCostPerSeat}
                    onChange={this.handleFilterChange} />
                  max cost/seat:
                  <input
                    className="filter-input"
                    name="maxCostPerSeat"
                    type="number"
                    value={this.state.maxCostPerSeat}
                    onChange={this.handleFilterChange} />
                </div>                          
            </form>


          </div>
          <div className="event-list-container">
            {listItems}
            <div className="event-list-footer"></div>
          </div>
        </div>
        <div id="map-container">
          <Map
            eventList={this.state.eventList}
            google={this.state.google}
            mapPosition= {this.state.mapPosition}
            markerPosition= {this.state.markerPosition}
            height='500px'
            zoom={this.state.zoom}
            selectedEvent={this.state.selectedEvent}
            handleMarkerClicked={this.handleMarkerClicked}
          />
        </div>
         
      </div>
    );
  }
}

export default SearchPage;