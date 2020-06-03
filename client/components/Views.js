import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, getDeliveries, deleteItem } from '../actions/viewActions';

class Views extends Component {
  componentDidMount() {
    this.props.getDeliveries();
  }

  render() {
    const { deliveries, items } = this.props.views;
    return (
      <div className="allEntries">
        {deliveries.map(({ id, destination, pickup_by, pickup_from, completed }) => (
          <div className="entry">
            <h1>Delivery ID: {id}</h1>
            <div>{destination}</div>
            <div>{pickup_from}</div>
            <div>{pickup_by}</div>
            <div>{completed === '1' ? 'COMPLETED' : 'NOT COMPLETED'}</div>
            <h1>Items apart of delivery</h1>
            {items
              .filter(item => item.deliveries_id === id)
              .map(({ id, name, quantity }) => (
                <>
                  <div>Item name: {name}</div>
                  <div>Item qty:{quantity}</div>
                </>
              ))}
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    views: state.views,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getItems: () => dispatch(getItems()),
    getDeliveries: () => dispatch(getDeliveries()),
    deleteItem: id => dispatch(deleteItem(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Views);
