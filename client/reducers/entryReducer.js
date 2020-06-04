import { HANDLE_CHANGE, ADD_ITEM, HANDLE_SUBMIT } from '../actions/types';

const initialState = {
  items: [],
  itemName: '',
  itemQuantity: 0,
  destination: '',
  pickup_by: '',
  pickup_from: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HANDLE_CHANGE:
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };

    case ADD_ITEM:
      const newItem = {
        name: state.itemName,
        quantity: state.itemQuantity,
      };
      const itemList = state.items.slice();
      itemList.push(newItem);

      return {
        ...state,
        items: itemList,
        itemName: 'shirt',
        itemQuantity: 0,
      };

    case HANDLE_SUBMIT:
      return {
        ...state,
        destination: '',
        pickup_by: '',
        pickup_from: '',
        itemName: 'shirt',
        itemQuantity: 0,
      }

    default:
      return state;
  }
}
