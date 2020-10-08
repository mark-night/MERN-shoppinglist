import { ADD_ITEM, DELETE_ITEM, GET_ITEMS } from './types';
import axios from 'axios';

const api = axios.create({
  // 'proxy' value defined in package.json is automatically prepended
  baseURL: '/api/items',
});

export const getItems = () => async dispatch => {
  const res = await api.get('/');
  dispatch({ type: GET_ITEMS, payload: res.data });
};

export const addItem = itemName => async dispatch => {
  const data = { name: itemName };
  const headers = { 'Content-Type': 'application/json' };
  const res = await api.post('/', data, { headers });
  dispatch({ type: ADD_ITEM, payload: res.data });
};

export const deleteItem = id => async (dispatch, getState) => {
  await api.delete(`/${id}`);
  const { items } = getState();
  dispatch({
    type: DELETE_ITEM,
    payload: items.filter(item => item._id !== id),
  });
};
