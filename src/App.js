import React, { Component } from "react";
import './App.css';
import Home from './home/Home.js';


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

          <div className="App">
          <p className="App-intro">{this.state.apiResponse}</p>
          <Home/>
          </div>
      );
  }
}



export default App;
