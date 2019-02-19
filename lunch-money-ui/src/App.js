import React, { Component } from 'react';
import Navigation from "./Components/Navigation";
import Foods from "./Components/Display/Foods";
import Dishes from "./Components/Display/Dishes";
import AddFood from "./Components/Add/AddFood";
import AddDish from "./Components/Add/AddDish"
import Home from "./Components/Home"
import {BrowserRouter as Router, Route} from "react-router-dom";
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
          <Route exact path="/Inventory" component={Foods} />
          <Route path="/Dishes" component={Dishes} />
          <Route path="/Inventory/AddFood" component={AddFood} />
          <Route path="/Inventory/AddDish" component={AddDish} />
        </div>
      </Router>
    );
  }
}

export default App;