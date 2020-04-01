import React, { Component } from "react";
import './App.css';
import Home from './home/Home.js';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateEvent from "./createEvent/CreateEvent";
import SearchPage from "./searchPage/SearchPage";
import SignUp from "./signUp/SignUp";
import ProfilePage from "./profilePage/ProfilePage";
import NavBar from './navbar/NavBar.js';
<<<<<<< HEAD
import RegisterEvent from './eventRegister/EventDetailPage';
=======
import Footer from './footer/footer.js';
>>>>>>> cbeecb5d88b29ee7abd26c957987f322cf82d4a0

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
  }

  componentDidMount() {
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
<<<<<<< HEAD
                <Route path="*" component={Page404} />
                <Route path="/EventDetailPage" component={RegisterEvent} />
=======
                {/* <Route path="*" component={Page404} /> */}
>>>>>>> cbeecb5d88b29ee7abd26c957987f322cf82d4a0
            </div>
            <Footer/>
        </Router>
      );
  }
}



export default App;
