import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerChange, loginUser } from '../../actions/authActions';

function Login() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);

  const handleChange = pair => {
    dispatch(registerChange(pair));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser());
  };

  return (
    <div>
      <h1>Temp login page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={e => handleChange(e.target)}
            placeholder="Username"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={e => handleChange(e.target)}
            placeholder="Password"
          />
        </label>
        <button>Log in</button>
      </form>
    </div>
  );
}

export default Login;
