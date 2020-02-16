import React from 'react';
import './Header.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <div>
            <header class="bg-primary text-white" id = "header">
            <div class="container text-center" id = "headerContainer">
                {/* using inline styling here cuz it wasn't working from css file for some reason. */}
                <h1 class = "headerTitle" style ={{fontFamily: "verdana-header, sans-serif", fontWeight: "800"}}
                >Welcome to huMANAty!</h1>
                <p class="lead" id = "subheader">A website where you can eat farm to table, lorem ipsum, etc etc</p>
            </div>
        </header>
        </div>        
    );
};

export default Header;
    