import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleEntryChange, addItem, addDelivery } from '../actions/entryActions';

function Donate() {
  const dispatch = useDispatch();
  const { itemName, destination, pickup_by, pickup_from, quantity } = useSelector(
    state => state.entry
  );

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addDelivery());
  };

  const handleChange = e => {
    dispatch(handleEntryChange(e.target));
  };

  const add = () => {
    dispatch(addItem())
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Make A Donation</h1>
        <label>
          Item:
          <input type="text" name="itemName" value={itemName} onChange={handleChange} />
        </label>
        <label>
          Quantity
          <input
            type="number"
            min="1"
            max="50"
            name="itemQuantity"
            value={quantity}
            onChange={handleChange}
          />
          <button style={addBtnStyle} type="button" onClick={add}>
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
            onChange={handleChange}
          />
        </label>
        <label>
          Pickup by who?
          <input
            type="text"
            placeholder="Service..."
            name="pickup_by"
            value={pickup_by}
            onChange={handleChange}
          />
        </label>
        <label>
          Picking items up from?
          <input
            type="text"
            placeholder="Where to pick up items from..."
            name="pickup_from"
            value={pickup_from}
            onChange={handleChange}
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
  justifyContent: 'center',
};

export default Donate;
