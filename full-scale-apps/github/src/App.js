import React, { Component } from 'react';
import Github from './Github';
import Navigation from './Components/Header';
import './App.css';
import auth0 from 'auth0-js';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      idToken: '',
      profile: {}
    };
  }

static defaultProps = {
  clientID: 'ECzGWRT0xHdF7fyQKbw8Px2paKayyn43',
  domain: 'dev-ka0mkd9q.auth0.com'
}

componentWillMount(){
  auth0 = new auth0.WebAuth(this.props.clientID, this.props.domain);

}
login(){
  this.auth0.authorize();
}

  render() {
    return (
      <div className="App">
        <Github/>
        <Navigation/>
      </div>
    );
  }
}

export default App;
