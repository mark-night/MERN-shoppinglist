import { ADD_ITEM, DELETE_ITEM, GET_ITEMS } from './types';
import { loadUserConfig } from './authActions';
import { getError, clearError } from './errorActions';
import { mongoDBAPI } from '../api/backendAPI';

export const getItems = () => dispatch => {
  mongoDBAPI
    .get('api/items')
    .then(({ data }) => {
      dispatch(clearError());
      dispatch({ type: GET_ITEMS, payload: data });
    })
    .catch(({ response: { data, status } }) =>
      dispatch(getError(data.msg, status))
    );
};

export const addItem = itemName => (dispatch, getState) => {
  mongoDBAPI
    .post('api/items', { name: itemName }, loadUserConfig(getState))
    .then(({ data }) => {
      dispatch(clearError());
      dispatch({ type: ADD_ITEM, payload: data });
    })
    .catch(({ response: { data, status } }) =>
      dispatch(getError(data.msg, status, 'ADD_ITEM_ERROR'))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  mongoDBAPI
    .delete(`api/items/${id}`, loadUserConfig(getState))
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
