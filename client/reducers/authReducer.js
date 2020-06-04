import { HANDLE_USER_CHANGE, CLEAR_FIELDS } from '../actions/types';

const initialState = {
  username: '',
  email: '',
  password: '',
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_USER_CHANGE:
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };

    case CLEAR_FIELDS:
      return {
        username: '',
        email: '',
        password: '',
      };

    default:
      return state;
  }
}
