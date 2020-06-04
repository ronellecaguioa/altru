import { HANDLE_ENTRY_CHANGE, ADD_ITEM, ADD_DELIVERY } from '../actions/types';

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
    case HANDLE_ENTRY_CHANGE:
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
        itemName: '',
        itemQuantity: 0,
      };

    case ADD_DELIVERY:
      return {
        ...state,
        destination: '',
        pickup_by: '',
        pickup_from: '',
        itemName: '',
        itemQuantity: 0,
      }

    default:
      return state;
  }
}
