import React from 'react';
import { connect } from 'react-redux';
import { handleChange, addItem, handleSubmit } from '../actions/entryActions';

function Donate(props) {
  const { itemName, destination, pickup_by, pickup_from, quantity } = props.entry;
  const { handleChange, addItem, handleSubmit } = props;

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <h1>Make A Donation</h1>
        <label>
          Item:
          <select name="itemName" value={itemName} onChange={e => handleChange(e.target)}>
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
            value={quantity}
            onChange={e => handleChange(e.target)}
          />
          <button type="button" onClick={addItem}>
            Add
          </button>
        </label>
        <label>
          Sending items where?
          <input
            type="text"
            placeholder="Location..."
            name="destination"
            value={destination}
            onChange={e => handleChange(e.target)}
          />
        </label>
        <label>
          Pickup by who?
          <input
            type="text"
            placeholder="Service..."
            name="pickup_by"
            value={pickup_by}
            onChange={e => handleChange(e.target)}
          />
        </label>
        <label>
          Picking items up from?
          <input
            type="text"
            placeholder="Where to pick up items from..."
            name="pickup_from"
            value={pickup_from}
            onChange={e => handleChange(e.target)}
          />
        </label>
        <button>Set delivery</button>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    entry: state.entry,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange: changes => dispatch(handleChange(changes)),
    addItem: () => dispatch(addItem()),
    handleSubmit: e => dispatch(handleSubmit(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Donate);
