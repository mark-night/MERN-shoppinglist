import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/authActions';

export const Logout = () => {
  const dispatch = useDispatch();

  return (
    <NavLink onClick={() => dispatch(logout())} href='#'>
      Logout
    </NavLink>
  );
};
