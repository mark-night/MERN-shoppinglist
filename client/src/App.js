import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Container } from 'reactstrap';
import { AppNavbar, ShoppingList, ItemModal } from './components';
import { loadUser } from './actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
