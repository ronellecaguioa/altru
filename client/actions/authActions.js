import { REGISTER_CHANGE, CLEAR_FIELDS } from './types';
import axios from 'axios';

export function registerChange(changes) {
  return {
    type: REGISTER_CHANGE,
    payload: changes,
  };
}

export function createUser() {
  return function (dispatch, getState) {
    const { username, email, password } = getState().auth;
    const body = { username, email, password };
    axios
      .post('/auth/register', body)
      .then(() => {
        dispatch({
          type: CLEAR_FIELDS,
        });
      })
      .catch(err => console.log('ERROR', err));
  };
}

export function loginUser() {
  return function (dispatch, getState) {
    const { username, password } = getState().auth;
    const body = { username, password };
    axios
      .post('/auth/login', body)
      .then(res => {
        console.log(res.data.message);
        dispatch({
          type: CLEAR_FIELDS,
        });
      })
      .catch(err => console.log('ERROR ERROR', err));
  };
}
