import React, { useState, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';
import { AuthModal, Logout } from './auth';

export const AppNavbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user, shallowEqual);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen(state => !state), []);

  return (
    <Navbar color='dark' dark expand='sm' className='mb-5'>
      <Container>
        <NavbarBrand href='/'>Shopping List</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              {isAuthenticated ? (
                <span className='navbar-text mr-3'>
                  Welcome, <strong>{user.name}</strong>
                </span>
              ) : (
                <AuthModal isRegister={false} />
              )}
            </NavItem>
            <NavItem>
              {isAuthenticated ? <Logout /> : <AuthModal isRegister={true} />}
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};
