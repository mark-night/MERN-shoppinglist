import React, { useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';

export const ShoppingList = ({ props }) => {
  const [items, setItems] = useState([
    { id: uuid(), name: 'Milk' },
    { id: uuid(), name: 'Eggs' },
    { id: uuid(), name: 'Wine' },
    { id: uuid(), name: 'Steak' },
  ]);

  return (
    <Container>
      <Button
        color='dark'
        style={{ marginBottom: '2rem' }}
        onClick={() => {
          const name = prompt('Enter Item:');
          if (name) {
            setItems(items => [...items, { id: uuid(), name }]);
          }
        }}
      >
        Add Item
      </Button>
      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames='fade'>
              <ListGroupItem>
                <Button
                  color='danger'
                  size='small'
                  className='remove-btn'
                  onClick={() =>
                    setItems(items => items.filter(item => item.id !== id))
                  }
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};
