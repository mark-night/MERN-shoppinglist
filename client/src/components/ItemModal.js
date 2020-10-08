import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { addItem } from '../actions/itemActions';

export const ItemModal = () => {
  const [modal, setModal] = useState(false);
  const [itemName, setItemName] = useState('');
  const dispatch = useDispatch();
  const toggle = useCallback(() => setModal(state => !state), []);
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(addItem(itemName));
      toggle();
      setItemName('');
    },
    [itemName, toggle, dispatch]
  );

  return (
    <div>
      <Button color='dark' style={{ marginBottom: '2rem' }} onClick={toggle}>
        Add Item
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to shopping list</ModalHeader>
        <ModalBody>
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
