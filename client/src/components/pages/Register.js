import React, { Component } from 'react'
import { connect } from 'react-redux';
import { register } from '../../actions';
import avatar from '../assets/login.svg'
import "../styles/Auth.scss"

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        email: '',
        password: '',
    };
  }
  onSubmit = () => {
    this.props.register({
        username: this.state.username,
        password: this.state.password
    });
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="modal">
        <div className="imgcontainer">
            <img src={avatar} alt="Avatar" className="avatar"/>
        </div>
        <div className="container">
            <label>Username</label>
            <input
            name="username"
            placeholder="Enter Username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required
            />
            <label>Email</label>
            <input
            name="email"
            placeholder="Enter Email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
            />
            <label>Password</label>
            <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            />
            <button className="system" onClick={this.onSubmit}>Register</button>
        </div>
        <div className="container">
            <span className="register">Already have an account? <button className="registerbtn" onClick={()=>this.props.history.push('/login')}>Login</button></span>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { register }
)(Register);