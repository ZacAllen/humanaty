import React, { Component } from 'react';
import './Home.css';
import Script from 'react-load-script';
import SearchBar from './searchBar/SearchBar.js';
import NavBar from '../navbar/NavBar.js';
<<<<<<< HEAD
import Header from '../header/Header.js';
//<<<<<<< HEAD
import Footer from '../footer/footer.js';
//=======
//import Footer from '../footer/footer.js';
//>>>>>>> 666396591955194ad406f9fefde47c05d14b5024
=======
import Header from './header/Header.js';
// import Footer from '../footer/Footer.js';

>>>>>>> c518bbfcf3ffa98c8800132fc420afad5368d1b3

class Home extends Component {
  
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
    };
  }

  render() {
    return (
      <div id="home">
        <NavBar/>
        <Header/>
        <div id = "home-container">
            <div class = "container" id = "plateContainer">
              <div class="row" id = "plateRow">
                <div class="col-lg-8 mx-auto" id = "searchbarContainer">
                  <h2 id = "searchTitle">Search for Events in your Area</h2>
                  <div class="input-group mb-3" id = "searchBar">                    
                    <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g&libraries=places"          
                      onLoad={this.handleScriptLoad}/> 
                    <SearchBar
                      google={this.props.google}
                      center={{lat: 33.7490, lng: -84.3880}}
                      zoom={25}
                    />
                  </div>
                </div>
              </div>
            </div>
        </div>

        {/* <Footer/>       */}



      </div>
      
    );
  }
}

export default Home;