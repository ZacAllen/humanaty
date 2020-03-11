import React, { Component } from "react";
import './App.css';
import Home from './home/Home.js';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateEvent from "./createEvent/CreateEvent";
import SearchPage from "./searchPage/SearchPage";
import SignUp from "./signUp/SignUp";
import ProfilePage from "./profilePage/ProfilePage";
import NavBar from './navbar/NavBar.js';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .then(console.log(this.state.apiResponse))
          .catch(err => err);
  }

  componentDidMount() {
      this.callAPI();
  }
  

  render() {

    //404 error page
     const Page404 = ({ location }) => (
        <div>
           <h2>No match found for <code>{location.pathname}</code></h2>
        </div>
     );

      return (

        <Router>
            <div className="App">
            <NavBar/>
                <Route exact path="/" component={Home} />
                <Route path="/search" component={SearchPage} />
                <Route path="/create-event" component={CreateEvent} />
                <Route path="/signup" component={SignUp}/>
                <Route path="/profile-page" component={ProfilePage}/>
                <Route path="*" component={Page404} />
                <Route path="/register" component={RegisterEvent} />
            </div>
        </Router>
      );
  }
}



export default App;
