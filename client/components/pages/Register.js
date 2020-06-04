import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createUser, registerChange } from '../../actions/authActions';

function Register() {
  const [login, setLogin] = useState(false)
  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);

  const handleChange = e => {
    dispatch(registerChange(e.target))
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(createUser())
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h1>Make An Account</h1>
        <label>
          Username
          <input
            type="text"
            placeholder="Username..."
            name="username"
            value={state.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="Email..."
            name="email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Password..."
            name="password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </label>
        <button>Register for Altru</button>
      </form>
    </>
  );
}

export default Register;
