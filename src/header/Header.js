import React from 'react';
import './Header.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <div>
            <header class="bg-primary text-white" id = "header">
            <div class="container text-center">
                <h1>Welcome to huMANAty!</h1>
                <p class="lead">A website where you can eat farm to table, lorem ipsum, etc etc</p>
            </div>
        </header>
        </div>        
    );
};

export default Header;
    