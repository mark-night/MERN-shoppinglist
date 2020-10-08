import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const itemReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_ITEMS:
      return [...payload];
    case ADD_ITEM:
      return [payload, ...state]; // latest first
    case DELETE_ITEM:
      return [...payload];
    default:
      return state;
  }
};

export default itemReducer;
