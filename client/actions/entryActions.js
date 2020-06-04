import axios from 'axios';
import { HANDLE_ENTRY_CHANGE, ADD_ITEM, ADD_DELIVERY } from './types';

export function handleEntryChange(changes) {
  return {
    type: HANDLE_ENTRY_CHANGE,
    payload: changes,
  };
}

export function addItem() {
  return {
    type: ADD_ITEM,
  };
}

export function addDelivery() {
  return function (dispatch, getState) {
    const { items, destination, pickup_by, pickup_from } = getState().entry;
    const body = { items, destination, pickup_by, pickup_from };
    axios
      .post('/api/donations', body)
      .then(result => {
        dispatch({
          type: ADD_DELIVERY,
          payload: result.data,
        })
      })
      .catch(err => console.log(err));
  };
}
