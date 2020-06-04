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
          <input
            type="text"
            name="itemName"
            value={itemName}
            onChange={e => handleChange(e.target)}
          />
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
          <button style={addBtnStyle} type="button" onClick={addItem}>
            +
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

// Styles
const addBtnStyle = {
  marginLeft: '5px',
  height: '20px',
  width: '20px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
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
