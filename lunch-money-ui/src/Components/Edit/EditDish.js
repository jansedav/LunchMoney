import React, { Component } from 'react';
import '../../Style/AddFood.css'


class EditedDish extends Component {
  
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state={ 
        name: "",
        cost: "",
        quantity: "",
        purchased: "",
        cost: "",
        description: ""
    } 
  }

  handleSubmit(event){ 
    event.preventDefault();
    fetch('/api/dishes', {
     method: 'put',
     headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
        "name": this.state.name,
        "price": this.state.price,
        "quantity": this.state.quantity,
        "cost": this.state.cost,
        "description": this.state.description
        })
    });
    this.props.history.push('/Dishes');
   }

  render() {
    return (
      <div className="user-input">
      <br/>
      <h3> Fill out the form below to add a dish! </h3>
      <br/>
        <form onSubmit={this.handleSubmit}>
          <label>Dish Name:</label> <br/>
          <input ref={(ref) => 
            {this.name = ref}} 
            placeholder="Food" 
            className="textbox" 
            type="text" value={this.state.name} 
            onChange={(ev)=>this.setState({name:ev.target.value})} 
            required
          />
          <br/>
          <label>Food Description:</label> <br/>
          <input ref={(ref) => 
            {this.description = ref}} 
            placeholder="Description" 
            className="textbox" 
            type="text" 
            value={this.state.description} 
            onChange={(ev)=>this.setState({description:ev.target.value})} 
            required
          />
          <br/>
          <label>Cost to Make Dish:</label> <br/>
          <input ref={(ref) => 
            {this.cost = ref}} 
            placeholder="Cost" 
            className="textbox" 
            type="number" 
            value={this.state.cost} 
            onChange={(ev)=>this.setState({cost:ev.target.value})} 
            required
          />
          <br/>          
          <label>Sale Price of Dish:</label> <br/>
          <input ref={(ref) => 
            {this.price = ref}} 
            placeholder="Price" 
            className="textbox" 
            type="number" 
            value={this.state.price} 
            onChange={(ev)=>this.setState({price:ev.target.value})} 
            required
          />
          <br/>
          <label>Number of Dishes Sold:</label> <br/>
          <input ref={(ref) => 
            {this.quantity = ref}} 
            placeholder="Quantity" 
            className="textbox" 
            type="number" value={this.state.quantity} 
            onChange={(ev)=>this.setState({quantity:ev.target.value})} 
            required
          />
          <br/>

          <input className="submit" type="submit" value="Submit"/>
        </form> 
      </div>
    );
  }
}

export default EditedDish;
