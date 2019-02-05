import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
           Components life cycle
          </p>
          <Body/>
        </header>
      </div>
    );
  }
}

class Body extends Component{
  constructor(props){
    super(props);

    this.state = {
    r: 0
    };
    this.getRandomNumber = this.getRandomNumber.bind(this);
  }

  getRandomNumber(){
    this.setState({r: Math.floor(Math.random()*10)})
  }

  render(){
    return(
      <div>
        <p className="App-intro">
        BLAH
        </p>
        <button onClick={this.getRandomNumber}> Random Number </button>
        <Numbers myNumber={this.state.r}/>
      </div>
    );
  }
}

class Numbers extends Component {
  componentDidMount(){
    console.log("componentDidMount called here");
  }

  componentWillMount(){
    console.log("componentWillMount called here");
  }  

  componentWillReceiveProps(newProps){
    console.log("componentWillReceiveProps called")
  }

  render(){
    return(
      <div>
        <br/>
        {this.props.myNumber}
      </div>
    );
  }
}

export default App;
