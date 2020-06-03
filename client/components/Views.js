import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getItems } from '../actions/viewActions'

class Views extends Component {
  componentDidMount(){
    this.props.getItems()
  }

  render() {
    const { items } = this.props.views
    return (
      <div className="allEntries">
        {items.map(({id, name, quantity, deliveries_id}) => (
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

function mapStateToProps(state) {
  return {
    views: state.views
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getItems: () => dispatch(getItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Views);
