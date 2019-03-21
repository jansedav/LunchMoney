import React, { Component } from 'react';
import '../../Style/AddFood.css'


class AddFood extends Component {
  
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state={ 
        name: "",
        price: "",
        quantity: "",
        purchased: "",
        expires: "",
        description: ""
    } 
  }

  handleSubmit(event){ 
    event.preventDefault();
    fetch('/api/foods', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
        "name": this.state.name,
        "price": this.state.price,
        "quantity": this.state.quantity,
        "purchased": this.state.purchased,
        "expires": this.state.expires,
        "description": this.state.description
        })
    });
    this.props.history.push('/Inventory');
   }

  render() {
    return (
      <div className="user-input">
        <br/>
        <br/>
          <form onSubmit={this.handleSubmit}>
          <h3> Add Food <i className="fas fa-hotdog"></i></h3>
            <label>Food Name:</label> <br/>
            <input 
              ref={(ref) => {this.name = ref}} 
              placeholder="Food" 
              className="textbox" 
              type="text" 
              value={this.state.name} 
              onChange={(ev)=>this.setState({name:ev.target.value})} 
              required
            />
            <br/>
            <label>Price per Item:</label> <br/>
            <input 
              ref={(ref) => {this.price = ref}} 
              placeholder="Price" 
              className="textbox" 
              type="number" 
              value={this.state.price} 
              onChange={(ev)=>this.setState({price:ev.target.value})} 
              required
            />
            <br/>
            <label>Quantity of Item:</label> <br/>
            <input 
              ref={(ref) => {this.quantity = ref}} 
              placeholder="Quantity" 
              className="textbox" 
              type="number" 
              value={this.state.quantity} 
              onChange={(ev)=>this.setState({quantity:ev.target.value})} 
              required
            />
            <br/>
            <label>Date of Purchase:</label> <br/>
            <input 
              ref={(ref) => {this.purchased = ref}} 
              className="textbox" 
              type="date" 
              value={this.state.purchased} 
              onChange={(ev)=>this.setState({purchased:ev.target.value})} 
              required
            />
            <br/>
            <label>Expiration Date:</label> <br/>
            <input 
              ref={(ref) => {this.expires = ref}} 
              className="textbox"
              type="date" 
              value={this.state.expires} 
              onChange={(ev)=>this.setState({expires:ev.target.value})} 
              required
            />
            <br/>
            <label>Food Description:</label> <br/>
            <input 
              ref={(ref) => {this.description = ref}} 
              placeholder="Description" 
              className="textbox" 
              type="text" 
              value={this.state.description} 
              onChange={(ev)=>this.setState({description:ev.target.value})} 
              required
            />
            <br/>
            <input 
              className="submit" 
              type="submit" 
              value="Submit"
            />
          </form> 
        </div>
    );
  }
}

export default AddFood;
