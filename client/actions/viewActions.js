import axios from 'axios';
import { GET_ITEMS, DELETE_ITEM, GET_DELIVERIES, DELETE_DELIVERY } from './types';

export function getDeliveries() {
  return function (dispatch) {
    axios.get('/api/donations/allDeliveries')
      .then(result => {
        dispatch(getItems())
        dispatch({
          type: GET_DELIVERIES,
          payload: result.data
        })
      })
  }
}

export function getItems() {
  console.log('called')
  return function (dispatch) {
    console.log('inner inner')
    axios.get(`/api/donations/items`)
      .then((result) => {
        console.log('about to dispatch the getItems')
        dispatch({
          type: GET_ITEMS,
          payload: result.data.items
        })
      })
      .catch(err => console.log(err))
  }
}

export function deleteItem(id) {
  return function (dispatch) {
    axios.delete(`/api/donations/item/${id}`)
      .then(res => {
        const { id: itemID } = res.data.item
        dispatch({
          type: DELETE_ITEM,
          payload: itemID
        })
      })
  }
}

export function deleteDelivery(id) {
  return function (dispatch) {
    axios.delete(`/api/donations/delivery/${id}`)
      .then(res => {
        dispatch({
          type: DELETE_DELIVERY,
          payload: res.data
        })
      })
  }
}
