import React, { Component, Fragment } from 'react';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
    this.setState({
      username: '',
      email: '',
      password: ''
    })
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} className="form">
          <label>
            Username
            <input type="text" placeholder="Username..." name="username" value={this.state.username}onChange={this.handleChange} required />
          </label>
          <label>
            Email
            <input type="email" placeholder="Email..." name="email" value={this.state.email}onChange={this.handleChange} required />
          </label>
          <label>
            Password
            <input type="password" placeholder="Password..." name="password" value={this.state.password}onChange={this.handleChange} required />
          </label>
          <button className="btn">Register for Altru</button>
        </form>
      </Fragment>
    );
  }
}


export default Register;
