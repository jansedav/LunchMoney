import React, { Component } from 'react';
import '../../Style/Dishes.css';


class Dishes extends Component {
  constructor() {
    super();

    this.state = {
      Dishes: []
    }
  }



  componentDidMount(){
    const myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('x-auth-token', localStorage.getItem('Token'));
    fetch('/api/dishes', { 
      method: 'GET',
      headers: myHeaders
    })
      .then(res => res.json())
      .then(Dishes => this.setState({Dishes}, () => console.log('Dishes fetched', Dishes)));
  }

  handleClick = userId => {
    const myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('x-auth-token', localStorage.getItem('Token'));
    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders
    };
    fetch("/api/Dishes/" + userId, requestOptions).then((response) => {
      return response.json();
    }).then((result) => {
      window.location.reload();
    });
  }

  render() {
    return(
      <div className="dishes">
        <br/>
        <h2>Dishes <i className="fas fa-hamburger"></i></h2>
        <a className="add-dish" href="/Dishes/AddDish"> Add Dish </a>
        <br/>
        <br/>
        <table className="dish-table">
          <tbody>
            <tr className="dish-title">
              <th>Dish Name</th>
              <th>Dish Description</th>
              <th>Cost to Make Dish</th>
              <th>Sale Price of Dish</th>
              <th>Number of Dishes Sold</th>
              <th>Dish Profit</th>
            </tr>
            {this.state.Dishes.map(Dishes => 
              <tr className="dish-rows" key={Dishes._id}>
                <th> {Dishes.name} </th>
                <th> {Dishes.description} </th>
                <th> ${Dishes.cost} </th>
                <th> ${Dishes.price} </th>
                <th> {Dishes.quantity} </th>
                <th> ${Math.round((Dishes.quantity * Dishes.price) - (Dishes.quantity * Dishes.cost))} </th>
                <th> <button onClick={this.handleClick.bind(this, Dishes._id) } className="deletebtn">Delete</button> </th>
                <th> <a href="/Dishes/EditDish" className="editbtn">Edit</a> </th>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    );
  }
}

export default Dishes;