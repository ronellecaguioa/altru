import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

function User() {
  const [hasAccount, setHasAccount] = useState(false);
  return (
    <div>
      <button style={btnStyle} onClick={() => setHasAccount(!hasAccount)}>
        {hasAccount ? 'Create a new account' : 'Already have an account'}
      </button>
      {hasAccount ? <Login /> : <Register />}
    </div>
  );
}

// Style
const btnStyle = {
  padding: '10px',
  margin: '30px auto 0',
  display: 'block',
};

export default User;
