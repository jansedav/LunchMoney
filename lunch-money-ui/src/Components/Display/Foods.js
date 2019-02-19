import React, { Component } from 'react';
import '../../Style/Foods.css';

class Foods extends Component {
  constructor() {
    super();

    this.state = {
      Foods: []
    }
  }

  componentDidMount(){
    fetch('/api/foods')
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
      var expired = "Expired";
      return expired;
    }
    else
    var notExpired = "Not Expired";
    return notExpired;
  }

  handleClick = userId => {
    const requestOptions = {
      method: 'DELETE'
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
        <h2>Inventory</h2>
        <a className="add-item" href="/Inventory/AddFood"> Add Food </a>
        <br/>
        <br/>
        <table>
          <tbody>
            <tr className="column-title">
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
              <tr key={Foods._id}>
                <th> {Foods.name} </th>
                <th> {Foods.description} </th>
                <th> {Foods.quantity} </th>
                <th> ${Foods.price} </th>
                <th> {this.formatDate(Foods.purchased)} </th>
                <th> {this.formatDate(Foods.expires)} </th>
                <th> {this.expirationStatus(Foods.expires)}</th>
                <th> ${Math.round(Foods.quantity * Foods.price)} </th>
                <th><button onClick={() => { this.handleClick(Foods._id) }} className="deletebtn">Delete</button></th>
                <th><button className="editbtn">Edit</button></th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Foods;