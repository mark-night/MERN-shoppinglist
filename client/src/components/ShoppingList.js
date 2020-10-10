import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const ShoppingList = () => {
  const items = useSelector(state => state.items);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <ListGroup>
      <TransitionGroup className='shopping-list'>
        {items.map(({ _id, name }) => (
          <CSSTransition key={_id} timeout={500} classNames='fade'>
            <ListGroupItem>
              {isAuthenticated && (
                <Button
                  color='danger'
                  size='small'
                  className='remove-btn'
                  onClick={() => dispatch(deleteItem(_id))}
                >
                  &times;
                </Button>
              )}
              {name}
            </ListGroupItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ListGroup>
  );
};
