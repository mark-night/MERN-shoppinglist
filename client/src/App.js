import React from 'react';
import { AppNavbar, ShoppingList } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className='App'>
      <AppNavbar />
      <ShoppingList />
    </div>
  );
}

export default App;
