import { GET_ITEMS, DELETE_ITEM, GET_DELIVERIES } from '../actions/types'

const initialState = {
  items: [],
  deliveries: []
}

export default function (state=initialState, action) {
  switch(action.type) {
    case GET_ITEMS:
      console.log("GET ITEMS REDUCER", action.payload)
      return {
        ...state,
        items: action.payload
      }

    case DELETE_ITEM:
      const itemList = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: itemList
      }

    case GET_DELIVERIES:
      console.log("GET DELIVERIES", action.payload)
      return {
        ...state,
        deliveries: action.payload.deliveries,
      }

    default:
      return state
  }
}