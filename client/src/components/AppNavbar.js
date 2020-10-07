import React, { useState, useCallback } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';

export const AppNavbar = () => {
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
              <NavLink href='https://www.google.com'>Google</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://www.github.com'>Github</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://www.reactjs.org'>React</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};
