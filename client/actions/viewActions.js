import axios from 'axios';
import { GET_ITEMS } from './types';

export function getItems() {
  return function (dispatch) {
    axios.get('/api/donations/items')
      .then((result) => dispatch({
        type: GET_ITEMS,
        payload: result.data.data
      }))
      .catch(err => console.log(err))
  }
}
