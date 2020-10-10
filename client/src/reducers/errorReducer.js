import { GET_ERROR, CLEAR_ERROR } from '../actions/types';

const initialState = {
  msg: null,
  status: null,
  id: null,
};

const errorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ERROR:
      return { ...payload };
    case CLEAR_ERROR:
      return { ...initialState };
    default:
      return state;
  }
};

export default errorReducer;
