import React, { Component } from 'react';
import Navigation from "./Components/Navigation";
import Foods from "./Components/Display/Foods";
import Dishes from "./Components/Display/Dishes";
import AddFood from "./Components/Add/AddFood";
import AddDish from "./Components/Add/AddDish";
import EditDish from "./Components/Edit/EditDish";
import EditFood from "./Components/Edit/EditFood";
import LoginNavigation from "./Components/LoginNavigation";
import Home from "./Components/Home";
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Login from './Components/Users/Login';
import Register from './Components/Users/Register';

class App extends Component {
  render() {
    if(localStorage.getItem('Token')){
      return(
        <Router>
          <div>
            <div>
            <Navigation/> 
            </div> 
            <Route exact path="/" component={Home} />
            <Route exact path="/Inventory" component={Foods} />
            <Route path="/Inventory/AddFood" component={AddFood} />
            <Route path="/Inventory/EditFood" component={EditFood} />
            <Route exact path="/Dishes" component={Dishes} />
            <Route path="/Dishes/AddDish" component={AddDish} />
            <Route path="/Dishes/EditDish" component={EditDish} />
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Register} />
            
          </div>
        </Router>
      );
    }
    else{
      return(
        <Router>
          <div>
          <div>
          <LoginNavigation/> 
          </div>
          <Route exact path="/" component={Login} />  
          <Route exact path="/Register" component={Register} />
          </div>
        </Router>
      )
    }
  }
}

export default App;