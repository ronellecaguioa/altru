import React, { Component } from 'react'
import axios from 'axios'

class Views extends Component {
  state = {
    items: []
  }

  componentDidMount(){
    axios.get('/api/donations/items')
      .then(res => {
        this.setState({ items: res.data.result })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="allEntries">
        {this.state.items.map(({id, name, quantity, deliveries_id}) => (
          <div className="entry" key={id}>
            <div>ID Number: {id}</div>
            <div>Item Name: {name}</div>
            <div>Item Qty: {quantity}</div>
            <div>Apart of delivery: {deliveries_id}</div>
          </div>
        ))}
      </div>
    )
  }
}

export default Views;
