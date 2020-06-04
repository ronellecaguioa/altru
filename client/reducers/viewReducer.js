import { GET_ITEMS, DELETE_ITEM, GET_DELIVERIES, DELETE_DELIVERY } from '../actions/types'

const initialState = {
  items: [],
  deliveries: []
}

export default function (state=initialState, action) {
  let itemList, deliveryList;
  switch(action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload
      }

    case DELETE_ITEM:
      itemList = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: itemList
      }

    case GET_DELIVERIES:
      return {
        ...state,
        deliveries: action.payload.deliveries,
      }

    case DELETE_DELIVERY:
      const deletedItemIDs = action.payload.items
      itemList = state.items.filter(item => !deletedItemIDs.includes(item.id))
      deliveryList = state.deliveries.filter(delivery => delivery.id !== action.payload.delivery)
      return {
        ...state,
        items: itemList,
        deliveries: deliveryList
      }

    default:
      return state
  }
}