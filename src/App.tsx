import React from 'react';
import Router from './routes/index';
import './index.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const isLoggedIn = localStorage.getItem('token');
    return (
      <>
        <Router />
        <ToastContainer />
      </>
    );

}

export default App;



