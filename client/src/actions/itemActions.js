import { ADD_ITEM, DELETE_ITEM, GET_ITEMS } from './types';
import { loadUserConfig } from './authActions';
import { getError, clearError } from './errorActions';
import axios from 'axios';

const api = axios.create({
  // 'proxy' value defined in package.json is automatically prepended
  baseURL: '/api/items',
});

export const getItems = () => dispatch => {
  api
    .get('/')
    .then(({ data }) => {
      dispatch(clearError());
      dispatch({ type: GET_ITEMS, payload: data });
    })
    .catch(({ response: { data, status } }) =>
      dispatch(getError(data.msg, status))
    );
};

export const addItem = itemName => (dispatch, getState) => {
  api
    .post('/', { name: itemName }, loadUserConfig(getState))
    .then(({ data }) => {
      dispatch(clearError());
      dispatch({ type: ADD_ITEM, payload: data });
    })
    .catch(({ response: { data, status } }) =>
      dispatch(getError(data.msg, status, 'ADD_ITEM_ERROR'))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  api
    .delete(`/${id}`, loadUserConfig(getState))
    .then(() => {
      dispatch(clearError());
      dispatch({
        type: DELETE_ITEM,
        payload: getState().items.filter(item => item._id !== id),
      });
    })
    .catch(({ response: { data, status } }) =>
      dispatch(getError(data.msg, status))
    );
};
