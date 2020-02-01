import React from 'react';
import './plate.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Plate = () => {
  
    return (
      <div id = "plateBackground">
        <section id = "plate">
          <div class = "container" id = "plateContainer">
            <div class="row" id = "plateRow">
              <div class="col-lg-8 mx-auto" id = "searchbarContainer">
                <h2 id = "searchTitle">Search for Events in your Area</h2>

                <div class="input-group mb-3" id = "searchBar">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="icon">⌕</span>
                  </div>
                  <input type="search" class="form-control" placeholder="Search For City, State, or Zip Code" aria-label="Search" 
                   ria-describedby="icon"></input>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default Plate;