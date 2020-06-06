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

  github = () => {
    fetch('/auth/github')
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} className="form">
          <h1>Make An Account</h1>
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
          <button>Register for Altru</button>
        </form>
        <button onClick={this.github}>Log in with github</button>
      </Fragment>
    );
  }
}


export default Register;
