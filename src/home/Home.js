import React from 'react';
import './Home.css';
import NavBar from '../navbar/NavBar.js';
import Search from '../search/Search.js';
import Plate from '../plate/plate.js';
import Header from '../header/Header.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div>
      <NavBar/>
      <Header/>
      <Plate/>
      <Search/>
      {/* <Footer/> */}
    </div>
  );
};

export default Home;