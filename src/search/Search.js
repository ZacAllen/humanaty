import React, { Component } from 'react';
import './Search.css';
// import PlacesAutocomplete from 'react-places-autocomplete';
import Script from 'react-load-script';
import Map from '../map/Map.js';


class Search extends Component {
  
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: ''
    };
  }

  
  render() {
    return (
      <div id="search">

        {/* <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g&libraries=places"          
        onLoad={this.handleScriptLoad}/>  */}

        <Map
        google={this.props.google}
        center={{lat: 18.5204, lng: 73.8567}}
        height='300px'
        zoom={15}
        />

       
      </div>
    );
  }
}

export default Search;