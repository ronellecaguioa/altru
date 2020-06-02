import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Contact from './components/Contact'
import About from './components/About'
import Register from './components/Register'


class App extends Component {
  componentDidMount() {
    // Testing connection to proxy
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {console.log(data)})
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <Router>
        <Navbar />
        <div style={mainStyle}>
          <Route exact path='/' render={() => (
            <div>hey there</div>
          )}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/register' component={Register} />
        </div>
      </Router>
    );
  }
}

// Styles
const mainStyle = {
  width: '90%',
  margin: '0 5%',
}

export default App;
