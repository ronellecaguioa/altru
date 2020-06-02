import React, { Component } from 'react';

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
      <div>
        <h1>Our first component</h1>
      </div>
    );
  }
}

export default App;
