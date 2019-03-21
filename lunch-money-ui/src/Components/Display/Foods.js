import React, { Component } from 'react';
import '../../Style/Foods.css';

class Foods extends Component {
  constructor() {
    super();

    this.state = {
      Foods: []
    }
  }

  componentDidMount(){    const myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('x-auth-token', localStorage.getItem('Token'));
    fetch('/api/foods', { 
      method: 'GET',
      headers: myHeaders
    })
      .then(res => res.json())
      .then(Foods => this.setState({Foods}, () => console.log('Food fetched', Foods)));
  }

  formatDate(date){
    var newDate = new Date(date);
    var dateUs = newDate.toLocaleDateString("en-US");
    return (dateUs);
  }

  expirationStatus(date){
    var d1 = new Date();
    var d2 = new Date(date);
    var diff = Math.round((d2-d1)/86400000);
    if(diff <= 0){
      return true;
    }
    else
    return false;
  }

  checkExpiration(bool){
    if(bool === true){
      var expired = "Expired";
      return expired;
    }
    else
      var notExpired = "Not Expired";
      return notExpired;
  }

  setColor(bool){
    if(bool === true){
      var expired = {color: "red"};
      return expired;
    }
    else
      var notExpired = {color: "green"};
      return notExpired;
  }

  handleClick = userId => {
    const myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('x-auth-token', localStorage.getItem('Token'));
    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders
    };
    fetch("/api/Foods/" + userId, requestOptions).then((response) => {
      return response.json();
    }).then((result) => {
      window.location.reload();
    });
  }


  render() {
    return(
      <div className="foods">
      <br/>
        <h2>Inventory <i className="fas fa-hotdog"></i></h2>
        <a className="add-food" href="/Inventory/AddFood"> Add Food </a>
        <br/>
        <br/>
        <table className="food-table">
          <tbody>
            <tr className="food-title">
              <th>Food Name</th>
              <th>Food Description</th>
              <th>Quantity</th>
              <th>Price Per Item</th>
              <th>Purchased Date</th>
              <th>Expiration Date</th>
              <th>Expiration Status</th>
              <th>Total Price of Goods</th>
            </tr>
            {this.state.Foods.map(Foods => 
              <tr className="food-rows" key={Foods._id}>
                <th> {Foods.name} </th>
                <th> {Foods.description} </th>
                <th> {Foods.quantity} </th>
                <th> ${Foods.price} </th>
                <th> {this.formatDate(Foods.purchased)} </th>
                <th> {this.formatDate(Foods.expires)} </th>
                <th style={this.setColor(this.expirationStatus(Foods.expires))}> {this.checkExpiration(this.expirationStatus(Foods.expires))}</th>
                <th> ${Math.round(Foods.quantity * Foods.price)} </th>
                <th><button onClick={ this.handleClick.bind(this, Foods._id) } className="deletebtn">Delete</button></th>
                <th><a href="/Inventory/EditFood"className="editbtn">Edit</a></th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Foods;