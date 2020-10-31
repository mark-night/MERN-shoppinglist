import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap';
import { addItem } from '../actions/itemActions';

export const ItemModal = () => {
  const [modal, setModal] = useState(false);
  const [itemName, setItemName] = useState('');
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();
  const toggle = useCallback(() => setModal(state => !state), []);
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(addItem(itemName));
    },
    [itemName, dispatch]
  );

  useEffect(() => {
    if (error.id === 'ADD_ITEM_ERROR') {
      setModal(true);
    } else {
      setModal(false);
      setItemName('');
    }
  }, [error]);

  return (
    <div>
      {isAuthenticated ? (
        <Button color='dark' style={{ marginBottom: '2rem' }} onClick={toggle}>
          Add Item
        </Button>
      ) : (
        <h4 className='mb-3 ml-2'>Please login to manage list.</h4>
      )}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to shopping list</ModalHeader>
        <ModalBody>
          {error.id === 'ADD_ITEM_ERROR' && (
            <Alert color='danger'>{error.msg}</Alert>
          )}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='item'>Item to add</Label>
              <Input
                name='name'
                id='item'
                onChange={e => setItemName(e.target.value)}
                value={itemName}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
