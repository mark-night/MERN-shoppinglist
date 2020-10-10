import { GET_ERROR, CLEAR_ERROR } from './types';

export const getError = (msg, status, id = null) => ({
  type: GET_ERROR,
  payload: { msg, status, id },
});

export const clearError = () => ({ type: CLEAR_ERROR });
