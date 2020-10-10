import React, {
  useState,
  useReducer,
  useCallback,
  useEffect,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { registerUser, login } from '../../actions/authActions';
import { clearError } from '../../actions/errorActions';

export const AuthModal = ({ isRegister }) => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.error, shallowEqual);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [user, userDispatch] = useReducer(userReducer, {
    name: '',
    email: '',
    password: '',
  });
  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    dispatch(clearError());
    userDispatch({ type: 'reset' });
    setModal(state => !state);
  }, [dispatch]);
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (isRegister) {
        dispatch(registerUser(user));
      } else {
        // login
        dispatch(login({ email: user.email, password: user.password }));
      }
    },
    [dispatch, user, isRegister]
  );

  useEffect(() => {
    if (isAuthenticated) {
      toggle();
    }
  }, [isAuthenticated, toggle]);

  return (
    <Fragment>
      <NavLink onClick={toggle} href='#'>
        {isRegister ? 'Register' : 'Login'}
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {isRegister ? 'Register' : 'Login'}
        </ModalHeader>
        <ModalBody>
          {error.id === (isRegister ? 'REGISTER_FAIL' : 'LOGIN_FAIL') && (
            <Alert color='danger'>{error.msg}</Alert>
          )}
          <Form onSubmit={onSubmit}>
            {Object.keys(user)
              .filter(key => (isRegister ? true : key !== 'name'))
              .map(key => (
                <AuthInput
                  isRegister={isRegister}
                  key={key}
                  name={key}
                  value={user[key]}
                  onChange={value =>
                    userDispatch({ type: key, payload: value })
                  }
                />
              ))}
            <Button color='dark' style={{ marginTop: '2rem' }} block>
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

AuthModal.propTypes = {
  isRegister: PropTypes.bool.isRequired,
};

const AuthInput = ({ isRegister, name, value, onChange }) => {
  const elemId = `${isRegister ? 'register' : 'login'}-${name}`;
  const inputLabel = name[0].toUpperCase() + name.slice(1).toLowerCase();
  const type = name === 'name' ? 'text' : name;

  return (
    <FormGroup>
      <Label for={elemId}>{inputLabel}</Label>
      <Input
        className='mb-3'
        type={type}
        name={name}
        id={elemId}
        onChange={e => onChange(e.target.value)}
        value={value}
      />
    </FormGroup>
  );
};

AuthInput.propTypes = {
  isRegister: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case 'name':
      return { ...state, name: payload };
    case 'email':
      return { ...state, email: payload };
    case 'password':
      return { ...state, password: payload };
    case 'reset':
      return { name: '', email: '', password: '' };
    default:
      return state;
  }
};
