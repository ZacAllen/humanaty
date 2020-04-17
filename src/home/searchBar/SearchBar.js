/* eslint-disable */

/* global google */

import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import {  BrowserRouter as Router,  Route,  Link,  Switch,  Redirect} from 'react-router-dom'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

Geocode.setApiKey("AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g");
Geocode.enableDebug();

class SearchBar extends React.Component{
  constructor( props )  {
    super( props );
    this.state = {
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      }
    }
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
  * When the user types an address in the search box
  * @param place
  */
  onPlaceSelected = ( place ) => {
      this.getEventsByCity(place);
  };

 
  getEventsByCity(place) {    

    const addressArray =  place.address_components;
    const city = this.getCity( addressArray );
    const state = this.getState( addressArray );

    axios.get('http://localhost:9000/events', { params: {city: city} })
      .then(res => {
        //navigate & send Events to SearchPage 
        this.props.history.push({
          pathname:"/search",
          state: { 
            mapPosition: this.state.mapPosition,
            markerPosition: this.state.markerPosition,
            eventList : res.data,
            city : city,
            state: state}
        });  

    })
  }

render() {

  const AsyncMap = withScriptjs(
    withGoogleMap(
      props => (        
        <Autocomplete
          style={{
            width: '700px',
            height: '40px',
            paddingLeft: '16px',
            marginTop: '2px',
            marginBottom: '100px'
          }}
          onPlaceSelected={ this.onPlaceSelected }
          types={['(regions)']}
        />
      )
    )
  );

  let searchBar;
  if( this.props.center.lat !== undefined ) {
    searchBar = <div>
            <AsyncMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g&libraries=places"
              loadingElement={ <div style={{ height: `100%`, width: '800px%' }} />   }
              containerElement={ <div style={{ height: '0px', width: '800px%' }} /> }
              mapElement={ <div style={{ height: `100%`, width: '800px%' }} /> }
            />
          </div>
  } else {
    searchBar = <div style={{height: this.props.height}} />
  }
  return( searchBar )
  }
}

export default withRouter(SearchBar)
