import React, { Component } from 'react';
import './App.css';
import Coursesales from './Coursesales';



class App extends Component {
  render() {
    var courses = [
      {name: 'React Course', price: 199},
      {name: 'Angular Course', price: 200},
      {name: 'Node Course', price: 160},
      {name: 'MongoDB Course', price: 50},
    ];
    return (
      <div>
        <Coursesales items={courses}/>
      </div>
    );
  }
}

export default App;
