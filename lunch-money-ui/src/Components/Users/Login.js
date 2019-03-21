import React, { Component } from 'react';
import '../../Style/Users.css';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
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
        fetch('/api/auth', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password
            })
        })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem('Token', res.result.token);
            localStorage.setItem('User', res.result.username);
            window.location.replace("/");
            
        });
    }

    render() {
        return(
        <div className="users">
        <br/>
            <h2>Welcome to LunchMoney, please sign in below to access your data!</h2>
            <form onSubmit={ this.handleSubmit } className="user_form">
                <h2>Login <i className="fas fa-cookie-bite"></i></h2>
                <div className="inputs">
                    <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    required />
                </div>
                <div className="inputs">
                    <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    required />
                </div>
                <div className="inputs">
                    <button type="submit" className="register">
                        Login User
                    </button>
                </div>
            </form>
            <div className="RegisterLink">
                    <p>Not signed up? Register below!</p>
                    <a href="/Register">Register User</a>
            </div>
        </div>
        )
    }
}

export default Login;