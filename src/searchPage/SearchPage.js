import React, { Component } from 'react';
/* global google */

import './SearchPage.css';
import NavBar from '../navbar/NavBar.js';
import Script from 'react-load-script';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Geocode from "react-geocode";
import Map from '../map/Map.js';

Geocode.setApiKey("AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g");
Geocode.enableDebug();

class SearchPage extends Component {
  
  // Define Constructor
  constructor( props )  {
    super( props );
    this.state = {
      redirect: null,
      addressArray: this.props.location.state.addressArray,
      address: this.props.location.state.address,
      city: this.props.location.state.city,
      area: this.props.location.state.area,
      state: this.props.location.state.state,
      mapPosition: this.props.location.state.mapPosition,
      markerPosition: this.props.location.state.markerPosition
    }

    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    const place = this.autocomplete.getPlace();
    console.log("heeeeeeeeeeeeeeeeeerrr")
    console.log(place);
    const address = place.formatted_address,
          addressArray =  place.address_components,
          city = this.getCity( addressArray ),
          area = this.getArea( addressArray ),
          state = this.getState( addressArray ),
          latValue = place.geometry.location.lat(),
          lngValue = place.geometry.location.lng();
      // Set these values in the state.
    this.setState({
      addressArray : ( addressArray ) ? addressArray : null ,
      address: ( address ) ? address : '',
      area: ( area ) ? area : '',
      city: ( city ) ? city : '',
      state: ( state ) ? state : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      },
    })
  }

/**
* Get the city and set the city input value to the one selected
*
* @param addressArray
* @return {string}
*/
getCity = ( addressArray ) => {
let city = '';
for( let i = 0; i < addressArray.length; i++ ) {
  if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
    city = addressArray[ i ].long_name;
    return city;
  }
}
};
/**
* Get the area and set the area input value to the one selected
*
* @param addressArray
* @return {string}
*/
getArea = ( addressArray ) => {
let area = '';
for( let i = 0; i < addressArray.length; i++ ) {
  if ( addressArray[ i ].types[0]  ) {
    for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
      if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
      area = addressArray[ i ].long_name;
      return area;
      }
    }
  }
}
};
/**
* Get the address and set the address input value to the one selected
*
* @param addressArray
* @return {string}
*/
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
  
  render() {
    //console.log(this.state);
    return (
      <div id="search-container">
      

        <NavBar/>
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g&libraries=places"          
        onLoad={this.handleScriptLoad}/> 
        <div id="place-container"> 
          <input ref={this.autocompleteInput}  id="autocomplete" placeholder={this.state.address}
          type="text"></input>
          <div>LIST OF SEARCH RESULTS GOES HERE</div>
        </div>
        <div id="map-container">
          <Map
            google={this.state.google}
            addressArray= {this.state.addressArray}
            address= {this.state.address}
            city= {this.state.city}
            area= {this.state.area}
            state= {this.state.state}
            mapPosition= {this.state.mapPosition}
            markerPosition= {this.state.markerPosition}

            //center={{lat: 18.5204, lng: 73.8567}}
            height='800px'
            zoom={15}
          />
        </div>
         
      </div>
    );
  }
}

export default SearchPage;