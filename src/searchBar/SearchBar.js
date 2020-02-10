/* global google */

import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import {  BrowserRouter as Router,  Route,  Link,  Switch,  Redirect} from 'react-router-dom'

Geocode.setApiKey("AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g");
Geocode.enableDebug();

class SearchBar extends React.Component{
  constructor( props )  {
    super( props );
    this.state = {
      redirect: null,
      address: '',
      city: '',
      area: '',
      state: '',
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
  /**
  * Get the current address from the default map position and set those values in the state
  */
 componentDidMount() {
  Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
    response => {
      const address = response.results[0].formatted_address,
      addressArray =  response.results[0].address_components,
      city = this.getCity( addressArray ),
      area = this.getArea( addressArray ),
      state = this.getState( addressArray );

      console.log( 'city', city, area, state );
    
      this.setState( {
        address: ( address ) ? address : '',
        area: ( area ) ? area : '',
        city: ( city ) ? city : '',
        state: ( state ) ? state : '',
      })
    },
    error => {
      console.error(error);
    }
  );
};

/**
  * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
  *
  * @param nextProps
  * @param nextState
  * @return {boolean}
  */
 shouldComponentUpdate( nextProps, nextState ){
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      return true
    } else if ( this.props.center.lat === nextProps.center.lat ){
      return false
    }
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

  /**
  * When the user types an address in the search box
  * @param place
  */
 onPlaceSelected = ( place ) => {

    const address = place.formatted_address,
          addressArray =  place.address_components,
          city = this.getCity( addressArray ),
          area = this.getArea( addressArray ),
          state = this.getState( addressArray ),
          latValue = place.geometry.location.lat(),
          lngValue = place.geometry.location.lng();
      // Set these values in the state.
    this.setState({
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
      redirect: '/search'
    })
 };

render() {
  if (this.state.redirect) {
    return <Redirect to={{
        pathname: '/search',
        state: { 
          address: this.state.address,
          city: this.state.city,
          area: this.state.area,
          state: this.state.state,
          mapPosition: this.state.mapPosition,
          markerPosition: this.state.markerPosition,
        }
    }} />
  }

  const AsyncMap = withScriptjs(
    withGoogleMap(
      props => (        
        <Autocomplete
          style={{
            width: '800px',
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

export default SearchBar