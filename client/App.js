import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux'
import store from './store'

// Import components
import Navbar from './components/layout/Navbar'
import Contact from './components/pages/Contact'
import About from './components/pages/About'
import Register from './components/pages/Register'
import Donate from './components/Donate'
import Views from './components/Views'
import PageNotFound from './components/pages/PageNotFound'

// Import styling
import './App.css'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <div style={mainStyle}>
            <Switch>
              <Route exact path='/' render={() => (
                <h1>Welcome to Altru</h1>
              )}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/donate' component={Donate} />
              <Route exact path='/views' component={Views} />
              <Route path='*' component={PageNotFound} />
            </Switch>
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
