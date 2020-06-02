import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div style={navStyle}>
      <Link className='link' to='/'>Home</Link>
      <Link className='link' to='/about'>About</Link>
      <Link className='link' to='/contact'>Contact</Link>
      <Link className='link' to='/register'>Register</Link>
    </div>
  )
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  backgroundColor: '#333',
}

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
  width: '100%',
  height: '100%',
  padding: '10px',
  textAlign: 'center',
}

export default Navbar;