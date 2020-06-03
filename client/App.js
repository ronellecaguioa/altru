import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux'
import store from './store'

// Import components
import Navbar from './components/Navbar'
import Contact from './components/Contact'
import About from './components/About'
import Register from './components/Register'
import Donate from './components/Donate'
import Views from './components/Views'

// Import styling
import './App.css'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <div style={mainStyle}>
            <Route exact path='/' render={() => (
              <h1>Welcome to Altru</h1>
            )}/>
            <Route path='/about' component={About}/>
            <Route path='/contact' component={Contact} />
            <Route path='/register' component={Register} />
            <Route path='/donate' component={Donate} />
            <Route path='/views' component={Views} />
          </div>
        </Router>
      </Provider>
    );
  }
}

// Styles
const mainStyle = {
  width: '90%',
  margin: '0 5%',
}

export default App;
