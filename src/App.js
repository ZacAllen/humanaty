import React, { Component } from "react";
import './App.css';
import Home from './home/Home.js';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateEventStep1 from "./eventCreate/CreateEventStep1.js";
import CreateEventStep2 from "./eventCreate/CreateEventStep2.js";
import CreateEventStep3 from "./eventCreate/CreateEventStep3.js";
import SearchPage from "./searchPage/SearchPage.js";

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
        <div className="App">
            <Router>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/search" component={SearchPage} />
                    <Route path="/event" component={CreateEventStep1} />
                    <Route path="/event2" component={CreateEventStep2} />
                    <Route path="/event3" component={CreateEventStep3} />
                    <Route component={Page404} />
            </Router>    
        </div>      
      );
  }
}

export default App;
