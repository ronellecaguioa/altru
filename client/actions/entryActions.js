import axios from 'axios';
import { HANDLE_CHANGE, ADD_ITEM, HANDLE_SUBMIT } from './types';

export function handleChange(changes) {
  console.log('handling change');
  return {
    type: HANDLE_CHANGE,
    payload: changes,
  };
}

export function addItem() {
  return {
    type: ADD_ITEM,
  };
}

export function handleSubmit(e) {
  console.log('submitting')
  e.preventDefault()
  return function (dispatch, getState) {
    const { items, destination, pickup_by, pickup_from } = getState().entry;
    const body = { items, destination, pickup_by, pickup_from };
    console.log('in the inner', body)
    axios
      .post('/api/donations', body)
      .then(result => {
        console.log("IN THE RESULT", result)
        dispatch({
          type: HANDLE_SUBMIT,
          payload: result.data,
        })
      })
      .catch(err => console.log(err));
  };
}
