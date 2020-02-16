import React, { Component } from "react";
import './App.css';
import Home from './home/Home.js';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateEvent from "./createEvent/CreateEvent.js";
import SearchPage from "./searchPage/SearchPage.js";
import SearchPage from "./searchPage/SearchPage";
import SignUp from "./signUp/SignUp";

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
     const Page404 = ({ location }) => (
        <div>
           <h2>No match found for <code>{location.pathname}</code></h2>
        </div>
     );

      return (

        <Router>
            <div className="App">
                <p className="App-intro">{this.state.apiResponse}</p>
                <Route exact path="/" component={Home} />
                <Route path="/search" component={SearchPage} />
                <Route path="/test" component={Test} />
                <Route path="/signup" component={SignUp}/>
                <Route path="*" component={Page404} />
            </div>
        </Router>

      );
  }
}



export default App;
