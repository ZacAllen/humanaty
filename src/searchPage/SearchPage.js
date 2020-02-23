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

Geocode.setApiKey("AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g");
Geocode.enableDebug();

class SearchPage extends Component {
  
  // Define Constructor
  constructor( props )  {
    super( props );
    this.state = {
      eventList: this.props.location.state.eventList,
      mapPosition: this.props.location.state.mapPosition,
      markerPosition: this.props.location.state.markerPosition,
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
    }

    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    this.getEventsByCity = this.getEventsByCity.bind(this);
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
      Geocode.fromAddress(event.address + ', ' + event.city + ', ' + event.state)
      .then(res => {
          let location = res.results[0].geometry.location;

          event.location = location;
          newEventList.push(event);
          this.setState({ mapPosition : location,
                          markerPosition : location});
          return location;
        },
        error => { console.error("Error occurs when getting lat long from address list: ",error);
        }
      )
    });
    this.setState({ eventList : newEventList});
  }

  getEventsByCity(city) {    
    let req = {city: city}; 
    axios.post('http://localhost:9000/get-events-by-city', req).then(res => {
              
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
    return this.state.eventList.map((item, idx) => 
      <ul className="event-list-item">
        <h5 key={idx}>{item.name}</h5>
        <p>{item.description}</p>
      </ul>
      );
  }
  
  render() {
    const listItems = this.getEventListForRendering();
    return (
      <div id="search-container">
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g&libraries=places"          
        onLoad={this.handleScriptLoad}/> 
        <div id="place-container"> 
          <input ref={this.autocompleteInput}  id="autocomplete" placeholder='Search'
          type="text"></input>
          <div className="event-list-container">
            {listItems}
          </div>
        </div>
        <div id="map-container">
          <Map
            eventList={this.state.eventList}
            google={this.state.google}
            mapPosition= {this.state.mapPosition}
            markerPosition= {this.state.markerPosition}
            height='500px'
            zoom={12}
          />
        </div>
         
      </div>
    );
  }
}

export default SearchPage;