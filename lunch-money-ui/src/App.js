import React, { Component } from 'react';
import Navigation from "./Components/Navigation";
import Foods from "./Components/Foods";
import Dishes from "./Components/Dishes";
import Home from "./Components/Home"
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <div>
          <Navigation/> 
          </div> 
          <Route exact path="/" component={Home} />
          <Route path="/Inventory" component={Foods} />
          <Route path="/Dishes" component={Dishes} />
        </div>
      </Router>
    );
  }
}

export default App;