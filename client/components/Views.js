import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, getDeliveries, deleteItem, deleteDelivery } from '../actions/viewActions';

class Views extends Component {
  componentDidMount() {
    this.props.getDeliveries();
  }

  render() {
    const { deliveries, items } = this.props.views;
    const { deleteItem, deleteDelivery } = this.props;
    return (
      <div style={mainStyle}>
        {deliveries.map(({ id, destination, pickup_by, pickup_from, completed }) => (
          <div key={id} className="entry">
            <h4>Delivery ID: {id}</h4>
            <div>To: {destination}</div>
            <div>From: {pickup_from}</div>
            <div>Service: {pickup_by}</div>
            <div>{completed === '1' ? 'COMPLETED' : 'NOT COMPLETED'}</div>
            <hr style={lineBreakStyle} />
            <h4>Items apart of delivery</h4>
            {items
              .filter(item => item.deliveries_id === id)
              .map(({ id, name, quantity }) => (
                <div
                  key={id}
                  style={{ display: 'flex', marginBottom: '5px', justifyContent: 'space-between' }}
                >
                  <div>
                    <div>Item name: {name}</div>
                    <div>Item qty:{quantity}</div>
                  </div>
                  <div>
                    <button onClick={() => deleteItem(id)} style={btnStyle}>
                      X
                    </button>
                    <button style={btnStyle}>E</button>
                  </div>
                </div>
              ))}
            <button onClick={() => deleteDelivery(id)}>Cancel Delivery</button>
          </div>
        ))}
      </div>
    );
  }
}

// Styling
const btnStyle = {
  width: '20px',
  height: '20px',
  fontSize: '80%',
  marginLeft: '5px',
};

const mainStyle = {
  width: '800px',
  margin: '0 auto',
  display: 'flex',
  flexWrap: 'wrap',
};

const lineBreakStyle = {
  margin: '10px 0',
};

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
    deleteDelivery: id => dispatch(deleteDelivery(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Views);
