import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from './types';
import { getError, clearError } from './errorActions';

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  axios
    .get('/api/auth/user', loadUserConfig(getState))
    .then(({ data }) => {
      dispatch(clearError());
      dispatch({ type: USER_LOADED, payload: data });
    })
    .catch(({ response: { data, status } }) => {
      dispatch(getError(data.msg, status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Register user
export const registerUser = user => dispatch => {
  axios
    .post('/api/users', user, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({ data }) => {
      dispatch(clearError());
      dispatch({ type: REGISTER_SUCCESS, payload: data });
    })
    .catch(({ response: { data, status } }) => {
      dispatch(getError(data.msg, status, 'REGISTER_FAIL'));
      dispatch({ type: REGISTER_FAIL });
    });
};

// Logout user
export const logout = () => ({ type: LOGOUT_SUCCESS });

// Login user
export const login = user => dispatch => {
  // fetch token from server and update localStorage
  axios
    .post('/api/auth', user)
    .then(({ data }) => {
      dispatch(clearError());
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    })
    .catch(({ response: { data, status } }) => {
      dispatch(getError(data.msg, status, 'LOGIN_FAIL'));
      dispatch({ type: LOGIN_FAIL });
    });
};

export const loadUserConfig = getState => {
  const token = getState().auth.token;
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['x-auth-token'] = token;
  return { headers };
};
