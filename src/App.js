import React, { Component } from "react";
import './App.css';
import Home from './home/Home.js';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Test from "./testComponent/Test";
import SearchPage from "./searchPage/SearchPage";
import EventCreation from "./eventCreate/EventCreation";
import EventCreation2 from "./eventCreate/EventCreation2";
import EventCreation3 from "./eventCreate/EventCreation3";

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

      return (
        <Router>
            <div className="App">
                <p className="App-intro">{this.state.apiResponse}</p>
                <Route exact path="/" component={Home} />
                <Route path="/search" component={SearchPage} />
                <Route path="/test" component={Test} />
                <Route path="/event" component={EventCreation} />
                <Route path="/event2" component={EventCreation2} />
                <Route path="/event3" component={EventCreation3} />
            </div>
        </Router>
      );
  }
}

export default App;
