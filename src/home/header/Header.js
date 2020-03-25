import React from 'react';
import './Header.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <div class="header-container">
            <header class="bg-primary text-white header-image">
            <div class="text-center" id = "text-container">
                <h1 class = "headerTitle" style ={{fontFamily: "verdana-header, sans-serif", fontWeight: "800"}}
                >Welcome to huMANAty!</h1>
                <p class="lead" id = "subheader">A website where you can eat farm to table, lorem ipsum, etc etc</p>
            </div>
            </header>
        </div>        
    );
};

export default Header;
    