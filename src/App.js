import React, { Component } from "react";
import './App.css';
import Home from './home/Home.js';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import CheckoutPage from "./checkout/CheckoutPage";
import RegisterEvent from "./eventRegister/RegisterEvent";
import SearchPage from "./searchPage/SearchPage";
import Test from "./testComponent/Test";

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
                <Route exact path="/" component={Home} />
                <Route path="/search" component={SearchPage} />
                <Route path="/test" component={Test} />
                <Route path="*" component={Page404} />
                <Route path="/register" component={RegisterEvent} />
                <Route path="/checkout" component={CheckoutPage} />
            </div>
        </Router>
      );
  }
}

export default App;