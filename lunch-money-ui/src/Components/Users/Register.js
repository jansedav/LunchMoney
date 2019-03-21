import React, { Component } from 'react';
import '../../Style/Users.css';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            restaurant: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch('/api/users', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "name": this.state.name,
                "email": this.state.email,
                "restaurant": this.state.restaurant,
                "password": this.state.password
            })
        })
        .then(res => res.text())
        .then(res => {
            window.location.replace("/");
    });
        
    }

    render() {
        return(
        <div className="users">
            <form onSubmit={ this.handleSubmit } className="user_form">
            <h2>Registration <i className="fas fa-user-plus"></i> </h2>
                <div className="inputs">
                    <input
                        type="text"
                        placeholder="Username"
                        className="form-control"
                        name="name"
                        onChange={ this.handleInputChange }
                        value={ this.state.name }
                    />
                </div>
                <div className="inputs">
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        name="email"
                        onChange={ this.handleInputChange }
                        value={ this.state.email }
                    />
                </div>
                <div className="inputs">
                    <input
                        type="text"
                        placeholder="Restaurant"
                        className="form-control"
                        name="restaurant"
                        onChange={ this.handleInputChange }
                        value={ this.state.restaurant }
                    />
                </div>
                <div className="inputs">
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        name="password"
                        onChange={ this.handleInputChange }
                        value={ this.state.password }
                    />
                </div>
                <div className="inputs">
                    <button type="submit" className="register">
                        Register User
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

export default Register;