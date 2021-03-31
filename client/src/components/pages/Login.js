import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../../actions';
import avatar from '../assets/login.svg'
import "../styles/Auth.scss"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    };
  }
  onSubmit = () => {
    this.props.login({
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
          <label>Password</label>
          <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
          />
          <button className="system" onClick={this.onSubmit}>Login</button>
        </div>
        <div className="container">
            <button className='forgotpass' onClick={()=> this.props.history.push('/forgot-password')}>Forgot Password?</button>
            <span className="register">Don't have account? <button className="registerbtn" onClick={()=>this.props.history.push('/register')}>Register</button></span>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { login }
)(Login);