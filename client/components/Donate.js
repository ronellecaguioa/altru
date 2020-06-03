import React, { Component } from 'react';
import axios from 'axios';

class Donate extends Component {
  state = {
    items: [],
    itemName: 'shirt',
    itemQuantity: 0,
    destination: '',
    pickup_by: '',
    pickup_from: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { items, destination, pickup_by, pickup_from } = this.state
    const body = { items, destination, pickup_by, pickup_from }

    axios.post('/api/donations', body)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    this.setState({
      items: [],
      destination: '',
      pickup_by: '',
      pickup_from: '',
    });
  };

  addItem = e => {
    e.preventDefault();
    const items = this.state.items.concat();
    const newItem = {
      name: this.state.itemName,
      quantity: this.state.itemQuantity,
    };
    items.push(newItem);
    this.setState({
      items,
      itemName: 'shirt',
      itemQuantity: 0,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Make A Donation</h1>
          <label>
            Item:
            <select name="itemName" value={this.state.name} onChange={this.handleChange}>
              <option value="shirt">Shirt</option>
              <option value="hat">Hats</option>
              <option value="piano">Piano</option>
            </select>
          </label>
          <label>
            Quantity
            <input
              type="number"
              min="1"
              max="50"
              name="itemQuantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button onClick={this.addItem}>Add</button>
          </label>
          <label>
            Sending items where?
            <input
              type="text"
              placeholder="Location..."
              name="destination"
              value={this.state.destination}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Pickup by who?
            <input
              type="text"
              placeholder="Service..."
              name="pickup_by"
              value={this.state.pickup_by}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Picking items up from?
            <input
              type="text"
              placeholder="Where to pick up items from..."
              name="pickup_from"
              value={this.state.pickup_from}
              onChange={this.handleChange}
            />
          </label>
          <button>Set delivery</button>
        </form>
      </div>
    );
  }
}

export default Donate;
